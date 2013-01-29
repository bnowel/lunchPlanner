var express = require('express'), 
    app = express.createServer(),
    user = require('./static/js/user'),
    io = require('socket.io').listen(app);


var yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY, 
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

/*
console.log(process.env.YELP_CONSUMER_KEY);
console.log(process.env.YELP_CONSUMER_SECRET);
console.log(process.env.YELP_TOKEN);
console.log(process.env.YELP_TOKEN_SECRET);
*/   

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

app.get('/search', function(req, res) {
    var location = "San Luis Obispo",
        term = req.query["term"];
    
    if (term) {
        yelp.search({term: req.params.term, location: location}, function(error, data) {
            console.log(error);
            console.log(data);
           res.send(data); 
        });
    } else {
        res.send("Error");
    }
});

// When someone connects
io.sockets.on('connection', function (socket) {
    console.log('user connected');
    
    socket.emit('joined', { "id": socket.id });
    
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});