'use strict';

angular.module('Chatroom').service('SharedProperties', function() {
	var rooms;

	var nick;

	var currentRoom;

	var currentRoomUsers;

	return {
		getRooms: function getRooms() {
			return rooms;
		},
		setRooms: function setRooms(allRooms) {
			rooms = allRooms;
		},
		deleteRoom: function deleteRoom(room) {
			console.log("Gonna delete " + room);
			delete rooms[room];
		},
		getTopic: function getTopic(room) {
			return rooms[room].topic;
		},
		getRoomMsgHistory: function getRoomMsgHistory(room) {
			return rooms[room].messageHistory;
		},
		setCurrentRoom: function setCurrentRoom(room) {
			currentRoom = room;
		},
		getCurrentRoom: function getCurrentRoom() {
			return currentRoom;
		},
		getRoom: function getRoom(room) {
			return rooms[room];
		},
		getNick: function getNick() {
			return nick;
		},
		setNick: function setNick(nickName) {
			nick = nickName;
		},
		getCurrRoomUsers: function getCurrRoomUsers() {
			return currentRoomUsers;
		},
		getRoomUsersLength: function getRoomUsersLength(room) {
			return Object.keys(rooms[room].users).length;
		},
		setCurrRoomUsers: function setCurrRoomUsers(users) {
			currentRoomUsers = users;
		}
	};
});