var express = require('express'),
	jade = require('jade'),
	app = express();

app.configure(function () {
        app.set('view engine', 'jade'); // Views are in Jade
        app.set('views', __dirname + '/app/views'); // View folder
        app.use(express.bodyParser()); // Helps get http responses
        app.use('/public', express.static(__dirname + '/public')); // Static dir is ./public
});

app.get('/', function (req, res) {
	res.render('index');
});

/* Start the server locally or in Heroku */

var port = process.env.PORT || 5000;

app.listen(port, function () {
        console.log('Listening on ' + port);
});