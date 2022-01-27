var show = function (elem) {
  elem.style.display = 'block';
};

document.addEventListener("DOMContentLoaded", function () {

  var menu_dch = document.getElementById("menu_dch");
  toggle(menu_dch);

  var menu = document.getElementById("menu");
  menu.addEventListener('click', function (event) {

    // Make sure clicked element is our toggle
    if (!event.target.classList.contains('toggle')) return;

    // Prevent default link behavior
    event.preventDefault();

    // Get the content
    var content = document.querySelector(event.target.hash);
    var menu_izq = document.getElementById("menu_izq");
    var menu_dch = document.getElementById("menu_dch");
    if (!content) return;

    // Toggle the content
    toggle(menu_izq);
    toggle(menu_dch);

  }, false);
});


var hide = function (elem) {
  elem.style.display = 'none';
};

var toggle = function (elem) {

  // If the element is visible, hide it
  if (window.getComputedStyle(elem).display === 'block') {
    hide(elem);
    return;
  }
  // Otherwise, show it
  show(elem);
};

