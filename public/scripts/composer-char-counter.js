
$(function() {
  const maxLength = 140;
  var $counter = $(".counter");
  var tweetbutton = $('input[type=submit]');

  $("textarea").on("input", function (input) {
    var Length = $(this).val().length;
    var counterlength = maxLength - Length;
    var cannotTweet = counterlength < 0
    $counter.text(counterlength);
    if (cannotTweet) {
      $counter.addClass("error")
    } else {
      $counter.removeClass("error")
    }
    tweetbutton.prop("disabled", cannotTweet);
  });
});