'use strict';

angular.module("Chatroom").controller("ConnectedUsersController", 
function($scope, SocketService) {

	$scope.users = [];
	SocketService.emit("users");

	SocketService.on("userlist", function(users) {
		console.log(users);
		$scope.users = users;
	});

});