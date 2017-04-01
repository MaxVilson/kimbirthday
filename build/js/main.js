;(function(window, document) {
  'use strict';
  var file = 'img/sprite-svg.svg', // путь к файлу спрайта на сервере
      revision = 3;            // версия спрайта
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
  var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
    request,
    data,
    insertIT = function() {
      document.body.insertAdjacentHTML('afterbegin', data);
    },
    insert = function() {
      if (document.body) insertIT();
      else document.addEventListener('DOMContentLoaded', insertIT);
    };
  if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    data = localStorage.getItem('inlineSVGdata');
    if (data) {
      insert();
      return true;
    }
  }
  try {
    request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();
        if (isLocalStorage) {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    }
    request.send();
  } catch (e) {}
}(window, document));
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
var slides = document.querySelectorAll('.slider__slides .slider__img');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,4000);
var next = document.getElementById('slide-next');
var previous = document.getElementById('slide-previous');

function nextSlide() {
  goToSlide(currentSlide+1);
}

function previousSlide() {
  goToSlide(currentSlide-1);
}

function goToSlide(n) {
  slides[currentSlide].className = 'slider__img';
  currentSlide = (n+slides.length)%slides.length;
  slides[currentSlide].className = 'slider__img_show';
}

next.onclick = function() {
  nextSlide();
};
previous.onclick = function() {
  previousSlide();
};