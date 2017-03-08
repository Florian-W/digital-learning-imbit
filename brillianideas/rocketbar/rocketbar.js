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
		var ajaxfriendlyurl=setting.externalcontent.replace(/^http:\/\/[^\/]+\//i, "http://"+window.location.hostname+"/") 
		$.ajax({
			url: ajaxfriendlyurl, //path to external content
			async: true,
			dataType: 'html',
			error:function(ajaxrequest){
				alert('Error fetching Ajax content.<br />Server Response: '+ajaxrequest.responseText)
			},
			success:function(content){
				thisbar.$ajaxstickydiv.html(content)
				thisbar.init($, setting)
			}
		})

	},

	showhide:function(keyword, anim){
		var thisbar=this, $=jQuery
		var finalpx=(keyword=="show")? 0 : -(this.height-this.setting.peekamount)
		var positioncss=(this.setting.position=="bottom")? {bottom:finalpx} : {top:finalpx}
		this.$stickybar.stop().animate(positioncss, (anim)? this.setting.speed : 0, function(){
			thisbar.$indicators.each(function(){
				var $indicator=$(this)
				$indicator.attr('src', (thisbar.currentstate=="show")? $indicator.attr('data-closeimage') : $indicator.attr('data-openimage'))
			})
		})
		
		thisbar.currentstate=keyword
	},

	toggle:function(){
		var state=(this.currentstate=="show")? "hide" : "show"
		if (state == "hide"){
		//jQuery('#imageTwo').append('<img id="kopf" src="img/brillainIDEAS_UX_20170202_Oktopus-Kopf2_F.png" style="margin-bottom:'+ imgMargin +'px;"/>');
		jQuery('#tentakel').css("margin-bottom", "0px");
		jQuery('#kopf').css("margin-bottom", "0px");
		jQuery('#dots').css("margin-bottom", "5px");
		jQuery('#tentakel').css("margin-top","0px");
		jQuery('#kopf').css("margin-top","0px");
		jQuery('#dots').css("margin-top","0px");
		}
		this.showhide(state, true)
	},

	init:function($, setting){
		
		/* Color */
		var colorSwitch = Cookies.get('color');
		switch(colorSwitch) {
			case "red":
				jQuery('.content').css('background-color','#949494');
				jQuery('#rb_toggle').css('background-color','#949494');
				break;
			case "grey":
				jQuery('.content').css('background-color','#991b33');
				jQuery('#rb_toggle').css('background-color','#991b33');
				break;
		}
		
		/* Subtitle */
		var subtitleSwitch = Cookies.get('subtitle');
		switch(subtitleSwitch) {
			case "true":
				jQuery('.rb_description').css('display','inline');
				break;
			case "false":
				jQuery('.rb_description').css('display','none');
				break;
			default:
				console.log("No changes to Subtitle");
		}
		
		/* Punkte */
		var pointsSwitch = Cookies.get('points');
		switch(pointsSwitch) {
			case "left":
				jQuery('#rb_toggle').css('left','1%');
				break;
			case "middle":
				jQuery('#rb_toggle').css('left','45%');
				break;
			case "right":
				jQuery('#rb_toggle').css('left','90%');
				break;
			default:
				console.log("No changes to Points");
		}
		
		var thisbar=this
		this.$stickybar=$('#'+setting.id).css('visibility', 'visible')
		this.height=this.$stickybar.outerHeight()
		this.currentstate="hide"
		setting.peekamount=Math.min(this.height, setting.peekamount)
		this.setting=setting
		if (setting.revealtype=="mouseover")
			this.$stickybar.bind("mouseclick touchmove swipe mouseenter mouseleave", function(e){
				thisbar.showhide((e.type=="mouseenter" || e.type=="mouseclick" || e.type=="touchmove")? "show" : "hide", true)
		})
		this.$indicators=this.$stickybar.find('img[data-openimage]') //find images within bar with data-openimage attribute
		this.$stickybar.find('a[href=togglebar]').click(function(){ //find links within bar with href=#togglebar and assign toggle behavior to them
			thisbar.toggle()
			return false
		})
		setTimeout(function(){
			thisbar.height=thisbar.$stickybar.outerHeight() //refetch height of bar after 1 second (last change to properly get height of sticky bar)
		}, 1000)
		
		var imgMargin= this.height - this.setting.peekamount -10;
		
		jQuery("#rb_toggle").on("click", function(){
		//jQuery('#imageTwo').append('<img id="kopf" src="img/brillainIDEAS_UX_20170202_Oktopus-Kopf2_F.png" style="margin-bottom:'+ imgMargin +'px;"/>');
		jQuery('#tentakel').css("margin-bottom", imgMargin + 'px');
		jQuery('#kopf').css("margin-bottom", imgMargin + 'px');
		jQuery('#dots').css("margin-bottom", imgMargin + 'px');
		jQuery('#tentakel').css("margin-top","-" +imgMargin + 'px');
		jQuery('#kopf').css("margin-top","-" + imgMargin + 'px');
		jQuery('#dots').css("margin-top","-" + imgMargin + 'px');
		

		})
		this.showhide("hide")
	}
}



/////////////Initialization code://///////////////////////////

//Usage: var unqiuevar=new expstickybar(setting)

var mystickybar=new expstickybar({
	id: "rocketbar", //id of sticky bar DIV
	position:'bottom', //'top' or 'bottom'
	revealtype:'manual', //'mouseover' or 'manual'
	peekamount:40, //number of pixels to reveal when sticky bar is closed
	externalcontent:'rocketbarcontent.htm', //path to sticky bar content file on your server, or "" if content is defined inline on the page
	speed:500 //duration of animation (in millisecs)
})