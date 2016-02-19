'use strict';

angular.module('Chatroom', ['ui.router']);

angular.module('Chatroom').config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider

		.state('login', {
			url: '/login',
			templateUrl: 'login/partial-login.html',
			controller: 'LoginController'
		})

		.state('login.list', {
			url: '/list',
			templateUrl: 'login/partial-login-list.html',
			controller: function($scope) {
				$scope.channels = ['UltraChannel', 'BestChannel', 'HomiePlace'];
			}
		})

		.state('login.paragraph', {
			url: '/paragraph',
			template: 'This is awesome'
		})

		.state('lobby', {
			url: '/lobby',
			//templateUrl: 'lobby/lobby.html',
			//controller: 'LobbyController',
			views: {

				// The main template will be placed here.
				'': { 
					templateUrl: 'lobby/lobby.html',
					controller: 'LobbyController'
				},

				'roomlist@lobby': {
					templateUrl: 'lobby/partial-lobby-roomList.html',
					controller: 'RoomListController'
				},

				'connectedUsers@lobby': {
					templateUrl: 'lobby/partial-lobby-connectedUsers.html',
					controller: 'ConnectedUsersController'
				},

				'chatroom@lobby': {
					templateUrl: 'chatroom/partial-chatRoom.html',
					controller: 'ChatRoomController'
				}

			}
		});

});