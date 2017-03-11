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
	
	console.log(titleText);
	
})