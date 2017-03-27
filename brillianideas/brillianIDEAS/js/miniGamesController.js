
/**
 * @file Liest Spieledaten aus .json Dateien und baut daraus die Minispiele auf
 * miniGames.css enthält den Style für die Minispiele
 *
 * @author Julian Bürkle <jbuerkle@live.de>
 */

var currentNumberOfDragAndDropElements = 0; // zählt die Anzahl der Elemente der JSON-Datei

	var questionNumber = 0;
	var questionBank = new Array();

	var tempDragAndDropBank = new Array();
	var dragAndDropBank1 = new Array();
	var dragAndDropBank2 = new Array();
	var dragAndDropBank3 = new Array();
	var dragAndDropBank4 = new Array();
	var dragAndDropBank5 = new Array();

	var numberOfDragAndDropGamesPlayed = 0;

	var numberOfTargetsOfCurrentGame;

	// dragAndDropBank[] = new Array();
	// dragAndDropBank[][] = new Array();

	var q = new Array();
	var stage = "#game1";
	var stage2 = new Object;
	var questionLock = false;
	var numberOfQuestions;
	var score = 0;
	var numberOfFalseOptions = new Array();;
	var jsonFileName;
	var dragAndDropGameTitle;
	var dragAndDropGameDescription;

	var numberOfTargets;

	var numberOfDragAndDropGames;
	var numberOfQuizLists;


	$(document)
		.ready(
			function() {

				/**
				 * @function getUrlParameter - Lese Parameter (Name des benötigten JSON Files) aus und speichere ihn in der variable jsonFileName, welche dann an die $getJSON methode weitergegeben wird
				 *
				 * @param  {String} sParam Name des URL Parameters indem der .json Dateiname spezifiziert ist
				 * @return {String}        .json Dateiname
				 */
				var getUrlParameter = function getUrlParameter(sParam) {
					var sPageURL = decodeURIComponent(window.location.search.substring(1)),
						sURLVariables = sPageURL.split('&'),
						sParameterName,
						i;

					for (i = 0; i < sURLVariables.length; i++) {
						sParameterName = sURLVariables[i].split('=');
						if (sParameterName[0] === sParam) {
							return sParameterName[1] === undefined ? true : sParameterName[1];
						}
					}
				};


				/**
				 * 	liest den Namen des Json files in dem alle Inhalte für dieses Spiel gespeichert sind aus der URL aus
				 */
				var jsonFileName = getUrlParameter('jsonFileName');
				var jsonFilePath = "json/" + jsonFileName;

				


				/**
				 * @function getJSON - Liest alle benötigten Daten für DragAndDropGames & Quizlisten aus der .json datei eines bestimmten Spiels aus
				 * 					 Die Daten werden dann in zweidimensionalen Arrays für spätere Nutzung gespeichert
				 * 					 Achtung: Es können im .json mehere verschieden DragAndDropGames hinzugefügt werden, aber nur eine Quizliste in der alle Quizfragen gespeichert werden müssen
				 *
				 * @param {String} jsonFilePath  Dateipfad der benötigten .json Datei
				 *
				 */
				$.getJSON(jsonFilePath, function(data) {

					numberOfQuizLists = data.quizGames.length;
					numberOfDragAndDropGames = data.DragDropGames.length;

					if (numberOfQuizLists > 0) {

						for (var z = 0; z < numberOfQuizLists; z++) {

							/**
							 * Alle fragen und antwortmöglichkeiten der quizlist im json werden durchlaufen und in einem 2dimensionalen array gespeichert
							 */
							for (i = 0; i < data.quizGames[z].quizlist.length; i++) {
								questionBank[i] = new Array();

								/**
								 * 	Die Frage und die richtige Antwort werden an Position 0 und 1 im zweidimensionalen Array gespeichert
								 */
								questionBank[i][0] = data.quizGames[z].quizlist[i].question;
								questionBank[i][1] = data.quizGames[z].quizlist[i].optionTrue;


								/**
								 * 		Es werden entweder mehrere falsche (SingleChoice Minispiel) oder nur eine Antwortmöglichkeit (Yes/No Minispiele) zum Array hinzugefügt
								 */
								for (j = 0; j < data.quizGames[z].quizlist[i].optionFalse.length; j++) {
									questionBank[i][j + 2] = data.quizGames[z].quizlist[i].optionFalse[j];
								}



							}
							

						} //for(var z=0;z<numberOfQuizLists;z++) {
					}

					if (numberOfDragAndDropGames > 0) {

						/**
						 * 	Die Schleife wird so oft durchlaufen wie es DragDropGames gibt
						 */
						for (var k = 0; k < numberOfDragAndDropGames; k++) {

							
							


							var tempDragAndDropBankFirstDimension = new Array();

							//

							/**
							 * 	Die Schleife wird so oft durchlaufen, wie das jeweilige DragDropGame Elemente hat
							 */
							for (var i = 0; i < data.DragDropGames[k].DragAndDropList.length; i++) {


								tempDragAndDropBank[i] = new Array();

								tempDragAndDropBank[i][0] = data.DragDropGames[k].DragAndDropList[i].id;

								tempDragAndDropBank[i][1] = data.DragDropGames[k].DragAndDropList[i].target;
								tempDragAndDropBank[i][2] = data.DragDropGames[k].DragAndDropList[i].elementtext;


								/**
								 * 		Lese game title, description, sowie targettitle aus dem ersten Unterelment im json aus und speichere es im Array an vordefinierter Stelle
								 */
								 if (data.DragDropGames[k].DragAndDropList[i].id == 'd0') {
									
									
									dragAndDropGameTitle = data.DragDropGames[k].DragAndDropList[i].title;
									dragAndDropGameDescription = data.DragDropGames[k].DragAndDropList[i]
										.description;
									numberOfTargets = data.DragDropGames[k].DragAndDropList[i].targetNumber;

									

									tempDragAndDropBank[i][3] = dragAndDropGameTitle;
									tempDragAndDropBank[i][4] = dragAndDropGameDescription;
									tempDragAndDropBank[i][5] = numberOfTargets;



									/**
									 * Je wie viele Zielkasten definiert sind, werden die verschiedenen Titel im Array an bestimmten Stellen gespeichert
									 */
									if (numberOfTargets == 2) {


										tempDragAndDropBank[i][6] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget1;
										tempDragAndDropBank[i][7] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget2;

									}

									if (numberOfTargets == 3) {


										tempDragAndDropBank[i][6] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget1;
										tempDragAndDropBank[i][7] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget2;
										tempDragAndDropBank[i][8] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget3;

									}

									if (numberOfTargets == 4) {


										tempDragAndDropBank[i][6] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget1;
										tempDragAndDropBank[i][7] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget2;
										tempDragAndDropBank[i][8] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget3;
										tempDragAndDropBank[i][9] = data.DragDropGames[k].DragAndDropList[i]
											.titleTarget4;

									}







								}



								tempDragAndDropBankFirstDimension.push(tempDragAndDropBank[i]);



							}


							/**
							 * Speichere für jedes DragDropGame die Daten in einem separatem Array. Damit wird das Benutzen eines 3 dimensionalen Array umgangen
							 */
							if (k == 0) {
								dragAndDropBank1 = tempDragAndDropBankFirstDimension;
							}

							if (k == 1) {
								dragAndDropBank2 = tempDragAndDropBankFirstDimension;
							}

							if (k == 2) {
								dragAndDropBank3 = tempDragAndDropBankFirstDimension;
							}

						}



					} // if (numberOfDragAndDropGames > 0)


					numberOfQuestions = questionBank.length;

					/**
					 * 	 entferne '.json' vom String und setze den Spielenamen in den Browsertab und als Überschrift in die MiniGames.html
					 */
					var trimmedFileName = jsonFileName.replace('.json', '');
					//Setze SpieleNamen in <div> element mit id=navbar und in html <title> element
					$('#topbar').text(trimmedFileName)
					$(document).find("title").text(trimmedFileName + " Quiz")

					executeGameLogic();
				}); // gtjson




				/**
				 * @function executeGameLogic
				 *
				 * Je nachdem wie viele DragAnddropGames und Quizlisten es gibt, werden wenn vorhanden zunächst alle DragAnddropGames und danach alle QUizfragen
				 *
				 */
				function executeGameLogic() {


					if (numberOfDragAndDropGames > 0) {
						displayDragAndDropGame(0);
					}
					else {
						if (numberOfQuizLists > 0) {
							displayQuizListQuestion(0);
						};
					}

				} // executeGameLogic

			}); // doc ready


	/**
	 * @function displayDragAndDropGame
	 * Lädt alle relaventen Daten (DragAndDrop Elemente, Zieltargets, checkInput button, etc) und zeigt sie in der MiniGames.html an
	 * Außerdem wird ein TentakelArm von Bob angezeigt
	 * Achtung: Alle DragAnddropGames werden im div #game1 angezeigt. Dementsprechend müssen wenn das nächste DragAnddropGame angeziegt wird alle Elemente erst entfernt werden
	 * 					und dann die neuen Elemente hinzugefügt
	 *
	 * @param  {int} numberOfCurrentDragDropGame Nummer des DragAnddropGame, das gerade angezeigt werden soll
	 */
	function displayDragAndDropGame(numberOfCurrentDragDropGame) {

		/**
		 * 		füge das neutrale Bob Gesicht hinzu, falls es nicht schon da ist
		 */
		if (!$(".background").find(".BobTentacleRight").length > 0) {
			$('.background')
				.append(
					'<img src="img/miniGames/tentakel_right_MiniGames.png" id ="BobTentacleRightId" class="BobTentacleRight" style="object-fit: contain">'
				);
		}


		var counter = 0;
		var tempArray = new Array();


		/**
		 * Lade die benötigten Daten für das aktuelle DragAndDropGame
		 */

		if (numberOfCurrentDragDropGame == 0) {
			tempArray = dragAndDropBank1;
		}

		if (numberOfCurrentDragDropGame == 1) {
			numberOfTargetsOfPreviuosGame = dragAndDropBank1[0][5];
			tempArray = dragAndDropBank2;

		}

		if (numberOfCurrentDragDropGame == 2) {
			numberOfTargetsOfPreviuosGame = dragAndDropBank2[0][5];
			tempArray = dragAndDropBank3;
		}

		if (numberOfCurrentDragDropGame == 3) {
			numberOfTargetsOfPreviuosGame = dragAndDropBank3[0][5];
			tempArray = dragAndDropBank4;
		}

		if (numberOfCurrentDragDropGame == 4) {
			numberOfTargetsOfPreviuosGame = dragAndDropBank4[0][5];
			tempArray = dragAndDropBank5;
		}

		/**
		 * 		Je nachdem wie viele Zielkästen es gibt, entferne zunächst alle gerade existierenden Elemente aus der MiniGames.html und zeige die neuen an
		 */
		numberOfTargetsOfCurrentGame = tempArray[0][5];
		var numberOfTargetsOfPreviuosGame;
		if (numberOfTargetsOfCurrentGame == 2) {
			stage = '#game1';

			if (numberOfTargetsOfPreviuosGame == 2) {
				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			if (numberOfTargetsOfPreviuosGame == 3) {

				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#target3').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			if (numberOfTargetsOfPreviuosGame == 4) {

				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#target3').remove();
				$('#target4').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			$(stage)
				.append(
					'<div id="gameTitle"><strong></strong></div>' +
					'<div id="gameDescription"></div>' +
					'<div class="container"><div id="source" style="width:30%"></div>' +
					'<div id="target1" style="width:30%"></div>' +
					'<div id="target2" style="width:30%"></div>' +
					'</div>' +
					'<div style="clear:both"></div>' +
					'<div id="button"><button id= "checkInputButton" class ="button" onclick="checkInput()">Eingabe prüfen</button></div>'

				);

			/**
			 * Nachfolgende Funktionen sind Bestandteil von JQuery EasyUi und definieren die Eigenschaften, Design und Verhalten der Zielcontainer für die Elemente
			 */
			$('#target1').droppable({
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});
			$('#target2').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});
		}

		if (numberOfTargetsOfCurrentGame == 3) {

			stage = '#game1';

			if (numberOfTargetsOfPreviuosGame == 2) {

				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			if (numberOfTargetsOfPreviuosGame == 3) {

				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#target3').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			if (numberOfTargetsOfPreviuosGame == 4) {

				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#target3').remove();
				$('#target4').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			//And set new
			$(stage)
				.append(
					'<div id="gameTitle"><strong></strong></div>' +
					'<div id="gameDescription"></div>' +
					'<div class="container"><div id="source" style="width:25%"></div>' +
					'<div id="target1" style="width:25%"></div>' +
					'<div id="target2" style="width:25%"></div>' +
					'<div id="target3" style="width:25%"></div>' +
					'</div>' +
					'<div style="clear:both"></div>' +
					'<div id="button"><button id= "checkInputButton" class ="button" onclick="checkInput()">Eingabe prüfen</button></div>'

				);

			// Nachfolgende Funktionen sind Bestandteil von JQuery EasyUi und definieren die Eigenschaften der Zielcontainer für die Elemente
			$('#target1').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});
			$('#target2').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});

			$('#target3').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});
		}

		if (numberOfTargetsOfCurrentGame == 4) {
			stage = '#game1';

			if (numberOfTargetsOfPreviuosGame == 2) {

				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			if (numberOfTargetsOfPreviuosGame == 3) {

				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#target3').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			if (numberOfTargetsOfPreviuosGame == 4) {

				// remove breaks
				$('#game1').find('br').remove();

				// remove all other items
				$('#source').remove();
				$('#target1').remove();
				$('#target2').remove();
				$('#target3').remove();
				$('#target4').remove();
				$('#button').remove();
				$('#gameDescription').remove();
				$('#gameTitle').remove();
				$('.container').remove();
			}

			$(stage)
				.append(
					'<div id="gameTitle"><strong></strong></div>' +
					'<div id="gameDescription"></div>' +
					'<div class="container"><div id="source" style="width:20%"></div>' +
					'<div id="target1" style="width:20%"></div>' +
					'<div id="target2" style="width:20%"></div>' +
					'<div id="target3" style="width:20%"></div>' +
					'<div id="target4" style="width:20%"></div>' +
					'</div>' +
					'<div style="clear:both"></div>' +
					'<div id="button"><button id= "checkInputButton" class ="button" onclick="checkInput()">Eingabe prüfen</button></div>'

				);

			$('#target1').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});

			$('#target2').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});
			$('#target3').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});

			$('#target4').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter: function(e, source) {
					$(source).draggable('options').cursor = 'auto';
					$(source).draggable('proxy').css('border', '1px solid');
					$(this).addClass('over');
				},
				onDragLeave: function(e, source) {
					$(source).draggable('options').cursor = 'not-allowed';
					$(source).draggable('proxy').css('border', '1px solid #ccc');
					$(this).removeClass('over');
				},
				onDrop: function(e, source) {
					$(this).append(source)
					$(this).removeClass('over');
				}
			});
		}

		/**
		 * Gab es bereits ein DragandDropGame entferne auch noch die draggable div Elemente. Außerdem wird immer der goToNextQuiz Button entfernt
		 */
		if (numberOfCurrentDragDropGame > 0) {

			for (var i = 0; i < dragAndDropBank1.length; i++) {
				var currentId = "#d" + i;
				
				$(currentId).remove();
			}

			$('#goToNextQuiz').remove();

		}

		/**
		 * füge die neuen draggable div Elemente hinzu, sowie den Spieletitel und Beschreibung und setze die Daten hinein
		 */
		for (var i = 0; i < tempArray.length; i++) {

			if (tempArray[i][0] == "d0") {
				$('#gameTitle').text(tempArray[i][3]);
				$('#gameDescription').text(tempArray[i][4]);

				if (numberOfTargetsOfCurrentGame == 2) {
					$('#target1').text(tempArray[i][6]);
					$('#target2').text(tempArray[i][7]);
				}

				if (numberOfTargetsOfCurrentGame == 3) {
					$('#target1').text(tempArray[i][6]);
					$('#target2').text(tempArray[i][7]);
					$('#target3').text(tempArray[i][8]);

				}

				if (numberOfTargetsOfCurrentGame == 4) {
					$('#target1').text(tempArray[i][6]);
					$('#target2').text(tempArray[i][7]);
					$('#target3').text(tempArray[i][8]);
					$('#target4').text(tempArray[i][9]);
				}

			}

			/**
			 * 	Füge die neuen draggable Elemente hinzu nach dieser Beispielstruktur <div id="d1" class = "drag" title="target1"></div>
			 */
			$('#source').append($('<div/>', {
				id: tempArray[i][0],
				'class': "drag",
				target: tempArray[i][1]
			}));

			/**
			 * 	Mit Hilfe der ID wird das Element aufgerufen und der Text übergeben, der angezeigt werden soll
			 */
			document.getElementById(tempArray[i][0]).innerHTML = tempArray[i][2];

			counter++;

		}


		/**
		 * 		hier wird die anzahl der draganddropelements des gerade ausgeführten Drag and drop Games gepseichert
		 *    in der checkInput methode wird sie dann dazu benutzt zu überprüfen ob alle Elemente zugeordnet wurden
		 */
		currentNumberOfDragAndDropElements = counter;


		/**
		 * @function - Macht Elemente draggable & droppable mittels jquery
		 */
		$(function() {
			$('.drag').draggable({
				proxy: 'clone',
				revert: true,
				cursor: 'auto',
				onStartDrag: function() {
					$(this).draggable('options').cursor = 'not-allowed';
					$(this).draggable('proxy').addClass('dp');
				},
				onStopDrag: function() {
					$(this).draggable('options').cursor = 'auto';
				}
			});


		});



	}


	/**
	 * @function checkInput
	 * Überprüft, ob sich die Elemente an der richtigen Stelle befinden.
	 * Die richtige Stelle wird im json definiert
	 */
	function checkInput() {

		/**
		 * 	Zuerst wird geprüft, ob sich im Ausgangscontainer noch Elemente befinden
		 */
		if ($('#source').children().length == 0) {
			var wrongElement = 0;

			/**
			 * 	Wenn der Ausgangscontainer leer ist wird die Schleife sooft durchlaufen, wie das Minispiel Elemente hat und überorüft ob sich alle Elemente im richtigen Target befinden
			 *  Wenn das Element sich nicht in dem richtigen Container befindet, wird der Hintergrund rot
			 */
			for (var i = 0; i < currentNumberOfDragAndDropElements; i++) {

				if (numberOfTargetsOfCurrentGame == 2) {

					var currentid = "#d" + i;

					if ($(currentid).attr('target') == "target1") {

						if ($(document.getElementById("d" + i)).parents("#target1").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;

						}
						// Sollte das Element den title "target2" haben, werden nachfolgende Befehle ausgeführt. Diese funktionieren genauso wie die oben beschriebenen
					} else if ($(currentid).attr('target') == "target2") {
						if ($(document.getElementById("d" + i)).parents("#target2").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;
						}
					}
				}


				if (numberOfTargetsOfCurrentGame == 3) {


					var currentid = "#d" + i;

					if ($(currentid).attr('target') == "target1") {

						if ($(document.getElementById("d" + i)).parents("#target1").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;

						}
						// Sollte das Element den title "target2" haben, werden nachfolgende Befehle ausgeführt. Diese funktionieren genauso wie die oben beschriebenen
					} else if ($(currentid).attr('target') == "target2") {
						if ($(document.getElementById("d" + i)).parents("#target2").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;
						}
					} else if ($(currentid).attr('target') == "target3") {
						if ($(document.getElementById("d" + i)).parents("#target3").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;
						}
					}
				}

				if (numberOfTargetsOfCurrentGame == 4) {


					var currentid = "#d" + i;

					if ($(currentid).attr('target') == "target1") {

						if ($(document.getElementById("d" + i)).parents("#target1").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;

						}
						// Sollte das Element den title "target2" haben, werden nachfolgende Befehle ausgeführt. Diese funktionieren genauso wie die oben beschriebenen
					} else if ($(currentid).attr('target') == "target2") {
						if ($(document.getElementById("d" + i)).parents("#target2").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;
						}
					} else if ($(currentid).attr('target') == "target3") {
						if ($(document.getElementById("d" + i)).parents("#target3").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;
						}
					} else if ($(currentid).attr('target') == "target4") {
						if ($(document.getElementById("d" + i)).parents("#target4").length == 1) {
							document.getElementById("d" + i).style.backgroundColor =
								"rgb(153,27,51)";
						} else {
							document.getElementById("d" + i).style.backgroundColor = "red";
							
							wrongElement++;
						}
					}
				}

				

			}



			

			/**
			 * Wenn alle ELemente richtig zugeordnet werden zeige einen "Weiter" button an und ein pop-up
			 */
			if (wrongElement == 0) {

				/**
				 * 	Falls es den button schon gibt (User klickt zum zweiten Mal auf den Button), füge ihn nicht nochmal hinzu
				 */
				if ($('#goToNextQuiz').length > 0) {
					$('#button').remove();
					alert("Glückwunsch, Sie haben alle Elemente richtig zugeordnet!");
				} else {
					alert("Glückwunsch, Sie haben alle Elemente richtig zugeordnet!");
					$('#checkInputButton').remove();
					$('#button')
						.append(
							'<div id="goToNextQuiz" class="next">Weiter</div>');
				}


				/**
				 * @function goToNextQuiz
				 * 	Wenn der Button geklickt wird, wird gepürft ob es noch ein weiteres dragAndDropGame gibt und falls ja wird es angezeigt, wenn nicht wird die erste Quizfrage der Quizlist
				 */
				$("#goToNextQuiz").click(function() {
					numberOfDragAndDropGamesPlayed++;
					

					if (numberOfDragAndDropGames > 1) {

						if (numberOfDragAndDropGames > numberOfDragAndDropGamesPlayed) {

							changeDragAndDropGame(numberOfDragAndDropGamesPlayed);

						}
						else {
							changeQuestion(numberOfDragAndDropGamesPlayed);
						}

					}
					else {
						changeQuestion(numberOfDragAndDropGamesPlayed);
					}


				});

			}


		}
		else {
			alert("Es wurden nicht alle Elemente verwendet!");
		}


	/**
	 * Zähler wird wieder auf null gesetzt, falls noch weiteree dragAndDropGames teil des jsons sind
	 */
		if (wrongElement == 0) {
			currentNumberOfDragAndDropElements = 0;
		}

	} // checkinput

	var optionsCounter;



	/**
	 * @function displayQuizListQuestion
	 *  Zeige nacheinander die Fragen der Quizliste an
	 *  Achtung: Es gibt #game1 und #game2 um den Animationseffekt zu ermöglichen
	 * 					 dragAndDropGames werden alle in #game1 angezeigt, und die erste Quizfrage dann in #game2
	 *
	 * @param  {int} numberOfDragAndDropGamesPlayed Anzahl der bisher gespielten dragAndDropGames
	 */
	function displayQuizListQuestion(numberOfDragAndDropGamesPlayed) {

		/**
		 * Entferne den TentakelArm von Bob der bei den dragAndDropGames angezeigt wird
		 */
		$('.BobTentacleRight').remove();

		if (numberOfDragAndDropGamesPlayed > 0) {
			stage = '#game2';
		}

		optionsCounter = 0;
		var q = new Array();
		var contentArray = new Array();

		/**
		 * 	Füge die Frage hinzu
		 */
		$(stage).append(
			'<div class="questionText">' +
			questionBank[questionNumber][0] +
			'</div>')

		// Speichere alle Antworten in einem separatem array "q", welches dann geshuffelt wird

		/**
		 * 	Wenn es mehr als 2 Antwortmöglichkeiten gibt, werden Sie in eine zufällige Reihenfolge gebracht
		 */
		for (i = 1; i < questionBank[questionNumber].length; i++) {
			q[i - 1] = questionBank[questionNumber][i];
			contentArray[i - 1] = '<div id=' + i +
				' class="option" tabindex="1">' + q[i - 1] + '</div>';
			optionsCounter++;

		}
		if (optionsCounter > 2) {
			
			shuffle(contentArray);
			/**
			 * 	füge das neutrale Bob Gesicht hinzu, falls es nicht schon da ist
			 */
			if (!$("#navContent").find(".bob").length > 0) {
				$('#navContent')
					.append(
						'<img src="img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Kopf3.2_F.png" id ="bobId"class="bob" style="object-fit: contain">'
					);
			}

			// ...und dann angezeigt
			for (i = 0; i < contentArray.length; i++) {
				
				$(stage).append(contentArray[i]);
			}

		}
		/**
		 * wenn es nur zwei Antwortmöglichkeiten gibt, und es die Option "Richtig" und "Falsch" gibt wird "Richtig" immer zuerst angezeigt, ansonsten ist die Reihenfolge zufällig
		 */
		else {
			/**
			 * 	füge das neutrale Bob Gesicht hinzu, falls es nicht schon da ist
			 */
			if (!$("#navContent").find(".bob").length > 0) {
				$('#navContent')
					.append(
						'<img src="img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Kopf3.2_F.png" id ="bobId"class="bob" style="object-fit: contain">'
					);
			}

			var firstOptionIsAlreadySet = false;
			var secondOptionIsAlreadySet = false;
			for (i = 0; i < contentArray.length; i++) {
				// ist die Antwortmöglichkeit "Richtig", wird immer diese zuerst angezeigt und als zweites "Falsch"
				if (q[i] == "Richtig") {
					$(stage).append(contentArray[0]);
				} else if (q[i] == "Falsch") {
					$(stage).append(contentArray[1]);
				}
				// zeige die anderen Antwortmöglichkeiten an, z.B. Maximal- oder Minimalprinzip
				else {
					// Ist das erste Feld bereits besetzt zeige die Antwort im zweiten an und umgekehrt
					if (firstOptionIsAlreadySet==true) {
						$(stage).append(contentArray[1]);
					} else if (secondOptionIsAlreadySet == true) {
						$(stage).append(contentArray[0]);
					}
					// Falls noch kein Feld besetzt ist, zeige die Antwort per Zufall im ersten oder zweiten Feld an
					else {
						var randomNumber = Math.floor(Math.random() * 2) + 1;
						if (randomNumber == 1) {
							$(stage).append(contentArray[0]);
							firstOptionIsAlreadySet = true;
						} else if (randomNumber == 2) {
							secondOptionIsAlreadySet = true;
							$(stage).append(contentArray[1]);
						}

					}



				}
			}

		}

		$('.option')
			.click(
				function() {

					/**
					 * Markiere ausgewählte Antwortmöglichkeit weiterhin, auch wenn irgendwo anders auf der Seite geklickt wird
					 */
					var styles = {
						border: "#e53f5f solid 2px",

						color: "#e53f5f"
					};
					$(this).css(styles);


					/**
					 * Je nachdem ob der User die richtige oder die falsche auswählt wird ein zusätzliches Banner angezeigt und bob reagiert mit einem positiven oder traurigen Gesicht
					 */
					if (questionLock == false) {
						questionLock = true;
						// correct answer
						if (this.id == 1) {

							var randomNumber = Math.floor(Math.random() * 2) + 1;
							

							// Ersetze neutralen Bob mit einem der zwei positiven Bob
							if (randomNumber == 1) {
								changeBobImage('img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Kopf3_F.png');
							} else if (randomNumber == 2) {
								changeBobImage('img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Kopf3.1_F.png');
							}

							$(stage)
								.append(
									'<div class="feedback1">Richtig</div>');
							score++;

						}
						// wrong answer
						if (this.id != 1) {
							$("#1").css(
								'background-color',
								'#85ba1c');

							var randomNumber = Math.floor(Math.random() * 2) + 1;
							

							// Ersetze neutralen Bob mit einem der zwei negativen Bob
							if (randomNumber == 1) {
								changeBobImage('img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Kopf3.4_F.png');
							} else if (randomNumber == 2) {
								changeBobImage('img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Kopf3.3_F.png');
							}

							$(stage)
								.append(
									'<div class="feedback2">Falsch</div>');

						}


						$(stage)
							.append(
								'<div class="next">Weiter</div>');

						/**
						 * wenn eine Antwortmöglichkeit ausgewählt wurde kann keine andere mehr selektiert werden
						 */
						$(".option").css("pointer-events", "none");

						$('.next').click(function() {
							// setze Bob zurück auf neutral
							changeBobImage('img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Kopf3.2_F.png');
							changeQuestion(0);
						});
					}
				});

		questionNumber++;
	} // display question


	/**
	 * @function displayFinalSlide
	 * Wenn alle Quizfragen beantwortet wurden, zeige den final Slide an, dort gibt bob dann dem user eine bewertung seiner Leistung
	 *
	 */
	function displayFinalSlide() {

		//remove normal bob img
		$('.bob').remove();

		var percentage = (score / numberOfQuestions)*100;

		if (percentage > 75) {

			var styles = {

				background:
					'url("img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Ampel-gruen.png") no-repeat',

			};

			$('.background').css(styles);


		} else if (percentage < 25) {

			var styles = {

				background:
					'url("img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Ampel-rot.png") no-repeat',

			};

			$('.background').css(styles);

		} else {

			var styles = {

				background:
					'url("img/miniGames/brillainIDEAS_UX_20170202_Oktopus-Ampel-gelb.png") no-repeat',

			};

			$('.background').css(styles);

		}

		$(stage)
			.append(
				'<div class="questionText">Das Quiz wurde erfolgreich absolviert!<br><br>Sie haben  ' +
				score +
				' von ' +
				numberOfQuestions + ' Fragen richtig beantwortet!' + '</div>');

		$(stage)
			.append(
				'<div class="backToQuizOverview">Zurück zur Spieleübersicht</div>');

		$('.backToQuizOverview').click(function() {
			window.location.href = "newContent.html";
		});






	} // display final slide


	/**
	 * @function changeQuestion
	 * Definiert den Animationseffekt zwischen den einzelnen Quizfragen
	 *
	 * @param  {int} numberOfDragAndDropGamesPlayed Anzahl der bisher gespielten dragAndDropGames
	 *
	 */
	function changeQuestion(numberOfDragAndDropGamesPlayed) {
		

		if (stage == "#game1") {
			stage2 = "#game1";
			stage = "#game2";
		} else {
			stage2 = "#game2";
			stage = "#game1";
		}

		if (questionNumber < numberOfQuestions) {

			displayQuizListQuestion(numberOfDragAndDropGamesPlayed);

		} else {
			displayFinalSlide();
		}

		$(stage2).animate({
			"right": "+=100%"
		}, "slow", function() {
			$(stage2).css('right', '-100%');
			$(stage2).empty();
		});
		$(stage).animate({
			"right": "+=100%"
		}, "slow", function() {
			questionLock = false;
		});
	} // change question


	/**
	 * @function changeDragAndDropGame
	 * Regelt wechsel zu neuen DragandDropGame
	 *
	 * @param  {type} numberOfDragAndDropGamesPlayed description
	 */
	function changeDragAndDropGame(numberOfDragAndDropGamesPlayed) {

		displayDragAndDropGame(numberOfDragAndDropGamesPlayed);

	} // change dragdropGame

	/**
	 * @function Shuffles array in place.
	 *
	 * @param {Array}
	 *            a items The array containing the items.
	 */
	function shuffle(a) {
		var j, x, i;
		for (i = a.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		}
	}


	/**
	 * @function changeBobImage
	 * Regelt den Wechsel der verschiedene Bob bilder in der Quizlisten
	 *
 	 * @param  {String} a Dateipfad zum Bobbild
	 */
	function changeBobImage(a) {
		
		document.getElementById('bobId').src = a;
	}
