var express = require('express'), 
    app = express.createServer(),
    User = require('./static/js/user'),
    io = require('socket.io').listen(app),
    Outing = require('./static/js/outing'),
    yelp = require("yelp"),
    yelpCreds = {};
    
var outingList = new Array();
var outingID = 0;

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
    
    socket.on('createOuting', function(data) {
        var isUserDriver = data.user.availableCarSeats > 0;
        console.log("Number of seats: " + data.user.availableCarSeats);
        var userData = {id: socket.id, name: data.user.name, isDriver: isUserDriver, availableCarSeats: data.user.availableCarSeats };
        var newUser = new User(userData);
        
        var transport = "";
        
        if (data.drivingTransport)
            transport = "drive";
        else
            transport = "walk";
        
        var outing = new Outing({ id: outingID++, setTransport: transport, departureTime: data.departureTime, user: newUser, destination: data.destination, meetingPlace: data.meetingPlace });
        
        
        
        outingList.push(outing);
        
        var flattifiedOutingList = new Array();
        for(var i = 0; i < outingList.length; i++)
        {
            flattifiedOutingList.push(outingList[i].flattify());
        }
        socket.emit('updateOutings', flattifiedOutingList);
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});


function mapper(data) {
    console.log(data);
    var result = [];
    var length = data.length;
    
    for (var i = 0; i < length; i++) {
        var tempObject = {};
        
        tempObject.Name = data[i].name;
        tempObject.Phone = data[i].hasOwnProperty('display_phone') ? data[i].display_phone : '';
        tempObject.Rating = data[i].hasOwnProperty('rating_img_url') ? data[i].rating_img_url : '';
        tempObject.Review = data[i].hasOwnProperty('snippet_text') ? data[i].snippet_text : '';
        tempObject.ID = data[i].id;
        tempObject.BizImage = data[i].hasOwnProperty('image_url') ? data[i].image_url : '';

        tempObject.Address = '';    
        tempObject.LatLon = {lat: '', lon: ''}; 
        
        if(data[i].hasOwnProperty('location')) {
            
            if(data[i].location.hasOwnProperty('display_address')) {
                var temp = data[i].location.display_address;
                for (var key in temp) {
                    tempObject.Address = tempObject.Address + " " + temp[key];
                }            
            }
            
            if(data[i].location.hasOwnProperty('coordinate') && data[i].location.coordinate.hasOwnProperty('latitude') && data[i].location.coordinate.hasOwnProperty('longitude')) {
                tempObject.LatLon = {lat: data[i].location.coordinate.latitude, lon: data[i].location.coordinate.longitude};
            }
        }

        result.push(tempObject);
    }
    return result;
}