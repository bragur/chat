'use strict';

angular.module('Chatroom').service('SharedProperties', function() {
	var rooms;

	var currentRoom = 'lobby';

	return {
		getRooms: function getRooms() {
			return rooms;
		},
		setRooms: function setRooms(allRooms) {
			rooms = allRooms;
		},
		getTopic: function getTopic(room) {
			return rooms[room].topic;
		},
		getRoomMsgHistory: function getRoomMsgHistory(room) {
			return rooms[room].messageHistory;
		},
		getCurrentRoom: function getCurrentRoom() {
			return currentRoom;
		}
	};
});