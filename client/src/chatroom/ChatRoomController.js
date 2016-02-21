'use strict';

angular.module("Chatroom").controller("ChatRoomController",
    function($scope, $rootScope, $stateParams, SocketService, SharedProperties) {

        console.log("Im in the ChatRoomController");

        $scope.chatMsg = "";

        $scope.chatroomName = $stateParams.ChatroomName;

        var joinObj = {
            room: $scope.chatroomName,
            pass: ''
        };

        SocketService.emit('joinroom', joinObj, function(allowed, reason) {
            console.log("Attempting to join " + $scope.chatroomName);
            if (allowed) {
                // Updated info on recently joined room

            } else {
                console.log("Not allowed to enter because " + reason);
            }
        });

        setTimeout(function() {
            $scope.chatroomTopic = SharedProperties.getTopic($scope.chatroomName);
            console.log($scope.chatroomTopic);
            $scope.$apply();
        }, 200);

        $scope.privateMsg = function privateMsg(user) {
			console.log("Want to send private msg to " + user);
			$scope.chatMsg = 'bob';
		};

        $scope.sendMessage = function sendMessage(mess) {

            if (mess.charAt(0) !== '/') {
                var data = {
                    roomName: $scope.chatroomName,
                    msg: mess
                };

                console.log("Sending msg to " + data.roomName + ": " + mess);

                SocketService.emit('sendmsg', data);
            } else {
                var action = mess.split(" ")[0].substring(1);
                var actions = ['settopic', 'privatemsg', 'ban', 'unban', 'op', 'deop', 'kick'];
                var line = mess.substring(action.length + 2);
                var params = line.split(" ");
                var obj = {};

                if (action === 'topic') {
                    action = 'settopic';
                    obj = {
                        topic: line,
                        room: $scope.chatroomName
                    };
                } else if (action === 'msg') {
                	action = 'privatemsg';
                	obj = {
                		nick: params[0],
                		message: line.substring(params[0].length + 1)
                	};
                } else {
                    obj = {
                        user: params[0],
                        room: $scope.chatroomName
                    };
                }

                if (actions.indexOf(action) > -1) {
                	SocketService.emit(action, obj, function(success) {
                    console.log(action + " successful!");
                });
                }
            }

            $scope.chatMsg = "";
        };

        SocketService.on('servermessage', function(status, room, username) {
            if (room === $scope.chatroomName) {
                console.log(username + " " + status + " " + room);
            }
        });

        SocketService.on('updatechat', function(roomName, messageHistory) {
            if (roomName === $scope.chatroomName) {
                console.log("messagehistory is: ");
                console.log(messageHistory);
                $scope.msgHistory = messageHistory;
            }
        });

        SocketService.on('updatetopic', function(room, topic, username) {
            if (room === $scope.chatroomName) {
                $scope.chatroomTopic = topic;
                // $scope.$apply();
                console.log(username + " set topic in " + room + " to " + topic);
            }
        });

        SocketService.on('updateusers', function(room, users, ops) {
            var chatroom = SharedProperties.getRoom(room);

            if (room === $scope.chatroomName) {
                $scope.users = chatroom.users;
                $scope.ops = chatroom.ops;
                var updatedUsers = {
                    Users: $scope.users,
                    Ops: $scope.ops,
                    Room: room
                };
                console.log(updatedUsers);
            }
        });
    });
