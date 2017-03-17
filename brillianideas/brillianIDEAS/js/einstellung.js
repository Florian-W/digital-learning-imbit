/**
* Einstellungs JavaScript Datei
* Erstellt und liest Cookies für den Sound
* Das Programm lässt sich beliebig mit neuen Cookeis erweitern
* @author Patrick Best
*/

function createCookie(name,value,days) {
	/**
	* Erstellung der Cookies
	* Funktion übernommen von quirksmode.org
	*
	* @param name name des cookies 
	* @param value wert des cookies
	* @param days tage bis zum ablauf der cookeis
	* 
	*/
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	/**
	* Auslesen der Cookies
	* Funktion übernommen von quirksmode.org
	*
	* @param name name des cookies
	* @return Wert des Cookies
	*/
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

$(document).ready(function() {
	var expireDate = 365;
	
	/**
	* Cookie wird gelesen
	* Beim Laden einer Seite wird direkt der Soundswitch richtig gesetzt (on bzw. off)
	* Audio wird angehalten/weitergespielt
	*/
	var soundSwitch = readCookie('sound');
	switch(soundSwitch) {
		case "true":
			$('audio').each(function(){ this.play(); });
			$('#myonoffswitch').prop("checked",true);
			break;
		case "false":
			$('audio').each(function() { this.pause(); });
			$('#myonoffswitch').prop("checked",false);
			break;
	}
	
	/**
	* Wenn sich der Soundswitch ändert wird der Cookie geschrieben
	* true = Sound wird gespielt, false = Sound wird nicht gespielt
	* Audio wird pausiert oder weitergespielt
	*/
	$('#myonoffswitch').change(function() {
		if (this.checked) {
			createCookie('sound','true', expireDate);
			$('audio').each(function(){ this.play(); });
		} else {
			createCookie('sound','false', expireDate);
			$('audio').each(function() { this.pause(); });
		}
	});
	

});

