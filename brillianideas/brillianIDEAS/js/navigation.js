/**
 * 
 */

/* TODO Config auslagern -> JSON, INI, XML -> zu klÃ¤ren */

var dotsspace;

$(window).on('load', function(){
	jQuery(document).on("swiperight",function(){
		changePage(true);
	}).on("swipeleft",function(){
		changePage(false);
	}).on("keydown", function(e){
		switch (e.keyCode) {
        case 37:
        	changePage(true);
            break;
        case 39:
        	changePage(false);
            break;
		}
	});
	
	$('.dotstyle-fillup li a').click(function(e){
		e.preventDefault();
		var target = $(e.target);
		if (!target.is('current')){
			var current = jQuery('.current');
			
			if (!(target.parent().hasClass('home') ^ mystickybar.currentstate == "hide"))
				mystickybar.toggle();
			current.toggleClass('current');
			target.parent().toggleClass('current');
			
			jQuery.ajax({
				url: target.attr('href')
			}).done(function(data){
				jQuery('#content').empty().unbind().append(data);
			})
		}		
		return false;
	});
	
	dotsspace = $(window).height() - $('#dots').position().top - $('#dots').outerHeight();
	
	jQuery.ajax({
		url: jQuery('.home').find('a').attr('href')
	}).done(function(data){
		jQuery('#content').append(data);
	});
	
	
});

/**
 * 
 * @param left is navigation leftwards
 * @returns true if successfull
 */
function changePage(left){
	if (typeof left != "boolean"){
		return false;
	}
	
	var current = jQuery('.current');
	var target = left ? current.prev() : current.next();
	
	if (target.length == 0){
		return false;
	}
	
	if (!(target.hasClass('home') ^ mystickybar.currentstate == "hide"))
		mystickybar.toggle();
	current.toggleClass('current');
	target.toggleClass('current');
	
	jQuery.ajax({
		url: target.find('a').attr('href')
	}).done(function(data){
		jQuery('#content').empty().unbind().append(data);
	})
	
	return true;
}