'use strict';

angular.module('Chatroom').service('SharedProperties', function() {
	var rooms;

	return {
		getRooms: function getRooms() {
			return rooms;
		},
		setRooms: function setRooms(allRooms) {
			rooms = allRooms;
		},
		getTopic: function getTopic(room) {
			return rooms[room].topic;
		}
	};
});