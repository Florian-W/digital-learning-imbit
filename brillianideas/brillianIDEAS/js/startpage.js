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

$(document).ready(function(){
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
			jQuery('#tentakel').css('background-color','#991b33');
			jQuery('#imageOne').css('background-color','#991b33');
			jQuery('#rocketbar').css('background-color','#949494');
			jQuery('#colorswitch').prop("checked",true);
			break;
		case "grey":
			jQuery('body').css('background-color','#949494');
			jQuery('#tentakel').css('background-color','#949494');
			jQuery('#imageOne').css('background-color','#949494');
			jQuery('#rocketbar').css('background-color','#991b33');
			jQuery('#colorswitch').prop("checked",false);
			break;
	}
});

$(document).on("pageinit",function(){	
	//document.getElementById("rb_toggle").click();
	//var pathname = $(location).attr("href");
	jQuery('#imageTwo').append('<img id="kopf" src="img/kopf.gif" style="marginBottom:0px; visibility:hidden;"/>');
//	Query('#kopf').fadeOut();
//	var left = jQuery('#le').attr("href");
//	var right = jQuery('#pr').attr("href");
	var timeoutID;
	var tracker;
	var navbarheight;
	
	jQuery('map').imageMapResize();
	
 
	function setup() {
	    this.addEventListener("mousemove", resetTimer, false);
	    this.addEventListener("mousedown", resetTimer, false);
	    this.addEventListener("keypress", resetTimer, false);
	    this.addEventListener("DOMMouseScroll", resetTimer, false);
	    this.addEventListener("mousewheel", resetTimer, false);
	    this.addEventListener("touchmove", resetTimer, false);
	    this.addEventListener("MSPointerMove", resetTimer, false);
		this.addEventListener("touchstart", resetTimer, false);
		this.addEventListener("touchend", resetTimer, false);
 
	    startTimer();
		
	}
	setup();
 
	function startTimer() {
	    // wait 2 seconds before calling goInactive
	    timeoutID = window.setTimeout(goInactive, 6000);
	}
 
	function resetTimer(e) {
	    window.clearTimeout(timeoutID);
	 
	    goActive();
	}
 
	function goInactive() {
	    jQuery('#kopf').css("visibility", "visible");
		jQuery("#kopf").fadeIn();
		tracker = 1;
	}
	function removeImg(){
		var img = document.getElementById('kopf');
		img.parentNode.removeChild(img);
		tracker = 0;
	}

	function goActive() {
	    // do something
		var txt =jQuery('#imageTwo').html();
		
			jQuery("#kopf").fadeOut(800);
		
		tracker = 0;
	    startTimer();
	}
	
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
			jQuery('#content').empty().append(data);
		})
		
		
		
		return true;
	}
	
	jQuery("body").on("swiperight",function(){
		console.log('User swiped right')
		changePage(true);
	});                       
	jQuery("body").on("swipeleft",function(){
		changePage(false);
	});

  
});


jQuery.noConflict()



function expstickybar(usersetting){
	var setting=jQuery.extend({position:'bottom', peekamount:30, revealtype:'mouseover', speed:200}, usersetting)
	var thisbar=this
	var cssfixedsupport=!document.all || document.all && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //check for CSS fixed support
	if (!cssfixedsupport || window.opera)
		return
	jQuery(function($){ //on document.ready
		if (setting.externalcontent){
			thisbar.$ajaxstickydiv=$('<div id="ajaxstickydiv_'+setting.id+'"></div>').appendTo(document.body) //create blank div to house sticky bar DIV
			thisbar.loadcontent($, setting)
			}
		else
			thisbar.init($, setting)
	})
	
}

expstickybar.prototype={

	loadcontent:function($, setting){
		var thisbar=this
		$.ajax({
			url: setting.externalcontent, //path to external content
		}).done(function(content){
			thisbar.$ajaxstickydiv.html(content)
			thisbar.init($, setting)
		})

	},
	/**
	 * Displays or hides the rocketbar
	 * @param keyword {"show" | "hide"} target state
	 * @param aim {boolean} If true fades with the set speed
	 */
	showhide:function(keyword, anim){
		
		var thisbar=this;
		$=jQuery;
		var barSize= jQuery('.content').outerHeight();
		var finalpx=(keyword=="show")? 0 : - barSize;
		var positioncss=(thisbar.setting.position=="bottom")? {bottom:finalpx} : {top:finalpx};
		thisbar.$stickybar.stop().animate(	positioncss, anim ? thisbar.setting.speed : 0);
		
		
		jQuery('#container').animate({
				top: (keyword=="show"?'-':'+') + '=' + barSize + 'px'
			}, thisbar.setting.speed);
		
		thisbar.currentstate=keyword
	},
	
	toggle:function(){
		var state=(this.currentstate=="show")? "hide" : "show"
		this.showhide(state, true)
	},

	init:function($, setting){
		
		var thisbar=this;
		this.$stickybar=jQuery('#'+setting.id);
		
		this.$stickybar.css('visibility', 'hidden');
		
		this.$stickybar.waitForImages().done(function(){
			thisbar.$stickybar.css('visibility', 'visible');
			thisbar.$stickybar.animate({ bottom: '-' + thisbar.$stickybar.outerHeight() }, 0).animate({
				bottom: '-' + jQuery('.content').outerHeight()
			}, thisbar.setting.speed * (thisbar.$stickybar.outerHeight() / jQuery('.content').outerHeight() - 1), "swing", (thisbar.toggle).bind(thisbar));
		});
		
		this.height = this.$stickybar.outerHeight();
		
		this.currentstate="hide";
			
		setting.peekamount=Math.min(this.height, setting.peekamount);
		this.setting=setting;
		
		if (setting.revealtype=="mouseover")
			this.$stickybar.bind("mouseclick touchmove swipe mouseenter mouseleave", function(e){
				thisbar.showhide((e.type == "mouseenter" || e.type == "mouseclick" || e.type == "touchmove")? "show" : "hide", true);
			});
		
		this.$indicators = this.$stickybar.find('img[data-openimage]'); //find images within bar with data-openimage attribute
		this.$stickybar.find('a[href=togglebar]').click(function(){ //find links within bar with href=#togglebar and assign toggle behavior to them
			thisbar.toggle();
			return false
		});
		
		/* Color */
		var colorSwitch = Cookies.get('color');
		switch(colorSwitch) {
			case "red":
				jQuery('.content').css('background-color','#949494');
				break;
			case "grey":
				jQuery('.content').css('background-color','#991b33');
				break;
		}
	}
}



/////////////Initialization code://///////////////////////////

//Usage: var unqiuevar=new expstickybar(setting)

var mystickybar=new expstickybar({
	id: "rocketbar", //id of sticky bar DIV
	position:'bottom', //'top' or 'bottom'
	revealtype:'manual', //'mouseover' or 'manual'
	peekamount:48, //number of pixels to reveal when sticky bar is closed
	externalcontent:'./content/rocketbarcontent.htm', //path to sticky bar content file on your server, or "" if content is defined inline on the page
	speed:500 //duration of animation (in millisecs)
})



