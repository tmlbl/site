var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

exports.Post = Post = require('../models/post.js')(Schema, mongoose);

exports.create = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var post = new Post(req.body);
  post.save(function(err, post) {
    if (err) {
      res.send({ 'error': err });
    } else {
      res.send(post);
    }
  });
};

exports.update = function (req, res) {
  Post.findOne({ url: req.body.url }, function (err, post) {
    if (err) {
      res.send('Ya dun goofed: ' + err)
    } else {
      post.update(req.body, function(err, post) {
        if (err) {
          res.send({ 'error': err });
        } else {
          res.send('Post updated!');
        }
      });
    }
  });
};

exports.delete = function (req, res) {
  Post.findOne({ url: req.body.url }, function (err, post) {
    if (err) {
      res.send('Ya dun goofed: ' + err)
    } else {
      post.remove(function(err, post) {
        if (err) {
          res.send({ 'error': err });
        } else {
          res.send('baleeted');
        }
      });
    }
  });
};

exports.getAll = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  Post.find({ }, function (err, posts) {
    res.send(posts);
  });
};

exports.getOne = function (req, res) {
  Post.findOne({ 'url': req.params.url }, function (err, post) {
    res.render('onepost', { post: post });
  });
};