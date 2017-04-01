let link = document.querySelector('.btn-popup-show');
let popup = document.querySelector('.popup');
link.addEventListener('click', function(event) {
	event.preventDefault();
  popup.classList.add("popup__show");
});
