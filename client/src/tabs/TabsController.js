angular.module('Chatroom').controller('TabsController', function($scope, SocketService, SharedProperties) {
	$scope.headers = SharedProperties.headers();
	$scope.headers.msgHeader = "Private Messages";
	// $scope.headers.channelHeader = "Channel";
	$scope.seen = 0;
	$scope.unseen = false;

	$scope.chosen = function chosen(tab) {
		console.log("Switching to tab " + tab);
		$scope.seen = tab;

		if ($scope.seen === 1 && $scope.unseen === true) {
			$scope.headers.msgHeader = "Private Messages";
		}
	};

	SocketService.on('recv_privatemsg', function(from, msg) {
		if ($scope.seen === 0) {
			document.getElementById('msg-alert').play();
			$scope.unseen = true;
			$scope.headers.msgHeader = "New Msg!";
		}
	});

	$scope.$on("$destroy", function(){
        SocketService.off("recv_privatemsg", function(success) {});
        SocketService.off("roomlist", function(success) {});
    });
});