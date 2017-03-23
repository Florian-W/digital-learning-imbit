//TODO: Documentation
/**
 * Created by nick.london on 14.02.2017.
 */
// Global Variables
$ = jQuery;

var $display;

// Document Ready Function
var digitalLearning = function (file) {
    // Initialize Global Variables
    $display = {
        yoffset: ( ((
            !(
                $('#animation_yaxis_top').height() > $('#animation_yaxis_bottom').height()
            ) ? $('#animation_yaxis_bottom').height() : $('#animation_yaxis_top').height()
        )) * 2 + dotsspace +10),
        xoffset: 2 * (
            (
                $('#animation_xaxis_left').width() > $('#animation_xaxis_right').width()
            ) ?
                $('#animation_xaxis_left').width() :
                $('#animation_xaxis_right').width()
        ),
        width: $(window).width() - this.xoffset,
        height: $(window).height() - this.yoffset
    };
    // [WORKAROUND] does not work in object creation
    $display.width = $(window).width() - $display.xoffset;
    $display.height = $(window).height() - $display.yoffset;


    makeGrid(file);
};

var siteClick = function (e) {
	var target = $(e.target);
	if (target.is(".flipcard .face.front")) {
		target.parent().toggleClass('flipped').children('.back').css('display', 'block');
		$('#backlayer').toggle();
		$('.flipcard:not(.flipped), .axistext').fadeOut();
	} else if (target.is('.list > .learning, .list > .learning *')) {
		var ltarget = target;
		while (!ltarget.is('.list > .learning'))
			ltarget = ltarget.parent();
		var data = ltarget.data('target');
		ltarget.parent().toggle()
			.siblings('.category').toggle()
			.siblings('[data-bind=' + data + ']').toggle();
	} else if (target.is('.face.back')) {
		// Do Nothing
	} else if (target.is('#backlayer')) {
		$('.flipped').find('.selectionbody > .learning').hide();
		$('.flipped').find('.list, .category').show();
		$('.flipped').removeClass('flipped');
		target.fadeOut();
		$('.flipcard:not(.flipped), .axistext').fadeIn();
	} else if (target.is('#grid')){ // skips startup animation if grid is clicked
		// two times finish to stop both animation queues
		$('#site').find('*').finish().finish();
	} else if (target.is('.menuSubject')){
		$('.contentWrapper').hide().filter('[data-bind="' + target.data('target') + '"]').show();
		$('.menuSubject').removeClass('active');
		target.addClass('active');
	}
};

var initPage = function(){
	
}

$(document).ready(initPage)
