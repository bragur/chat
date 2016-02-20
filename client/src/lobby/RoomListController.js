'use strict';

angular.module("Chatroom").controller("RoomListController", 
function($scope, $location, SocketService, SharedProperties) {

	$scope.newRoom = "";

	SocketService.emit('rooms');

	SocketService.on('roomlist', function(rooms) {
		$scope.rooms = rooms;
		SharedProperties.setRooms(rooms);
		//console.log(SharedProperties.getRooms());

	});

	$scope.createRoom = function createRoom(newRoom) {
		console.log("In createRoom with " + newRoom);
		if (newRoom !== '') {
			$location.path('/chatroom/' + newRoom);
		}
	};
});