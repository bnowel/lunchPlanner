//http://learn.knockoutjs.com/#/?tutorial=collections
function PageViewModel() {
    var self = this;
    
    self.businesses = ko.observableArray([]);
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
        
        console.log($this.data('outing'));
        $('.modal').modal('show');
        $('#yourName').focus();
        socket.emit('createOuting', $this.data('outing'));
    });
    
    // Socket Stuff
    var socket = io.connect('/');
    
    // Listen to event
    socket.on('joined', function(data) {
        console.log(data);
      // doSomethingWith(data)
    });
});