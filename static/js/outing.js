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
    
    var setTransport = function(val) {
        if (val === "")
            throw "Transport cannot be blank";
        transport = val;
    };
    // End transport
    
    // If this has any available car seats. Internally set
    var availableCarSeats;
    this.getAvailableCarSeats = function() {
        return availableCarSeats;  
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
    var joinOuting = function(user) {
        if (user === "")
            throw "Must enter a user Object";
            
        if (joinTimes === null)
        {
            joinTimes = new Array(100);
        }
        if (users === null)
        {
            users = new Array(100);
        }
        
        users.push(user);
        joinTimes.push({ id: user.id, time: new Date.getTime()});
        
        if (transport == "drive" && user.isDriver)
        {
            hasDriver = true;
            availableCarSeats = user.availableCarSeats;
        }
    };
    
    // User tries to leave an outing.
    var leaveOuting = function(user){
        if (user === "")
            throw "Must enter a user object";
        
        // Find index of user we're removing.
        var index = -1;
        for (var i = 0; i < joinTimes.length(); i++)
        {
            if (joinTimes[i].id == user.id)
            {
                index = i;
                
                // If this user was a driver, remove the outing's car. <assumes single driver>
                if (user.isDriver)
                {
                    hasDriver = false;
                    availableCarSeats = 0;
                }
                
                break;
            }
        }
        
        joinTimes.splice(i, 1);
        users.splice(i, 1);
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
    
    
    // Check to see if we got this passed
    if (details) {
        this.setId( details.id );
        this.setTransport( details.setTransport );
        this.setName( details.destination.Name + " " + details.departureTime );
        this.setDepartureTime( details.departureTime );
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