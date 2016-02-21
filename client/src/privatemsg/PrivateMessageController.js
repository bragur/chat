angular.module('Chatroom').controller('PrivateMessageController',
	function($scope, SocketService, SharedProperties) {
		console.log("I'm in the PrivateMessageController");

		SocketService.on('recv_privatemsg', function(from, msg) {
			console.log(from + ": " + msg);
		});
});