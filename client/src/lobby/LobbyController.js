'use strict';

angular.module("Chatroom").controller('LobbyController', 
function($scope, $location, SocketService) {

	
	SocketService.emit('rooms');

	SocketService.on('roomlist', function(rooms) {
		$scope.rooms = rooms;
		console.log(rooms);
	});

});