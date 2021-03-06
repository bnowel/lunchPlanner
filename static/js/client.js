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
        $('.create-outing-info').modal('show');
        $('#yourName').focus();
        $('#addOutingBtn').data("destination", $this.data('destination'));        
    });
    
    $('.outings').on('click', '.join-outing', function(ev) {
        var $this = $(this);
        ev.preventDefault();
        
        $('.modal.join-outing').modal('show');
        $('#joinOutingBtn').data("outing", $this.data('outing'));        
    });
    
    $('#addOutingBtn').click(function() {
        socket.emit('createOuting', { destination: $(this).data('destination'), user: { name: $('#yourName').val(), availableCarSeats: $('#availableSeats').val() }, departureTime: $('#departureTime').val(), meetingPlace: $('#meetingPlace').val(), drivingTransport: $('#drivingTransport').val(), walkingTransport: $('#walkingTransport').val() });
        $('.modal').modal('hide');
    });
    
    $('.searchResults').popover({ selector: '[rel=popover]', html: true, trigger: 'hover', placement: 'bottom' });
    
    $('#joinOutingBtn').click(function(ev) {
        ev.preventDefault();
        
        var name = $('#yourNameJoin').val();
        if (!name) {
            return;
        }
        socket.emit('joinOuting', { outing: $(this).data('outing'), user: { name: name, availableCarSeats: $('#availableSeatsJoin').val() } });
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