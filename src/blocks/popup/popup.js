let link = document.querySelector('.btn-popup-show');
let popup = document.querySelector('.popup');
let close = document.querySelector('.btn-popup-close')
link.addEventListener('click', function(event) {
	event.preventDefault();
  popup.classList.add("popup__show");
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("popup__show");
});

addEventListener("keydown", function(event) {
  if (event.keyCode == 27)
    popup.classList.remove("popup__show");
});
