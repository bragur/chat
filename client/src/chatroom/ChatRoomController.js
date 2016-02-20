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
				console.log(room);
				console.log(topic);
				console.log(username);
			});

			SocketService.on('servermessage', function (status, room, username) {
				console.log(status);
				console.log(room);
				console.log(username);
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

		console.log("Trying to send a message: " + mess);
		console.log(data.roomName);
		console.log(data.msg);

		SocketService.emit('sendmsg', data);

	};

	SocketService.on('updatechat', function (roomName, messageHistory) {
		// If successful update the room status in the SharedProperties service
		console.log("messagehistory is: ");
		console.log(messageHistory);
		$scope.msgHistory = messageHistory;
	});

	SocketService.on('updateusers', function (room, users, ops) {
		$scope.room = room;
		$scope.users = users;
		$scope.ops = ops;
		console.log(users);
		console.log(ops);
		console.log(room);
	});
});