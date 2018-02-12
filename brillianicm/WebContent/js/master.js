function showLocation() {
	var tag = 'Location';
	var container = $('.mainEventContainer');
	var eventtype = $xml.find('event').attr('eventtype');
	//	var backgroundPictureTransition1Url = 'images/locationBackgrounds/loc' + buttonId + 't1.png';
	//	var backgroundPictureTransition2Url = 'images/locationBackgrounds/loc' + buttonId + 't2.png';
	//	var backgroundPictureUrl = 'images/locationBackgrounds/loc' + buttonId + '.png';
	$('.mainEventContainerLaptop').window('close');
	$('.mainEventContainerPdf').window('close');
	container.window({
		closed : false,
		modal : false,
		noheader : true,
		draggable : false,
		resizable : false
	});
	container.panel({
		href : tag,
		onLoad : function() {

			hideDialog();
			hideSelection();
			hideAllocation();
			hideAllocationTwo();
			hideAllocationThree();
			hideMatrixAllocation();
			hideMatrixAllocationStandard();
			hideConversation();
			hidePictureContainer();
			hideTextBox();
			hideScrollBar();
			hideWorldmap();
			hideMatrixAllocationAlternate();
			hideFactsheet();
			/*
			 *Christian Heyer
			 *02.03.2016
			 */
			hideMapAllocation();
			/* END */
			/*
			 *Anastasia reimer
			 *03.03.2016
			 */
			hideAllocationFour();
			/* END */
			
			

			// Musik am Anfang
			/* if(eventtype=="1"){
			var audioElement = document.createElement('audio');	
			audioElement.setAttribute('src', 'audio/location.mp3');
			//Gotta love that melody!
			var audiosetting="false";
			audiosetting=getCookie("audio");
			if (audiosetting == "true") {
			audioElement.play();	}
			}*/

			/* Loads background images in a row and finally loads Dialog or alike. 
			 * @author Laluz
			 */
			//	fancyImageLoading(backgroundPictureTransition1Url, $('.locationBackgroundContainer'));
			//	setTimeout(function(){
			//	fancyImageLoading(backgroundPictureTransition2Url, $('.locationBackgroundContainer'));
			//	setTimeout(function(){
			//fancyImageLoading(backgroundPictureUrl, $('.locationBackgroundContainer'));					
			setTimeout(function() {
				if (eventtype == '3') {
					loadDialog();
				} else if (eventtype == '14' || eventtype == '15') {
					loadSelection();
				} else if (eventtype == '16' || eventtype == '17') {
					loadAllocation();
				} else if (eventtype == '18') {
					loadAllocationTwo();
				} else if (eventtype == '19') {
					loadAllocationThree();
				} else if (eventtype == '20') {
					loadMatrixAllocationStandard();
				} else if (eventtype == '21') {
					loadMatrixAllocation();
				} else if (eventtype == '22') {
					showNotification();
				} else if (eventtype == '23') {
					loadConversation();
				} else if (eventtype == '24') {
					loadTextBox();
				} else if (eventtype == '25') {
					loadWorldMap();
				} else if (eventtype == '26') {
					loadScrollBar();
				} else if (eventtype == '27') {
					loadMatrixAllocationAlternate();
				} else if (eventtype == '2') {
					loadPictureContainer();
				} else if (eventtype == '28') {
					loadFactsheet();
				}
				/*
				 *Christian Heyer
				 *02.03.2016
				 */
				else if (eventtype == '29') {
					loadMapAllocation();
				}
				/* END */
				
				/*
				 *Anastasia Reimer
				 *03.03.2016
				 */
				else if (eventtype == '30') {
					loadAllocationFour();
				}
				/* END */

				//	},1500);					
				//	},1500);
			}, 0);
		}
	});
}

//Browserweiche:
function checkBrowserName(name) {
	var agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf(name.toLowerCase()) > -1) {
		return true;
	}
	return false;
}
/*
 * Philipp K. 
 * 6.3.16
 * Added gamaData reset to reset KPIs when changing country 
 */
function changeFunc() {
	
		
	var selectBox = document.getElementById("contry-list");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	var nextEvent = "";
	$countrySelectionXml.find('option').each(function() {
		var country = $(this).text();

		if (selectedValue == country) {
			nextEvent = $(this).attr('href');
		}
	});
	
	gameData.imtime = 0;
	gameData.imqual = 0; 
	gameData.imcost = 0;
	getXml(nextEvent);
	
}

function setDescription(container, itemRank, itemDescription) {
	var tdId = 'rank' + itemRank;
	document.getElementById(tdId).innerHTML = itemDescription;

}

function loadBackground() {
	var background;
	var backgroundWithPartnerUrl;
	if ($xml.find('bgimg').text() != '') {
		background = $xml.find('bgimg').text();
		backgroundWithPartnerUrl = 'images/' + background;
		setBackground(backgroundWithPartnerUrl, false);
	}
}

function loadVideo() {
	var video;
	var videoWithPartnerUrl;
	var videoEnabled = getCookie("video");
	if (($xml.find('bgvid').text() != '') && (videoEnabled == "true")) {
		video = $xml.find('bgvid').text();
		videoWithPartnerUrl = window.location.href;
		position = videoWithPartnerUrl.lastIndexOf('/');
		videoWithPartnerUrl = videoWithPartnerUrl.slice(0, position + 1);
		videoWithPartnerUrl = videoWithPartnerUrl.concat("/videos/" + video);
		setVideo(videoWithPartnerUrl);
	}
}

function setVideo(backgroundUrl) {
	//since it will always be a different dialogue video no comparison with the old video is necessary
	var vid = document.getElementById('background-video');
	$('.dialogContainer video').css('display', 'block');
	vid.src = backgroundUrl;
	setTimeout(function() {
		vid.play();
	}, 2000);
}

function setBackground(backgroundUrl) {
	document.getElementById('background-video').src = '';
	backgroundPictureUrlNew = 'url(' + backgroundUrl + ')';
	var eventtype = $xml.find('event').attr('eventtype');

	backgroundPictureUrlOld = $('.bgimg').css('background');
	if (backgroundPictureUrlOld.split("images/")[1] != backgroundPictureUrlNew
			.split("images/")[1]) {
		$('.bgimg').css('content', backgroundPictureUrlNew);
		$('.bgimg').css('width', '100%');
		$('.bgimg').css('height', '100%');
		$('.bgimg').css('float', 'left');
		$('.bgimg').css('z-index', '-1');
		$('.bgimg').css('image-size', 'cover');
	}
}

function wrongSelection() {
	showMsg('Info', 'Incorrect Selection.');
}
// function fancyImageLoading(imageUrl, element){
// var img = new Array();
// img[0] = new Image();
// img[0].onload = function() {
// element.css("background-image", "url('" + imageUrl + "')");
// };
// img[0].src = imageUrl;
// }

function showImprint() {
	var tag = 'Imprint';
	var container = $('.mainEventContainerImprint');
	$('.mainEventContainerPdf').window({
		closed : true
	});
	container.window({
		closed : false,
		modal : false,
		title : 'Imprint',
		draggable : false,
		resizable : false,
		minimizable : false,
		maximizable : false,
		collapsible : false
	});
	container.panel({
		href : tag,
	});
}

function showAbout() {
	var tag = 'About';
	var container = $('.mainEventContainerImprint');
	$('.mainEventContainerPdf').window({
		closed : true
	});
	container.window({
		closed : false,
		modal : false,
		title : 'About',
		draggable : false,
		resizable : false,
		minimizable : false,
		maximizable : false,
		collapsible : false
	});
	container.panel({
		href : tag,
	});
}

// Function to check if user has mobile device

/** Detect if site is accessed on a mobile device
 * @author Philipp E.
 */
function detectmob() {
	if (navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)) {
		return true;
	} else {
		return false;
	}
}

//Shows PDF in a jquery-easyui window - Example: showPdf('pdf/Bachelorarbeit.pdf');
//Get mobile check value. If User has mobile device, this function provides a link to the pdf document to open it in a new tap
//If User does not use mobile device, PDF will be shown as an iFrame inbound to a PDF Container.
function showPdf(pdfPath) {

	if (detectmob() == true) {
		this.window.open(pdfPath);
	} else {
		var pdf = pdfPath.split("/")[1];

		if (pdf == '') {
			pdf = 'PDF';
		}

		try {
			$('.mainEventContainerPdf').panel('destroy');
		} catch (err) {

		}

		$('.mainWindow')
				.append(
						'<div class="mainEventContainerPdf easyui-window" data-options="closed:true,width:863,height:576"></div>');

		var window = $('.mainEventContainerPdf');

		window
				.append('<iframe class="pdfContainer" width="845" height="531"></iframe>');

		var pdfContainer = $('.pdfContainer');

		pdfContainer.attr('src', pdfPath);
		window.window({
			title : pdf,
			width : 863,
			height : 576,
			closed : false,
			modal : false,
			draggable : false,
			resizable : false,
			minimizable : false,
			maximizable : false,
			collapsible : false,
			onClose : function() {
				window.panel('destroy');
			}
		});
		$('.mainEventContainerImprint').window({
			closed : true
		});
	}
}

//Hides the worldmap elements
function hideWorldmap() {
	$('.worldmap').hide();
}

//Hides the worldmap elements
function showWorldmap() {
	$('.worldmap').show();
}

function hideMatrixAllocationAlternate() {
	$('.matrixAllocationContainerAlternate').hide();
}

function showMatrixAllocationAlternate() {
	$('.matrixAllocationContainerAlternate').show();
}

//Hides the dialog elements
function hideDialog() {
	// $('.centerContainer').hide();
	// $('.dialogTextContainerFit').hide();
	// $( '.dialogPartner').hide();
	// $( '.dialogButton').hide();
	$('.dialogContainer').hide();
}

//Shows the dialog elements
function showDialog() {
	$('.dialogContainer').show();
	// $('.centerContainer').show();
	// $('.dialogTextContainerFit').show();
	// $('.dialogPartner').delay(500).fadeIn( 'slow', function() {});						    
	// $('.dialogButton').delay(1500).fadeIn( 'slow', function() {});
}

function hideSelection() {
	$('.selectionContainer').hide();
}

function showSelection() {
	$('.selectionContainer').show();
}

function hideFactsheet() {
	$('.factsheetContainer').hide();
}

function showFactsheet() {
	$('.factsheetContainer').show();
}



/*
 *Christian Heyer
 *02.03.2016
 */

function hideMapAllocation() {
	$('.mapAllocationContainer').hide();
}
function showMapAllocation() {
	$('.mapAllocationContainer').show();
}
/* END */

/*
 *Anastasia Reimer
 *03.03.2016
 */

function hideAllocationFour() {
	$('.allocationContainerFour').hide();
}
function showAllocationFour() {
	$('.allocationContainerFour').show();
}
/* END */



function hideAllocation() {
	$('.allocationContainer').hide();
}
function showPictureContainer() {
	$('.pictureContainer').show();
}
function hidePictureContainer() {
	$('.pictureContainer').hide();
}
function showAllocation() {
	$('.allocationContainer').show();
}
function hideAllocationTwo() {
	$('.allocationContainerTwo').hide();
}

function showAllocationTwo() {
	$('.allocationContainerTwo').show();
}
function hideAllocationThree() {
	$('.allocationContainerThree').hide();
}

function showAllocationThree() {
	$('.allocationContainerThree').show();
}

function hideMatrixAllocationStandard() {
	$('.matrixAllocationContainerStandard').hide();
}

function showMatrixAllocationStandard() {
	$('.matrixAllocationContainerStandard').show();
}
function hideMatrixAllocation() {
	$('.matrixAllocationContainer').hide();
}

function showMatrixAllocation() {
	$('.matrixAllocationContainer').show();
}
function hideConversation() {
	$('.conversation').hide();
}

function showConversation() {
	$('.conversation').show();
}

function hideTextBox() {
	$('.textBox').hide();
}

function showTextBox() {
	$('.textBox').show();
}

function hideScrollBar() {
	$('.scrollBar').hide();
}

function showScrollBar() {
	$('.scrollBar').show();
}

function showEventContainer(container) {
	container.window({
		modal : false,
		closed : false
	});
}

function showEventContainerModal(container) {

	container.window({
		modal : true,
		closed : false
	});
}

function hideEventContainer(container) {
	container.window({
		modal : false,
		closed : true,
		closable : false
	});
}

// Zeigt an, dass eine neue Mail gekommen ist
function showMsg(title, msg) {
	$.messager.show({
		title : title,
		timeout : 5000,
		msg : msg
	});
}

// Final Screen showing result of user
function showResult() {
	var tag = 'Result';
	var container = $('.mainEventContainerResult');
	container.window({
		closed : false,
		modal : false,
		title : tag,
		draggable : false,
		resizable : false,
		minimizable : false,
		maximizable : false,
		collapsible : false
	});
	container.panel({
		href : tag,

		onLoad : function() {
			/*var audioElement = document.createElement('audio');	
			audioElement.setAttribute('src', 'audio/location.mp3');
			var audiosetting="false";
			audiosetting=getCookie("audio");
			if (audiosetting == "true") {
			audioElement.play();	}*/
			/*
			 * Philipp K. 
			 * 5.3.16
			 * Added ajax to import game date so the result page can use dynamic content 
			 * First function added the name of the User and makes the 
			 */
			$.ajax({
				url: 'Event',
				type: 'get',
				dataType: 'html',
				data: {userid : userid, type : 'loadGame'},
				async: true,
				success: function(data) {
					try{
						var list = data.split("[")[1].split(']')[0].split(', ');
										
						lastName = list[0];
						firstName = list[1];
						gender = list[2];
						imcost = list[3];
						imqual = list[4];
						imtime = list[5];	
						gamePath = list[6];
						idArray = gamePath.split(';');
						id = idArray[idArray.length-1];
						setTCQImages(imtime, imcost, imqual);

					}catch(err){
						lastName = 'Mustermann';
						firstName = 'Max';
						gender = '1';
						imcost = '100';
						imqual = '100';
						imtime = '100';				
						gamePath = $.getUrlVar('gamePath');
						if(typeof gamePath == 'undefined'){
							gamePath = 'l000e000';
						}
						idArray = gamePath.split(';');
						id = idArray[idArray.length-1];
						

					}
					document.getElementById("name").innerHTML = firstName + " " + lastName;
					document.getElementById("cost").innerHTML = " " + imcost + "%";
					document.getElementById("time").innerHTML = " " + imtime + "%";
					document.getElementById("quality").innerHTML = " " + imqual + "%";
				} 
			});

			$.ajax({
				url: 'Event',
				type: 'get',
				dataType: 'html',
				data: {userid : userid, type : 'getEmail'},
				async: true,
				success: function(data) {
					try{
						user_email = data;

					}catch(err){
						user_email = "";
					}
					document.getElementById("email").innerHTML = user_email;
				}
			});	
			$(this).find('#imprint').bind('click', function() {
				showImprint();
			});

			$(this).find('#help').bind('click', function() {
				showPdf('documents/BA_notizblock.pdf');
			});
			$(this).find('#logout').bind('click', function() {
				sessionStorage.removeItem('userid');
				window.location.href = 'LogoutUser';
			});
		}
	});
}

// Shows that a screen is loading
function showLoading() {
	var text = '';
	var imageUrl = '';
	var imageUrl2 = '';
	var duration = 2;

	var window = $('.loadingScreen');
	var imageContainer = $('.loadingScreenImageContainer');

	// Hier wird die Audio-Datei abgespielt 
	// (Vielleicht kann man hier noch einen Filter einbauen??)
	/*var audioElement = document.createElement('audio');	
	audioElement.setAttribute('src', 'audio/location.mp3');
	var audiosetting="false";
	audiosetting=getCookie("audio");
	if (audiosetting == "true") {
	audioElement.play();	}*/

	//Um hässliche Ladeartefakte zu verhindern
	$('body').show();
	$('body').layout({
		fit : true
	});

	imageContainer.text(text);
	imageContainer.css('background-image', 'url(' + imageUrl + ')');
	window.window({
		closed : false
	});
	setTimeout(function() {
		imageContainer.css('background-image', 'url(' + imageUrl2 + ')');
		setTimeout(function() {
			window.fadeOut(duration, function() {
				window.window('close');
				getXml(gameData.id);
			});
		}, duration);
	}, duration);
}

// Function to set a cookie
function setCookie(cName, cValue, cExpire) {
	var d = new Date();
	// number of days until cookie expires
	d.setTime(d.getTime() + (cExpire * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cName + "=" + cValue + "; " + cExpire;
}

// Function to get a cookie
function getCookie(cName) {
	var name = cName + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			// if found, return cookie name
			return c.substring(name.length, c.length);
		}
	}
	// return "" if cookie could not be found
	return "";
}

// Check if cookie exists
function checkCookie() {
	var user = getCookie("Rick");
	// Cookie found and saved on user client (browser)
	if (user != "") {
		return true;
	}
	// Cookie not found on user client (browser): user = ""
	else {
		return false;
	}
}

//Automatically executed when Browser-Window is resized
$(window).resize(function() {
	$('.mainEventContainer').window('center');
	$('.mainEventContainerLaptop').window('center');
	$('.mainEventContainerPdf').window('center');
	$('.mainEventContainerImprint').window('center');
	$('.transitionScreen').window('center');
	$('.mainEventContainerResult').window('resize');
	$('.loadingScreen').window('resize');
});

// TODO CHECK CODE AFTER MERGE -#442

//Get Url Parameters - Example: $.getUrlVar('name');
$.extend({
	getUrlVars : function() {
		var vars = [], hash;
		try {
			var hashes = window.location.href.slice(
					window.location.href.indexOf('?') + 1).split('&');
			for (var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1].replace('%20', ' ');
			}
		} catch (err) {
			//console.log('no parameters found');
		}
		return vars;
	},
	getUrlVar : function(name) {
		return $.getUrlVars()[name];
	}
});

$.extend({
	// Arguments are image paths relative to the current page.
	preLoadImages : function() {
		var cache = [];
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		}
		;
	}
});

//Get Url Parameters - Example: $.getUrlVar('name');
$.extend({
	getUrlVars : function() {
		var vars = [], hash;
		try {
			var hashes = window.location.href.slice(
					window.location.href.indexOf('?') + 1).split('&');
			for (var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1].replace('%20', ' ');
			}
		} catch (err) {
			//console.log('no parameters found');
		}
		return vars;
	},
	getUrlVar : function(name) {
		return $.getUrlVars()[name];
	}
});

$.extend({
	// Arguments are image paths relative to the current page.
	preLoadImages : function() {
		var cache = [];
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		}
		;
	}
});

// Veränderung der TCQ IMAGES auf der Seite
function setTCQImages(imtime, imcost, imqual) {
	//Grenzen Rot:0-49 Grenzen Gelb 50-85 Grenzen Grün:86-100
	
	/* EDIT BY JONAS ON FEB 27, 2016 */
	/* New code for the polarclock*/
	var kpi_competence = imtime;
	var kpi_behaviour = imcost;
	var kpi_communication = imqual;
	KPIValues[0] = kpi_competence;
	KPIValues[1] = kpi_behaviour;
	KPIValues[2] = kpi_communication;
	
	tick();
	/* End of line*/
	
	
	/* EDIT BY JONAS ON FEB 27, 2016*/
	/* Removing the logic for the outdated KPI buttons */
	/*
	var svg_competence = document.getElementById("icon_competence");
	var svg_communication = document.getElementById("icon_communication");
	var svg_behaviour = document.getElementById("icon_behaviour");
	//grün: 49D26D
	//orange: FFAB58
	//rot: FF6C58

	var color_green = "#49D26D";
	var color_orange = "#FFAB58";
	var color_red = "#FF6C58";
	if (kpi_competence > 85) {
		svg_competence.setAttribute("fill", color_green);

	} else if (kpi_competence <= 85 && kpi_competence > 49) {
		svg_competence.setAttribute("fill", color_orange);

	} else {
		svg_competence.setAttribute("fill", color_red);

	}

	if (kpi_communication > 85) {
		svg_communication.setAttribute("fill", color_green);

	} else if (kpi_communication <= 85 && kpi_communication > 49) {
		svg_communication.setAttribute("fill", color_orange);

	} else {
		svg_communication.setAttribute("fill", color_red);

	}

	if (kpi_behaviour > 85) {
		svg_behaviour.setAttribute("fill", color_green);

	} else if (kpi_behaviour <= 85 && kpi_behaviour > 49) {
		svg_behaviour.setAttribute("fill", color_orange);

	} else {
		svg_behaviour.setAttribute("fill", color_red);

	}
	*/
	/* End of line */
}

// Veränderung der TCQ WERTE
function updateTCQValues(imtime, imcost, imqual) {
	try {
		if (imtime.charAt(0) == '+') {
			gameData.imtime = parseInt(gameData.imtime, 10)
					+ parseInt(imtime.substring(1), 10);
		} else if (imtime.charAt(0) == '-') {
			gameData.imtime = gameData.imtime - imtime.substring(1);
		}
	} catch (err) {

	}
	try {
		if (imcost.charAt(0) == '+') {
			gameData.imcost = parseInt(gameData.imcost, 10)
					+ parseInt(imcost.substring(1), 10);
		} else if (imcost.charAt(0) == '-') {
			gameData.imcost = gameData.imcost - imcost.substring(1);
		}
	} catch (err) {

	}
	try {
		if (imqual.charAt(0) == '+') {
			gameData.imqual = parseInt(gameData.imqual, 10)
					+ parseInt(imqual.substring(1), 10);
		} else if (imqual.charAt(0) == '-') {
			gameData.imqual = gameData.imqual - imqual.substring(1);
		}
	} catch (err) {

	}
	if (gameData.imtime > 100) {
		gameData.imtime = 100;
	} else if (gameData.imtime < 0) {
		gameData.imtime = 0;
	}
	if (gameData.imcost > 100) {
		gameData.imcost = 100;
	} else if (gameData.imcost < 0) {
		gameData.imcost = 0;
	}
	if (gameData.imqual > 100) {
		gameData.imqual = 100;
	} else if (gameData.imqual < 0) {
		gameData.imqual = 0;
	}
}


/* EDIT BY JONAS ON FEB 27, 2016*/
/* Functions of the polarclock */
function tick() {
  if (!document.hidden) field
      .each(function(d) { this._value = d.value; })
      .data(fields)
      .each(function(d) { d.previousValue = this._value; })
    .transition()
      .ease("elastic")
      .duration(500)
      .each(fieldTransition);

  //setTimeout(tick, 1000 - Date.now() % 1000);
}


function fieldTransition() {
	var field = d3.select(this).transition();
	  
	if(this.childNodes[1].id=="arc-center-3"){
		field.select(".arc-body")
	      .attrTween("d", arcTween(arcBody))
	      .style("fill", 
		  function(d) { return color(d.value); });}  //1stKPI
	
 	if(this.childNodes[1].id=="arc-center-2"){
		  field.select(".arc-body")
		      .attrTween("d", arcTween(arcBody))
		      .style("fill", function(d) { return "hsla(182, 100%, 14%,0.25)"; });} //1st KPI complement 
	
	if(this.childNodes[1].id=="arc-center-1"){
		  field.select(".arc-body")
		      .attrTween("d", arcTween(arcBody))
		      .style("fill", function(d) { return "hsl(226, 100%, 50%)"; });} //progressValue
	  
 	if(this.childNodes[1].id=="arc-center-0"){
		  field.select(".arc-body")
		      .attrTween("d", arcTween(arcBody))
		      .style("fill", function(d) { return "hsla(226, 100%, 14%,0.25)"; });} //progressValue complement 
	  
  	if(this.childNodes[1].id=="arc-center-4"){
		  field.select(".arc-body")
		      .attrTween("d", arcTween(arcBody))
		      .style("fill", function(d) { return "hsla(323, 100%, 14%,0.25)"; });} //3rd KPI complement 
	  
	  	if(this.childNodes[1].id=="arc-center-5"){
		  field.select(".arc-body")
		      .attrTween("d", arcTween(arcBody))
		      .style("fill", function(d) { return color3(d.value);; });} // 3rd KPIValue
	  
	  if(this.childNodes[1].id=="arc-center-6"){
		  field.select(".arc-body")
		      .attrTween("d", arcTween(arcBody))
		      .style("fill", function(d) { return "hsla(82, 100%, 14%,0.25)"; });} //2nd KPI complement
	
	  if(this.childNodes[1].id=="arc-center-7"){
		  field.select(".arc-body")
		      .attrTween("d", arcTween(arcBody))
		      .style("fill", function(d) { return color2(d.value); });} // 2nd KPIValue

  field.select(".arc-center")
      .attrTween("d", arcTween(arcCenter));

  field.select(".arc-text")
      .text(function(d) { return d.text; });
}


function arcTween(arc) {
  return function(d) {
    var i = d3.interpolateNumber(d.previousValue, d.value);
    return function(t) {
      d.value = i(t);
      return arc(d);
    };
  };
}


function fields() {
  return [
  {index: .1,     value: 1},
	{index: .1,   value: progressValue/100},
   {index: .3,   value: 1},
    {index: .3,   value: KPIValues[2]/100}, 
	{index: .5, value: 1},
	{index: .5,  value: KPIValues[0]/100},
	{index: .4,  value: 1},
    {index: .4,  value: KPIValues[1]/100}, 
  ];
}
/* End of line*/


//Edit Anil On Feb 29, 2016 Schüttelfunktion

/* EDIT BY ANIL ON FEB 29, 2016*/
/* Functions for the shake functionality*/
(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global, global.document);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global, global.document);
    } else {
        global.Shake = factory(global, global.document);
    }
} (typeof window !== 'undefined' ? window : this, function (window, document) {

    'use strict';

    function Shake(options) {
        this.hasDeviceMotion = 'ondevicemotion' in window; //feature detect

        this.options = {
            threshold: 15, //default velocity threshold for shake to register
            timeout: 1000 //default interval between events
        };

        if (typeof options === 'object') {
            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        }

        this.lastTime = new Date();  //use date to prevent multiple shakes firing

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        //create custom event
        if (typeof document.CustomEvent === 'function') {
            this.event = new document.CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === 'function') {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else {
            return false;
        }
    }

    Shake.prototype.reset = function () {     //reset timer values
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    Shake.prototype.start = function () {     //start listening for devicemotion
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
    };

    Shake.prototype.stop = function () {     //stop listening for devicemotion
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };

    Shake.prototype.devicemotion = function (e) {      //calculates if shake has occured
        var current = e.accelerationIncludingGravity;
        var currentTime;
        var timeDifference;
        var deltaX = 0;
        var deltaY = 0;
        var deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > this.options.timeout) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    };

    Shake.prototype.handleEvent = function (e) {	//event handler
        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    return Shake;
}));
/* End of line */


/* EDIT BY MARVIN ON MAR 5, 2016*/
/* Lade Kartendienstlinks aus XML und gebe sie dem anchor Tag im location jsp als href mit. target: _blank oeffnet Link in neumen Tab Funktion wird in events.jsp aufgerufen */
function titlePressed(){
	var aCountrymap = document.getElementById("showMap");
	var mapLinkXML =  $xml.find('maplink').text();
	aCountrymap.setAttribute("href", mapLinkXML);
	aCountrymap.setAttribute("target", "_blank");
}
/* End of line */


/* EDIT BY ANIL ON MAR 4, 2016*/
/* Function in order to play the national anthem*/
function buttonPressed(){
	if ($xml.find('nationalhymne').text() != '' ) {
		
	var audio = document.getElementById("audioHymne");
	var pathAnthem = $xml.find('nationalhymne').text();
	
	if(audio.paused == false){
		audio.pause();
	} else{
		audio.setAttribute("src", pathAnthem);
	audio.setAttribute("type", "audio/mpeg");
		audio.play();
	}	
}}
/* End of line */
