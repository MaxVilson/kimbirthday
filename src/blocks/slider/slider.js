var slides = document.querySelectorAll('.slider__slides .slider__img');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,80000);
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