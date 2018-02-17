/**
 * @file Erstellt die NewContent Seite und ermöglicht die Navigation
 * @author Sören Etler <soeren.etler@gmail.com>
 */


jQuery(function(){
	$ = jQuery;
	jQuery.ajax('xml/index.php?base=grid&type=newcontent').done(function (data) {
		jQuery('#site').append(data);

		initButtonLink()
		$($(".slidecard")[0]).addClass('active');
		initDots();
	});

	changePage = newContentChangePage;

});

/**
 * Hinzufügen des Klick Events zu den Buttons, welches die Funktion openQuiz aufruft.
 * @function initButtonLink
 * @author Sören Etler <soeren.etler@gmail.com>
 */
function initButtonLink(){
		jQuery('button').on('click tap', function(){
			buttonID = $(this).attr('id');
			openQuiz(buttonID);
		});
};

/**
 * Initialisierung der Navigationspunkte für jede Slidecard
 * @function initDots
 * @author Sören Etler <soeren.etler@gmail.com>
 */
function initDots(){
	$('#dots').emty;

	$('.slidecard').each(function(i,e){
	$('#dots').append('<li' +
		(
		(i==0) ?
		' class="current"'
		:''
		) + '><a href="#"></a></li>');
	});
};

/**
 * Funktion die beim Wechseln der Seite ausgeführt wird.
 * @function newContentChangePage
 * @param left is navigation leftwards
 * @author Sören Etler <soeren.etler@gmail.com>
 */
function newContentChangePage(left){
	var current = $('.slidecard.active');
	var target = (left)?
		current.prev():current.next();

		if(target.length==0) return false;

		current.toggleClass('active');
		target.toggleClass('active');

		var currentDot = $('#dots .current');
		var targetDot = (left)?
			currentDot.prev():currentDot.next();

		currentDot.toggleClass('current');
		targetDot.toggleClass('current');
	}

/**
 * die Methode openQuiz holt sich den Namen des jeweiligen JSON und hängt diesen an die URL der Spiele HTML Seite
 * @function openQuiz
 * @param idOfButtonClicked is navigation leftwards
 * @author Julian Bürkle
 */
	function openQuiz(idOfButtonClicked) {
		 if(idOfButtonClicked== "quizWertkettenmodell" || idOfButtonClicked== "quizSt-Galler-Management-Modell" || idOfButtonClicked == "quizBusinessCanvas" || idOfButtonClicked == "quizOekonomischesPrinzip" || idOfButtonClicked == "quizStakeholderShareholder" || idOfButtonClicked == "quizBWL-Quiz" ) {
		var jsonFileName = $('#'+idOfButtonClicked).attr('jsonFileName')
		window.location = "miniGames.html?jsonFileName=" + jsonFileName;
}
}
