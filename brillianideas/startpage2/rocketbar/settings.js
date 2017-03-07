jQuery.noConflict();

(function($) {
	 $(document).ready(function(){
			$('#subtitleswitch').change(function() {
				//this will contain a reference to the checkbox
				if (this.checked) {
					Cookies.set('subtitle','true', { expires: 7, path: '/' });
					alert('Cookie changed to true');
				} else {
					Cookies.set('subtitle','false', { expires: 7, path: '/' });
					alert('Cookie changed to false');
				}
			});
			
			<!-- Punkte -->
			$('#points_left').change(function() {
				if (this.checked) {
					Cookies.set('points','left', { expires: 7, path: '/' });
					$('#rb_toggle').css('left','1%');
				}
			});
			
			$('#points_middle').change(function() {
				if (this.checked) {
					Cookies.set('points','middle', { expires: 7, path: '/' });
					$('#rb_toggle').css('left','49%');
				}
			});
			
			$('#points_right').change(function() {
				if (this.checked) {
					Cookies.set('points','right', { expires: 7, path: '/' });
					$('#rb_toggle').css('left','100%');
				}
			});
			
			<!-- Sound -->
			$('#soundswitch').change(function() {
				if (this.checked) {
					Cookies.set('sound','true', { expires: 7, path: '/' });
					alert('Cookie changed to true');
				} else {
					Cookies.set('sound','false', { expires: 7, path: '/' });
					alert('Cookie changed to false');
				}
			});
			
			<!-- Color -->
			$('#colorswitch').change(function() {
				if (this.checked) {
					Cookies.set('color','true', { expires: 7, path: '/' });
					alert('Cookie changed to true');
				} else {
					Cookies.set('color','false', { expires: 7, path: '/' });
					alert('Cookie changed to false');
				}
			});


		var pointsSwitch = Cookies.get('points');
		switch(pointsSwitch) {
			case "left":
				$('#rb_toggle').css('left','1%');
				break;
			case "middle":
				$('#rb_toggle').css('left','49%');
				break;
			case "right":
				$('#rb_toggle').css('left','100%');
				break;
			default:
				console.log("No changes to Points");
		}
		
		var subtitleSwitch = Cookies.get('subtitle');
		switch(subtitleSwitch) {
			case "true":
				$('#rb_description').css('display','true');
				break;
			case "false":
				$('#rb_description').css('display','none');
				break;
			default:
				console.log("No changes to Subtitle");
		}
		
		var soundSwitch = Cookies.get('sound');
		switch(soundSwitch) {
			case "true":
				$('audio').each(function(){ this.play(); });
				break;
			case "false":
				$('audio').each(function() { this.pause(); });
				break;
		}
	});
})(jQuery);

function Text01() {
	document.write('<div id="settings" style="float:left; width: 30vw; height: 80vh; background-color:#FFFFFF;font-size:20px;"><form id="settingsForm">Untertitel:<!-- Rounded switch --><label class="switch"><input type="checkbox"><div class="slider round"></div></label><button id="buttonSub" value="submit">submit</button><button id="cookie" value="showCookie">Show Cookies</button></form></div>');
}