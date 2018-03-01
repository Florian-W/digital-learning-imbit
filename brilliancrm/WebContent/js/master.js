function getXml(id) {	
	
	$.get('Event', {id : id, type : 'node'}, function(xml) {
		//Fix XML
		var str1 = '<events>';
		var str2 = '</events>';
		xml = str1 + xml + str2;
		
		/* Replaces Prename, Surname and Gender of the User */
		xml = xml.replace(/%prename%/g, gameData.firstName);
		xml = xml.replace(/%surname%/g, gameData.lastName);
		xml = xml.replace(/%gender%/g, gameData.address);
		
		//Create Jquery XML Element
		$xml = $(xml);
		
		//General XML Event Variables
		var id = $xml.find('event').attr('id');
		var eventtype = $xml.find('event').attr('eventtype');
		var loc = $xml.find('event').attr('loc');
		var level = $xml.find('event').attr('level');
		
		//General PageElement Variables
		var mainLocationButton = $('.mainLocationButton');
		var eventContainer = $('.mainEventContainerLaptop');
		
		// Display the elements on the right side pane based on the level
		if(level >= 12){
			$('.projektCharterButton').css('background-image', 'url(images/icons/Charter.png)');
			$('.projektCharterButton').show();
		}	
		
		if(level >= 202){
			$('.projektStrukturPlanButton').css('background-image', 'url(images/icons/Projektstrukturplan.png)');
			$('.projektStrukturPlanButton').show();
		}
		
		if(level >= 290){
			$('.ganttButton').css('background-image', 'url(images/icons/Gantt.png)');
			$('.ganttButton').show();
		}
		
		//Wird nur beim ersten Mal zu Beginn des Spiels ausgeführt (Get Name and set Level etc.)
		if (firstFlag == false){			
			$('.welcome').text('Welcome ' + gameData.firstName + ' ' + gameData.lastName);
			if(locOld != loc || (eventtypeOld != '2' && eventtype == '2')){
				setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
				setLevelImage(level);
			}
			firstFlag = true;
		}else{
			var imtime = $xml.find('event').attr('imtime');
			var imcost = $xml.find('event').attr('imcost');
			var imqual = $xml.find('event').attr('imqual');
			
			//Update der Time Cost Quality Werte
			updateTCQValues(imtime, imcost, imqual);
			
			//Füge die neue Id zum GamePath hinzu
			gameData.gamePath = gameData.gamePath + ';' + id;

			if(locOld != loc || (eventtypeOld != '2' && eventtype == '2')){
				setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
				setLevelImage(level);
				saveGame(userid, gameData.gamePath, gameData.imtime, gameData.imcost, gameData.imqual);
			}
		}
		/* Highlights Mail Button upon arrival of an unread Mail (1) or  when User has to write a New Mail (2) as next task */
		if(eventtype == '1' || eventtype == '2'){
			addHighlightMail();
		}
		if(eventtype == '1'){
			unreadMails.push(id);
		}
				
		//Show the 'New Mail' button only when a MailDraft-Event happens
		newMailDisabled = true;
		if(eventtype == 2){
			newMailDisabled = false;
		}
		
		//Disable 'New Mail' Button
		try{
			tabsContainer.tabs({
				tools:[{
					text:'New',
					iconCls:'icon-add',
					handler:function(){
						showNewMailTab();
						newMailDisabled = true;
					},
					disabled:newMailDisabled
				}]
			});
			$('.tabs-tool').addClass('new-button-highlight')
		}catch(err){
			
		}
		
		//console.log('getXml > Id: ' + id + '; Time: ' + gameData.imtime + '; Cost: ' + gameData.imcost + '; Quality: ' + gameData.imqual); //For Debugging
		
		//Verstecke alle Location Inhalte
		hideDialog();
		hideSelection();
		hideAllocation();
		hideMatrixAllocation();
		
		//Wenn Update Location und kein MailDraft
		if(locOld == loc && eventtype != '2'){		
			removeHighlight(mainLocationButton, loc);			
			//console.log('updateLocation > Id: ' + id + '; Time: ' + gameData.imtime + '; Cost: ' + gameData.imcost + '; Quality: ' + gameData.imqual); //For Debugging
		}
		
		if (eventtype == '3' && locOld == loc){			
			loadDialog();
		}else if ((eventtype == '4' || eventtype == '5') && locOld == loc){
			loadSelection();		
		}else if ((eventtype == '6' || eventtype == '7') && locOld == loc){
			loadAllocation();		
		}else if (eventtype == '8' && locOld == loc){
			loadMatrixAllocation();
		}else if(eventtype == eventtypeOld && eventtype == '2') {
			loadMailDraft();		
		}else if(eventtype == '13' && locOld == loc){
			showNotification();
		}else{
			//Wenn das neue Event an einer anderen Location stattfindet bzw. das Event kein Dialog, keine Auswahl und keine Zuordnung ist			
			
			if(id != lastEvent){
				$('.mainLocationButton').linkbutton('enable');
			}
			
			if (eventtype == '1'){
				showMailNotification();
				hideLaptop();	
				hideLocation();
			}
			
			if(loc != ''){
				addHighlight(mainLocationButton, loc);
			}
			
			
			if(eventtype != eventtypeOld && eventtypeOld == '2'){
				try{
					$('.mainLocationButton').linkbutton('enable');
					$('.mainMailButton').linkbutton('enable');
					showMsg('Info', 'Mail Sent'); //For Debugging
					eventContainer.window({modal:false,closable:true});	
					$('.tabs-tool').removeClass('new-button-highlight');
					tabsContainer.tabs('close', 'New Mail');
				}catch(err){
					
				};
			}			

			mainLocationButton.linkbutton({
			    onClick: function(){
			    	showLocation ($(this).attr('id'));			
			    }
			});

			$('.mainMailButton').linkbutton({
				onClick: function(){
					showLaptop();
					removeHighlightMail();
				}				
			});				
		}
		
		if(id == firstEvent){
			showLocation('4');	
		}else if(id == lastEvent){
			showResult();
		//Umbenennung des Next Buttons in Accept Job Offer am Spiel Beginn 
		}else if(id == jobofferEvent){
			$('#continueButton').html("Accept Job Offer");
		}
		
		//Setzte die Werte für locOld & eventtypeOld - wichtig für logische Überprüfungen im nächsten Durchlauf
		if(eventtype == '1'){
			locOld = '';
		}else{
			locOld = loc;
		}	
		eventtypeOld = eventtype;
	});	
}

// Writes the specified email into the GUI
function loadMail (from, to, date, subject, content, attachment, attachmentHref) {
	var tag = 'Mail';
	
	if (tabsContainer.tabs('exists', subject)){
		tabsContainer.tabs('select', subject);
	}else{
		tabsContainer.tabs('add',{
		    title:subject,
		    href:tag,
		    closable:true
		});
		
		tabsContainer.tabs('getSelected').panel({
			href:tag,
			onLoad:function(){
				$(this).find('.from').text(from);
				$(this).find('.to').text(to);
				$(this).find('.date').text(date);
				$(this).find('.subject').text(subject);
				$(this).find('.content').html(content);
				$(this).find('.attachment').text(attachment);
				$(this).find('.attachment').attr('data-href', attachmentHref);
				
				$(this).find('.attachment').bind('click', function(){
					showPdf('documents/' + $(this).attr('data-href'));
				});				
			}
		});	
	}
}

// Opens the email draft matching the current element of the XML and writes it into the GUI
function loadMailDraft () {
	var window = $('.mainEventContainerLaptop');
	//MailDraft Event Values from XML
	var from = $xml.find('from').text();
	var to = $xml.find('to').text();
	var date = $xml.find('date').text();
	var subject = $xml.find('subject').text();
	var container = $('.mailDraftContainer');
	
	var optionButton = container.find('.option');
	$('.mainLocationButton').linkbutton('disable');
	window.window({modal:false,closable:false});
	$('.mainMailButton').linkbutton('disable');
	container.find('.from').text(from);
	container.find('.to').text(to);
	container.find('.date').text(date);
	container.find('.subject').text(subject);
	
	$xml.find('content').each(function(index){
		var text = $xml.find('content').eq(index).html();
		container.find('.content').eq(index).html(text);
	});
	
	optionButton.unbind('click');
	
	$xml.find('option').each(function(index){
		var text = $xml.find('option').eq(index).text();
		var href = $xml.find('option').eq(index).attr('href');
		
		optionButton.eq(index).text(text);
		optionButton.eq(index).bind('click', function(){
	        getXml(href);
	    });
	});	
}

// Loading a dialog style event from the XML to perpare its content for display
function loadDialog () {
	var partner = $xml.find('partner').text();
	var content = $xml.find('content').text();

	var dialogPartnerNameContainer = $('.dialogPartnerName');
	var dialogPartnerTextContainer = $('.dialogPartnerText');
	
	var background;
	var backgroundWithPartnerUrl;
		
	//Lade den Dialog Hintergrund
	if ($xml.find('bgimg').text() != '') {
		background = $xml.find('bgimg').text();
		backgroundWithPartnerUrl = 'images/' + background;
		setDialogBackground(backgroundWithPartnerUrl, false);
	}
	videoEnabled=getCookie("video");
	if (($xml.find('bgvid').text() != '') && (videoEnabled == "true")){
		background = $xml.find('bgvid').text();
		backgroundWithPartnerUrl=window.location.href;
		position = backgroundWithPartnerUrl.lastIndexOf('/');
		backgroundWithPartnerUrl = backgroundWithPartnerUrl.slice(0, position+1);
		backgroundWithPartnerUrl = backgroundWithPartnerUrl.concat("/videos/" + background);
		setDialogBackground(backgroundWithPartnerUrl, true);
	} 

	
	
		
	$('.dialogButton').remove();
	dialogPartnerNameContainer.text(partner);
	dialogPartnerTextContainer.text(content);
	
	$xml.find('option').each(function(index){
		var text = $xml.find('option').eq(index).text();
		var href = $xml.find('option').eq(index).attr('href');
		var dialogTextContainer = $('.dialogTextContainer');
		
		dialogTextContainer.append('<div class="dialogButton"></div>');
		var dialogButton = $('.dialogButton').eq(index);
		
		dialogButton.linkbutton({
			text:text
		});
		dialogButton.bind('click', function(){				
	        getXml(href);
	    });		
	});	
	
	//Cancels loaded TTS-Dialogues and resets the queue:
	speechSynthesis.cancel();
		
	// Generates TTS object and fill it with the content of the dialog partner:
	// @param tts Text-to-Speech object and content loaded
	// @param voices loads available voices and stores them
	var tts = new SpeechSynthesisUtterance(content);
		
	//Get all available voices for the browser and safe in an array:
	var voices = window.speechSynthesis.getVoices();
	
	//Checks if Cookie has TTS-settings on "true":
	var ttsSettings="false";
	ttsSettings=getCookie("tts");
	if (ttsSettings == "true") {
		 
	 
	//Setting speechSynthesis parameters for Male Voice:
	tts.native = false;
	tts.lang = 'en-GB';
	tts.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Male'; })[0];
	
	// Checks if the partner female and setting female parameters:
	if(partner.indexOf('Thomas') == -1 && partner.indexOf('Pria') == -1 && partner.indexOf('Martin') == -1 && partner.indexOf('Avinash') == -1 && partner.indexOf('Rajesh') == -1 && partner.indexOf('Vance') == -1 && partner.indexOf('Stylus') == -1 && partner.indexOf('Jeremy') == -1)
		{
		//alert("Female detected!");
		tts.native = false;
		tts.lang = 'en-IE';
		tts.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Moira'; })[0];
		
		if(checkBrowserName('chrome'))
			{
			//alert("Chrome detected");
			tts.native = false;
			tts.lang = 'en-US';
			tts.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google US English'; })[0];
			}
		
		}
	
	//Starts TTS:
	speechSynthesis.speak(tts);
	 }
	 
	//Opens the dialog:
	showDialog();
}


//Browserweiche:
function checkBrowserName(name)
{ 
	var agent = navigator.userAgent.toLowerCase(); 
	if (agent.indexOf(name.toLowerCase())>-1) 
	{ 
		return true; 
	} 
	return false; 
} 


function loadSelection () {
	var eventtype = $xml.find('event').attr('eventtype');
	var description = $xml.find('description').text();
	var container = $('.selectionContainer');	
	var descriptionContainer =  container.find('.selectionTitleText');
	var imgContainer = container.find('.selectionPicture');
	var textContainer = container.find('.selectionText');
	var button = container.find('.selectionButton');	
	
	descriptionContainer.text(description);
	$xml.find('option').each(function(index){
		var text = $xml.find('option').eq(index).text();
		var href = $xml.find('option').eq(index).attr('href');
		
		textContainer.eq(index).text(text);
		button.eq(index).bind('click', function(){
			$('.selectionContainer').hide();
			getXml(href);								        
	    });		
		if (eventtype == 5){
			var img = 'images/' + $xml.find('option').eq(index).attr('img');
			imgContainer.eq(index).attr('src', img);
			$('.selectionContainer').find('.fancybox').eq(index).attr('href', img);
			$('.selectionContainer').find('.fancybox').fancybox();
		}
	});
	if (eventtype == 5){
		imgContainer.show();
	}								
	showSelection();
}

function loadAllocation () {
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();	
	var container = $('.allocationContainer');
	var descriptionContainer = container.find('.description');
	var phaseTitleContainer = container.find('.phaseTitle');
	var phaseContainer = container.find('.phase');
	var continueButton = $('#continueButton');
	var draggableContainer = $('.draggableContainer');

	$('.drag').remove();
	
	$xml.find('option').each(function(index){
		var itemText = $(this).text();
		var itemColumn = $(this).attr('column');
		var itemInfo = $(this).attr('finfo');
		var itemDescription = $(this).attr('fdesc');
		var itemRank = $(this).attr('rank');	
		//***code needed for tooltip function
		var itemTitle = $(this).attr('title');
		var itemHoverTitle = '';
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			var itemHoverTitle = ' title="' + itemTitle + '"';
		}
		//***
		draggableContainer.append('<div class="drag bc bph" data-column="' + itemColumn + '" data-finfo="' + itemInfo + '" data-fdesc="' + itemDescription + '" data-rank="' + itemRank + '"' + itemHoverTitle + '>' + itemText + '</div>');
	});
	
	$('.drag[title]').tooltip(); //jQuery tooltipp function for all drag div, that contain a titl attribute
	
	var draggableItem = container.find('.drag');
	
	descriptionContainer.text(description);
	
	$xml.find('column').each(function(index){
		phaseTitleContainer.eq(index).text($(this).html());
	});
	
	continueButton.unbind('click');
	continueButton.bind('click', function(){
		$('.phase').css('background-color', '');
		var correct = true;
		var allDragged = true;
		
		//Check if Items are allocated in the right column
		$('.phase').each (function(index) {
			$(this).find('.drag').each(function(i) {
				if ($(this).attr('data-column')-1 != index){
					correct = false;
					$(this).addClass('dragIncorrect');
				}
			});
		});
		//Check if all items have been dragged
		$('.draggableContainer').find('.drag').each(function() {
				allDragged = false;
		});
		if (correct == true  && allDragged == true){
			getXml(href);
			container.window('close');
		} else {	
			if (allDragged == false){
				showMsg('Info', 'You have not allocated all elements'); //For Debugging
			}
			if (correct == false){
			showMsg('Info', 'Incorrect Allocation'); //For Debugging
			}					
		}
	});	
	showAllocation();
	
	//Drag Funktionalität
	draggableItem.draggable({
        proxy:'clone',
        revert:true,
        cursor:'auto',
        onStartDrag:function(){
            $(this).draggable('options').cursor='not-allowed';
            $(this).draggable('proxy').addClass('dp');
            
        	$('.dragInfoContainer').html('');
        	$('.dragInfoContainer').append('<div class="fbutton"><span class="fdescription"></span></div>');
        	
        	var infoButton = $('.fbutton');        	
        	var info = $(this).attr('data-finfo');
        	var description = $(this).attr('data-fdesc');
        	
        	infoButton.linkbutton({
        		text: description,
        		onClick: function(){
        			showPdf('documents/' + info);
        		}
        	});
            
            $(this).removeClass('dragIncorrect');
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='auto';
        }
    });
	
	//Drop Funktionalität
	phaseContainer.droppable({
        accept:'.drag',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).append(source);
            $(this).removeClass('elementHighlight');
        }
    });
}

function loadMatrixAllocation () {
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var xAxisXML = $xml.find('xaxisdescription').text().toUpperCase();
	var yAxisXML = $xml.find('yaxisdescription').text().toUpperCase();
	var container = $('.matrixAllocationContainer');
	var descriptionContainer = container.find('.description');
	var xAxisDescriptionContainer = $('#xAxisDescription');
	var yAxisDescriptionContainer = $('#yAxisDescription');
	
	//Auswahl des Divs welches die "Zielflächen" des Matrixspiels enthält um ihn droppable zu machen (akzeptieren von divs erlauben)
	var tileAcceptors = container.find('.tileAcceptor');
	var continueButtonMatrix = $('#continueButtonMatrix');
	//Enthält zuzuordnende tiles
	var draggableTilesContainer = $('.draggableTilesContainer');

	$('.dragTile').remove();
	
	$xml.find('option').each(function(index){
		var itemText = $(this).text();
		var itemRank = $(this).attr('rank');
		var itemDescription = $(this).attr('fdesc');
		//***code needed for tooltip function
		var itemTitle = $(this).attr('title');
		var itemHoverTitle = '';
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			var itemHoverTitle = ' title="' + itemTitle + '"';
		}
		//***
		draggableTilesContainer.append('<div class="dragTile bc bph" data-fdesc="' + itemDescription + '" rank="' + itemRank + '"' + itemHoverTitle +'>' + itemText + '</div>');
	});
	
	$('.drag[title]').tooltip(); //jQuery tooltipp function for all drag div, that contain a titl attribute
	
	
	//Auswahl aller Tiles die beweglich sind
	var draggableItems = container.find('.dragTile');
	descriptionContainer.text(description);
	xAxisDescriptionContainer.text(xAxisXML);
	yAxisDescriptionContainer.text(yAxisXML);
	
	//Might be reused to name axes --> Low to High Impact/Priority
	//$xml.find('column').each(function(index){
	//	phaseTitleContainer.eq(index).text($(this).html());
	//});
	
	continueButtonMatrix.unbind('click');
	continueButtonMatrix.bind('click', function(){
		$('.tileAcceptor').css('background-color', '');
		var correct = true;
		var allDragged = true;
		
		//Iteriere durch TileAcceptors, für jeden TitleAcceptor prüfe, ob der Rank des sich in ihm befindlichen
		//dragTiles dem Iterator index entspricht. Im Idealfall befindet sich im ersten TileAcceptor das dragTile
		//mit dem rank "1"
		$('.tileAcceptor').each(function(index) {
			var correctTileRank = index+1;
			if ($(this).find('.dragTile').attr('rank') != null){
				var actualTileRank = $(this).find('.dragTile').attr('rank');
				if (actualTileRank != correctTileRank){
					correct = false;
					$(this).find('.dragTile').addClass('dragIncorrect');
				}
				
				} else {
					// Wird angezeigt wenn "rank" nicht als Attribut der dragTiles gefunden werden konnte
					//--> XML überprüfen
					showMsg("There has a been a problem with the validation!");
				}
			});
		
		


		//Check if all items have been dragged
		$('.draggableTilesContainer').find('.dragTile').each(function() {
				allDragged = false;
		});
		if (correct == true  && allDragged == true){
			getXml(href);
			container.window('close');
		} else {	
			if (allDragged == false){
				showMsg('Info', 'You have not allocated all elements.'); //For Debugging
			}
			if (correct == false){
				showMsg('Info', 'You have allocated one or more items incorrectly.'); //For Debugging
			}					
		}
	});	
	showMatrixAllocation();
	
	//Drag Funktionalität
	draggableItems.draggable({
        proxy:'clone',
        revert:true,
        cursor:'auto',
        onStartDrag:function(){
            $(this).draggable('options').cursor='not-allowed';
            $(this).draggable('proxy').addClass('dp');            
            $(this).removeClass('dragIncorrect');
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='auto';
        }
    });
	
	//Drop Funktionalität für Platzhalter in Matrix und Ursprungscontainer, sodass teile wieder zurückgelegt werden können
	tileAcceptors.droppable({
        accept:'.dragTile',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).removeClass('elementHighlight');
            // Wurde dem Zielfeld bereits eine Kachel zugeordnet, wird die Funktion abgebrochen, die Kachel bleibt wo sie ist. 
    		if (e.target.hasChildNodes()) { 
    			return;
    		}
            $(this).append(source);
        }
    });
	
	draggableTilesContainer.droppable({
        accept:'.dragTile',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).append(source);
            $(this).removeClass('elementHighlight');
        }
    });
}

function fancyImageLoading(imageUrl, element){
	var img = new Array();
	img[0] = new Image();
	img[0].onload = function() {
		element.css("background-image", "url('" + imageUrl + "')");
	};
	img[0].src = imageUrl;
}

function showLocation (buttonId) {	
 	var tag = 'Location';
	var container = $('.mainEventContainer');
	var mainLocationButton = $('.mainLocationButton');	
	var eventtype =$xml.find('event').attr('eventtype');
	var loc = $xml.find('event').attr('loc');
	var backgroundPictureTransition1Url = 'images/locationBackgrounds/loc' + buttonId + 't1.png';
	var backgroundPictureTransition2Url = 'images/locationBackgrounds/loc' + buttonId + 't2.png';
	var backgroundPictureUrl = 'images/locationBackgrounds/loc' + buttonId + '.png';
	
	$('.mainEventContainerLaptop').window('close');
	$('.mainEventContainerPdf').window('close');
	
	$('.mainLocationButton').linkbutton('disable');
	container.window({closed:false,modal:false,noheader:true,draggable:false,resizable:false});
	container.panel({
		href:tag,
		onLoad:function(){

			hideDialog();
			hideSelection();
			hideAllocation();
			hideMatrixAllocation();
			
			if(buttonId == loc){
				removeHighlight(mainLocationButton, loc);
			}
			/* Filter for showing images due to location change
			 */
			if (buttonIdOld == buttonId || buttonIdOld == "3" && buttonId == "4" || buttonIdOld == "4" && buttonId == "3") {
	    			
	    			fancyImageLoading(backgroundPictureUrl, $('.locationBackgroundContainer'));					
					setTimeout(function(){
						if(buttonId == loc){
							if(eventtype == '3'){
								loadDialog();		
							}else if (eventtype == '4' || eventtype == '5'){								
								loadSelection();
							}else if (eventtype == '6' || eventtype == '7'){
								loadAllocation();	
							}else if (eventtype == '8'){
								loadMatrixAllocation();	
							}else if (eventtype == '13'){
								showNotification();							
							}
						}else{
							$('.mainLocationButton').linkbutton('enable');
							container.window({modal:false});
						}						
					},1500);
	    			
	    		} else {
	    			
	    			/* Possibility to add a filter in order to disable audio file.
	    			 * @author Laluz
	    			 */
			
	    			var audioElement = document.createElement('audio');	
	    			audioElement.setAttribute('src', 'audio/location.mp3');
					//Gotta love that melody!
					var audiosetting="false";
					audiosetting=getCookie("audio");
					if (audiosetting == "true") {
					audioElement.play();	}
	    			
	    			/* Loads background images in a row and finally loads Dialog or alike. 
	    			 * @author Laluz
	    			 */
	    			fancyImageLoading(backgroundPictureTransition1Url, $('.locationBackgroundContainer'));
	    			setTimeout(function(){
	    				fancyImageLoading(backgroundPictureTransition2Url, $('.locationBackgroundContainer'));
	    				setTimeout(function(){
	    					fancyImageLoading(backgroundPictureUrl, $('.locationBackgroundContainer'));					
	    					setTimeout(function(){
	    						if(buttonId == loc){
	    							if(eventtype == '3'){
	    								loadDialog();		
	    							}else if (eventtype == '4' || eventtype == '5'){								
	    								loadSelection();
	    							}else if (eventtype == '6' || eventtype == '7'){
	    								loadAllocation();	
	    							}else if (eventtype == '8'){
	    								loadMatrixAllocation();						
	    							}else if (eventtype == '13'){
	    								showNotification();							
	    							}
	    						}else{
	    								$('.mainLocationButton').linkbutton('enable');
	    								container.window({modal:false});
	    						}						
	    					},1500);					
	    				},1500);
	    			},1500);
	    		} 
	    	buttonIdOld=buttonId;			
		 }
	});				
}


function showLaptop () {
	var tag = 'Laptop';
	var container = $('.mainEventContainerLaptop');
	var eventtype = $xml.find('event').attr('eventtype');
		
	container.window({closed:false,modal:false,title:'Laptop',draggable:false,resizable:false,minimizable:false,maximizable:false,collapsible:false});
	container.panel({
		href:tag,
		onLoad:function(){				
			tabsContainer = $('.laptopMailClient');
			var inbox = $('.laptopMailClientInbox');
			var inboxData = {'mails': []};
			$('.laptopMailClient div.tabs-panels').addClass('bc');
			tabsContainer.tabs({
				tools:[{
					text:'New',
					iconCls:'icon-add',
					handler:function(){
						showNewMailTab();
						newMailDisabled = true;
					},
					disabled:newMailDisabled
				}]
			});
			
			if(eventtype == '2'){
				$('.tabs-tool').addClass('new-button-highlight');
			}
			
			$.get('Event', {gamePath : gameData.gamePath, type : 'inbox'}, function(inboxXml){
				var str1 = '<events>';
				var str2 = '</events>';
				inboxXml = str1 + inboxXml + str2;
				inboxXml = inboxXml.replace(/%prename%/g, gameData.firstName);
				inboxXml = inboxXml.replace(/%surname%/g, gameData.lastName);
				inboxXml = inboxXml.replace(/%gender%/g, gameData.address);	
				
				var $inboxXml = $(inboxXml);

				//General Event Values from XML
				$inboxXml.find('event').each(function(index){
					var id = $(this).attr('id');
					var from = $(this).find('from').text();
					var to = $(this).find('to').text();
					var subject = $(this).find('subject').text();
					var date = $(this).find('date').text();
					var content = $(this).find('content').html();
					var attachment = $(this).find('attachment').text();
					var attachmentHref = $(this).find('attachment').attr('href');

					inboxData.mails.unshift({'id' : id, 'from' : from, 'to' : to, 'subject' : subject, 'date' : date, 'content' : content, 'attachment' : attachment, 'attachmentHref' : attachmentHref});
				});					
				
				inbox.datagrid({
					data: inboxData.mails,
					onClickRow: function(rowIndex, rowData){

						var	person1 = rowData.from;
						var	person2 = rowData.to;												
						var date = rowData.date;
						var subject = rowData.subject;
						var content = rowData.content;
						var attachment = rowData.attachment;
						var attachmentHref = rowData.attachmentHref;
													
						if($.inArray(rowData.id, unreadMails) != -1){
							$('#'+ $('.datagrid-row-selected').attr('id')).css('font-weight', 'normal');
	            		}

						loadMail(person1, person2, date, subject, content, attachment, attachmentHref);
						
						unreadMails = $.grep(unreadMails, function(value) {
							return value != rowData.id;
						});
					},
					rowStyler: function(rowIndex,rowData){
	                    if($.inArray(rowData.id, unreadMails) != -1){
	                    	return 'font-weight:bold;';
	            		}
	                }
				});
			});
		}			
	});
}

//Zeigt den Tab 'New Mail' zum Verfassen eines MailDraft an
function showNewMailTab () {
	var tag = 'MailDraft';
	if (tabsContainer.tabs('exists', 'New Mail')){
		tabsContainer.tabs('select', 'New Mail');
	}else{
		tabsContainer.tabs('add',{
		    title:'New Mail',
		    href:tag,
		    closable:false
		});
		
		var firstTabLoad = 0;
		tabsContainer.tabs('getTab', 'New Mail').panel({
			href:tag,
			onLoad:function(){
				if(firstTabLoad == 1){
					loadMailDraft();
				}
				firstTabLoad = 1;
			}
		});	
	}
	$('.tabs-tool').removeClass('new-button-highlight');
}

function showImprint () {
	var tag = 'Imprint';
	var container = $('.mainEventContainerImprint');
	$('.mainEventContainerPdf').window({closed:true});
	container.window({closed:false,modal:false,title:'Imprint',draggable:false,resizable:false,minimizable:false,maximizable:false,collapsible:false});
	container.panel({
		href:tag,
	});
}

function showAbout () {
	var tag = 'About';
	var container = $('.mainEventContainerImprint');
	$('.mainEventContainerPdf').window({closed:true});
	container.window({closed:false,modal:false,title:'About',draggable:false,resizable:false,minimizable:false,maximizable:false,collapsible:false});
	container.panel({
		href:tag,
	});
}


// Function to check if user has mobile device


/** Detect if site is accessed on a mobile device
 * @author Philipp E.
 */
function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
	}


//Shows PDF in a jquery-easyui window - Example: showPdf('pdf/Bachelorarbeit.pdf');
//Get mobile check value. If User has mobile device, this function provides a link to the pdf document to open it in a new tap
//If User does not use mobile device, PDF will be shown as an iFrame inbound to a PDF Container.
function showPdf(pdfPath){
	
	if(detectmob() == true)
		{	
			this.window.open(pdfPath);	
		}
	else
		{
		var pdf = pdfPath.split("/")[1];
		
		if(pdf == ''){
			pdf ='PDF';
		}
		
		try{
			$('.mainEventContainerPdf').panel('destroy');
		}catch(err){
			
		}
		
		$('.mainWindow').append( '<div class="mainEventContainerPdf easyui-window" data-options="closed:true,width:863,height:576"></div>');
		
		var window = $('.mainEventContainerPdf');
		
		window.append('<iframe class="pdfContainer" width="845" height="531"></iframe>');
		
		var pdfContainer = $('.pdfContainer');
		
		pdfContainer.attr('src', pdfPath);	
		window.window({
			title:pdf,
		    width:863,
		    height:576,
		    closed:false,
		    modal:false,
		    draggable:false,
		    resizable:false,
		    minimizable:false,
		    maximizable:false,
		    collapsible:false,
		    onClose:function(){
		    	window.panel('destroy');
		    }
		});	
		$('.mainEventContainerImprint').window({closed:true});
		}
		
}

//Do we need this? How is a MailDraft saved?
//I guess it is not saved!
function showMailNotification (){
	var from = $xml.find('from').text();
	var href = $xml.find('nextevent').attr('href');
	showMsg('Info', 'New mail from ' + from);
	$('.mainLocationButton').removeClass('menu-active');
	getXml(href);
}

function showNotification () {
	var text = $xml.find('content').text();
	var imageUrl = $xml.find('bgimg').text();	
	var duration = 3000;
	var href = $xml.find('nextevent').attr('href');
	showTransition(text, imageUrl, duration, href);
	$('.mainLocationButton').removeClass('menu-active');
}

// Veränderung der TCQ IMAGES auf der Seite
function setTCQImages (imtime, imcost, imqual) {
	
	var id = $xml.find('event').attr('id');
	var imgUrl = '';
	var tcqElement = $('.mainTCQ');
	
	if (imtime > 70) {
		if(imcost > 70){
			if(imqual > 70){
				imgUrl = '111';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '112';
			}else if (imqual < 30) {
				imgUrl = '113';
			}
		}else if(imcost >= 30 && imcost <= 70){
			if(imqual > 70){			
				imgUrl = '121';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '122';
			}else if (imqual < 30) {			
				imgUrl = '123';
			}
		}else if (imcost < 30) {
			if(imqual > 70){				
				imgUrl = '131';
			}else if(imqual >= 30 && imqual <= 70){				
				imgUrl = '132';
			}else if (imqual < 30) {				
				imgUrl = '133';
			}
		}
	}else if (imtime >= 30 && imtime <= 70) {
		if(imcost > 70){
			if(imqual > 70){
				imgUrl = '211';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '212';
			}else if (imqual < 30) {
				imgUrl = '213';
			}
		}else if(imcost >= 30 && imcost <= 70){
			if(imqual > 70){
				imgUrl = '221';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '222';
			}else if (imqual < 30) {
				imgUrl = '223';
			}
		}else if (imcost < 30) {
			if(imqual > 70){
				imgUrl = '231';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '232';
			}else if (imqual < 30) {
				imgUrl = '233';
			}
		}
	}else if (imtime < 30) {
		if(imcost > 70){
			if(imqual > 70){
				imgUrl = '311';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '312';
			}else if (imqual < 30) {
				imgUrl = '313';
			}
		}else if(imcost >= 30 && imcost <= 70){
			if(imqual > 70){
				imgUrl = '321';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '322';
			}else if (imqual < 30) {
				imgUrl = '323';
			}
		}else if (imcost < 30) {
			if(imqual > 70){
				imgUrl = '331';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '332';
			}else if (imqual < 30) {
				imgUrl = '333';
			}
		}
	}
	if(firstFlag == false || id == lastEvent){
		tcqElement.css('background-image', 'url(images/tcq/' + imgUrl + '.PNG)');
	}else{
		tcqElement.css('height', '0px');	
		setTimeout(function(){	
			tcqElement.css('height', '140px');
			tcqElement.css('background-image', 'url(images/tcq/' + imgUrl + '.PNG)');
		},3000);
	}	
}

// Lädt jeweils die aktuelle Zeitleiste der Projektphasen
function setLevelImage (level) {
	var imgUrlkl = '';
	var imgUrlgr = '';
		
	if (level >= 0 && level <= 20) {
		imgUrlkl = 'zeitleiste/phase1kl';
		imgUrlgr = 'zeitleiste/phase1gr';
	} else if (level >= 21 && level <= 65) {
		imgUrlkl = 'zeitleiste/phase2kl';
		imgUrlgr = 'zeitleiste/phase2gr';
	} else if (level >= 66 && level <= 90) {
		imgUrlkl = 'zeitleiste/phase3kl';
		imgUrlgr = 'zeitleiste/phase3gr';
	} else if (level >= 91 && level <= 202) {
		imgUrlkl = 'zeitleiste/phase4kl';
		imgUrlgr = 'zeitleiste/phase4gr';
	} else if (level >= 203 && level <= 293) {
		imgUrlkl = 'zeitleiste/phase5kl';
		imgUrlgr = 'zeitleiste/phase5gr';
	}  else if (level == 500 || level == 294) {
		imgUrlkl = 'zeitleiste/phase6kl';
		imgUrlgr = 'zeitleiste/phase6gr';
	} else if (level == 600) {
		imgUrlkl = 'zeitleiste/phase7kl';
		imgUrlgr = 'zeitleiste/phase7gr';
	} else if (level == 700) {
		imgUrlkl = 'zeitleiste/phase8kl';
		imgUrlgr = 'zeitleiste/phase8gr';
	} else if (level == 800) {
		imgUrlkl = 'zeitleiste/phase9kl';
		imgUrlgr = 'zeitleiste/phase9gr';
	}	
	$('.ProjectTimeline').find('.fancybox').attr( "href", "images/" + imgUrlgr + ".png");
	$('.ProjectTimeline').find('.fancybox').find('img').attr("src", "images/" + imgUrlkl + ".png");
}

// Veränderung der TCQ WERTE
function updateTCQValues (imtime, imcost, imqual) {
	try {
		if(imtime.charAt(0) == '+'){
			gameData.imtime = parseInt(gameData.imtime, 10) + parseInt(imtime.substring(1), 10);
		}else if (imtime.charAt(0) == '-'){
			gameData.imtime = gameData.imtime - imtime.substring(1);
		}			
	}catch(err){
		
	}
	try {
		if(imcost.charAt(0) == '+'){
			gameData.imcost = parseInt(gameData.imcost, 10) + parseInt(imcost.substring(1), 10);
		}else if (imcost.charAt(0) == '-'){
			gameData.imcost = gameData.imcost - imcost.substring(1);
		}			
	}catch(err){
		
	}
	try {
		if(imqual.charAt(0) == '+'){
			gameData.imqual = parseInt(gameData.imqual, 10) + parseInt(imqual.substring(1), 10);
		}else if (imqual.charAt(0) == '-'){
			gameData.imqual = gameData.imqual - imqual.substring(1);
		}			
	}catch(err){
		
	}
	if(gameData.imtime>100){gameData.imtime=100;}
	else if(gameData.imtime<0){gameData.imtime=0;}
	if(gameData.imcost>100){gameData.imcost=100;}
	else if(gameData.imcost<0){gameData.imcost=0;}
	if(gameData.imqual>100){gameData.imqual=100;}
	else if(gameData.imqual<0){gameData.imqual=0;}
}

//Sets the background picture for the dialog according to the dialog
function setLocation (backgroundPictureUrl) {
	$('.locationBackgroundContainer').css('background-image', 'url('+backgroundPictureUrl+')');
}

// Sets the background picture or video for the background
function setDialogBackground (backgroundUrl, existsVideo) {
	if (existsVideo == true) {
		//since it will always be a different dialogue video no comparison with the old video is necessary
		var vid = document.getElementById('background-video');
		vid.src = backgroundUrl;
		setTimeout(function(){
			vid.play();
		}, 2000);
	} else {
		// if no video exists, the role picture is set
		document.getElementById('background-video').src = '';
		backgroundPictureUrlNew = 'url('+backgroundUrl+')';
		backgroundPictureUrlOld = $('.dialogContainer').css('background-image');
		if (backgroundPictureUrlOld.split("images/")[1] != backgroundPictureUrlNew.split("images/")[1]) {
			$('.dialogContainer').css('background-image', backgroundPictureUrlNew);
		}
	}	
}

//Hides the dialog elements
function hideDialog () {
	$('.dialogContainer').hide();
	$('.dialogTextContainerFit').hide();
	$( '.dialogPartner').hide();
	$( '.dialogButton').hide();
}

//Shows the dialog elements
function showDialog () {
	$('.dialogContainer').show();
	$('.dialogTextContainerFit').show();
	$('.dialogPartner').delay(500).fadeIn( 'slow', function() {});						    
	$('.dialogButton').delay(1500).fadeIn( 'slow', function() {});
}

function hideLocation(){
	var container = $('.mainEventContainer');
	container.window({closed:true});
}

function hideLaptop(){
	var container = $('.mainEventContainerLaptop');
	container.window({closed:true});
}

function hideSelection () {
	$('.selectionContainer').hide();
}

function showSelection () {
	$('.selectionContainer').show();
}

function hideAllocation () {
	$('.allocationContainer').hide();
}

function showAllocation () {
	$('.allocationContainer').show();
}

function hideMatrixAllocation(){
	$('.matrixAllocationContainer').hide();
}

function showMatrixAllocation(){
	$('.matrixAllocationContainer').show();
}

function showEventContainer (container) {
	container.window({modal:false,closed:false});
}

function showEventContainerModal (container) {
	$('.mainLocationButton').linkbutton('disable');
	container.window({modal:true,closed:false});
}

function hideEventContainer (container){
	container.window({modal:false,closed:true,closable:false});
}

// Zeigt an, dass eine neue Mail gekommen ist
function showMsg (title, msg) {
	$.messager.show({
		title: title,
		timeout:5000,
		msg: msg
	});
}

// Adds Highlight to button (Location Button) referred to with current Id
function addHighlight (button, id) {
	$.each(button, function(){
		if($(this).attr('id') == id){
			$(this).addClass('elementHighlight');
		}
	});	
}

//Removes Highlight from the button (Location Button) referred to with current Id
function removeHighlight (button, id) {	
	$.each(button, function(){
		if($(this).attr('id') == id){
			$(this).removeClass('elementHighlight');
		}
	});
}

// Adds Highlight to Mail Button
function addHighlightMail () {
	$('.mainMailButton').addClass('elementHighlight');
}

// Removes Highlight from Mail Button
function removeHighlightMail () {	
	$('.mainMailButton').removeClass('elementHighlight');
}

// Adds Highlight to NewMail (MailDraft) Button
function addHighlightNewMail () {
	$('.tabs-tool').addClass('new-button-highlight');
}

//Removes Highlight from NewMail (MailDraft) Button
function removeHighlightNewMail () {	
	$('.tabs-tool').removeClass('new-button-highlight');
}

//Shows the fullscreen transition window
function showTransition (text, imageUrl, duration, href) {	
	var window = $('.transitionScreen');
	var imageContainer = $('.transitionScreenImageContainer');
	var textContainer = $('.transitionScreenTextContainer');
	textContainer.text(text);
	if(imageUrl != ''){
		imageContainer.css('background-image', 'url(images/'+imageUrl+')');
	}else{
		imageContainer.css('background-image', 'url(css/icons/blank.gif)');
	}
	window.window({closed:false});
	
	$('.transitionScreenImageContainer').unbind('click');
	$('.transitionScreenImageContainer').bind('click', function(){
		window.window('close');
		getXml(href);
	});
	
	var height1 = 520;
	var height2 = $('.transitionScreenTextContainer').height();

	height = height1 - height2;
	$('.transitionContinueButton').css('margin-top', height + 'px');
	$('.transitionContinueButton').linkbutton({
	    onClick: function(){
	    	window.window('close');
			getXml(href);
	    }
	});
}

// Final Screen showing result of user
function showResult () {
	var tag = 'Result';
	var container = $('.mainEventContainerResult');
	container.window({closed:false,modal:false,title:tag,draggable:false,resizable:false,minimizable:false,maximizable:false,collapsible:false});
	container.panel({
		href:tag,
		onLoad: function(){
			var audioElement = document.createElement('audio');	
			audioElement.setAttribute('src', 'audio/location.mp3');
			var audiosetting="false";
			audiosetting=getCookie("audio");
			if (audiosetting == "true") {
			audioElement.play();	}
			
			document.getElementById("cost").innerHTML=gameData.imcost+"%";
			document.getElementById("time").innerHTML=gameData.imtime+"%";
			document.getElementById("quality").innerHTML=gameData.imqual+"%";
			
			setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
			$(this).find('#imprint').bind('click', function(){
				showImprint();
			});

			$(this).find('#help').bind('click', function(){
				showPdf('documents/help.pdf');
			});

			$(this).find('#logout').bind('click', function(){
				sessionStorage.removeItem('userid');
				window.location.href = 'LogoutUser';
			});
		}
	});
}

//Saves the game data
function saveGame (userid, gamePath, imtime, imcost, imqual) {	
	$.get('Event', {userid : userid, gamePath : gamePath, imtime : imtime, imcost : imcost, imqual : imqual, type : 'saveGame'}, function(data){
		//console.log('SaveGame> userid: ' + userid + '; gamePath: ' + gamePath + '; Time: ' + imtime + '; Cost: ' + imcost + '; Quality: ' + imqual);
	});	
}

// Shows that a screen is loading
function showLoading () {	
	var text = '';
	var imageUrl = 'images/Gruppenfotos/Gruppenfoto_FINAL.png';
	var imageUrl2 = 'images/Gruppenfotos/Logo_Ladescreen.png';	
	var duration = 1000;
	
	var window = $('.loadingScreen');
	var imageContainer = $('.loadingScreenImageContainer');
	
	// Hier wird die Audio-Datei abgespielt 
	// (Vielleicht kann man hier noch einen Filter einbauen??)
	var audioElement = document.createElement('audio');	
	audioElement.setAttribute('src', 'audio/location.mp3');
	var audiosetting="false";
	audiosetting=getCookie("audio");
	if (audiosetting == "true") {
	audioElement.play();	}
	
	//Um hässliche Ladeartefakte zu verhindern
	$('body').show();
	$('body').layout({
		fit:true
	});
	
	imageContainer.text(text);
	imageContainer.css('background-image', 'url('+imageUrl+')');
	window.window({closed:false});
	setTimeout(function(){
		imageContainer.css('background-image', 'url('+imageUrl2+')');
		setTimeout(function(){				
			window.fadeOut(duration, function(){
				window.window('close');
				getXml(gameData.id);
			});		
		},duration);	
	},duration);
}
/*
//TODO #443 Commented Code due to Syntax Error after Merge 
window.onload = function()
{
	// Cookie not found, thus display easter egg and set cookie
	if(!checkCookie())
	{
		var Rick = new Date();
		var Astley = Rick.getHours();
		var Never = 0;
		var Gonna = 6;
		
		// Lower and uper bound of time when this function should be called.
		// At the moment between 9 and 11 am
		if(Astley >= Never &&  Astley <= Gonna)
		{
			// Set cookie with name Rick, value Astley and to expire in 7 day
			setCookie("Rick", "Astley", 7);
			var Give = document.createElement("span");
			Give.setAttribute("class", "ricky");
			var You = document.createTextNode("Never Gonna Give You Up, Never Gonna Let You Down");
			Give.appendChild(You);
			var Up = document.getElementsByClassName("div-header window")[0].appendChild(Give);
			setTimeout(function()
			{
				$(".ricky").text(''); // remove text from span tags after 4 seconds
			}, 1000);
		}
	}
	else
	{
		// do nothing. user already saw easter egg. Lets see how many users do not believe their eyes... :D
	}
}
*/

// Function to set a cookie
function setCookie(cName, cValue, cExpire)
{
    var d = new Date();
    // number of days until cookie expires
    d.setTime(d.getTime() + (cExpire*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + cExpire;
}

// Function to get a cookie
function getCookie(cName)
{
    var name = cName + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ')
        {
        	c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
    	{
        	// if found, return cookie name
        	return c.substring(name.length,c.length);
    	}
    }
    // return "" if cookie could not be found
    return "";
}

// Check if cookie exists
function checkCookie()
{
    var user=getCookie("Rick");
    // Cookie found and saved on user client (browser)
    if (user != "")
    {
        return true;
    }
    // Cookie not found on user client (browser): user = ""
    else
    {
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
	getUrlVars: function(){
		var vars = [], hash;
		try{
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1].replace('%20', ' ');
			}
		}catch(err){
			//console.log('no parameters found');
		}
		return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});

$.extend({	  
	// Arguments are image paths relative to the current page.
	preLoadImages: function() {
		var cache = [];
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		};
	}
});

//Get Url Parameters - Example: $.getUrlVar('name');
$.extend({
	getUrlVars: function(){
		var vars = [], hash;
		try{
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1].replace('%20', ' ');
			}
		}catch(err){
			//console.log('no parameters found');
		}
		return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});

$.extend({	  
	// Arguments are image paths relative to the current page.
	preLoadImages: function() {
		var cache = [];
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		};
	}
});
