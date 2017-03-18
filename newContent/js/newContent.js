jQuery(function(){
	$ = jQuery;
	jQuery.ajax('xml/index.php?base=grid&type=newcontent').done(function (data) {
		jQuery('#site').append(data);
		
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

