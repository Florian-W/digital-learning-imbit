/*
 *Anastasia reimer
 *05.03.2016
 */
//eventtype 30
function loadAllocationFour() {

	// XML auslesen
	var href = $xml.find('nextevent').attr('href');
	var title = $xml.find('title').text();
	
	loadBackground();

	// location.jsp auslesen und xml text dort einsetzen
	var container = $('.allocationContainerFour');
	container.find('.description').html(title);
	var continueButton = $('#continueButtonAllocationFour');
	var phaseTitleContainerFour = container.find('.phaseTitleFour');
	var draggableContainerFour = $('.draggableContainerFour');

	$xml.find('column').each(function(index) {
		// *** code needed for tooltip finction
		var itemTitle = $(this).text();
		phaseTitleContainerFour.eq(index).text(itemTitle);
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			// ***
			phaseTitleContainerFour[index].setAttribute('title', itemTitle);
		}
	});

	$xml.find('option').each(
			function(index) {
				var itemText = $(this).text();
				var itemColumn = $(this).attr('column');

				// ***code needed for tooltip function
				var itemTitle = $(this).attr('title');
				var itemHoverTitle = '';
				if ((itemTitle !== '') && (itemTitle !== undefined)) {
					var itemHoverTitle = ' title="' + itemTitle + '"';
				}
				// ***
				draggableContainerFour
						.append('<div class="drag bc bph" data-column="'
								+ itemColumn + '">' + itemText + '</div>');
			});

	// click button to invoke checking method
	continueButton.unbind('click');
	continueButton.bind('click', function() {
		var check = true;
		var allDragged = true;
		var dragItems = $('.drag');

		$('.phaseFour').css('background-color', '');

		// Check if Items are allocated in the right column
		$('.phaseFour').each(function(index) {
			$(this).find('.drag').each(function(i) {
				if ($(this).attr('data-column') - 1 != index) {
					check = false;
					$(this).addClass('dragIncorrect');
				}
			});
		});

		$('.draggableContainerFour').find('.drag').each(function() {
			check = false;
			allDragged = false;
		});

		if (check) {
			getXml(href);
		} else if (allDragged == false) {
			showMsg('Info', 'You have not allocated all elements');
		} else if (check == false) {
			showMsg('Info', 'Incorrect Allocation');
		}

	});

	showAllocationFour();

	// Drag Funktionalität
	$('.drag').draggable({
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');

			$('.dragInfoContainerTwo').html('');
			/*
			 * if ((itemInfo !== '') && (itemInfo !== undefined)) {
			 * loadInfoButton($('.dragInfoContainerTwo'), itemInfo,
			 * itemDescription); }
			 */

			$(this).removeClass('dragIncorrect');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});

	// Drop Funktionalität
	$('.phaseFour').droppable({
		accept : '.drag',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).append(source);
			$(this).removeClass('elementHighlight');
		}
	});

}

/* END */

/*
 * Christian Heyer 02.03.2016
 */
// eventtype 29
function loadMapAllocation() {

	// XML auslesen
	var href = $xml.find('nextevent').attr('href');
	var title = $xml.find('title').text();
	var background = $xml.find('mapBackground').text();
	var imageUrl = "images/"+background;
	// set map background image
	$('#mapContainer').css('background-image', 'url("' + imageUrl + '")');
	
	// create .square.target elements in #container
	for (var i = 0; i < 140; i++) {
		$('#mapContainer').append(
				'<div class="square target" id="tid' + i + '"></div>');
	}

	$xml
			.find('item')
			.each(
					function(index) {
						// load XML data
						var name = $(this).children("name").text();
						var picture = $(this).children("picture").text();
						var targets = $(this).children("targets").text();
						// console.log(name);
						// console.log(picture);
						// console.log(targets);
						// console.log("..........")

						// create description box
						$('#itemDescription').append(
								'<div class="itemdescription"><img src="images/' + picture
										+ '" height="40"> ' + name + ' </div>');

						// create draggable items with datatarget attribute, where targets read from xml are saved
						$('#src')
								.append(
										'<div id="item'
												+ index
												+ '" class="dragsquare" style="background-image: url(images/'
												+ picture + ');" dataTargets="'
												+ targets + '" name="' + name
												+ '"></div>');

					});

	// location.jsp auslesen und xml text dort einsetzen
	var container = $('.mapAllocationContainer');
	container.find('#mapAllocationTitle').html(title);
	var continueButton = $('#continueButtonMapAllocation');

	// click button to invoke checking method
	continueButton.unbind('click');
	continueButton.bind('click', function() {
		var checkMap = true;
		var allDragged = true;

		// checks if there are elements of class dragsquare in src
		$('#src').find('.dragsquare').each(function() {
			allDragged = false;
		});

		// get all items with class .dragsquare
		var dragitems = $('.dragsquare');

		//for each element, check if it is located in one of the targets described in the items datatarget attribute
		for (var i = 0; i < dragitems.length; i++) {
			var item = dragitems[i];
			// get id of parent element
			var parentId = item.closest('.target').id;
			// get name and target attribute
			var solution = $(item).context.attributes.datatargets.value;
			//var name = $(item).context.attributes.name.value;

			//console.log(name + " (" + item.id + ")" + " is in " + parentId+ " [" + solution + "]");

			// if parentID (position where item is located) is not a substring of targets saved in solution
			// it's wrong, so checkMap will be setted to false and class "false" will be added to the item
			if (solution.indexOf(parentId) > -1) {
				console.log("correct");
				$(item).removeClass('false');
			} else {
				console.log("wrong");
				checkMap = false;
				$(item).addClass('false');
			}
		}
		
		if (checkMap) {
			getXml(href);
		} else if (allDragged == false) {
			showMsg('Info', 'You have not allocated all elements');
		} else if (checkMap == false) {
			showMsg('Info', 'Incorrect Allocation');
		}	
		
	});

	showMapAllocation();

	/*
	 * easyui drag and drop
	 */
	$('.dragsquare').draggable({
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			var idParentElement = $(this).parent().context.parentElement.id;
			var parentElement = $('#' + idParentElement);
			console.log("id of parent element: " + idParentElement);
			if ($(parentElement).hasClass('occupied')) {
				$(parentElement).removeClass('occupied');
				// console.log($(parentElement).hasClass('occupied'));
			}
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});

	$('.target')
			.droppable(
					{
						onDragEnter : function(e, source) {
							$(source).draggable('options').cursor = 'auto';
							$(source).draggable('proxy').css('border',
									'1px solid red');
							$(this).addClass('over');
							// console.log("onDragEnter");
						},
						onDragLeave : function(e, source) {
							$(source).draggable('options').cursor = 'not-allowed';
							$(source).draggable('proxy').css('border',
									'1px solid #ccc');
							$(this).removeClass('over');

							// console.log("onDragLeave");
						},
						onDrop : function(e, source) {

							// console.log("->onDrop");
							// console.log($(this).attr('id'));
							// console.log("src: "+
							// $('#src').hasClass('occupied'));

							if ((!$(this).hasClass('occupied'))
									|| ($(this).attr('id') === "src")) {
								// console.log($(this).hasClass('occupied'));
								$(this).addClass('occupied');
								// console.log($(this).hasClass('occupied'));
								$(this).append(source);
							}

							/*
							 * for logging information var targetid =
							 * $(this).context.id; var item =
							 * $(source).context.id; console.log(item+" dropped
							 * in "+targetid); end log
							 */
							$(this).removeClass('over');
						}
					});

}

/* END */

// eventtype 28
function loadFactsheet() {

	// XML auslesen
	var href = $xml.find('nextevent').attr('href');
	var title = $xml.find('title').text();
	var capital = $xml.find('capital').text();
	var officiallang = $xml.find('officiallang').text();
	var currency = $xml.find('currency').text();
	var government = $xml.find('government').text();
	var areainkm2 = $xml.find('areainkm2').text();
	var population = $xml.find('population').text();
	var ethgroups = $xml.find('ethgroups').text();
	var natholiday = $xml.find('natholiday').text();
	var natsport = $xml.find('natsport').text();
	var uheardof = $xml.find('uheardof').text();
	var diduknow = $xml.find('diduknow').text();
	var infolinktext = $xml.find('infolinktext').text();
	var infolink = $xml.find('infolink').text();
	var titleimg = 'images/' + $xml.find('titleimg').text();
	var uri1 = 'images/' + $xml.find('sideimg1').text();
	var uri2 = 'images/' + $xml.find('sideimg2').text();
	var uri3 = 'images/' + $xml.find('sideimg3').text();

	// location.jsp auslesen und xml text dort einsetzen
	var container = $('.factsheetContainer');
	container.find('#titletext').html(title);
	container.find('#capitaltext').html(capital);
	container.find('#langtext').html(officiallang);
	container.find('#currency').html(currency);
	container.find("#government").html(government);
	container.find("#area").html(areainkm2);
	container.find("#population").html(population);
	container.find("#ethgroups").html(ethgroups);
	container.find("#natholiday").html(natholiday);
	container.find("#natsport").html(natsport);
	container.find("#uheardof").html(uheardof);
	container.find("#diduknow").html(diduknow);
	container.find("#moreinfo").attr("href", infolink).html(infolinktext);

	container.find('#flag').attr("src", titleimg);
	container.find('#sideimg1').attr("src", uri1);
	container.find('#sideimg2').attr("src", uri2);
	container.find('#sideimg3').attr("src", uri3);

	/* EDIT BY ANIL ON MAR 4, 2016 */
	/* Referencing the flag and add an onclick event*/
	container.find('#flag').attr("onclick", "buttonPressed()");
	/* End of line*/

	var continueButton = $('#continueButtonFactsheet');

	continueButton.unbind('click');
	continueButton.bind('click', function() {
		getXml(href);
	});
	
	/* EDIT BY MARVIN ON MAR 5, 2016 */
	/* titlePressed() aus master.js, wird aufgerufen fuer Kartendienst */
	titlePressed();
	/* End of line */

	showFactsheet();
}

// Loading the Worldmapmatrix 4x4
// eventtype 25
function loadWorldMap() {
	// liest XML aus
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var container = $('.worldmap');
	var descriptionContainer = container.find('.description');
	descriptionContainer.text(description);
	loadWorldMapAsBackground();
	var positions = $xml.find('position');
	var xPos = positions.attr('x');
	var yPos = positions.attr('y');
	var indexId = 'b' + xPos + yPos;
	var targetQuadrant = document.getElementById(indexId);
	targetQuadrant.setAttribute("onclick", "getXml('" + href + "')");

}
// VIDEO EVENT
// Loading a dialog style event from the XML to perpare its content for display
// evventtype 3
function loadDialog() {
	var partner = $xml.find('partner').text();
	var content = $xml.find('content').text();
	var dialogPartnerNameContainer = $('.dialogPartnerName');
	var dialogPartnerTextContainer = $('.dialogPartnerText');

	loadBackground();
	loadVideo();

	$('.dialogButton').remove();
	dialogPartnerNameContainer.html(partner);
	dialogPartnerTextContainer.html(content);

	$xml.find('option').each(function(index) {
		var text = $xml.find('option').eq(index).text();
		var href = $xml.find('option').eq(index).attr('href');
		var dialogTextContainer = $('.dialogTextContainer');

		dialogTextContainer.append('<div class="dialogButton"></div>');
		var dialogButton = $('.dialogButton').eq(index);

		dialogButton.linkbutton({
			text : text
		});
		dialogButton.bind('click', function() {
			$('#background-video').get(0).pause();
			getXml(href);
		});
	});

	// //Cancels loaded TTS-Dialogues and resets the queue:
	// speechSynthesis.cancel();

	// // Generates TTS object and fill it with the content of the dialog
	// partner:
	// // @param tts Text-to-Speech object and content loaded
	// // @param voices loads available voices and stores them
	// var tts = new SpeechSynthesisUtterance(content);

	// //Get all available voices for the browser and safe in an array:
	// var voices = window.speechSynthesis.getVoices();

	// //Checks if Cookie has TTS-settings on "true":
	// var ttsSettings="false";
	// ttsSettings=getCookie("tts");
	// if (ttsSettings == "true") {

	// //Setting speechSynthesis parameters for Male Voice:
	// tts.native = false;
	// tts.lang = 'en-GB';
	// tts.voice = speechSynthesis.getVoices().filter(function(voice) { return
	// voice.name == 'Google UK English Male'; });

	// // Checks if the partner female and setting female parameters:
	// if(partner.indexOf('Thomas') == -1 && partner.indexOf('Pria') == -1 &&
	// partner.indexOf('Martin') == -1 && partner.indexOf('Avinash') == -1 &&
	// partner.indexOf('Rajesh') == -1 && partner.indexOf('Vance') == -1 &&
	// partner.indexOf('Stylus') == -1 && partner.indexOf('Jeremy') == -1)
	// {
	// //alert("Female detected!");
	// tts.native = false;
	// tts.lang = 'en-IE';
	// tts.voice = speechSynthesis.getVoices().filter(function(voice) { return
	// voice.name == 'Moira'; });

	// if(checkBrowserName('chrome'))
	// {
	// //alert("Chrome detected");
	// tts.native = false;
	// tts.lang = 'en-US';
	// tts.voice = speechSynthesis.getVoices().filter(function(voice) { return
	// voice.name == 'Google US English'; });
	// }
	// }
	// //Starts TTS:
	// speechSynthesis.speak(tts);
	// }

	// Opens the dialog:
	showDialog();
}
// eventtype 2
function loadPictureContainer() {
	var container = $('.pictureContainer');
	loadBackground();
	showPictureContainer();
}

// eventtype 14 oder 15
function loadSelection() {
	var eventtype = $xml.find('event').attr('eventtype');
	var description = $xml.find('description').text();
	var container = $('.selectionContainer');
	var descriptionContainer = container.find('.selectionTitleText');
	var imgContainer = container.find('.selectionPicture');
	var textContainer = container.find('.selectionText');
	var button = container.find('.selectionButton');

	descriptionContainer.text(description);

	$xml.find('option').each(
			function(index) {
				var text = $xml.find('option').eq(index).text();
				var href = $xml.find('option').eq(index).attr('href');

				textContainer.eq(index).text(text);
				button.eq(index).bind('click', function() {
					$('.selectionContainer').hide();
					getXml(href);
				});

				if (eventtype == 15) {
					var img = 'images/'
							+ $xml.find('option').eq(index).attr('img');
					imgContainer.eq(index).attr('src', img);
					$('.selectionContainer').find('.fancybox').eq(index).attr(
							'href', img);
					$('.selectionContainer').find('.fancybox').fancybox();
				}
			});
	if (eventtype == 15) {
		imgContainer.show();
	}
	showSelection();
}
// eventtype 16 oder 17
function loadAllocation() {
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var itemInfo = $xml.find('option').attr('finfo');
	var itemDescription = $xml.find('option').attr('fdesc');
	var container = $('.allocationContainer');
	var descriptionContainer = container.find('.description');
	var phaseTitleContainer = container.find('.phaseTitle');
	var phaseContainer = container.find('.phase');
	var continueButton = $('#continueButton');
	var draggableContainer = $('.draggableContainer');
	loadBackground();
	$('.drag').remove();

	$xml.find('option').each(
			function(index) {
				var itemText = $(this).text();
				var itemColumn = $(this).attr('column');
				var itemRank = $(this).attr('rank');
				// ***code needed for tooltip function
				var itemTitle = $(this).attr('title');
				var itemHoverTitle = '';
				if ((itemTitle !== '') && (itemTitle !== undefined)) {
					var itemHoverTitle = ' title="' + itemTitle + '"';
				}
				// ***
				draggableContainer
						.append('<div class="drag bc bph" data-column="'
								+ itemColumn + '" data-finfo="' + itemInfo
								+ '" data-fdesc="' + itemDescription
								+ '" data-rank="' + itemRank + '"'
								+ itemHoverTitle + '>' + itemText + '</div>');
			});

	// 

	var draggableItem = container.find('.drag');

	descriptionContainer.text(description);

	$xml.find('column').each(function(index) {
		// *** Code needed for tooltip function
		var itemTitle = $(this).attr('title');
		phaseTitleContainer.eq(index).text($(this).html());
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			// ***
			phaseTitleContainer[index].setAttribute('title', itemTitle);
		}
	});

	continueButton.unbind('click');
	continueButton.bind('click', function() {
		$('.phase').css('background-color', '');
		var correct = true;
		var allDragged = true;

		// Check if Items are allocated in the right column
		$('.phase').each(function(index) {
			$(this).find('.drag').each(function(i) {
				if ($(this).attr('data-column') - 1 != index) {
					correct = false;
					$(this).addClass('dragIncorrect');
				}
			});
		});
		// Check if all items have been dragged
		$('.draggableContainer').find('.drag').each(function() {
			allDragged = false;
		});
		if (correct == true && allDragged == true) {
			getXml(href);
			container.window('close');
		} else {
			if (allDragged == false) {
				showMsg('Info', 'You have not allocated all elements'); // For
				// Debugging
			}
			if (correct == false) {
				showMsg('Info', 'Incorrect Allocation'); // For Debugging
			}
		}
	});
	showAllocation();

	// Drag Funktionalit�t
	draggableItem.draggable({
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');

			$('.dragInfoContainer').html('');
			if ((itemInfo !== '') && (itemInfo !== undefined)) {
				loadInfoButton($('.dragInfoContainer'), itemInfo,
						itemDescription);
			}
			;

			$(this).removeClass('dragIncorrect');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});

	// Drop Funktionalit�t
	phaseContainer.droppable({
		accept : '.drag',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).append(source);
			$(this).removeClass('elementHighlight');
		}
	});
}
// eventtype 18
function loadAllocationTwo() {
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var itemInfo = $xml.find('option').attr('finfo');
	var itemDescription = $xml.find('option').attr('fdesc');
	var container = $('.allocationContainerTwo');
	var descriptionContainer = container.find('.description');
	var phaseTitleContainerTwo = container.find('.phaseTitleTwo');
	var phaseContainerTwo = container.find('.phaseTwo');
	var continueButtonTwo = $('#continueButtonTwo');
	var draggableContainerTwo = $('.draggableContainerTwo');
	loadBackground();
	$('.drag').remove();

	$xml.find('option').each(
			function(index) {
				var itemText = $(this).text();
				var itemColumn = $(this).attr('column');

				var itemRank = $(this).attr('rank');

				// ***code needed for tooltip function
				var itemTitle = $(this).attr('title');
				var itemHoverTitle = '';
				if ((itemTitle !== '') && (itemTitle !== undefined)) {
					var itemHoverTitle = ' title="' + itemTitle + '"';
				}
				// ***
				draggableContainerTwo
						.append('<div class="drag bc bph" data-column="'
								+ itemColumn + '" data-finfo="' + itemInfo
								+ '" data-fdesc="' + itemDescription
								+ '" data-rank="' + itemRank + '"'
								+ itemHoverTitle + '>' + itemText + '</div>');
			});

	var draggableItem = container.find('.drag');

	descriptionContainer.text(description);

	$xml.find('column').each(function(index) {
		// *** code needed for tooltip finction
		var itemTitle = $(this).attr('title');
		phaseTitleContainerTwo.eq(index).text($(this).html());
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			// ***
			phaseTitleContainerTwo[index].setAttribute('title', itemTitle);
		}
	});

	continueButtonTwo.unbind('click');
	continueButtonTwo.bind('click', function() {

		$('.phaseTwo').css('background-color', '');
		var correct = true;
		var allDragged = true;

		// Check if Items are allocated in the right column
		$('.phaseTwo').each(function(index) {
			$(this).find('.drag').each(function(i) {
				if ($(this).attr('data-column') - 1 != index) {
					correct = false;
					$(this).addClass('dragIncorrect');
				}
			});
		});
		// Check if all items have been dragged
		$('.draggableContainerTwo').find('.drag').each(function() {
			allDragged = false;
		});
		if (correct == true && allDragged == true) {
			getXml(href);
			container.window('close');
		} else {
			if (allDragged == false) {
				showMsg('Info', 'You have not allocated all elements'); // For
				// Debugging
			}
			if (correct == false) {
				showMsg('Info', 'Incorrect Allocation'); // For Debugging
			}
		}
	});
	showAllocationTwo();

	// Drag Funktionalit�t
	draggableItem.draggable({
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');

			$('.dragInfoContainerTwo').html('');
			if ((itemInfo !== '') && (itemInfo !== undefined)) {
				loadInfoButton($('.dragInfoContainerTwo'), itemInfo,
						itemDescription);
			}
			;

			$(this).removeClass('dragIncorrect');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});

	// Drop Funktionalit�t
	phaseContainerTwo.droppable({
		accept : '.drag',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).append(source);
			$(this).removeClass('elementHighlight');
		}
	});
}
// eventtype 19
function loadAllocationThree() {

	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var itemInfo = $xml.find('option').attr('finfo');
	var itemDescription = $xml.find('option').attr('fdesc');
	var container = $('.allocationContainerThree');
	var descriptionContainer = container.find('.description');
	var phaseTitleContainerThree = container.find('.phaseTitleThree');
	var phaseContainerThree = container.find('.phaseThree');
	var continueButtonThree = $('#continueButtonThree');
	var draggableContainerThree = $('.draggableContainerThree');

	// Lade den Dialog Hintergrund
	loadBackground();

	$('.drag').remove();

	$xml.find('option').each(
			function(index) {
				var itemText = $(this).text();
				var itemColumn = $(this).attr('column');
				var itemRank = $(this).attr('rank');
				// ***code needed for tooltip function
				var itemTitle = $(this).attr('title');
				var itemHoverTitle = '';
				if ((itemTitle !== '') && (itemTitle !== undefined)) {
					var itemHoverTitle = ' title="' + itemTitle + '"';
				}
				;
				// ***
				draggableContainerThree
						.append('<div class="drag bc bph" data-column="'
								+ itemColumn + '" data-finfo="' + itemInfo
								+ '" data-fdesc="' + itemDescription
								+ '" data-rank="' + itemRank + '"'
								+ itemHoverTitle + '>' + itemText + '</div>');
			});

	var draggableItem = container.find('.drag');

	descriptionContainer.text(description);

	$xml.find('column').each(function(index) {
		phaseTitleContainerThree.eq(index).text($(this).html());
	});

	continueButtonThree.unbind('click');
	continueButtonThree.bind('click', function() {

		$('.phaseThree').css('background-color', '');
		var correct = true;
		var allDragged = true;

		// Check if Items are allocated in the right column
		$('.phaseThree').each(function(index) {
			$(this).find('.drag').each(function(i) {
				if ($(this).attr('data-column') - 1 != index) {
					correct = false;
					$(this).addClass('dragIncorrect');
				}
			});
		});
		// Check if all items have been dragged
		$('.draggableContainerThree').find('.drag').each(function() {
			allDragged = false;
		});
		if (correct == true && allDragged == true) {
			getXml(href);
			container.window('close');
		} else {
			if (allDragged == false) {
				showMsg('Info', 'You have not allocated all elements'); // For
				// Debugging
			}
			if (correct == false) {
				showMsg('Info', 'Incorrect Allocation'); // For Debugging
			}
		}
	});
	showAllocationThree();

	// Drag Funktionalit�t
	draggableItem.draggable({
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');

			$('.dragInfoContainerThree').html('');
			if ((itemInfo !== '') && (itemInfo !== undefined)) {
				loadInfoButton($('.dragInfoContainerThree'), itemInfo,
						itemDescription);
			}
			;

			$(this).removeClass('dragIncorrect');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});

	// Drop Funktionalit�t
	phaseContainerThree.droppable({
		accept : '.drag',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).append(source);
			$(this).removeClass('elementHighlight');
		}
	});
}

function loadInfoButton(dragInfoContainerDiv, info, description) {
	dragInfoContainerDiv
			.append('<div class="fbutton"><span class="fdescription"></span></div>');

	var infoButton = $('.fbutton');

	infoButton.linkbutton({
		text : description,
		onClick : function() {
			showPdf('documents/' + info);
		}
	});
};

// eventtyp 23
function loadConversation() {
	//Stop all TTS when reloading
	if(window.SpeechSynthesisUtterance !=undefined) {
	speechSynthesis.cancel();}

	var hrefNumber = $xml.find('messageBoxB').length;

	var i = 0;
	// liest XML aus
	var href = $xml.find('nextevent').attr('href');
	console.log(href);
	var description = $xml.find('description').text();
	var containerConversation = $('.conversation');
	var descriptionContainerConversation = containerConversation
			.find('.description');
	descriptionContainerConversation.text(description);
	// Lade den Dialog Hintergrund
	loadBackground();
	// globale Variablen
	var indexAB = 0;
	

	// dynamischer Ansatz
	$xml.find('messageBoxA, messageBoxB').each(function(index) {
		indexAB = index;
		conversationElementAIndex = $xml.find('messageBoxA').eq(index).index();
		conversationElementBIndex = $xml.find('messageBoxB').eq(index).index();

		if (conversationElementAIndex != "-1") {
			messageBoxA();
		}
		if (conversationElementBIndex != "-1") {
			messageBoxB();
		}
	});

	function messageBoxA() {
		// check for tts-cookie
		var ttsSettings = "false";
		ttsSettings = getCookie("tts");

		var text = $xml.find('messageBoxA').eq(indexAB).text();
		var hrefA = $xml.find('messageBoxA').eq(indexAB).attr('href');
		var readVoice = $xml.find('messageBoxA').eq(indexAB).attr('voice');
		
		//text to speech for HTML5 support
		/*
		 * Philipp K.
		 * 4.3.16
		 * Updated TTS so it speaks every sentence as a single object. 
		 * If Speech Syntehsis is undefined the user gets a console log
		 * If the browser cannot load the voices, the user gets an console log instead of a wrong voice
		 * Updated Voices for Mac and Windows 
		 */
		
		if(window.SpeechSynthesisUtterance === undefined) {
			console.log("Text to speech is not available");
		}else if(text != undefined){
			var ttstext = text.split(".");
			var voices = speechSynthesis.getVoices();
			if(voices[0] != undefined){
				if(ttsSettings == "true" && readVoice =="male") {	
					for(var j=0; j < ttstext.length; j++){
						var tts = new SpeechSynthesisUtterance(ttstext[j]);
						if(voices.filter(function(voice) { return voice.name == 'Google UK English Male'; })[0] != undefined){
							tts.voice = voices.filter(function(voice) { return voice.name == 'Google UK English Male'; })[0];
						} else {
							tts.voice = voices.filter(function(voice) { return voice.name == 'Daniel'; })[0];
						}
						speechSynthesis.speak(tts);
					}
				}
				if(ttsSettings == "true" && readVoice =="female") {	
					for(var j=0; j < ttstext.length; j++){
						var tts = new SpeechSynthesisUtterance(ttstext[j]);
						if(voices.filter(function(voice) { return voice.name == 'Google UK English Female'; })[0] != undefined){
							tts.voice = voices.filter(function(voice) { return voice.name == 'Google UK English Female'; })[0];
						} else {
							tts.voice = voices.filter(function(voice) { return voice.name == 'Samantha'; })[0];
						}
						speechSynthesis.speak(tts);
				}
				}
			}else{
					console.log("Could not load voices - Text2Speech disabled"); 
				}
		}

		var messageBoxContainer = $('.dialogBox');
		
		messageBoxContainer.append('<div class="bc messageBoxAContainer"><div class="messageBoxA bc"></div><div class="bc messageBoxATriangle"></div><div class="bc messageBoxATriangle2"></div></div>');
		$('.messageBoxA').eq(indexAB).text(text);


		// NEW LINE 672 - 681
		var dialogButton = $('.messageBoxA').eq(indexAB);
		
		console.log("Message Box A" +i);
		if(hrefA == undefined){
			
		}else{
	
		$('.messageBoxA').eq(indexAB).css('border-color', '#FF7700');
		$('.messageBoxATriangle').eq(indexAB).css('border',
				'11px solid #FF7700');
		$('.messageBoxATriangle2').eq(indexAB).css('border',
				'7px solid #FF7700');
		dialogButton.linkbutton({
			text : text
		});	
		
		dialogButton.bind('click', function(){	
		getXml(hrefA);
		if(typeof SpeechSynthesisUtterance !== 'undefined') {	
			speechSynthesis.cancel();
		}
		});	
		} 
	 }

	function messageBoxB(){
		//check for tts-cookie
		var ttsSettings="false";
		ttsSettings=getCookie("tts");
		
		var text = $xml.find('messageBoxB').eq(indexAB).text();
		var hrefB = $xml.find('messageBoxB').eq(indexAB).attr('href');
		var readVoice = $xml.find('messageBoxB').eq(indexAB).attr('voice');
		
		//Implementing TTS for message Box B
		/*
		 * Philipp K.
		 * 4.3.16
		 * Updated TTS so it speaks every sentence as a single object. 
		 * If Speech Syntehsis is undefined the user gets a console log
		 * If the browser cannot load the voices, the user gets a console log instead of a wrong voice
		 */
		if(window.SpeechSynthesisUtterance === undefined) {
			console.log("Text to speech is not available");
		}else if(text != undefined){
			var ttstext = text.split(".");
			var voices = speechSynthesis.getVoices();
			if(voices[0] != undefined){
				if(ttsSettings == "true" && readVoice =="male") {
					for(var j=0; j < ttstext.length; j++){
						var tts = new SpeechSynthesisUtterance(ttstext[j]);
						if(voices.filter(function(voice) { return voice.name == 'Google UK English Male'; })[0] != undefined){
							tts.voice = voices.filter(function(voice) { return voice.name == 'Google UK English Male'; })[0];
						} else {
							tts.voice = voices.filter(function(voice) { return voice.name == 'Daniel'; })[0];
						}
						speechSynthesis.speak(tts);
					}
				}
				if(ttsSettings == "true" && readVoice =="female"){	
					for(var j=0; j < ttstext.length; j++){
						var tts = new SpeechSynthesisUtterance(ttstext[j]);
						if(voices.filter(function(voice) { return voice.name == 'Google UK English Female'; })[0] != undefined){
							tts.voice = voices.filter(function(voice) { return voice.name == 'Google UK English Female'; })[0];
						} else {
							tts.voice = voices.filter(function(voice) { return voice.name == 'Samantha'; })[0];
						}
						speechSynthesis.speak(tts);
				}
				}
			}else{
				console.log("Could not load voices - Text2Speech disabled"); 
			}
		}
		
		var messageBoxContainer = $('.dialogBox');
		console.log("Message Box B" +i);
		messageBoxContainer
				.append('<div class="bc messageBoxBContainer"><div class="bc messageBoxB"></div><div class="bc messageBoxBTriangle"></div><div class="bc messageBoxBTriangle2"></div></div>');
		var messageBoxB = $('.messageBoxB').eq(indexAB);
		messageBoxB.text(text);

		// NEW LINE 700 - 709
		var dialogButton = $('.messageBoxB').eq(indexAB);
		if (hrefB == undefined &&  href!= undefined) {
			i++;
			console.log(hrefNumber);
			if (i == hrefNumber) {
				console.log("Message Box B TEST");
				var nextButton = $('.buttonContainer');
				nextButton.append('<div class="nextButton">NEXT</div>');
				nextButton.linkbutton({});
				nextButton.bind( 'click', function() {
									getXml(href);
									if (ttsSettings == "true"
											&& typeof SpeechSynthesisUtterance !== 'undefined') {
										speechSynthesis.cancel();
									}
								});
			}
		} else if (hrefB == undefined){
			
		} else {

			$('.messageBoxB').eq(indexAB).css('border-color', '#FF7700');
			$('.messageBoxBTriangle').eq(indexAB).css('border',
					'11px solid #FF7700');
			$('.messageBoxBTriangle2').eq(indexAB).css('border',
					'7px solid #FF7700');
			dialogButton.linkbutton({
				text : text
			});
			dialogButton.bind('click', function() {
				getXml(hrefB);
				if (typeof SpeechSynthesisUtterance !== 'undefined') {
					speechSynthesis.cancel();
				}
			});
		}
	}
	if (hrefNumber == "0") {
		
		var nextButton = $('.buttonContainer');

		nextButton.append('<div class="nextButton">NEXT</div>');

		nextButton.linkbutton({

		});
		nextButton.bind('click', function() {
			getXml(href);
			speechSynthesis.cancel();
		});
	}

	showConversation();
	var continueButtonMatrixConversation = $('#continueButtonMatrixConversation');

	continueButtonMatrixConversation.unbind('click');
	continueButtonMatrixConversation.bind('click', function() {
		getXml(href);
		if (ttsSettings == "true"
				&& typeof SpeechSynthesisUtterance !== 'undefined') {
			speechSynthesis.cancel();
		}
		containerConversation.window('close');
	});
};
// eventtype 24
function loadTextBox() {
	// liest XML aus
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	// alert("description");
	var containerTextBox = $('.textBox');
	var descriptioncontainerTextBox = containerTextBox.find('.description');
	descriptioncontainerTextBox.text(description);
	// Lade den Dialog Hintergrund
	loadBackground();

	var messageBox = $xml.find('message').text();
	var messageContainerTest = containerTextBox.find('.messageBox');
	messageContainerTest.text(messageBox);

	var continueButtonTextBox = $('#continueButtonTextBox');

	showTextBox();

	continueButtonTextBox.unbind('click');
	continueButtonTextBox.bind('click', function() {
		getXml(href);
		speechSynthesis.cancel();
		containerTextBox.window('close');
	});
};

// eventtype 26
function loadScrollBar() {

	// liest XML aus
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var description26 = $xml.find('description26').text();
	var containerScrollBar = $('.scrollBar');
	var descriptioncontainerScrollBar = containerScrollBar.find('.description');
	var descriptioncontainerScrollBar26 = containerScrollBar
			.find('.description26');
	descriptioncontainerScrollBar.text(description);
	descriptioncontainerScrollBar26.text(description26);
	// Lade den Dialog Hintergrund
	loadBackground();

	var humaneOrientationUserValue = document
			.getElementById("humaneOrientation").value;

	var powerDistance = $xml.find('powerDistance').text();
	var institutionalCollectivism = $xml.find('institutionalCollectivism')
			.text();
	var genderEgalitarism = $xml.find('genderEgalitarism').text();
	var ingroupCollectivism = $xml.find('ingroupCollectivism').text();
	var performanceOrientation = $xml.find('performanceOrientation').text();
	var futureOrientation = $xml.find('futureOrientation').text();
	var uncertaintyAvoidance = $xml.find('uncertaintyAvoidance').text();
	var assertiveness = $xml.find('assertiveness').text();
	var humaneOrientation = $xml.find('humaneOrientation').text();

	var continueButtonScrollButton = $('#continueButtonScrollButton');
	continueButtonScrollButton.text("Solution");

	showScrollBar();

	continueButtonScrollButton.unbind('click');
	var i = 0;
	continueButtonScrollButton.bind('click', function() {

		if (i == "0") {
			var inputRow = $('.inputRowPD');
			inputRow.append('<div class="solutionPD"/>' + powerDistance
					+ '</div>');
			var inputRow = $('.inputRowInsC');
			inputRow.append('<div class="solutionInsC"/>'
					+ institutionalCollectivism + '</div>');
			var inputRow = $('.inputRowGE');
			inputRow.append('<div class="solutionGE"/>' + genderEgalitarism
					+ '</div>');
			var inputRow = $('.inputRowIngC');
			inputRow.append('<div class="solutionIngC"/>' + ingroupCollectivism
					+ '</div>');
			var inputRow = $('.inputRowPO');
			inputRow.append('<div class="solutionPO"/>'
					+ performanceOrientation + '</div>');
			var inputRow = $('.inputRowFO');
			inputRow.append('<div class="solutionFO"/>' + futureOrientation
					+ '</div>');
			var inputRow = $('.inputRowUA');
			inputRow.append('<div class="solutionUA"/>' + uncertaintyAvoidance
					+ '</div>');
			var inputRow = $('.inputRowA');
			inputRow.append('<div class="solutionA"/>' + assertiveness
					+ '</div>');
			var inputRow = $('.inputRowHO');
			inputRow.append('<div class="solutionHO"/>' + humaneOrientation
					+ '</div>');
			// if(powerDistance != powerDistanceUserValue){

			// $('.solutionPD').css('background-color','#FF7700');
			// }

			continueButtonScrollButton.text("Done");
			i++;
		} else {
			getXml(href);
			speechSynthesis.cancel();
			containerScrollBar.window('close');
		}
	});
}

// eventtype 21
function loadMatrixAllocation() {

	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var container = $('.matrixAllocationContainer');
	var descriptionContainer = container.find('.description');

	// Auswahl des Divs welches die "Zielfl�chen" des Matrixspiels enth�lt um
	// ihn droppable zu machen (akzeptieren von divs erlauben)
	var tileAcceptor = container.find('.tileAcceptor');
	var continueButtonMatrix = $('#continueButtonMatrix');
	// Enth�lt zuzuordnende tiles
	var draggableTilesContainer = $('.draggableTilesContainer');

	$('.dragTile').remove();
	loadBackground();
	$xml.find('option').each(
			function(index) {
				var itemText = $(this).text();
				var itemRank = $(this).attr('rank');
				var itemDescription = $(this).attr('fdesc');
				// ***code needed for tooltip function
				var itemTitle = $(this).attr('title');
				var itemHoverTitle = '';
				if ((itemTitle !== '') && (itemTitle !== undefined)) {
					var itemHoverTitle = ' title="' + itemTitle + '"';
				}
				// ***
				draggableTilesContainer
						.append('<div class="dragTile bc bph" data-fdesc="'
								+ itemDescription + '" rank="' + itemRank + '"'
								+ itemHoverTitle + '>' + itemText + '</div>');
			});

	// Auswahl aller Tiles die beweglich sind
	var draggableItems = container.find('.dragTile');
	descriptionContainer.text(description);

	// Might be reused to name axes --> Low to High Impact/Priority
	// $xml.find('column').each(function(index){
	// phaseTitleContainer.eq(index).text($(this).html());
	// });

	continueButtonMatrix.unbind('click');
	continueButtonMatrix.bind('click', function() {
		tileAcceptor.css('background-color', '');
		var correct = true;
		var allDragged = true;

		// Iteriere durch TileAcceptors, f�r jeden TitleAcceptor pr�fe, ob der
		// Rank des sich in ihm befindlichen
		// dragTiles dem Iterator index entspricht. Im Idealfall befindet sich
		// im ersten TileAcceptor das dragTile
		// mit dem rank "1"
		tileAcceptor.each(function(index) {
			var correctTileRank = index + 1;
			if ($(this).find('.dragTile').attr('rank') != null) {
				var actualTileRank = $(this).find('.dragTile').attr('rank');
				if (actualTileRank != correctTileRank) {
					correct = false;
					$(this).find('.dragTile').addClass('dragIncorrect');
				}

			}
			// else {
			// // Wird angezeigt wenn "rank" nicht als Attribut der dragTiles
			// gefunden werden konnte
			// //--> XML �berpr�fen
			// showMsg("There has a been a problem with the validation!");
			// }
		});

		// Check if all items have been dragged
		$('.draggableTilesContainer').find('.dragTile').each(function() {
			allDragged = false;
		});
		if (correct == true && allDragged == true) {
			getXml(href);
			container.window('close');
		} else {
			if (allDragged == false) {
				showMsg('Info', 'You have not allocated all elements.'); // For
				// Debugging
			}
			if (correct == false) {
				showMsg('Info',
						'You have allocated one or more items incorrectly.'); // For
				// Debugging
			}
		}
	});
	showMatrixAllocation();

	// Drag Funktionalit�t
	draggableItems.draggable({
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');
			$(this).removeClass('dragIncorrect');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});

	// Drop Funktionalit�t f�r Platzhalter in Matrix und Ursprungscontainer,
	// sodass teile wieder zur�ckgelegt werden k�nnen
	tileAcceptor.droppable({
		accept : '.dragTile',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).removeClass('elementHighlight');
			// Wurde dem Zielfeld bereits eine Kachel zugeordnet, wird die
			// Funktion abgebrochen, die Kachel bleibt wo sie ist.
			if (e.target.hasChildNodes()) {
				return;
			}
			$(this).append(source);
		}
	});

	draggableTilesContainer.droppable({
		accept : '.dragTile',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).append(source);
			$(this).removeClass('elementHighlight');
		}
	});
}
// eventtype 20
function loadMatrixAllocationStandard() {

	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();

	var xAxisXML = $xml.find('xaxisdescription').text().toUpperCase();
	var yAxisXML = $xml.find('yaxisdescription').text().toUpperCase();
	var containerStandard = $('.matrixAllocationContainerStandard');
	var descriptionContainer = containerStandard.find('.description');
	var xAxisDescriptionContainer = $('.xAxisDescription');
	var yAxisDescriptionContainer = $('.yAxisDescription');
	loadBackground();
	// Auswahl des Divs welches die "Zielfl�chen" des Matrixspiels enth�lt um
	// ihn droppable zu machen (akzeptieren von divs erlauben)
	var tileAcceptorStandard = containerStandard.find('.tileAcceptorStandard');
	var continueButtonMatrixStandard = $('#continueButtonMatrixStandard');
	// Enth�lt zuzuordnende tiles
	var draggableTilesContainerStandard = $('.draggableTilesContainerStandard');

	$('.dragTile').remove();

	$xml.find('option').each(
			function(index) {
				var itemText = $(this).text();
				var itemRank = $(this).attr('rank');
				var itemDescription = $(this).attr('fdesc');
				// ***code needed for tooltip function
				var itemTitle = $(this).attr('title');
				var itemHoverTitle = '';
				if ((itemTitle !== '') && (itemTitle !== undefined)) {
					var itemHoverTitle = ' title="' + itemTitle + '"';
				}
				// ***
				draggableTilesContainerStandard
						.append('<div class="dragTile bc bph" data-fdesc="'
								+ itemDescription + '" rank="' + itemRank + '"'
								+ itemHoverTitle + '>' + itemText + '</div>');
			});

	// Auswahl aller Tiles die beweglich sind
	var draggableItems = containerStandard.find('.dragTile');
	descriptionContainer.text(description);
	xAxisDescriptionContainer.text(xAxisXML);
	yAxisDescriptionContainer.text(yAxisXML);

	// Might be reused to name axes --> Low to High Impact/Priority
	// $xml.find('column').each(function(index){
	// phaseTitleContainer.eq(index).text($(this).html());
	// });

	continueButtonMatrixStandard.unbind('click');
	continueButtonMatrixStandard.bind('click', function() {
		$('.tileAcceptorStandard').css('background-color', '');
		var correct = true;
		var allDragged = true;

		// Iteriere durch TileAcceptors, f�r jeden TitleAcceptor pr�fe, ob der
		// Rank des sich in ihm befindlichen
		// dragTiles dem Iterator index entspricht. Im Idealfall befindet sich
		// im ersten TileAcceptor das dragTile
		// mit dem rank "1"
		$('.tileAcceptorStandard').each(function(index) {
			var correctTileRank = index + 1;
			if ($(this).find('.dragTile').attr('rank') != null) {
				var actualTileRank = $(this).find('.dragTile').attr('rank');
				if (actualTileRank != correctTileRank) {
					correct = false;
					$(this).find('.dragTile').addClass('dragIncorrect');
				}

			}
			// else {
			// // Wird angezeigt wenn "rank" nicht als Attribut der dragTiles
			// gefunden werden konnte
			// //--> XML �berpr�fen
			// showMsg("There has a been a problem with the validation!");
			// }
		});

		// Check if all items have been dragged
		$('.draggableTilesContainerStandard').find('.dragTile').each(
				function() {
					allDragged = false;
				});
		if (correct == true && allDragged == true) {
			getXml(href);
			containerStandard.window('close');
		} else {
			if (allDragged == false) {
				showMsg('Info', 'You have not allocated all elements.'); // For
				// Debugging
			}
			if (correct == false) {
				showMsg('Info',
						'You have allocated one or more items incorrectly.'); // For
				// Debugging
			}
		}
	});
	showMatrixAllocationStandard();

	// Drag Funktionalit�t
	draggableItems.draggable({
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');
			$(this).removeClass('dragIncorrect');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});

	// Drop Funktionalit�t f�r Platzhalter in Matrix und Ursprungscontainer,
	// sodass teile wieder zur�ckgelegt werden k�nnen
	tileAcceptorStandard.droppable({
		accept : '.dragTile',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).removeClass('elementHighlight');
			// Wurde dem Zielfeld bereits eine Kachel zugeordnet, wird die
			// Funktion abgebrochen, die Kachel bleibt wo sie ist.
			if (e.target.hasChildNodes()) {
				return;
			}
			$(this).append(source);
		}
	});

	draggableTilesContainerStandard.droppable({
		accept : '.dragTile',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).append(source);
			$(this).removeClass('elementHighlight');
		}
	});
}
// Eventtype 27
function loadMatrixAllocationAlternate() {
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var container = $('.matrixAllocationContainerAlternate');
	var infoContainer = $('.infoContainer');
	var descriptionContainer = container.find('.description');

	// Auswahl des Divs welches die "Zielfl�chen" des Matrixspiels enth�lt um
	// ihn droppable zu machen (akzeptieren von divs erlauben)
	var tileAcceptor = container.find('.tileAcceptor');
	var continueButtonMatrix = $('#continueButtonMatrixAlternate');
	// Enth�lt zuzuordnende tiles
	var draggableTilesContainer = $('.draggableTilesContainerAlternate');

	$('.dragTile').remove();
	loadBackground();
	$xml.find('option').each(
			function(index) {
				var itemText = $(this).text();
				var itemRank = $(this).attr('rank');
				var itemMetaDescription = $(this).attr('fdesc');
				var itemDescription = $(this).attr('description');
				setDescription(infoContainer, itemRank, itemDescription);
				// ***code needed for tooltip function
				var itemTitle = $(this).attr('title');
				var itemHoverTitle = '';
				if ((itemTitle !== '') && (itemTitle !== undefined)) {
					var itemHoverTitle = ' title="' + itemTitle + '"';
				}
				// ***
				draggableTilesContainer
						.append('<div class="dragTile bc bph" data-fdesc="'
								+ itemMetaDescription + '" rank="' + itemRank
								+ '"' + itemHoverTitle + '>' + itemText
								+ '</div>');
			});

	// Auswahl aller Tiles die beweglich sind
	var draggableItems = container.find('.dragTile');
	descriptionContainer.text(description);

	// Might be reused to name axes --> Low to High Impact/Priority
	// $xml.find('column').each(function(index){
	// phaseTitleContainer.eq(index).text($(this).html());
	// });

	continueButtonMatrix.unbind('click');
	continueButtonMatrix.bind('click', function() {
		tileAcceptor.css('background-color', '');
		var correct = true;
		var allDragged = true;

		// Iteriere durch TileAcceptors, f�r jeden TitleAcceptor pr�fe, ob der
		// Rank des sich in ihm befindlichen
		// dragTiles dem Iterator index entspricht. Im Idealfall befindet sich
		// im ersten TileAcceptor das dragTile
		// mit dem rank "1"
		tileAcceptor.each(function(index) {
			var correctTileRank = index + 1;
			if ($(this).find('.dragTile').attr('rank') != null) {
				var actualTileRank = $(this).find('.dragTile').attr('rank');
				if (actualTileRank != correctTileRank) {
					correct = false;
					$(this).find('.dragTile').addClass('dragIncorrect');
				}

			}
			// else {
			// // Wird angezeigt wenn "rank" nicht als Attribut der dragTiles
			// gefunden werden konnte
			// //--> XML �berpr�fen
			// showMsg("There has a been a problem with the validation!");
			// }
		});

		// Check if all items have been dragged
		$('.draggableTilesContainerAlternate').find('.dragTile').each(
				function() {
					allDragged = false;
				});
		if (correct == true && allDragged == true) {
			getXml(href);
			container.window('close');
		} else {
			if (allDragged == false) {
				showMsg('Info', 'You have not allocated all elements.'); // For
				// Debugging
			}
			if (correct == false) {
				showMsg('Info',
						'You have allocated one or more items incorrectly.'); // For
				// Debugging
			}
		}
	});
	showMatrixAllocationAlternate();

	// Drag Funktionalit�t
	draggableItems.draggable({
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');
			$(this).removeClass('dragIncorrect');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});

	// Drop Funktionalit�t f�r Platzhalter in Matrix und Ursprungscontainer,
	// sodass teile wieder zur�ckgelegt werden k�nnen
	tileAcceptor.droppable({
		accept : '.dragTile',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).removeClass('elementHighlight');
			// Wurde dem Zielfeld bereits eine Kachel zugeordnet, wird die
			// Funktion abgebrochen, die Kachel bleibt wo sie ist.
			if (e.target.hasChildNodes()) {
				return;
			}
			$(this).append(source);
		}
	});

	draggableTilesContainer.droppable({
		accept : '.dragTile',
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('elementHighlight');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			// elementHighlight can be found in master.css
			$(this).removeClass('elementHighlight');
		},
		onDrop : function(e, source) {
			$(this).append(source);
			$(this).removeClass('elementHighlight');
		}
	});
};

function loadWorldMapAsBackground() {
	var background;
	var backgroundWithPartnerUrl;
	if ($xml.find('worldmapImg').text() != '') {
		background = $xml.find('worldmapImg').text();
		backgroundWithPartnerUrl = 'images/' + background;
		setWorldMapBackground(backgroundWithPartnerUrl);
	}
	showWorldmap();
}

function setWorldMapBackground(backgroundUrl) {
	document.getElementById('background-video').src = '';
	backgroundPictureUrlNew = 'url(' + backgroundUrl + ')';
	var eventtype = $xml.find('event').attr('eventtype');

	backgroundPictureUrlOld = $('.worldmapImg').css('background-image');
	if (backgroundPictureUrlOld.split("images/")[1] != backgroundPictureUrlNew
			.split("images/")[1]) {
		$('.worldmapImg').css('background-image', backgroundPictureUrlNew);
		$('.worldmapImg').css('background-repeat', 'no-repeat');
		$('.worldmapImg').css('margin', '0 auto');
	}
}
