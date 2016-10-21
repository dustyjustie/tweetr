/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json
$(function() {

  $('button').on("click" ,function(event){
    $('section.new-tweet').slideToggle();
    $('textarea').trigger("focus");
    return false;
  });

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

 function renderTweets(tweets) {
    tweets.forEach(function(items) {
      var loop = createTweetElement(items);
      $('#tweets-container').prepend(loop);
    });
  return true;
  }


  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet');

    var $avatar = $('<img src="' + tweet.user.avatars.small + '" width="50px" height="50px" />');
    var $name = $('<h4>' + tweet.user.name + '</h4>');
    var $handle = $('<h5>' + tweet.user.handle + '</h5></header>');
    var $content = $('<p>' + tweet.content.text + '</p>')
    var tweettime = Math.floor(((Date.now() - tweet.created_at) / 86400000));
    var $footer = $('<footer>' + tweettime + " days ago..." +'<span class="glyphicon glyphicon-flag"></span><span class="glyphicon glyphicon-retweet"></span><span class="glyphicon glyphicon-heart"></span></footer>')

    var $header = $('<header></header>');

    $header.append($avatar);
    $header.append($name);
    $header.append($handle);

    $tweet.append($header);
    $tweet.append($content);
    $tweet.append($footer);


    return $tweet;
  }


  $('form').on('submit', function (event) {
  event.preventDefault();
  $.ajax ({
    url: "/tweets",
    method: 'post',
    data: $(this).serialize(),
    success: function (data) {
      //load all tweets again
      renderTweetsFromServer();
    },
    error: function (data) {
      alert("No Tweet Detected!")
    }
   });
  })

  function renderTweetsFromServer() {
    $.ajax ({
      url: "/tweets",
      method: "get",
      success: function(data) {
        console.log(data);
        renderTweets(data);
      }
    })
  }

  renderTweetsFromServer();

});

