var express = require('express'), 
    app = express.createServer(),
    io = require('socket.io').listen(app);
    
    

app.listen(process.env.C9_PORT || process.env.PORT || 3000);

app.configure(function(){
      app.use(express["static"](__dirname + '/static'));
      //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      app.use(express.bodyParser());
  });

// This is the main page.
app.get('/', function(req, res){
    res.sendfile(__dirname + '/static/index.html');
});

// When someone connects
io.sockets.on('connection', function (socket) {
    console.log('user connected');
    
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});