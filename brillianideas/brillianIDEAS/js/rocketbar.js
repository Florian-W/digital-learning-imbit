/**
 * @file Erzeugt die 'rocketbar', eine aus-/einklappbare Leiste am unteren Bildschirmrand.
 * rocketbar.css enthält den Style für die rocketbar
 * rocketbarcontent.htm enthält den kompletten Inhalt der rocketbar (Links, IMGs) und wird hier über Ajax in die Seite eingebunden
 * Zum Einbinden der rocketbar muss diese rocketbar.js in der entsprechenden Webseite im <script>-Tag aufgerufen werden
 * @author Dominik Stößel <dominikstoessel@gmail.com>
 */

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
	$(function(){
		if (setting.externalcontent){
			thisbar.$ajaxstickydiv=$('<div id="ajaxstickydiv_'+setting.id+'"></div>').appendTo(document.body) //create blank div to house sticky bar DIV
			thisbar.loadcontent(setting)
			}
		else
			thisbar.init(setting)
	})
	
}

expstickybar.prototype={

	loadcontent:function(setting){
		var thisbar=this
		$.ajax({
			url: setting.externalcontent
		}).done(function(content){
			thisbar.$ajaxstickydiv.html(content)
			thisbar.init(setting)
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
		
		thisbar.$stickybar.css('visibility', 'visible');
		
		var barSize= $('.content').outerHeight();
		var finalpx=(keyword=="show")? 0 : - barSize;
		thisbar.$stickybar.velocity({
			bottom: finalpx
		}, anim ? thisbar.setting.speed : 0);
		
		
		$('#dots').velocity({
				bottom: finalpx + barSize
			}, anim ? thisbar.setting.speed : 0);
		
		thisbar.currentstate=keyword
	},
	
	toggle:function(){
		var state=(this.currentstate=="show")? "hide" : "show"
		this.showhide(state, true)
	},

	init:function(setting){
		
		var thisbar=this;
		this.$stickybar=$('#'+setting.id);
		
		this.$stickybar.css('visibility', 'hidden');
		
		this.height = this.$stickybar.outerHeight();
			
		setting.peekamount=Math.min(this.height, setting.peekamount);
		this.setting=setting;
		
		this.$indicators = this.$stickybar.find('img[data-openimage]'); //find images within bar with data-openimage attribute
		this.$stickybar.find('a[href=togglebar]').click(function(){ //find links within bar with href=#togglebar and assign toggle behavior to them
			thisbar.toggle();
			return false
		});
		
		this.$stickybar.waitForImages().done(function(){
			thisbar.showhide($('.current').hasClass('home') ? "show" : "hide", true);
		});
		
		/**		
 		 * Navigations Trigger für Navigation auf in "targetURL" spezifizierte Unterseite
 		 */		
 		$('.navLink, .navLink *').click(function(e){
			if (!(window.location.pathname.substr(window.location.pathname.lastIndexOf('/'), window.location.pathname.lenth) != 'index.html')){
				e.preventDefault();
				var target = $(e.target);		

				if(!target.is('a'))		
					target = target.parent();		

				var targetURL = target.attr('href');
				var targetID = targetURL.substr(targetURL.indexOf('#'), targetURL.length);
				var clickTarget = $(targetID);		
				window.location = targetID;
				clickTarget.trigger('click');	
				return false;	
			}
 		});
	}
}


var mystickybar=new expstickybar({
	id: "rocketbar", //id des rocketbar DIV in content file oder id des inline DIV
	revealtype:'manual', //'mouseover' oder 'manual' um rocketbar ausschließlich über Klick auf das img zu togglen
	peekamount:48, //Anzahl an Pixeln die bei geschlossener Rocketbar sichtbar sein sollen. Bei den aktuell 48 wird genau das img und der transparente Teil der rocketbar gezeigt.
	externalcontent:'./content/rocketbarcontent.htm', //Pfad zur rocketbar content file auf dem Server oder "" wenn Inhalt inline auf der Seite definiert werden soll.
	speed:500 //Dauer der toggle-Animation (in millisecs)
});
