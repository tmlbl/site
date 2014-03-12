/* Use Express and Jade, 'app' represents the Express server */
var express = require('express'),
	jade = require('jade'),
  mongoose = require('mongoose'),
	app = express();

/* Set up the database and import models */
mongoose.connect('mongodb://localhost/blog', function (err, res) {
  if (err) {
    console.log('Error connecting to database: ' + err);
  } else {
    console.log('Connected to MongoDB');
  }
});

/* Global settings for express */
app.configure(function () {
	app.set('view engine', 'jade'); // Views are in Jade
	app.set('views', __dirname + '/views'); // View folder is ./app/views/
	app.use(express.bodyParser()); // Makes http bodies readable
	app.use('/public', express.static(__dirname + '/public')); // Static dir is ./public
});

/* Import controllers */
var PostControl = require('./controllers/post.js');

/* Define routes */
app.get('/', function (req, res) {
  PostControl.Post.find({ }, function (err, posts) {
    res.render('blog', { posts: posts });
  });
});

app.get('/admin', function (req, res) {
  res.render('admin/main');
});

app.get('/posts/create', function (req, res) {
  res.render('admin/editPost');
});

/* Post CRUD routes */
app.post('/posts/create', PostControl.create);
app.get('/posts', PostControl.getAll);

/* Server will start on 5000 locally, or on environment port on Heroku */
var port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log('Listening on ' + port);
});