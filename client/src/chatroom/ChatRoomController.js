'use strict';

angular.module("Chatroom").controller("ChatRoomController", 
function($scope, $rootScope, $stateParams, SocketService, SharedProperties) {

	console.log("Im in the ChatRoomController");

	//$scope.chatMsg = "";

	$scope.chatroomName = $stateParams.ChatroomName;

	var joinObj = {
		room: $scope.chatroomName,
		pass: ''
	};

	SocketService.emit('joinroom', joinObj, function (allowed, reason) {
		console.log("Attempting to join " + $scope.chatroomName);
		if (allowed) {
			// Updated info on recently joined room

			// Updated messageHistory
			/*SocketService.on('updatechat', function (room, messageHistory) {
				$scope.msgHistory = messageHistory;
				console.log(messageHistory);
			});*/

			SocketService.on('updatetopic', function (room, topic, username) {
				if (room === $scope.chatroomName) {
					console.log(username + " updated topic in " + room + " to: " + topic);
				}
			});

			SocketService.on('servermessage', function (status, room, username) {
				if (room === $scope.chatroomName) {
					console.log(username + " " + status + " " + room);
				}
			});

		} else {
			console.log("Not allowed to enter because " + reason);
		}
	});

	setTimeout(function() { 
		$scope.chatroomTopic = SharedProperties.getTopic($scope.chatroomName);
		console.log($scope.chatroomTopic);
		$scope.$apply(); 
	}, 200);

	$scope.sendMessage = function sendMessage(mess) {
		//$scope.msgHistory = SharedProperties.getRoomMsgHistory($scope.chatroomName);

		var data = {
			roomName: $scope.chatroomName,
			msg: mess
		};

		console.log("Sending msg to " + data.roomName + ": " + mess);

		SocketService.emit('sendmsg', data);
		$scope.chatMsg = "";

	};

	SocketService.on('updatechat', function (roomName, messageHistory) {
		if (roomName === $scope.chatroomName) {
			console.log("messagehistory is: ");
			console.log(messageHistory);
			$scope.msgHistory = messageHistory;
		}
	});

	SocketService.on('updateusers', function (room, users, ops) {
		var chatroom = SharedProperties.getRoom(room);

		if (room === $scope.chatroomName) {
			$scope.users = chatroom.users;
			$scope.ops = chatroom.ops;
			var updatedUsers = {
				Users: $scope.users,
				Ops: $scope.ops,
				Room: room
			};
			console.log(updatedUsers);
		}
	});
});