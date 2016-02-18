'use strict';

angular.module('Chatroom').controller('LoginController', ['$scope', 'SocketService', function($scope, SocketService){
	
	$scope.nickName = "";

	$scope.validateNick = function validateNick(nickName) {
		console.log(nickName);
		SocketService.emit('adduser', nickName, function(available) {

			if (available) {
				console.log('This nickName is available!');
			} else {
				console.log('This nickName is sadly not available...');
			}

		});
	};

}]);