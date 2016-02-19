angular.module('Chatroom').constant('BACKEND_URL', 'http://localhost:8080');

angular.module('Chatroom').factory('SocketService', function($rootScope, BACKEND_URL) {
    var socket = io.connect(BACKEND_URL);

    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});
