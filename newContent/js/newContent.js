jQuery(function(){
	$ = jQuery;
	jQuery.ajax('xml/index.php?base=grid&type=newcontent').done(function (data) {
		jQuery('#site').append(data);
		
		console.log($('button').text());
		
		jQuery('button').on('click tap', function(){
			console.log("try");
			buttonOpenQuiz();
		});
		
		$($(".slidecard")[0]).addClass('active');
	
		$('#dots').emty;
		
		$('.slidecard').each(function(i,e){
			$('#dots').append('<li' + 
				(
					(i==0) ? 
					' class="current"'
					:''
				) + '><a href="#"></a></li>');
		});
	});
	
	changePage = function(left){
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
	
});

/**		
	* 		
	*/		
	var buttonOpenQuiz = function buttonOpenQuiz() {		
		event = event || window.event;		
		event.target = event.target || event.srcElement;		
		
		var element = event.target;		
		var idOfButtonClicked;		
		
		if (element.nodeName === "BUTTON" && /buttonToQuiz/.test(element.className)) {		
			// The user clicked on a <button> or clicked on an element inside a  button>		
		idOfButtonClicked = element.id;		
		}		
		
		console.log(idOfButtonClicked);	
		openQuiz(idOfButtonClicked);		
	}		
		
	// die Methode openQuiz holt sich den Namen des jeweiligen JSON und hängt diesen an die URL der Spiele HTML Seite		
	// in der index.html wird dann die controller.js geladen und der Parameter ausgelesen		
	function openQuiz(idOfButtonClicked) {
		console.log(idOfButtonClicked);
		 if(idOfButtonClicked== "quizWertkettenmodell" || idOfButtonClicked== "quizSt-Galler-Management-Modell" || idOfButtonClicked == "quizBusinessCanvas" || idOfButtonClicked == "quizOekonomischesPrinzip" || idOfButtonClicked == "quizStakeholderShareholder" || idOfButtonClicked == "quizSurveyMonkey" ) {		
		var jsonFileName = $('#'+idOfButtonClicked).attr('jsonFileName')		
		console.log("jsonFileName: " + jsonFileName);		
		window.location = "miniGames.html?jsonFileName=" + jsonFileName;		
 }
}

