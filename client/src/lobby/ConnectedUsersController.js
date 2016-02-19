'use strict';

angular.module("Chatroom").controller("ConnectedUsersController", 
function($scope, SocketService) {

	console.log("Im in the ConnectedUsersController");

	$scope.users = [];
	SocketService.emit("users");

	SocketService.on("userlist", function(users) {
		console.log(users);
		$scope.users = users;
	});

});