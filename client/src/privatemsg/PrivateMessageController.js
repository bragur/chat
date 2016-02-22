angular.module('Chatroom').controller('PrivateMessageController',
	function($scope, SocketService, SharedProperties) {
		console.log("I'm in the PrivateMessageController");

		$scope.msgHistory = [];

		$scope.sendMessage = function sendMessage(msg) {
			var msgObj = {
				nick: msg.split(" ")[1],
				from: "me",
				message: msg.substring(msg.indexOf(" ", 5)),
				timestamp: new Date()
			};

			$scope.msgHistory.push(msgObj);

			SocketService.emit('privatemsg', msgObj);
			$scope.chatMsg = "";
		};

		$scope.$on('privateFromChannel', function(e, obj) {
			console.log("Received private msg from Channel");
			$scope.sendMessage(obj);
		});

		SocketService.on('recv_privatemsg', function(from, msg) {
        	var msgObj = {
        		nick: "me",
        		from: from,
        		message: msg,
        		timestamp: new Date()
        	};

        	$scope.msgHistory.push(msgObj);
        });
});