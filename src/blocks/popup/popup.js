let link = document.querySelector('.btn-popup-show');
let popup = document.querySelector('.popup');
let login = document.getElementById('input-name');
link.addEventListener('click', function(event) {
	event.preventDefault();
  popup.classList.add("popup__show");
  login.focus();
});
