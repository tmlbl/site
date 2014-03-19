/* Implements a live search of post
titles via the /search route */
$(document).ready(function () {
  if ($('#search')) {
    $('#search').focus();
    $('#search').keyup(function () {
      var filter = $('#search').val();
      var regex = new RegExp(filter, 'i');
      $('.post-list').each(function () {
        if ($(this).text().search(regex) < 0) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });
  }
});