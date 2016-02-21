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

		var currRoom = SharedProperties.getCurrentRoom();
		if (newRoom !== currRoom) {
			SocketService.emit('partroom', SharedProperties.getCurrentRoom());
			console.log("Im leaving:");
			console.log(SharedProperties.getCurrentRoom());

			console.log("In createRoom with " + newRoom);
			if (newRoom !== '') {
				$location.path('/chatroom/' + newRoom);
			}
		}
	};

	$scope.$on("$destroy", function(){
        SocketService.off("roomlist", function(success){});
    });
});