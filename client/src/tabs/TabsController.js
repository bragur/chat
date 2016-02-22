angular.module('Chatroom').controller('TabsController', function($scope, SocketService) {
	$scope.msgHeader = "Private Messages";
	$scope.seen = 0;
	$scope.unseen = false;

	$scope.chosen = function chosen(tab) {
		console.log("Switching to tab " + tab);
		$scope.seen = tab;

		if ($scope.seen === 1 && $scope.unseen === true) {
			$scope.msgHeader = "Private Messages";
		}
	};

	SocketService.on('recv_privatemsg', function(from, msg) {
		if ($scope.seen === 0) {
			document.getElementById('msg-alert').play();
			$scope.unseen = true;
			$scope.msgHeader = "New Msg!";
		}
	});
});