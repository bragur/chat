'use strict';

angular.module('Chatroom').controller('LoginController', ['$scope', '$rootScope', '$location', 'SocketService', function($scope, $rootScope, $location, SocketService){
	
	$scope.nickName = "";

	$scope.validateNick = function validateNick(nickName) {
		console.log(nickName);
		SocketService.emit('adduser', nickName, function(available) {

			if (available) {
				console.log('This nickName is available!');
				$rootScope.nick = nickName;
				$location.path('/lobby');

			} else {
				console.log('This nickName is sadly not available...');
			}

		});
	};

}]);