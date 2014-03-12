/* Listens to the post title input and
creates a lowercase dash-separated url
for the post */
$(document).ready(function () {
  if ($('#live-url')) {
    $('#post-title').keyup(function (e) {
      var title = $('#post-title').val();
      title = title.toLowerCase();
      title = title.split(' ');
      if (title.length < 6) {
        title = title.join('-');
        $('#live-url').val(title);
      }
    });
  }
});
