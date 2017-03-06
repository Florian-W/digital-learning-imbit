var $floaty = $('.floaty');

$floaty.on('mouseover click touchstart tap', function(e) {
  $floaty.addClass('is-active');
  e.stopPropagation();
});

$floaty.on('mouseout', function() {
  $floaty.removeClass('is-active');
});

$('.container').on('click touchstart tap', function() {
  $floaty.removeClass('is-active');
});