/**
 * @file File Manages the layout of the Startpage
 * @author Nick London <nick.london94@gmail.com>
 */
/**
 * @const $ jQuery selector
 */
$ = jQuery;

/**
 * Initializes the startpage. makes the title text not to be covered not covering by the images
 * @function initStartpage
 * @returns {undefined} Nothing
 * @author Nick London <nick.london94@gmail.com>
 */
function initStartpage(){
	/**
	 * local namespace to hold information about the title Text
	 * @namespace titleText
	 */
	/** @member {Object} titleText#$self jQuery-Collection containing the titleText */
	/** @var {Number} titleText.left horizontal position */
	/** @var {Number} titleText.top vertival position */
	/** @var {Number} titleText.width horizontal size */
	/** @var {Number} titleText.height vertical size */
	var titleText = {};
	titleText.$self = $('#title');
	Object.assign(titleText, titleText.$self.position());
	titleText.width = titleText.$self.outerWidth();
	titleText.height = titleText.$self.outerHeight();
	
	/**
	 * identify whether title text overlays the left image
	 * in case so, move right
	 */
	if (titleText.left < $('#start_bg_ltr').outerWidth() * 0.75){
		titleText.$self.css('left', $('#start_bg_ltr').outerWidth() * 0.66 + titleText.width * 0.5 + 10);
	}	
};
/**
 * 
 * @callback document~ready This function is triggerd on Document ready
 */
$(initStartpage);