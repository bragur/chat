'use strict';

angular.module("Chatroom").controller("ChatRoomController", 
function($scope, $rootScope, $stateParams, SocketService, SharedProperties) {

	console.log("Im in the ChatRoomController");


	$scope.chatroomName = $stateParams.ChatroomName;
	setTimeout(function() { 
		$scope.chatroomTopic = SharedProperties.getTopic($scope.chatroomName);
		console.log($scope.chatroomTopic);
		$scope.$apply(); 
	}, 200);
});