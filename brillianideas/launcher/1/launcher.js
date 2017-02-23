var $floaty = $('.floaty');

$floaty.on('mouseover click', function(e) {
  $floaty.addClass('is-active');
  e.stopPropagation();
});

$floaty.on('mouseout', function() {
  $floaty.removeClass('is-active');
  console.log("Test");
});

$('.container').on('click', function() {
  $floaty.removeClass('is-active');
});