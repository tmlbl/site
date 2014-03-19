/* Use Express and Jade, 'app' represents the Express server */
var express = require('express'),
	jade = require('jade'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
	app = express();

require('newrelic');

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
  app.use(express.cookieParser('S3CRE7'));
  app.use(express.session());
  app.use(app.router);
});

/* Import controllers */
var PostControl = require('./controllers/post.js'),
  CommentControl = require('./controllers/comment.js');

/* Authentication middleware function */
function checkAuth (req, res, next) {
  if (req.session.user_id !== 'foobar') {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

/* Define routes */
/* Simple navigation routes */
app.get('/', function (req, res) {
  res.redirect('/blog');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/search', function (req, res) {
  PostControl.Post.find({ }, function (err, posts) {
    posts = _.sortBy(posts, function (post) { 
      return post.postdate; 
    }, Date);
    posts = posts.reverse();
    res.render('search', { posts: posts });
  });
});

app.get('/portfolio', function (req, res) {
  res.render('portfolio');
});

/* For /blog render the 3 most recent posts */
app.get('/blog', function (req, res) {
  PostControl.Post.find({ }, function (err, posts) {
    posts = _.sortBy(posts, function (post) { 
      return post.postdate; 
    }, Date);
    posts = posts.reverse();
    res.render('blog', { posts: posts.slice(0, 3), pagenum: 1 });
  });
});

/* For /blog/[pagenum] render 3 more posts */
app.get('/blog/:pg', function (req, res) {
  PostControl.Post.find({ }, function (err, posts) {
    posts = _.sortBy(posts, function (post) { 
      return post.postdate; 
    }, Date);
    posts = posts.reverse();
    var pg = req.params.pg*3-3;
    res.render('blog', { posts: posts.slice(pg, pg + 3), pagenum: req.params.pg });
  });
});

app.get('/admin', checkAuth, function (req, res) {
  PostControl.Post.find({ }, function (err, posts) {
    posts = _.sortBy(posts, function (post) { 
      return post.postdate; 
    }, Date);
    posts = posts.reverse();
    res.render('admin/main', { posts: posts });
  });
});

app.get('/login', function (req, res) {
  res.render('admin/login');
});

app.post('/login', function (req, res) {
  if (req.body.usr === 'tmlbl' && req.body.pass === 'correct horse battery staple') {
    req.session.user_id = 'foobar';
    res.redirect('/admin');
  } else {
    res.redirect('/');
  }
});

app.get('/posts/create', checkAuth, function (req, res) {
  res.render('admin/editPost');
});

app.get('/posts/edit/:url', checkAuth, function (req, res) {
  PostControl.Post.findOne({ 'url': req.params.url }, function (err, post) {
    res.render('admin/editPost', { post: post });
  });
});

/* Post CRUD routes */
app.post('/posts/create', PostControl.create);
app.get('/posts/:url', PostControl.getOne);
app.post('/posts/:url', PostControl.update);
app.post('/posts/:url/delete', PostControl.delete);
app.get('/posts', PostControl.getAll);

/* Comment CRUD routes */
app.post('/posts/:url/comments', CommentControl.create);

/* Server will start on 5000 locally, or on environment port on Heroku */
var port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log('Listening on ' + port);
});