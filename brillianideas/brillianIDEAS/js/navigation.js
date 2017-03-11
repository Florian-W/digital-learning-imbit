/**
 * 
 */

/* TODO Config auslagern -> JSON, INI, XML -> zu klären */

$(window).on('load', function(){
	jQuery(document).on("swiperight",function(){
		console.log('User swiped right')
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
	
	current.toggleClass('current');
	target.toggleClass('current');
	
	jQuery.ajax({
		url: target.find('a').attr('href')
	}).done(function(data){
		jQuery('#content').empty().unbind().append(data);
	})
	
	return true;
}