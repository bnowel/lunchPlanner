function User(details) {
    // Make sure we instantiate this object
    if (!(this instanceof User)) {
        return new User(details);
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
    
    var name;
    this.getName = function () {
        return name;    
    };
    
    this.setName = function (val) {
        if (val === "")
            throw "Name cannot be blank";
        
        name = val;    
    };
    // End Name
    
    var isDriver;
    this.getIsDriver = function() {
        return isDriver;  
    };
    
    this.setIsDriver = function(val) {
        isDriver = val;
    };
    // End driver
    
    var availableCarSeats = 0;
    this.getAvailableCarSeats = function() {
        return availableCarSeats;
    };
    
    this.setAvailableCarSeats = function(seats)
    {
        availableCarSeats = seats;
    };
    
    // Make it flat
    this.flattify = function() {
        return { id: id, name: name, isDriver: isDriver, availableCarSeats: availableCarSeats };
    };
    
    // Check to see if we got this passed
    if (details) {
        this.setId( details.id );
        this.setName( details.name );
        this.setIsDriver( details.isDriver );
        this.setAvailableCarSeats( details.availableCarSeats );
    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = User;
    }
}