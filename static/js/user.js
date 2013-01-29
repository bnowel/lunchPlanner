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
    
    // Make it flat
    this.flattify = function() {
        return { id: id, name: name };
    };
    
    // Check to see if we got this passed
    if (details) {
        this.setId( details.id );
        this.setName( details.name );
    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = User;
    }
}