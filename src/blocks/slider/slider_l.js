var slidesL = document.querySelectorAll('.slider-l__slides .slider-l__img');
var currentSlideL = 0;
var slideIntervalL = setInterval(nextSlideL,80000);
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