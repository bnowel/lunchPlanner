$(function() {
    // Page stuff
    $('#search').on('click', function() {
        console.log('searching...');
       $.get('search', {term: $('#terms').val()}, function(data) {
           console.log(data);
       });
    });
    
    // Socket Stuff
    var socket = io.connect('/');
    
    // Listen to event
    socket.on('joined', function(data) {
        console.log(data);
      // doSomethingWith(data)
    });
});