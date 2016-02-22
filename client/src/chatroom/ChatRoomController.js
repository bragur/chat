angular.module("Chatroom").controller("ChatRoomController", 
function($scope, $rootScope, $stateParams, SocketService, SharedProperties) {

	console.log("Im in the ChatRoomController");

	//$scope.chatMsg = "";

	$scope.chatroomName = $stateParams.ChatroomName;
	$scope.headers = SharedProperties.headers();
	$scope.headers.channelHeader = $scope.chatroomName;
	$scope.nick = SharedProperties.getNick();

	$scope.highlight = function(msg) {
		if (msg.indexOf("@" + $scope.nick) > -1) {
			return "highlight";
		}
	};

	var joinObj = {
		room: $scope.chatroomName,
		pass: ''
	};

	SocketService.emit('joinroom', joinObj, function (allowed, reason) {
		console.log("Attempting to join " + $scope.chatroomName);
		if (allowed) {
			SharedProperties.setCurrentRoom($scope.chatroomName);

		} else {
			console.log("Not allowed to enter because " + reason);
		}
	});

	setTimeout(function() { 
		$scope.chatroomTopic = SharedProperties.getTopic($scope.chatroomName);
		$scope.$apply(); 
	}, 200);

	$scope.sendMessage = function sendMessage(mess) {
		if (mess.trim().length < 1) {
			$scope.chatMsg = "";
			return;
		}

		if (mess.charAt(0) !== '/') {
            var data = {
                roomName: $scope.chatroomName,
                msg: mess,
                fromServer: false
            };

            SocketService.emit('sendmsg', data);
        } else {
            var action = mess.split(" ")[0].substring(1);
            var actions = ['settopic', 'ban', 'unban', 'op', 'deop', 'kick'];
            var line = mess.substring(action.length + 2);
            var params = line.split(" ");
            var obj = {};

            if (action === 'topic') {
                action = 'settopic';
                obj = {
                    topic: line,
                    room: $scope.chatroomName
                };
            } else if (action === 'msg') {
                $rootScope.$broadcast('privateFromChannel', mess);
            } else if (action === 'join') {
            	$rootScope.$broadcast('joinChannel', params[0]);
            } else {
                obj = {
                    user: params[0],
                    room: $scope.chatroomName
                };
            }

            if (actions.indexOf(action) > -1) {
                SocketService.emit(action, obj, function(success) {});
            }
        }

        $scope.chatMsg = "";

	};

	SocketService.on('updatechat', function (roomName, messageHistory) {
		if (roomName === $scope.chatroomName) {
			$scope.msgHistory = messageHistory;
		}
	});

	SocketService.on('updateusers', function (room, users, ops) {

		if (room === $scope.chatroomName) {
			$scope.users = users; //chatroom.users;
			$scope.ops = ops; //chatroom.ops;
			SharedProperties.setCurrRoomUsers(users);
			var updatedUsers = {
				Users: $scope.users,
				Ops: $scope.ops,
				Room: room
			};
		}
	});

	SocketService.on('updatetopic', function (room, topic, username) {
		if (room === $scope.chatroomName && username === SharedProperties.getNick()) {
			$scope.chatroomTopic = topic;
			$scope.headers.channelHeader = $scope.chatroomName + ": " + $scope.chatroomTopic.substring(0, 50);
			if ($scope.chatroomTopic.length > 50) {
				$scope.headers.channelHeader += "...";
			}

			var serverMsg = {
				msg: username + " changed the topic to: " + topic,
				roomName: room,
				fromServer: true 
			};

			SocketService.emit('sendmsg', serverMsg);
		}
	});

	SocketService.on('servermessage', function (status, room, username) {
		if (room === $scope.chatroomName && username === SharedProperties.getNick()) {
			var serverMsg = {
				msg: username + " " + status + "ed the channel.",
				roomName: $scope.chatroomName,
				fromServer: true
			};

			SocketService.emit('sendmsg', serverMsg);
		}
	});

	$scope.$on("$destroy", function(){
        SocketService.off("updatechat", function(success){});
        SocketService.off("updateusers", function(success){});
        SocketService.off("updatetopic", function(success){});
        SocketService.off("servermessage", function(success){});
    });
});