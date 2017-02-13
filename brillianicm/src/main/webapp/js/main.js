function getXml(id) {	
	//print name to into the "account" button
	$("#account").html(gameData.firstName+' '+ gameData.lastName);
	$.get('Event', {id : id, userid: userid, type : 'node'}, function(xml) {
		//Fix XML
		var str1 = '<events>';
		var str2 = '</events>';
		xml = str1 + xml + str2;
	//alert(xml);
		
		/* Replaces Prename, Surname and Gender of the User */
		xml = xml.replace(/%prename%/g, gameData.firstName);
		xml = xml.replace(/%surname%/g, gameData.lastName);
		xml = xml.replace(/%gender%/g, gameData.address);
		
		//Create Jquery XML Element
		$xml = $(xml);
		if (id=="l000e000") {
			$countrySelectionXml = $xml
			modifyPathsDependingOnGender($xml);
			loadDropDown($xml);
		}

		//General XML Event Variables
		var id = $xml.find('event').attr('id');
		var eventtype = $xml.find('event').attr('eventtype');
		var loc = $xml.find('event').attr('loc');
		var level = $xml.find('event').attr('level');
		
		/* EDIT BY CHRIS ON FEB 27, 2016*/
		/* Reading the progress value from masterfile.xml*/
		getProgress();
		/*End of line*/
		
		// EDIT BY MANH ON FEB 15, 2016
		// Check if a goodie is placed on the current page
		getGoodie();
		// End of line
	
		// Display background-image
		/* EDIT BY JONAS ON FEB 27, 2016 */
		/* Removing the following line of code since it causes errors */
		//$('.mainWindow').css('background-image', 'url(images/background/'+level+'.png)');
		/* End of line*/
		$('.mainWindow').show();
		
		//Wird nur beim ersten Mal zu Beginn des Spiels ausgef�hrt (Get Name and set Level etc.)
		if (firstFlag == false){			
		$('.welcome').text('Welcome ' + gameData.firstName + ' ' + gameData.lastName);
			firstFlag = true;
		}else{
			var imtime = $xml.find('event').attr('imtime');
			var imcost = $xml.find('event').attr('imcost');
			var imqual = $xml.find('event').attr('imqual');
			updateTCQValues(imtime, imcost, imqual);
			gameData.gamePath = gameData.gamePath + ';' + id;
			setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
			saveGame(userid, gameData.gamePath, gameData.imtime, gameData.imcost, gameData.imqual);
			//F�ge die neue Id zum GamePath hinzu
		}
		
		//Verstecke alle Location Inhalte
		hideDialog();
		hideSelection();
		hideAllocation();
		hideAllocationTwo();
		hideAllocationThree();
		hideMatrixAllocationStandard();
		hideMatrixAllocation();
		hideConversation();
		hideTextBox();
		hideWorldmap();
		hideScrollBar();
		hideMatrixAllocationAlternate();
		hideFactsheet();
		/*
		 *Christian Heyer
		 *02.03.2016
		 */
		hideMapAllocation();
		/* END */
		
		/*
		 *Anastasia Reimer
		 *03.03.2016
		 */
		hideAllocationFour();
		/* END */
		showLocation();
if(id == lastEvent){
			showResult();
			}
	});	
};



function modifyPathsDependingOnGender(xml){
	if (gameData.gender == 1){
		var countryStartingPointRegex = new RegExp('l[1-9]{1}0{2}e0{3}');
		$(xml).find("option").each(function(){
			var href = $(this).attr('href');
			if (href.match(countryStartingPointRegex)){
				$(this).attr('href', href.replace("e000", "e001"));
			}
		});
	}
}
function loadDropDown(xml){
	$('#contry-list').empty();
	var selectBox = document.getElementById("contry-list");
	opt = document.createElement("option");
	opt.innerHTML = "Select"
	selectBox.appendChild(opt);
	opt = null;

	$countrySelectionXml.find("option").each(function(){
		var country = $(this).text();
		//console.log(country);
		var opt = document.createElement("option");
		opt.innerHTML = country;
		selectBox.appendChild(opt);
		var completed = $(this).attr('completed');
		if(completed == "true"){
			 opt.style.backgroundColor = 'green' ;	
		}else { }

		
	});
}
$(document).ready(function(){

	if(userid == null){	
		window.location.href = 'LogoutUser';		
	}else{
		
		$('.fancybox').fancybox();
		
		//Globale Variablen
		$xml = '';
		loc = '';
		locOld = '';
		buttonIdOld = '';
		eventtypeOld = '';
		tabsContainer = '';	
		firstFlag = false;
		newMailDisabled = true;
		firstEvent = 'l000e000';
		lastEvent = 'l999e999';
		//jobofferEvent = 'l000e000';
		unreadMails = [];
		
		//Lokale Variablen
		var lastName;
		var firstName;	
		var gender;
		var address = '';
		var imtime;
		var imcost;
		var imqual;
		var gamePath;
		var id;
		var idArray;
		
		$('#imprint').bind('click', function(){
			showImprint();
		});
	
		$('#help').bind('click', function(){
			showPdf('documents/BA_notizblock.pdf');
		});
	
		$('#logout').bind('click', function(){
			window.location.href = 'LogoutUser';
		});	
		
		$('.projektStrukturPlanButton').bind('click', function(){
			showPdf('documents/WBS.pdf');
		});
		
		$('.projektCharterButton').bind('click', function(){
			showPdf('documents/Project_Charter.pdf');
		});
		
		$('.ganttButton').bind('click', function(){
			showPdf('documents/Project.pdf');
		});

		$('.mainLogo').bind('click', function(){
			showAbout();
		});
		
		$('.projektStrukturPlanButton').hide();
		$('.projektCharterButton').hide();
		$('.ganttButton').hide();
		
		//Get Game Data
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
				
				if(gender == '0'){
					address = 'Mrs.';
				}else if (gender == '1'){
					address = 'Mr.';
				}

				gameData = { firstName : firstName, 
							 lastName : lastName, 
							 gender : gender,
							 address : address,
							 gamePath : gamePath, 
							 id : id, 
							 imtime : imtime, 
							 imcost : imcost, 
							 imqual : imqual
				};
				
				//console.log('LoadGame> ' + JSON.stringify(gameData));
				//Der Ladebildschirm
				showLoading();				
			} 
		});
		$.ajax({
			url: 'Event',
			type: 'get',
			dataType: 'html',
			data: {userid : userid, type : 'node', id :  "l000e000"},
			async: true,
			success: function(data) {
				$countrySelectionXml = $(data);
				modifyPathsDependingOnGender($countrySelectionXml);
				loadDropDown();
			}
		});
	}		
});


//EDIT BY CHRIS ON FEB 27, 2016
//Get the defined progress value from the XML
function getProgress() {
	if ($xml.find('progressValue').text() != '' ) {
		if ($xml.find('progressValue').text() == '0' ) {	
			progressValue = 0;	// Indicate new progress value "0%"
			tick();
		} else if ($xml.find('progressValue').text() == '25' ) {
			progressValue = 25;	// Indicate new progress value "25%"
			tick();
		} else if ($xml.find('progressValue').text() == '50' ) {
			progressValue = 50; 	// Indicate new progress value "50%"
			tick();
		} else if ($xml.find('progressValue').text() == '75' ) {		
			progressValue = 75;  // Indicate new progress value "75%"
			tick();
		} else if 	($xml.find('progressValue').text() == '100' ) {		
			progressValue = 100; 	// Indicate new progress value "100%"
			tick();
		}	
	}
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Main logic of the goodie system -> Find out if a goodie was defined in the XML
function getGoodie() {
	var divPolarClock = document.getElementById('polarclock'); // Reference the polar clock

	if($xml.find('goodieType').text() != '') {	 //Check if goodieType is set in the XML (=if a goodie exists for the page)	
		makePolarClockPulse(); 	// Make the polarclock pulse
		divPolarClock.addEventListener('mouseover', showPointer(divPolarClock)); 	// Show the pointer symbol if the user hovers over the polarclock
		divPolarClock.onclick = showModalPopup; 	// Make the polarclock clickable and open the popup window
	} else {
		turnOffPolarClockPulse(); 	// Turn off the pulse effect
		showDefaultCursor(divPolarClock);	// Show the default cursor
		divPolarClock.onclick = "";	// Remove the function from the onclick event
	}
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Add a modal popup on top of the screen (transparent layer, container for the goodie, close-button)
function showModalPopup() {
	var divPolarClock = document.getElementById('polarclock'); 	//Reference the polarclock

	// Create the modal popup including its content
	$(document).ready(function() {
		var divLayer = document.createElement('div');	// Add a dark transparent layer on top of the entire screen
		divLayer.id = 'divLayer';
		document.body.appendChild(divLayer);

		var divClose = document.createElement('div');	// Add a close icon ("x") to the layer
		divClose.id = 'divClose';
		divClose.innerHTML = "x";
		document.getElementById('divLayer').appendChild(divClose);

		var divContent = document.createElement('div'); 	// Add a container for the content to the layer
		divContent.id = 'divContent';
		document.getElementById('divLayer').appendChild(divContent);

		setGoodie(); 	// Get the goodie data and add it to divContent of the modal popup

		centerContent();	// Center "divContent"

		$('#divLayer').hide().fadeIn(300);	// Hide the entire layer and show it using a fade effect

		// Remove the layer if the user clicks the close icon
		$('#divClose').on('click', function() {
			$('#divLayer').fadeOut(300, function() {
				$(this).remove();

				turnOffPolarClockPulse(); 	// Turn off the pulse effect of the polarclock

				if ($xml.find('goodieSource').text() == '') {	// Prevent the user from clicking the polarclock again
					divPolarClock.onclick = "";		//Remove the function from the onclick event
					showDefaultCursor(divPolarClock); 	//Show the default cursor
				}

			});
		});
		
	});

	$(window).resize(function(){
		centerContent(); 	// Center the content container if the user resizes the window
	});
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Check which goodietype is defined in the XML
function setGoodie() {
	var goodieType = $xml.find('goodieType').text();	// Get the goodietype from the XML
	var goodieHeading = $xml.find('goodieHeading').text();	// Get the goodieheading from the XML
	var goodieSource = $xml.find('goodieSource').text();	// Get the goodiesource from the XML

	if(goodieType == "Audio") {		//Check which goodietype was defined
		addAudioToPopup(goodieHeading, goodieSource);	
	} else if(goodieType == "Image") {
		addImageToPopup(goodieHeading, goodieSource);
	} else if(goodieType == "Video") {
		addVideoToPopup(goodieHeading, goodieSource);
	}
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Add an HTML5 audioplayer including its source to the modal popup
function addAudioToPopup(goodieHeading, goodieSource) {
	var divContent = document.getElementById('divContent');	// Reference the divContent-container

	if($xml.find('goodieHeading').text() != "") {	// Add the goodie text to the popup if it is defined in the XML
		var divGoodieHeading = document.createElement('div');
		divGoodieHeading.id = "divGoodieHeading";
		divGoodieHeading.innerHTML = '<center><h2>' + goodieHeading + '</h2></center>';
		document.getElementById('divContent').appendChild(divGoodieHeading);
	}

	var divAudio = document.createElement('div');	// Create a div-container for the audioplayer
	divAudio.id = "divAudio";
	document.getElementById('divContent').appendChild(divAudio);

	// Rescale the divContent-container
	var divAudioWidth = 300;
	var divAudioHeight = 100;
	var newDivContentWidth = divAudioWidth + (2 * divAudioWidth * 0.1);
	var newDivContentHeight = divAudioHeight + (2 * divAudioHeight * 0.1);
	$('#divContent').width(newDivContentWidth);
	$('#divContent').height(newDivContentHeight);
	centerContent();

	var audio = document.createElement('audio');	// Add the audioplayer to the priorly defined div-container
	audio.setAttribute("src", goodieSource);
	audio.setAttribute("controls", "controls");
	audio.setAttribute("width", divAudioWidth);
	audio.setAttribute("height", divAudioHeight);
	document.getElementById('divAudio').appendChild(audio);
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Add an HTML5 video including its source to the modal popup
function addVideoToPopup(goodieHeading, goodieSource) {
	var divContent = document.getElementById('divContent');

	if($xml.find('goodieHeading').text() != "") {	// Add the goodie text to the popup if it is defined in the XML
		var divGoodieHeading = document.createElement('div');
		divGoodieHeading.id = "divGoodieHeading";
		divGoodieHeading.innerHTML = '<center><h2>' + goodieHeading + '</h2></center>';
		document.getElementById('divContent').appendChild(divGoodieHeading);
	}

	var divVideo = document.createElement('div'); 	// Create a div-container for the video
	divVideo.id = "divVideo";
	document.getElementById('divContent').appendChild(divVideo);

	// Rescale the divContent-container
	var divVideoWidth = 560;
	var divVideoHeight = 315;
	var newDivContentWidth = divVideoWidth + (2 * divVideoWidth * 0.1);
	var newDivContentHeight = divVideoHeight + (divVideoHeight * 0.05);
	$('#divContent').width(newDivContentWidth);
	$('#divContent').height(newDivContentHeight);
	centerContent();

	var video = document.createElement('video');	// Add the videoplayer to the priorly defined div-container
	video.setAttribute("src", goodieSource);
	video.setAttribute("type", "video/mp4");
	video.setAttribute("width", divVideoWidth);
	video.setAttribute("height", divVideoHeight);
	video.setAttribute("controls", "controls");
	document.getElementById('divVideo').appendChild(video);
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Add an image including to the modal popup
function addImageToPopup(goodieHeading, goodieSource) {
	var divContent = document.getElementById('divContent');

	// Add the goodie text to the popup
	if($xml.find('goodieHeading').text() != "") {
		var divGoodieHeading = document.createElement('div');
		divGoodieHeading.id = "divGoodieHeading";
		divGoodieHeading.innerHTML = '<center><h2>' + goodieHeading + '</h2></center>';
		document.getElementById('divContent').appendChild(divGoodieHeading);
	}

	var divImage = document.createElement('div');	// Create a div-container for the image
	divImage.id = "divImage";
	document.getElementById('divContent').appendChild(divImage);

	var image = document.createElement('img');	// Create an image
	image.id = 'goodieImage';

	image.onload = function(){
		var divContentWidth = $('#divContent').width();
		var imageWidth = $('#goodieImage').width();
		var imageHeight = $('#goodieImage').height();

		if(imageWidth > divContentWidth) { 	// Scale image to fit the div container if it's width is larger
			image.setAttribute('width', '100%');
			image.setAttribute('height', 'auto');
		} else {
			var newDivContentWidth = imageWidth + (2 * imageWidth * 0.1); // If the image is smaller than divContent, scale down divContent's width
			var newDivContentHeight = imageHeight;

			$('#divContent').width(newDivContentWidth);
			$('#divContent').height(newDivContentHeight);
			centerContent();
		}
	}

	image.src = goodieSource;
	document.getElementById('divImage').appendChild(image);
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Center the modal popup vertically and horizontally
function centerContent() {
	var container = $('#divLayer');
	var content = $('#divContent');

	content.css("left", (container.width()-content.width())/2);		// Center content horizontally
	content.css("top", (container.height()-content.height())/2);	// Center content vertically
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Set the cursor icon to a pointer
function showPointer(div) {
	div.style.cursor = "pointer";	
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Set the cursor icon to default (arrow)
function showDefaultCursor(div) {
	div.style.cursor = "default";	
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Apply an pulse effect defined in master.css to the polarclock
function makePolarClockPulse() {
	var divPolarClock = document.getElementById('polarclock');
	divPolarClock.className = 'pulse';	
}
//END OF LINE


//EDIT BY MANH ON MAR 5, 2016
//Remove the pulse effect from the polarclock
function turnOffPolarClockPulse() {
	var divPolarClock = document.getElementById('polarclock');
	divPolarClock.className = '';	
}
//END OF LINE
