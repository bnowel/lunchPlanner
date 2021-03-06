function Outing(details) {
    // Make sure we instantiate this object
    if (!(this instanceof Outing)) {
        return new Outing(details);
    }
    
    var id;
    this.getId = function () {
        return id;    
    };
    
    this.setId = function (val) {
        if (val === "")
            throw "Id cannot be blank";
        
        id = val;    
    };
    // End Id
    
    // Start name
    var name;
    this.getName = function () {
        return name;    
    };
    
    this.setName = function (val) {
        if (val === " ")
            throw "Name cannot be blank";
        
        name = val;    
    };
    // End Name
    
    // Departure time
    
    var departureTime;
    this.getDepartureTime = function() {
        return departureTime;
    };
    
    this.setDepartureTime = function(time) {
        if (time === "")
            throw "Must have departure time.";
        
        departureTime = time;        
    };
    
    
    // Start transport
    var transport;
    this.getTransport = function() {
        return transport;
    };
    
    this.setTransport = function(val) {
        if (val === "")
            throw "Transport cannot be blank";
        transport = val;
    };
    // End transport
    
    // If this has any available car seats. Internally set
//    var availableCarSeats = 0;
    this.getAvailableCarSeats = function() {
        console.log('getAvailSeats');
        var availableCarSeats = 0;
        var numberOfDrivers = 0;
        for(var i = 0; i < users.length; i++) {
            console.log(users[i].getName());
            console.log(users[i].getIsDriver());
            availableCarSeats += users[i].getAvailableCarSeats();
            numberOfDrivers += users[i].getIsDriver() ? 1 : 0;
        }
        console.log('users length is ' + users.length + ' and number of drivers is ' + numberOfDrivers);
        return availableCarSeats - (users.length - numberOfDrivers);  
    };
    
    // Whether or not this has a driver. Internally set
    var hasDriver;
    this.getHasDriver = function() {
        return hasDriver;  
    };
    
    // Start transport
    var joinTimes;
    this.getJoinTimes = function() {
        return joinTimes;
    };
    
    var users;
    this.getUsers = function() {
        return users;        
    };
    
    // User tries to join an outing.
    this.joinOuting = function(user) {
        if (!user)
            throw "Must enter a user Object";
            
        users.push(user);
        joinTimes.push({ id: user.getId(), time: new Date().getTime()});
        
        console.log(transport + " |||| " + JSON.stringify(user.flattify()));
        if (transport == "drive" && user.getIsDriver())
        {
            hasDriver = true;
        //    availableCarSeats = user.getAvailableCarSeats();
        }
    };
    
    // User tries to leave an outing.
    this.leaveOuting = function(userId){
        var foundUser = false;
        
        // Find index of user we're removing.
        var index = -1;
        for (var i = 0; i < joinTimes.length; i++)
        {
            if (joinTimes[i].id == userId)
            {
                foundUser = true;
                index = i;
                
                // If this user was a driver, remove the outing's car. <assumes single driver>
                if (users[i].getIsDriver())
                {
                    hasDriver = false;
                  //  availableCarSeats = 0;
                }
                
                break;
            }
        }
        
        if (foundUser) {
            joinTimes.splice(i, 1);
            users.splice(i, 1);
        }
        return foundUser;
    };
    
    
    // Setting outing's destination
    var destination;
    this.getDestination = function() {
        return destination;
    };
    
    this.setDestination = function(destination) {
        if (destination === "")
            throw "Must set destination.";
            
        this.destination = destination;
    };
    
    // Setting/getting outing's meeting place
    var meetingPlace;
    this.getMeetingPlace = function() {
        return meetingPlace;    
    };
    
    this.setMeetingPlace = function(meeting) {        
        meetingPlace = meeting;
    };
    
    // Make it flat
    this.flattify = function() {
        
        var flattifiedUsers = new Array();
        
        for (var i = 0; i < users.length; i++)
        {
            flattifiedUsers.push(users[i].flattify());
        }
                
        return { id: id, name: name, destination: destination, meetingPlace: meetingPlace, users: flattifiedUsers, joinTimes: joinTimes, hasDriver: hasDriver, availableCarSeats: this.getAvailableCarSeats(), transport: transport, departureTime: departureTime };
    };
    
    
    // Check to see if we got this passed
    if (details) {
        this.setId( details.id );
        this.setTransport( details.setTransport );
        this.setName( details.destination.Name + " @ " + details.departureTime );
        this.setDepartureTime( details.departureTime );        
        users = [];
        joinTimes = [];
        this.joinOuting( details.user );
        this.setDestination( details.destination );
        this.meetingPlace = ( details.meetingPlace );

    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Outing;
    }
}