;(function(window, document) {
  'use strict';
  var file = 'img/sprite-svg.svg', // путь к файлу спрайта на сервере
      revision = 2;            // версия спрайта
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
var slides = document.querySelectorAll('.slider__slides .slider__img');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,8000);
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
var slidesL = document.querySelectorAll('.slider-l__slides .slider-l__img');
var currentSlideL = 0;
var slideIntervalL = setInterval(nextSlideL,8000);
var nextL = document.getElementById('slide-next_l');
var previousL = document.getElementById('slide-previous_l');

function nextSlideL() {
  goToSlideL(currentSlideL+1);
}

function previousSlideL() {
  goToSlideL(currentSlideL-1);
}

function goToSlideL(n) {
  slidesL[currentSlideL].className = 'slider-l__img';
  currentSlideL = (n+slidesL.length)%slidesL.length;
  slidesL[currentSlideL].className = 'slider-l__img_show';
}

nextL.onclick = function() {
  nextSlideL();
};
previousL.onclick = function() {
  previousSlideL();
};
$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth = 300;
  var slides = $('.slide');
  var numberOfSlides = slides.length;
  // Убираем прокрутку
  $('#slidesContainer').css('overflow', 'hidden');
  // Вставляем все .slides в блок #slideInner
  slides
  .wrapAll('<div id="slideInner"></div>')
  // Float left to display horizontally, readjust .slides width
  .css({
    'float' : 'left',
    'width' : slideWidth
  });
  // Устанавливаем ширину #slideInner, равную ширине всех слайдов
  $('#slideInner').css('width', slideWidth * numberOfSlides);
  // Прячем правую стрелку при загрузке скрипта
  manageControls(currentPosition);
  // Отлавливаем клик на класс .controls
  $('.control')
    .bind('click', function(){
    // Определение новой позиции
      currentPosition = ($(this).attr('id')=='rightControl')
    ? currentPosition+1 : currentPosition-1;
      // Прячет / показывает элементы контроля
      manageControls(currentPosition);
      // Move slideInner using margin-left
      $('#slideInner').animate({
        'marginLeft' : slideWidth*(-currentPosition)
      });
    });
  // manageControls: показывает или скрывает стрелки в зависимости от значения currentPosition
  function manageControls(position){
    // Спрятать левую стрелку, если это левый слайд
    if(position==0){ $('#leftControl').hide() }
    else{ $('#leftControl').show() }
    // Спрятать правую стрелку, если это последний слайд
    if(position==numberOfSlides-1){ $('#rightControl').hide() }
    else{ $('#rightControl').show() }
    }
  });
var largeImg = document.getElementById('largeImg');

    var thumbs = document.getElementById('thumbs');

    thumbs.onclick = function(e) {
      var target = e.target;

      while (target != this) {

        if (target.nodeName == 'A') {
          showThumbnail(target.href, target.title);
          return false;
        }

        target = target.parentNode;
      }

    }

    function showThumbnail(href, title) {
      largeImg.src = href;
      largeImg.alt = title;
    }


    /* предзагрузка */
    var imgs = thumbs.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
      var url = imgs[i].parentNode.href;
      var img = document.createElement('img');
      img.src = url;
    }