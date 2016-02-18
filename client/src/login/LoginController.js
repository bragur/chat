'use strict';

angular.module('Chatroom').controller('LoginController', ['$scope', function($scope){
	$scope.tryUser = function() {
		console.log($scope.username);
	};
}]);