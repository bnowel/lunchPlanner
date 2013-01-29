var express = require('express'), 
    app = express.createServer(),
    user = require('./static/js/user'),
    io = require('socket.io').listen(app),
    yelp = require("yelp"),
    yelpCreds = {};

// This is trying to get around not having environment variables when debugging using Cloud9 ide
try {
    var DevYelp = require('./static/js/devYelp');
    yelpCreds = new DevYelp().creds();
    console.log('devMode');
} catch(err) {
    console.log('production');
    yelpCreds = {
      consumer_key: process.env.YELP_CONSUMER_KEY, 
      consumer_secret: process.env.YELP_CONSUMER_SECRET,
      token: process.env.YELP_TOKEN,
      token_secret: process.env.YELP_TOKEN_SECRET
    };
}

var yelpClient = yelp.createClient(yelpCreds);


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
        yelpClient.search({term: term, location: location}, function(error, data) {
            console.log(error);
            console.log(data.businesses);
            var mapped = mapper(data.businesses);
            console.log(mapped);
           res.send(mapped); 
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


function mapper(data) {
    console.log(data);
    var result = [];
    var length = data.length;
    
    for (i = 0; i < length; i++) {
        var tempObject = {};
        
        tempObject.Name = data[i].name;
        tempObject.Phone = data[i].hasOwnProperty('display_phone') ? data[i].display_phone : '';
        tempObject.Rating = data[i].hasOwnProperty('rating_img_url') ? data[i].rating_img_url : '';
        tempObject.ID = data[i].id;
        tempObject.BizImage = data[i].image_url;

        if(data[i].hasOwnProperty('location')) {
            
            if(data[i].location.hasOwnProperty('display_address')) {
                tempObject.Address = '';
                var temp = data[i].location.display_address
                for (var key in temp) {
                    tempObject.Address = tempObject.Address + " " + temp[key];
                }            
            }
        } else {
            tempObject.Address = '';
        }

        result.push(tempObject);
    }
    return result;
}