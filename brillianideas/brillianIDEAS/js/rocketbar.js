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
			url: setting.externalcontent //path to external content
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
		
		if(thisbar.currentstate == keyword)		
 			return;
		
		var barSize= jQuery('.content').outerHeight();
		var finalpx=(keyword=="show")? 0 : - barSize;
		var positioncss=(thisbar.setting.position=="bottom")? {bottom:finalpx} : {top:finalpx};
		thisbar.$stickybar.finish().animate(	positioncss, anim ? thisbar.setting.speed : 0);
		
		
		jQuery('#dots').finish().animate({
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
		
		/**		
 		 * Make Navigation Trigger		
 		 */		
 		$('.navLink, .navLink *').click(function(e){		
 			e.preventDefault();		
 			var target = $(e.target);		
 					
 			if(!target.is('a'))		
 				target = target.parent();		
 					
 			var targetURL = target.attr('href');		
 			var clickTarget = $('.dotstyle-fillup a[href="' + targetURL + '"]');		
 			clickTarget.trigger('click');		
 			return false;		
 		});
	}
}


var mystickybar=new expstickybar({
	id: "rocketbar", //id of sticky bar DIV
	position:'bottom', //'top' or 'bottom'
	revealtype:'manual', //'mouseover' or 'manual'
	peekamount:48, //number of pixels to reveal when sticky bar is closed
	externalcontent:'./content/rocketbarcontent.htm', //path to sticky bar content file on your server, or "" if content is defined inline on the page
	speed:500 //duration of animation (in millisecs)
})
