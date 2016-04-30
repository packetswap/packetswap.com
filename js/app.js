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