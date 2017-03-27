/**
* @file Erstellt und liest Cookies für die Einstellungen.
* Im Moment gibt es nur den Sound als Einstellung. Das Programm lässt sich beliebig mit neuen Cookies und Einstellungen erweitern.
* @author Patrick Best <best.patrick@web.de>
*/

/**
* Erstellung der Cookies
* @function erstelleCookie
* @param {String} name - Name des Cookies, der erstellt wird
* @param {String} value - Wert des Cookies
* @param {Integer} days - Tage bis zum Ablauf der Cookeis
*/
function writeCookie(name, value, days) {
	/**
	* Setzt Tage für den Ablauf des Cookies
	*/
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expiresAt = "; expires=" + date.toGMTString();
	}
	else var expiresAt = "";
	/**
	* schreibt den Cookie mit dem 'document.cookie' Objekt des Browsers
	*/
	document.cookie = name + "=" + value + expiresAt + "; path=/";
}

/**
* Auslesen der Cookies
* @function leseCookie
* @param {String} name - Name des Cookies
* @return {String} Wert des Cookies
*/
function readCookie(name) {
	var nameEQ = name + "=";
	var cookieArray = document.cookie.split(';');
	for(var i = 0; i < cookieArray.length; i++) {
		var c = cookieArray[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}

/**
* Initialisierungs Funktion: Schreibt und liest Cookies für die Sound-Einstellung
* @function initSettings
* @author Patrick Best
*/
function initSettings() {
	/**
	* Setzt Dauer des Cookies auf 1 Jahr
	*/
	var expireDate = 365;
	
	/**
	* Liest Cookie 'Sound'
	*/
	var soundSwitch = readCookie('sound');
	
	/**
	* Switch Statement - benutzt den Inhalt des Cookies 'Sound'
	*/
	switch(soundSwitch) {
		/**
		* Audio wird gespielt.
		* Beim Laden der Impressumsseite wird direkt der Soundswitch auf 'on' gesetzt.
		*/
		case "true":
			$('audio').each(function(){ this.play(); });
			$('#myonoffswitch').prop("checked",true);
			break;
		/**
		* Audio wird pausiert.
		* Beim Laden der Impressumsseite wird direkt der Soundswitch auf 'off' gesetzt.
		*/
		case "false":
			$('audio').each(function() { this.pause(); });
			$('#myonoffswitch').prop("checked",false);
			break;
	}
	
	/**
	* Wenn sich der Soundswitch ändert, wird der 'Sound'-Cookie geschrieben.
	* Audio wird pausiert oder weitergespielt.
	*/
	$('#myonoffswitch').change(function() {
		/**
		* Wenn der Button checked ist, wird der Cookie 'Sound' mit dem Inhalt 'true' geschrieben. Das Ablaufdatum des Cookies beträgt 1 Jahr.
		* Zudem wird das Audio abgespielt.
		*/
		if (this.checked) {
			writeCookie('sound','true', expireDate);
			$('audio').each(function(){ this.play(); });
		} 
		/**
		* Wenn der Button unchecked ist, wird der Cookie 'Sound' mit dem Inhalt 'false' geschrieben. Das Ablaufdatum des Cookies beträgt 1 Jahr.
		* Zudem wird das Audio gestoppt.
		*/
		else {
			writeCookie('sound','false', expireDate);
			$('audio').each(function() { this.pause(); });
		}
	});
};

/**
* On Document.Ready wird die Initialisierungsfunktion aufgerufen
*/ 
$(document).ready(initSettings);
