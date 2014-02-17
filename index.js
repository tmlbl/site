/* Use Express and Jade, 'app' represents the Express server */
var express = require('express'),
	jade = require('jade'),
	app = express();

/* Global settings for express */
app.configure(function () {
	app.set('view engine', 'jade'); // Views are in Jade
	app.set('views', __dirname + '/app/views'); // View folder is ./app/views/
	app.use(express.bodyParser()); // Makes http bodies readable
	app.use('/public', express.static(__dirname + '/public')); // Static dir is ./public
});

/* Routes */
app.get('/', function (req, res) {
	res.render('index');
});

/* Server will start on 5000 locally, or on environment port on Heroku */
var port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log('Listening on ' + port);
});