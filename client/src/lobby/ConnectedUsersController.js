'use strict';

angular.module("Chatroom").controller("ConnectedUsersController", 
function($scope, $stateParams, SocketService, SharedProperties) {

	console.log("Im in the ConnectedUsersController");

	$scope.chatroomName = $stateParams.ChatroomName;

	SocketService.on('updateusers', function (room, users, ops) {
		console.log("Here are the users for " + room + ":");
		console.log(users);

		if (room === $scope.chatroomName) {
			$scope.users = users; //chatroom.users;
			$scope.ops = ops; //chatroom.ops;
			SharedProperties.setCurrRoomUsers(users);
		} /*else if (SharedProperties.getRoomUsersLength(room) < 1 && room !== 'lobby') {
			SharedProperties.deleteRoom(room);
		}*/
	});

	$scope.$on("$destroy", function(){
        SocketService.off("updateusers", function(success){});
    });

});