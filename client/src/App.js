'use strict';

angular.module('Chatroom', ['ui.bootstrap', 'ui.router', 'luegg.directives', 'angularMoment']);

angular.module('Chatroom').config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider

		.state('login', {
			url: '/login',
			templateUrl: 'login/partial-login.html',
			controller: 'LoginController'
		})

		.state('chatroom', {
			url: '/chatroom/:ChatroomName',
			//templateUrl: 'lobby/lobby.html',
			//controller: 'LobbyController',
			views: {

				// The main template will be placed here.
				'': { 
					templateUrl: 'lobby/lobby.html',
					controller: 'LobbyController'
				},

				'roomlist@chatroom': {
					templateUrl: 'lobby/partial-lobby-roomList.html',
					controller: 'RoomListController'
				},

				'connectedUsers@chatroom': {
					templateUrl: 'lobby/partial-lobby-connectedUsers.html',
					//controller: 'ConnectedUsersController'
					controller: 'ChatRoomController'
				},

				'chatroom@chatroom': {
					templateUrl: 'chatroom/partial-chatRoom.html',
					controller: 'ChatRoomController',
				},

				'privateMsg@chatroom': {
					templateUrl: 'privatemsg/partial-privatemsg.html',
					controller: 'PrivateMessageController',
				}

			}
		});

});