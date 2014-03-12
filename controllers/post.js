var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

exports.Post = Post = require('../models/post.js')(Schema, mongoose);

exports.create = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var post = new Post(req.body);
  post.save(function(err, post) {
    if (err) {
      res.send({'error': err});
    } else {
      res.send(post);
    }
  });
};

exports.getAll = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  Post.find({ }, function (err, users) {
    res.send(users);
  });
};