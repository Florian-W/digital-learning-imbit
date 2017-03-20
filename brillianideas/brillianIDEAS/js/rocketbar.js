/**
 * @file Erzeugt die 'rocketbar', eine aus-/einklappbare Leiste am unteren Bildschirmrand.
 * rocketbar.css enthält den Style für die rocketbar
 * rocketbarcontent.htm enthält den kompletten Inhalt der rocketbar (Links, IMGs) und wird hier über Ajax in die Seite eingebunden
 * Zum Einbinden der rocketbar muss diese rocketbar.js in der entsprechenden Webseite im <script>-Tag aufgerufen werden
 * @author Dominik Stößel <dominikstoessel@gmail.com>
 */

jQuery.noConflict()

/**
	 * Erzeugt die rocketbar mit untenstehenden Parametern
	 * @function expstickybar
	 * @param {String} id: ID des rocketbar DIV in content file oder id des inline DIV
	 * @param {String} position: 'top' oder 'bottom'
	 * @param {String} revealtype: 'mouseover' oder 'manual' um rocketbar ausschließlich über Klick auf das img zu togglen
	 * @param {Integer} peekamount: Anzahl an Pixeln die bei geschlossener Rocketbar sichtbar sein sollen. Bei den aktuell 48 wird genau das img und der transparente Teil der rocketbar gezeigt.
	 * @param {String} externalcontent: (relativer) Pfad zur rocketbar content file auf dem Server oder "" wenn Inhalt inline auf der Seite definiert werden soll.
	 * @param {Integer} speed: Dauer der toggle-Animation (in millisecs)
*/
function expstickybar(usersetting){
	var setting=jQuery.extend({position:'bottom', peekamount:30, revealtype:'mouseover', speed:200}, usersetting)
	var thisbar=this
	var cssfixedsupport=!document.all || document.all && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //check for CSS fixed support
	if (!cssfixedsupport || window.opera)
		return
	jQuery(function($){
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
			url: setting.externalcontent
		}).done(function(content){
			thisbar.$ajaxstickydiv.html(content)
			thisbar.init($, setting)
		})

	},
	/**
	 * Zeigt oder versteckt die rocketbar
	 * @function showhide
	 * @param {String} keyword: "show" oder "hide", je nach gewünschtem Zielstatus
	 * @param {Boolean} anim: Wenn true wird mit der eingestellten Geschwindigkeit ein-/ausgeblendet
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
		
		/**		
 		 * Navigations Trigger für Navigation auf in "targetURL" spezifizierte Unterseite
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
	id: "rocketbar", //id des rocketbar DIV in content file oder id des inline DIV
	position:'bottom', //'top' oder 'bottom'
	revealtype:'manual', //'mouseover' oder 'manual' um rocketbar ausschließlich über Klick auf das img zu togglen
	peekamount:48, //Anzahl an Pixeln die bei geschlossener Rocketbar sichtbar sein sollen. Bei den aktuell 48 wird genau das img und der transparente Teil der rocketbar gezeigt.
	externalcontent:'./content/rocketbarcontent.htm', //Pfad zur rocketbar content file auf dem Server oder "" wenn Inhalt inline auf der Seite definiert werden soll.
	speed:500 //Dauer der toggle-Animation (in millisecs)
})
