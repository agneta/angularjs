/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: theme/source/main/socket.js
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

/*global io*/

var app = angular.module('MainApp');

app.factory('SocketIO', function($rootScope) {
  $rootScope.system = {};

  var socket = io(agneta.services.host, {
    path: '/socket',
    autoConnect: true
  });

  socket.on('disconnect', function() {
    $rootScope.system.notification = {
      level: 'error',
      message: 'You are disconnected from the server.'
    };
  });

  socket.on('connection', function() {
    console.log('connected!');
    $rootScope.system.notification = null;
  });

  socket.on('connect_error', function(err) {
    console.error(err);
  });

  function connect(room) {
    socket.emit('join', room);
    return {
      on: function(name, cb) {
        return socket.on(getPath(name), cb);
      },
      once: function(name, cb) {
        return socket.once(getPath(name), cb);
      },
      emit: function(name, data) {
        return socket.emit(getPath(name), data);
      }
    };

    function getPath(name) {
      return `${room}.${name}`;
    }
  }

  return {
    connect: connect,
    socket: socket
  };
});
