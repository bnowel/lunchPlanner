//http://learn.knockoutjs.com/#/?tutorial=collections
function PageViewModel() {
    var self = this;
    
    self.businesses = ko.observableArray([]);
        
    self.outings = ko.observableArray([]);
}

$(function() {
    // Knockout stuff
    var pageViewModel = new PageViewModel();
    ko.applyBindings(pageViewModel);    
    
    
    // Page stuff
    $('#search').on('click', function() {
        console.log('searching...');
       $.get('search', {term: $('#terms').val()}, function(data) {
           console.log(data);
           pageViewModel.businesses(data);
          
       });
    });
    
    $('.searchResults').on('click', '.create-outing', function() {
        var $this = $(this);
        
        console.log($this.data('destination'));
        $('.modal').modal('show');
        $('#yourName').focus();
        $('#addOutingBtn').data("destination", $this.data('destination'));
        
    });
    
    $('#addOutingBtn').click(function() {
        console.log("DATA: " + $(this).data('destination'));
        socket.emit('createOuting', { destination: $(this).data('destination'), user: { name: $('#yourName').val(), availableCarSeats: $('#availableSeats').val() }, departureTime: $('#departureTime').val(), meetingPlace: $('#meetingPlace').val(), drivingTransport: $('#drivingTransport').val(), walkingTransport: $('#walkingTransport').val() });
        $('.modal').modal('hide');
    });
    
    //Search button submits on pressing the 'Enter' key
    $('#terms').keypress(function(e){
       if(e.which==13){
           $('#search').click();
       } 
    });
     
    // Socket Stuff
    var socket = io.connect('/');
    
    // Listen to event
    socket.on('joined', function(data) {
        console.log(data);
      // doSomethingWith(data)
    });
    
    socket.on('updateOutings', function(data) {
        console.log("BEFORE, YO: " + JSON.stringify(data));
        pageViewModel.outings(data);
        console.log(pageViewModel.outings());
    });
});