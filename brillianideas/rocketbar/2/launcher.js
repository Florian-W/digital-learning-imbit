$( document ).ready(function() {

var $launcher_left = $('.launcher.left');
var $launcher_right = $('.launcher.right');

$launcher_left.on('click mouseenter tap touchstart', function(){
	
	$(this).css('left', '-15px');
	//if ($(this).hasClass('is-active')){
	//	$(this).removeClass('is-active');
	//	$(this).css('left', '-200px');
	//	window.open("http://www.brillianIdeas.com","_self");
	//}
	$(this).addClass('is-active');
});


$launcher_left.on('mouseout', function(){
	$(this).css('left', '-200px');
	$(this).removeClass('is-active');
});


$launcher_right.on('click mouseenter tap touchstart', function(){
	$(this).css('right', '-15px');
	//if ($(this).hasClass('is-active')){
	//	$(this).removeClass('is-active');
	//	$(this).css('left', '-200px');
	//	window.open("http://www.brillianIdeas.com","_self");
	//}
	$(this).addClass('is-active');
});


$launcher_right.on('mouseout', function(){
	$(this).css('right', '-200px');
	$(this).removeClass('is-active');
});

$('.is-active').on('click', function(){
	console.log('test');
});
});