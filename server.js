var express = require('express'), 
    app = express.createServer();
    

app.listen(process.env.PORT || 3000);
app.use(express.bodyParser());

app.get('/', function(req, res){
    res.send("hai");
});