'use strict';

angular.module('Chatroom').controller('LoginController',
function($scope, $rootScope, $location, SocketService, SharedProperties){
	
	$scope.nickName = "";
	$scope.error = 0;

	$scope.validateNick = function validateNick(nickName) {
		console.log(nickName);

		if (nickName.trim() !== '' && nickName !== undefined) {
			SocketService.emit('adduser', nickName, function(available) {

				if (available) {
					console.log('This nickName is available!');
					$rootScope.nick = nickName;
					SharedProperties.setNick(nickName);
					//$location.path('/chatroom/lobby');

					$scope.error = 0;

					$location.path('/chatroom/lobby');

				} else {
					console.log('This nickName is sadly not available...');
					$scope.error = -1;
				}

			});
		} else {
			console.log('Have to choose a nickname!');
			$scope.error = -2;
		}
	};

});