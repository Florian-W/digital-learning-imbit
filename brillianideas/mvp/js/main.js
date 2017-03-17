//TODO: Documentation
/**
 * Created by nick.london on 14.02.2017.
 */
// Global Variables
var $display;
var $recognition;
var $currentPosition = window.location.length > 1 ?
    window.location.hash.substr(1).split('.') : [];

var $setup = true;

// Document Ready Function
$(document).ready(function (event) {
    // Initialize Global Variables
    $display = {
        yoffset: ( ((
            !(
                $('#animation_yaxis_top').height() > $('#animation_yaxis_bottom').height()
            ) ? $('#animation_yaxis_bottom').height() : $('#animation_yaxis_top').height()
        )) * 2),
        xoffset: 2 * (
            (
                $('#animation_xaxis_left').width() > $('#animation_xaxis_right').width()
            ) ?
                $('#animation_xaxis_left').width() :
                $('#animation_xaxis_right').width()
        ),
        width: $(window).width() - 2 * this.xoffset,
        height: $(window).height() - 2 * this.yoffset
    };
    // [WORKAROUND] does not work in object creation
    $display.width = $(window).width() - 2 * $display.xoffset;
    $display.height = $(window).height() - 2 * $display.yoffset;

    //TRIGGER
    $('body').click(function (e) {
        var target = $(e.target);
        console.log(e.target);
        if (target.is(".flipcard .face.front")) {
            target.parent().children('.back').css('display', 'block');
            	//toggleClass(foo) adds foo as class attribute
            target.parent().toggleClass('flipped');
            	//toggle() shows/ hides element depending on current state
            $('#backlayer').toggle();
            if(location.hash.indexOf(target.data('target')) != -1){
                window.location = '#' + window.location.hash.substr(1).split('.').slice(0, -1).join('.');
            } else {
                window.location = window.location.hash.length > 1 ?
                    '#' + window.location.hash.substr(1).split('.').concat(target.data('target')).join('.') :
                    '#' + target.data('target');
            }
        } else if (target.is('.list > .learning, .list > .learning *')) {
            var ltarget = target;
            while (!ltarget.is('.list > .learning'))
                ltarget = ltarget.parent();
            var data = ltarget.data('target');
            ltarget.parent().toggle();
            ltarget.parent().siblings('.category').toggle();
            ltarget.parent().siblings('[data-bind=' + data + ']').toggle();
            if(location.hash.indexOf(target.data('target')) != -1){
                window.location = '#' + window.location.hash.substr(1).split('.').slice(0, -1).join('.');
            } else {
                window.location = '#' + window.location.hash.substr(1).split('.').concat(ltarget.data('target')).join('.');
            }
		} else if (target.is('button')) {
            buttonOpenQuiz();			
        } else if (target.is('.face.back')) {
            // Do Nothing
        } else if (target.is('#backlayer')) {
            $('.flipped').find('.selectionbody > .learning').hide();
            $('.flipped').find('.list, .category').show();
            $('.flipped').removeClass('flipped');
            window.location = '#';
            target.fadeOut();
        } else if (target.is('.learningList .learning')){
        	$('.learningWrapper > .learningContent').addClass('hidden');
        	$('#' + target.data('target')).toggleClass('hidden');
        	console.log(target.text());
        }
    });

    // Start Animation
    var file = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
    if (file.indexOf('#') != -1){
        file = file.substr(0, file.indexOf('#'));
    }
    file = file.substr(0, file.lastIndexOf('.'));
    makeGrid(file);
});
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
    if (path.length > 0){
        var event = jQuery.Event('click');
        var root = $('body');
        for (var i = 0; path.length > i; i++){
            event.target = root.find('[data-target='+path[i]+']')[0];
            root = root.find('[data-bind=' + path[i] + ']').parent();
            $('body').trigger(event);
        }
    }
};

/**
 * 
 */
var buttonOpenQuiz =function buttonOpenQuiz() {
		event = event || window.event;
		event.target = event.target || event.srcElement;

		var element = event.target;
		var idOfButtonClicked;

		if (element.nodeName === "BUTTON" && /buttonToQuiz/.test(element.className)) {
			// The user clicked on a <button> or clicked on an element inside a <button>
			idOfButtonClicked = element.id;
		}

		// element = element.parentNode;
		// console.log(element)
		openQuiz(idOfButtonClicked);
	}

	// die Methode openQuiz holt sich den Namen des jeweiligen JSON und hängt diesen an die URL der Spiele HTML Seite
	// in der index.html wird dann die controller.js geladen und der Parameter ausgelesen
	function openQuiz(idOfButtonClicked) {

		 if(idOfButtonClicked== "quizWertkettenmodell" || idOfButtonClicked== "quizSt-Galler-Management-Modell" || idOfButtonClicked == "quizBusinessCanvas" || idOfButtonClicked == "quizOekonomischesPrinzip" || idOfButtonClicked == "quizStakeholderShareholder" || idOfButtonClicked == "quizSurveyMonkey" ) {
			var jsonFileName = $('#'+idOfButtonClicked).attr('jsonFileName')
			console.log("jsonFileName: " + jsonFileName);
			window.location = "miniGames.html?jsonFileName=" + jsonFileName;
		}



	

};