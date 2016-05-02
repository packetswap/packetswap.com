// Write forEach function because JavaScript still
// does not support something great for this.
var forEach = function(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

// Make more button expand the sections
var expands = document.querySelectorAll('section.expand');
forEach(expands, function(index, section) {
  section.classList.add('closed');
  section.addEventListener('click', function() {
    section.classList.remove('closed');
  });
});

// Facebook like button callback
function facebookCallback() {
  FB.Event.subscribe('edge.create', function() {
    goTo('twitter');
  });
}

var facebookLoaded = false;
document.body.addEventListener('DOMSubtreeModified', function () {
  if (typeof FB !== 'undefined' && !facebookLoaded) {
  	facebookLoaded = true;
  	facebookCallback();
  }
}, false);

// Go to next page
var expands = document.querySelectorAll('[data-next]');
forEach(expands, function(index, expand) {
  expand.addEventListener('click', function(element) {
    var next = element.target.getAttribute('data-next');
    goTo(next);
  });
});

function goTo(step) {
  document.querySelector('html').classList.add('hide-main');
  var ul = document.querySelector('ul.fullscreen');
  ul.style.display = 'block';

  // Remove classes
  ul.querySelector('li.facebook').classList.remove('active');
  ul.querySelector('li.twitter').classList.remove('active');
  ul.querySelector('li.email').classList.remove('active');

  if (step === 'facebook') {
    ul.querySelector('li.' + step).classList.add('active');
  }
  else if (step === 'twitter') {
    ul.querySelector('li.facebook').classList.add('done');
    ul.querySelector('li.facebook').classList.remove('active');
    ul.querySelector('li.twitter').classList.add('active');
  }
  else if (step === 'email') {
    ul.querySelector('li.twitter').classList.add('done');
    ul.querySelector('li.twitter').classList.remove('active');
    ul.querySelector('li.email').classList.add('active');
  }
  else if (step === 'done') {
    ul.querySelector('li.facebook').classList.remove('done');
    ul.querySelector('li.twitter').classList.remove('done');
    ul.querySelector('li.email').classList.remove('done');
    ul.style.display = 'none';
    document.querySelector('html').classList.remove('hide-main');
  }
}

twttr.ready(
  function (twttr) {
    twttr.events.bind(
      'follow',
      function (event) {
        window.setTimeout(function() {
          goTo('email');
        }, 1000);
      }
    );
  }
);

