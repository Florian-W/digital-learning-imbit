/**
 * TODO
 * @param expireDate
 * @returns
 */
function setCookiesOnChange(expireDate) {
	jQuery('#subtitleswitch').change(function() {
		/*this will contain a reference to the checkbox*/
		if (this.checked) {
			Cookies.set('subtitle','true', { expires: expireDate, path: '/' });
			jQuery('.rb_description').css('display','inline');
		} else {
			Cookies.set('subtitle','false', { expires: expireDate, path: '/' });
			jQuery('.rb_description').css('display','none');
		}
	});
	
	/* Punkte */
	jQuery('#points_left').change(function() {
		if (this.checked) {
			Cookies.set('points','left', { expires: expireDate, path: '/' });
			jQuery('#iconThreeDots').css('left','1%');
			jQuery('.rb_description').css('left','1%');
		}
	});
	
	jQuery('#points_middle').change(function() {
		if (this.checked) {
			Cookies.set('points','middle', { expires: expireDate, path: '/' });
			jQuery('#iconThreeDots').css('left','49%');
			jQuery('.rb_description').css('left','49%');
		}
	});
	
	jQuery('#points_right').change(function() {
		if (this.checked) {
			Cookies.set('points','right', { expires: expireDate, path: '/' });
			jQuery('#iconThreeDots').css('left','90%');
			jQuery('.rb_description').css('left','90%');
		}
	});
	
	/* Rundung */
	jQuery('input[type=range]').on('input',function() { jQuery(this).trigger('change'); });
	jQuery('#roundRange').change(function() {
		Cookies.set('round',jQuery(this).val());
		jQuery('.divID').css('border-radius',jQuery(this).val() + 'px');
	});
	
	/* Helligkeit */
	jQuery('input[type=range]').on('input',function() { jQuery(this).trigger('change'); }); 
	jQuery('#brightRange').change(function() {
		Cookies.set('bright',jQuery(this).val());
		jQuery('.divID').css('-webkit-filter','brightness(' + jQuery(this).val() + '%)');
	});
	
	/* Sound */
	jQuery('#soundswitch').change(function() {
		if (this.checked) {
			Cookies.set('sound','true', { expires: expireDate, path: '/' });
			jQuery('audio').each(function(){ this.play(); });
		} else {
			Cookies.set('sound','false', { expires: expireDate, path: '/' });
			jQuery('audio').each(function() { this.pause(); });
		}
	});
	
	/* Color */
	jQuery('#colorswitch').change(function() {
		if (this.checked) {
			Cookies.set('color','red', { expires: expireDate, path: '/' });
			jQuery('body').css('background-color','#991b33');
			jQuery('#tentakel').css('background-color','#991b33');
			jQuery('#imageOne').css('background-color','#991b33');
			jQuery('.content').css('background-color','#949494');
			jQuery('.divID').css('background-color','#949494');
			jQuery('#rcorners1').css('background-color','#949494');
		} else {
			Cookies.set('color','grey', { expires: expireDate, path: '/' });
			jQuery('body').css('background-color','#949494');
			jQuery('.divID').css('background-color','#991b33');
			jQuery('#rcorners1').css('background-color','#991b33');
			jQuery('#tentakel').css('background-color','#949494');
			jQuery('#imageOne').css('background-color','#949494');
			jQuery('.content').css('background-color','#991b33');
		}
	});	
}

jQuery('#content').waitForImages().done(function(){
	/* Show Cookies Click */
	var expireDate = 365;
	
	setCookiesOnChange(expireDate);

	/* Rundung */
	var rundung = Cookies.get('round');
	if(rundung != null) {
		jQuery('#roundRange').val(rundung);
		jQuery('#rangevalue').val(rundung);
		jQuery('.divID').css('border-radius',rundung + 'px');
	}
	
	/* Helligkeit */
	var hell = Cookies.get('bright');
	if(hell != null) {
		jQuery('#brightRange').val(hell);
		jQuery('#brightRange').val(hell);
		jQuery('.divID').css('-webkit-filter','brightness(' + jQuery(this).val() + '%)')
	}
	
	/* Punkte */
	var pointsSwitch = Cookies.get('points');
	switch(pointsSwitch) {
		case "left":
			jQuery('#iconThreeDots').css('left','1%');
			jQuery('.rb_description').css('left','1%');
			jQuery('#rb_toggle').css('left','1%');
			jQuery('#points_left').prop("checked",true);
			break;
		case "middle":
			jQuery('#iconThreeDots').css('left','45%');
			jQuery('.rb_description').css('left','45%');
			jQuery('#rb_toggle').css('left','45%');
			jQuery('#points_middle').prop("checked",true);
			break;
		case "right":
			jQuery('#iconThreeDots').css('left','90%');
			jQuery('.rb_description').css('left','90%');
			jQuery('#rb_toggle').css('left','90%');
			jQuery('#points_right').prop("checked",true);
			break;
		default:
			console.log("No changes to Points");
	}
	
	/* Subtitle */
	var subtitleSwitch = Cookies.get('subtitle');
	switch(subtitleSwitch) {
		case "true":
			jQuery('div.rb_description').css('display','inline');
			jQuery('#subtitleswitch').prop("checked",true);
			break;
		case "false":
			jQuery('div.rb_description').css('display','none');
			jQuery('#subtitleswitch').prop("checked",false);
			break;
		default:
			console.log("No changes to Subtitle");
	}
	
	/* Sound */
	var soundSwitch = Cookies.get('sound');
	switch(soundSwitch) {
		case "true":
			jQuery('audio').each(function(){ this.play(); });
			jQuery('#soundswitch').prop("checked",true);
			break;
		case "false":
			jQuery('audio').each(function() { this.pause(); });
			jQuery('#soundswitch').prop("checked",false);
			break;
	}
	
	/* Color */
	var colorSwitch = Cookies.get('color');
	switch(colorSwitch) {
		case "red":
			jQuery('body').css('background-color','#991b33');
			jQuery('#rocketbar').css('background-color','#949494');
			jQuery('#colorswitch').prop("checked",true);
			break;
		case "grey":
			jQuery('body').css('background-color','#949494');
			jQuery('#rocketbar').css('background-color','#991b33');
			jQuery('#colorswitch').prop("checked",false);
			break;
	}
});