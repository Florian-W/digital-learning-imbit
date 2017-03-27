//TODO: Documentation
/**
 * Created by nick.london on 14.02.2017.
 */
// Global Variables
$ = jQuery;

var $display;
var $currentPosition = window.location.length > 1 ?
    window.location.hash.substr(1).split('.') : [];

var $setup = true;

// Document Ready Function
var digitalLearning = function (file) {
    // Initialize Global Variables
    $display = {
        yoffset: ( ((
            !(
                $('#animation_yaxis_top').height() > $('#animation_yaxis_bottom').height()
            ) ? $('#animation_yaxis_bottom').height() : $('#animation_yaxis_top').height()
        )) * 2 + dotsspace + 30),
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

    //TRIGGER
    $('#site').click(function (e) {
        var target = $(e.target);
        if (target.is(".flipcard .face.front")) {
            target.parent().children('.back').css('display', 'block');
            	//toggleClass(foo) adds foo as class attribute
            target.parent().toggleClass('flipped');
            	//toggle() shows/ hides element depending on current state
            $('#backlayer').toggle();
            $('.flipcard:not(.flipped), .axistext').fadeOut();
        } else if (target.is('.list > .learning, .list > .learning *')) {
            var ltarget = target;
            while (!ltarget.is('.list > .learning'))
                ltarget = ltarget.parent();
            var data = ltarget.data('target');
            ltarget.parent().toggle();
            ltarget.parent().siblings('.category').toggle();
            ltarget.parent().siblings('[data-bind=' + data + ']').toggle();
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
        	$('#site').find('*').velocity("finish").velocity("finish");
        } else if (target.is('.menuSubject')){
        	$('.contentWrapper').hide().filter('[data-bind="' + target.data('target') + '"]').show();
        	$('.menuSubject').removeClass('active');
        	target.addClass('active');
        }
    });

    makeGrid(file);
};
/**
 *
 * @returns {$}
 */
$.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (
            ($(window).height() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px"
    );
    this.css("left", Math.max(0, (
            ($(window).width() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px"
    );
    return this;
};

/**
 * should be used for back and forth browser functions
 * should use URL to open/ close next/last (DOM) element
 */
var walkToPath = function walkToPath(){
    $newPosition = window.location.length > 1 ?
        window.location.hash.substr(1).split('.') : [];
    if ($currentPosition.length > $newPosition.length){
        //go in
    } else {
        // go out
    	// should enable back and forth browser functions
    }
};

/**
 * opens (DOM) element or element chain according to URL
 */
var openPath = function openPath(){
    var path = window.location.hash.substr(1).split('.');
    if (path.length > 0 && path[0] != ""){
        var event = jQuery.Event('click');
        var root = $('body');
        for (var i = 0; path.length > i; i++){
            event.target = root.find('[data-target='+path[i]+']')[0];
            root = root.find('[data-bind=' + path[i] + ']').parent();
            $('body').trigger(event);
        }
    }
};