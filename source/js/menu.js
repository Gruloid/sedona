let openMenu = document.querySelector('.main-nav');
let openMenuButton = document.querySelector('.main-nav__open');
let closeMenuButton = document.querySelector('.main-nav__close');
console.log(openMenu);
openMenu.classList.remove('main-nav--nojs');
console.log(openMenu);
openMenuButton.addEventListener('click', function(evt){
  openMenu.classList.remove('main-nav--closed');
});
closeMenuButton.addEventListener('click', function(evt){
  openMenu.classList.add('main-nav--closed');
});


