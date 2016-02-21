'use strict';

angular.module("Chatroom").controller("ConnectedUsersController", 
function($scope, $stateParams, SocketService, SharedProperties) {

	console.log("Im in the ConnectedUsersController");

	$scope.chatroomName = $stateParams.ChatroomName;

	//$scope.users = SharedProperties.getCurrRoomUsers();

	/*$scope.users = [];
	SocketService.emit("users");

	SocketService.on("userlist", function(users) {
		console.log(users);
		$scope.users = users;
	});

	$scope.$on("$destroy", function(){
        SocketService.off("userlist", function(success){});
    });*/
	SocketService.on('updateusers', function (room, users, ops) {
		//var chatroom = SharedProperties.getRoom(room);

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