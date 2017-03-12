/**
 * 
 */

$ = jQuery;


$(function(){
	var titleText = {};
	
	titleText.$self = $('#title');
	Object.assign(titleText, titleText.$self.position());
	titleText.width = titleText.$self.outerWidth();
	titleText.height = titleText.$self.outerHeight();
	
	if (titleText.left < $('#start_bg_ltr').outerWidth() * 0.75){
		titleText.$self.css('left', $('#start_bg_ltr').outerWidth() * 0.66 + titleText.width * 0.5 + 10);
	}
	
	console.log(titleText);
	
})