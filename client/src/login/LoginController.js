'use strict';

angular.module('Chatroom').controller('LoginController', ['$scope', '$rootScope', '$location', 'SocketService', function($scope, $rootScope, $location, SocketService){
	
	$scope.nickName = "";
	$scope.error = 0;

	$scope.validateNick = function validateNick(nickName) {
		console.log(nickName);

		if (nickName.trim() != '' && nickName != undefined) {
			SocketService.emit('adduser', nickName, function(available) {

				if (available) {
					console.log('This nickName is available!');
					$rootScope.nick = nickName;
					$location.path('/lobby');
					$scope.error = 0;

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

}]);