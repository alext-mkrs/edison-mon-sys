var express = require('express');
 
var server = express();
server.use(express.static(__dirname + '/html'));
 
var port = 10080;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});
