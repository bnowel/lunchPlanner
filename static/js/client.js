//http://learn.knockoutjs.com/#/?tutorial=collections
function PageViewModel() {
    var self = this;
    
    self.businesses = ko.observableArray([
        {
            name: "Jaffa", 
            display_phone: "80566666", 
            rating_img_url: "http://s3-media2.ak.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png"
        },
        {
            name: "Burger King", 
            display_phone: "22222", 
            rating_img_url: "http://s3-media2.ak.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png"
        }
    ]);
}

$(function() {
    // Knockout stuff
    ko.applyBindings(new PageViewModel());    
    
    
    // Page stuff
    $('#search').on('click', function() {
        console.log('searching...');
       $.get('search', {term: $('#terms').val()}, function(data) {
           PageViewModel.businesses = data.businesses;
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