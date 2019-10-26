

$(document).ready(function(){
    $('.photo-slider').slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear'
  });
});