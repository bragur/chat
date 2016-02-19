'use strict';

angular.module("Chatroom").controller("RoomListController", 
function($scope, SocketService, SharedProperties) {

	SocketService.emit('rooms');

	SocketService.on('roomlist', function(rooms) {
		$scope.rooms = rooms;
		SharedProperties.setRooms(rooms);
		//console.log(SharedProperties.getRooms());

	});
});