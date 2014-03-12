module.exports = function (Schema, mongoose) {
  var CommentSchema = new Schema({
    author   : { type: String },
    postdate : { type: Date, default: Date.now() },
    body     : { type: String }
  });
  var PostSchema = new Schema({
    title    : { type: String, required: true },
    url      : { type: String, required: true, unique: true },
    postdate : { type: Date, default: Date.now() },
    body     : { type: String },
    comments : [ CommentSchema ]
  });
  return mongoose.model('Post', PostSchema);
};