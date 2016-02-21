'use strict';

angular.module("Chatroom").controller("ConnectedUsersController", 
function($scope, $stateParams, SocketService, SharedProperties) {

	console.log("Im in the ConnectedUsersController");

	$scope.chatroomName = $stateParams.ChatroomName;

	SocketService.on('updateusers', function (room, users, ops) {

		if (room === $scope.chatroomName) {
			$scope.users = users; //chatroom.users;
			$scope.ops = ops; //chatroom.ops;
			SharedProperties.setCurrRoomUsers(users);
		}
	});

	$scope.$on("$destroy", function(){
        SocketService.off("updateusers", function(success){});
    });

});