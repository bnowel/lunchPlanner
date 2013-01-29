$(function() {
    var socket = io.connect('/');
    
    // Listen to event
    socket.on('eventName', function(data) {
      // doSomethingWith(data)
    });
});