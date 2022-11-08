let openMenu = document.querySelector('.main-nav');
let openMenuButton = document.querySelector('.main-nav__open');
let closeMenuButton = document.querySelector('.main-nav__close');

let func = function() {
openMenu.classList.remove('main-nav--nojs');
openMenuButton.addEventListener('click', function(evt){
  openMenu.classList.remove('main-nav--closed');
});
closeMenuButton.addEventListener('click', function(evt){
  openMenu.classList.add('main-nav--closed');
});
}
func();
