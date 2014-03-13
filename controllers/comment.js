var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId
  Post = require('./post.js').Post;

exports.create = function (req, res) {
  console.log(req.params.url);
  console.log(req.body);
  Post.find({ url: req.params.url }, function (err, posts) {
    posts[0].comments.push({ author: req.body.author, body: req.body.body });
    posts[0].save();
    res.render('onepost', { post: posts[0] });
  });
};