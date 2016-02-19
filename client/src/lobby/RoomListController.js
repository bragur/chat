'use strict';

angular.module("Chatroom").controller("RoomListController", 
function($scope, SocketService) {

	SocketService.emit('rooms');

	SocketService.on('roomlist', function(rooms) {
		$scope.rooms = rooms;
		console.log(rooms);

	});
});