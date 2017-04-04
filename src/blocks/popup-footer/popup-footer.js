let linkF = document.querySelector('.btn-popup-footer-show');
let popupF = document.querySelector('.popup-footer');
let closeF = document.querySelector('.btn-popup-closeF')

linkF.addEventListener('click', function(event) {
	event.preventDefault();
  popupF.classList.add("popup-footer__show");
});

closeF.addEventListener("click", function(event) {
  event.preventDefault();
  popupF.classList.remove("popup-footer__show");
});

addEventListener("keydown", function(event) {
  if (event.keyCode == 27)
    popupF.classList.remove("popup-footer__show");
});
