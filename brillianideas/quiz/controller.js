var currentNumberOfDragAndDropElements = 0; // zählt die Anzahl der Elemente der JSON-Datei

var questionNumber = 0;
var questionBank = new Array();

var tempDragAndDropBank	= new Array();
var dragAndDropBank1 = new Array();
var dragAndDropBank2 = new Array();
var dragAndDropBank3 = new Array();
var dragAndDropBank4 = new Array();
var dragAndDropBank5 = new Array();

var numberOfDragAndDropGamesPlayed=0;

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
var dragAndDropGameTarget1Title;
var dragAndDropGameTarget2Title;
var dragAndDropGameTarget3Title;
var dragAndDropGameTarget4Title;
var numberOfTargets;

var numberOfDragAndDropGames;
var numberOfQuizLists;


$(document)
		.ready(
				function() {

					// Lese Parameter (Name des benötigten JSON Files) aus und speichere ihn in der variable jsonFileName, welche dann an die $getJSON methode weitergegeben wird
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



				// hole Namen des Json files in dem alle Inhalte für dieses Spiel gespeichert sind
				var jsonFileName = getUrlParameter('jsonFileName');
				console.log("json in use: " +jsonFileName)

				console.log("Before gtjson stage is :" + stage)

				$.getJSON(jsonFileName, function(data) {

					numberOfQuizLists = data.quizGames.length;
					numberOfDragAndDropGames = data.DragDropGames.length;
					console.log("Anzahl quizlists:"+ numberOfQuizLists)
					console.log("Anzahl drgdrop:"+ numberOfDragAndDropGames)

					// if quizGames exist
					if (numberOfQuizLists>0) {

						// Momentan gibt es nur eine quizlist!!!!!!!!!!!!!
						for(var z=0;z<numberOfQuizLists;z++) {

							// Alle fragen und antwortmöglichkeiten der quizlist im json werden durchlaufen und in einem 2dimensionalen array gespeichert
							for (i = 0; i < data.quizGames[z].quizlist.length; i++) {
								questionBank[i] = new Array();

								//Die Frage und die richtige Antwort werden in einem zweidimensionalen Array gespeichert
								questionBank[i][0] = data.quizGames[z].quizlist[i].question;
								questionBank[i][1] = data.quizGames[z].quizlist[i].optionTrue;



								// Es werden entweder mehrere falsche (SingleChoice Minispiel) oder nur eine Antwortmöglichkeit (Yes/No Minispiele) zum Array hinzugefügt
									for (j = 0; j < data.quizGames[z].quizlist[i].optionFalse.length; j++) {
									questionBank[i][j+2] = data.quizGames[z].quizlist[i].optionFalse[j];
									}

									console.log(questionBank.toString())



							}
							console.log("Questions of quizlist: "+ questionBank)

							} //for(var z=0;z<numberOfQuizLists;z++) {
						}

					//if drag and drop games exist lade alle in die dragAndDropBank
					if(numberOfDragAndDropGames>0) {

						//
						for(var k=0;k<numberOfDragAndDropGames;k++) {

							console.log("k ist: " +k)
							console.log("Anzahl dragdropGames: " +numberOfDragAndDropGames)


												// code unten überflüssig
												var obj = new Array(); //speichert den Inhalt der JSON-Datei
												var elementid = 0; // speichert die ID des div Elements

												var nameOfdragAndDropBankArray = "dragAndDropBank"+k;

												var tempDragAndDropBankFirstDimension = new Array();


												// Die Schleife wird so oft durchlaufen, wie das Spiel "IndianCuisine" Elemente hat.
												for(var i=0; i < data.DragDropGames[k].DragAndDropList.length; i++) {

													/* für jedes Element der JSON-Datei wird ein neues div-Element innerhalb des divs mit der ID "source" angelegt. Aus dem Befehl ergibt sich folgende Struktur:
													<div id="d1" class = "drag" title="target1" style=""></div>	*/

													tempDragAndDropBank[i] = new Array();
													// dragAndDropBank[k][i] = new Array();

													tempDragAndDropBank[i][0] = data.DragDropGames[k].DragAndDropList[i].id;
													console.log("Array Stelle "+ "[" + i + "]"+ "[" + 0 + "] "+ "Wird die id: "+  data.DragDropGames[k].DragAndDropList[i].id+ " gelegt")

													tempDragAndDropBank[i][1] = data.DragDropGames[k].DragAndDropList[i].target;
													console.log("Array Stelle "+ "[" + i + "]"+ "[" + 1 + "] "+ "Wird das target: "+ data.DragDropGames[k].DragAndDropList[i].target+ " gelegt")
													tempDragAndDropBank[i][2] = data.DragDropGames[k].DragAndDropList[i].elementtext;
													console.log("Array Stelle "+ "[" + i + "]"+ "[" + 2 + "] "+ "Wird der elementtext: "+  data.DragDropGames[k].DragAndDropList[i].elementtext+ " gelegt")

													// $('#source').append($('<div/>',{id:data.DragDropGames[k].DragAndDropList[i].id, 'class':"drag", title:data.DragDropGames[k].DragAndDropList[i].target}));

													// Lese game title, description, sowie targettitle aus dem ersten Unterelment im json aus
													// un speichere es im Array
													if(data.DragDropGames[k].DragAndDropList[i].id=='d0'){
														console.log("heere")
														console.log("Title: "+ data.DragDropGames[k].DragAndDropList[i].title)
														dragAndDropGameTitle = data.DragDropGames[k].DragAndDropList[i].title;
														dragAndDropGameDescription = data.DragDropGames[k].DragAndDropList[i].description;
														numberOfTargets = data.DragDropGames[k].DragAndDropList[i].targetNumber;

														console.log("numberOfTargets: "+ numberOfTargets)

														tempDragAndDropBank[i][3]= dragAndDropGameTitle;
														tempDragAndDropBank[i][4]= dragAndDropGameDescription;
														tempDragAndDropBank[i][5]= numberOfTargets;

														// // var positionIntempDragAndDropBank =6;
														// // for(var z=0;z<numberOfTargets;z++){
														//
														// 	//dragAndDropGameTarget4Title
														// 	var tempVariable = "dragAndDropGameTarget"+(z+1)+"Title";
														// 	console.log("tempVariable "+ tempVariable)
														// 	//
														// 	var jsonstring = "titleTarget"+(z+1);
														// // 	console.log("jsonstring "+jsonstring)
														//
														// 	// TodO here, vllt einfach wieder mit if==4
														// 	tempVariable = data.DragDropGames[k].DragAndDropList[i].;
														// 	tempDragAndDropBank[i][6+z]= tempVariable;
														// 	console.log("tempDragAndDropBank"+tempDragAndDropBank)

															if(numberOfTargets==2) {

																// Add title of targets
																tempDragAndDropBank[i][6] = data.DragDropGames[k].DragAndDropList[i].titleTarget1;
																tempDragAndDropBank[i][7] = data.DragDropGames[k].DragAndDropList[i].titleTarget2;

															}

															if(numberOfTargets==3) {

																// Add title of targets
																tempDragAndDropBank[i][6] = data.DragDropGames[k].DragAndDropList[i].titleTarget1;
																tempDragAndDropBank[i][7] = data.DragDropGames[k].DragAndDropList[i].titleTarget2;
																tempDragAndDropBank[i][8] = data.DragDropGames[k].DragAndDropList[i].titleTarget3;

															}

															if(numberOfTargets==4) {

																// Add title of targets
																tempDragAndDropBank[i][6] = data.DragDropGames[k].DragAndDropList[i].titleTarget1;
																tempDragAndDropBank[i][7] = data.DragDropGames[k].DragAndDropList[i].titleTarget2;
																tempDragAndDropBank[i][8] = data.DragDropGames[k].DragAndDropList[i].titleTarget3;
																tempDragAndDropBank[i][9] = data.DragDropGames[k].DragAndDropList[i].titleTarget4;

															}




														// }







													}




													tempDragAndDropBankFirstDimension.push(tempDragAndDropBank[i]);





													}

													console.log("Em Ende von Durchlauf "+ "["+ k +"]"+"kommt folgendes Array raus: " + tempDragAndDropBankFirstDimension)
													if (k==0) {
														dragAndDropBank1= tempDragAndDropBankFirstDimension;
													}

													if (k==1) {
														dragAndDropBank2= tempDragAndDropBankFirstDimension;
													}

													if (k==2) {
														dragAndDropBank3= tempDragAndDropBankFirstDimension;
													}
													console.log("Array in globaler variable: " + dragAndDropBank1)












						}















					}


					// console.log("Länge"+ data.quizGames.length)
					//
					// for (var j=0; j<data.quizGames.length;j++) {
					// 	console.log("Länge"+ data.quizGames.length)
					// }
					//
					//
					// // Alle fragen und antwortmöglichkeiten im json werden durchlaufen
					// for (i = 0; i < data.quizGames.quizlist1.length; i++) {
					// 	questionBank[i] = new Array();
					// 	//Die Frage und die richtige Antwort werden in einem zweidimensionalen Array gespeichert
					// 	questionBank[i][0] = data.quizGames.quizlist1[i].question;
					// 	questionBank[i][1] = data.quizGames.quizlist1[i].optionTrue;
					//
					//
					//
					// 	// Es werden entweder mehrere falsche (SingleChoice Minispiel) oder nur eine Antwortmöglichkeit (Yes/No Minispiele) zum Array hinzugefügt
					// 		for (j = 0; j < data.quizGames.quizlist1[i].optionFalse.length; j++) {
					// 		questionBank[i][j+2] = data.quizGames.quizlist1[i].optionFalse[j];
					// 		}
					//
					// 		// Anzahl der Optionen die falsch sind wird nochmal extra in einer globalen variable für späteren Nutzen gespeichert
					// 		numberOfFalseOptions =data.quizGames.quizlist1[i].optionFalse.length
					//
					// }






					numberOfQuestions = questionBank.length;

					// entferne '.json' vom String
					var trimmedFileName = jsonFileName.replace('.json','');
					//Setze SpieleNamen in <div> element mit id=navbar und in html <title> element
					$('#topbar').text(trimmedFileName)
					$(document).find("title").text(trimmedFileName +" Quiz")
					console.log("page title: "+ $(document).find("title").text(trimmedFileName +" Quiz"))

					// if (data.quizGames.quizlist1.length>0){
					// 	displayQuestion();
					// };
					console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
					executeGameLogic();
				});// gtjson

				console.log("After gtjson stage is :" + stage)

				// Spielelogik
				function executeGameLogic(){

					// Gibt es ein DragAnddropGame vor dem normalen Quiz?
					if (numberOfDragAndDropGames>0) {

						// zeige einzelnes DragandDropGame an
							displayDragAndDropGame(0);

					}
					// Wenn nicht prüfe ob es eine Quizlist gibt und zeige sie an
					else {
						if (numberOfQuizLists>0){
							displayQuizListQuestion(0);
						};
					}







} // executeGameLogic









});// doc ready

function displayDragAndDropGame(numberOfCurrentDragDropGame){

											var counter=0;

											console.log("STage is: "+ stage)

											console.log("numberOfCurrentDragDropGame ist: "+ numberOfCurrentDragDropGame)

											console.log("1 DragandDropGame")
											console.log("fühe elemente hnzu")
											// Füge DragAndDrop ELemente zum div #game1 hinzu
												var numberOfTargetsOfPreviuosGame;


												// beim ersten Game ist numberOfCurrentDragDropGame = 0
												// beim zweiten Game ist numberOfCurrentDragDropGame = 1 usw.
												var tempArray = new Array();
												if(numberOfCurrentDragDropGame==0){
													tempArray=dragAndDropBank1;
												}

												if(numberOfCurrentDragDropGame==1){
													numberOfTargetsOfPreviuosGame = dragAndDropBank1[0][5];
													tempArray=dragAndDropBank2;

												}

												if(numberOfCurrentDragDropGame==2){
													numberOfTargetsOfPreviuosGame = dragAndDropBank2[0][5];
													tempArray=dragAndDropBank3;
												}

												if(numberOfCurrentDragDropGame==3){
													numberOfTargetsOfPreviuosGame = dragAndDropBank3[0][5];
													tempArray=dragAndDropBank4;
												}

												if(numberOfCurrentDragDropGame==4){
													numberOfTargetsOfPreviuosGame = dragAndDropBank4[0][5];
													tempArray=dragAndDropBank5;
												}

												// Wenn das erste dragAndDropGame angeziegt wird, füge die benötigten Elemente hinzu
											// if (numberOfCurrentDragDropGame==0) {

											// für jedes quiz füge bestimmte Anzahl an targets hinzu

											numberOfTargetsOfCurrentGame = tempArray[0][5];
											console.log("numberOfTargetsOfCurrentGame "+ numberOfTargetsOfCurrentGame)

											if (numberOfTargetsOfCurrentGame==2){
												stage ='#game1';

												if (numberOfTargetsOfPreviuosGame==2){

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

												if (numberOfTargetsOfPreviuosGame==3){

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

												if (numberOfTargetsOfPreviuosGame==4){

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
																		'<div id="gameTitle"><strong></strong></div>'
																		+ '<div id="gameDescription"></div>'
																		+	'<div class="container"><div id="source"></div>'
																		+ '<div id="target1"></div>'
																		+ '<div id="target2"></div>'
																		+ '</div>'
																		+ '<div style="clear:both"></div>'
																		+ '<div id="button"><button id= "checkInputButton" class ="button" onclick="checkInput()">Eingabe prüfen</button></div>'

																	);

																	// Nachfolgende Funktionen sind Bestandteil von JQuery EasyUi und definieren die Eigenschaften der Zielcontainer für die Elemente
																	$('#target1').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});
																	$('#target2').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});
											}

											if (numberOfTargetsOfCurrentGame==3){
												console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
												stage ='#game1';

												if (numberOfTargetsOfPreviuosGame==2){

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

												if (numberOfTargetsOfPreviuosGame==3){

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

												if (numberOfTargetsOfPreviuosGame==4){

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
																		'<div id="gameTitle"><strong></strong></div>'
																		+ '<div id="gameDescription"></div>'
																		+	'<div class="container"><div id="source"></div>'
																		+ '<div id="target1"></div>'
																		+ '<div id="target2"></div>'
																		+ '<div id="target3"></div>'
																		+ '</div>'
																		+ '<div style="clear:both"></div>'
																		+ '<div id="button"><button id= "checkInputButton" class ="button" onclick="checkInput()">Eingabe prüfen</button></div>'

																		);

																	// Nachfolgende Funktionen sind Bestandteil von JQuery EasyUi und definieren die Eigenschaften der Zielcontainer für die Elemente
																	$('#target1').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});
																	$('#target2').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});

																	$('#target3').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});
											}

											if (numberOfTargetsOfCurrentGame==4){
												stage ='#game1';

												if (numberOfTargetsOfPreviuosGame==2){

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

												if (numberOfTargetsOfPreviuosGame==3){

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

												if (numberOfTargetsOfPreviuosGame==4){

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
																		'<div id="gameTitle"><strong></strong></div>'
																		+ '<div id="gameDescription"></div>'
																		+	'<div class="container"><div id="source"></div>'
																		+ '<div id="target1"></div>'
																		+ '<div id="target2"></div>'
																		+ '<div id="target3"></div>'
																		+ '<div id="target4"></div>'
																		+ '</div>'
																		+ '<div style="clear:both"></div>'
																		+ '<div id="button"><button id= "checkInputButton" class ="button" onclick="checkInput()">Eingabe prüfen</button></div>'

																	);

																	$('#target1').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});

																	$('#target2').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});
																	$('#target3').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});

																	$('#target4').droppable({
																	//accept:'#d1,#d3, #d2',
																	onDragEnter:function(e,source){
																	$(source).draggable('options').cursor='auto';
																	$(source).draggable('proxy').css('border','1px solid');
																	$(this).addClass('over');
																	},
																	onDragLeave:function(e,source){
																	$(source).draggable('options').cursor='not-allowed';
																	$(source).draggable('proxy').css('border','1px solid #ccc');
																	$(this).removeClass('over');
																	},
																	onDrop:function(e,source){
																	$(this).append(source)
																	$(this).removeClass('over');
																	}
																	});
											}


											// }

											// Wenn es mehr als ein DragdraopGame gibt, lösche die draggable divs vom letzten Spiel
											// numberOfCurrentDragDropGame startet bei 0
											if (numberOfCurrentDragDropGame>0) {

												// stage ='#game2';
												console.log("----------------------------------------------")
												// remove all existing draggable elements in #game1
												for(var i=0;i<dragAndDropBank1.length;i++) {
													var currentId ="#d"+i;
													console.log("currentId"+ currentId)
													$(currentId).remove();
												}

												// Außerdem wird immer der goToNextQuiz entfernt
												$('#goToNextQuiz').remove();

											}


											// füge die draggable div Elemente hinzu und setze die Daten hinein
													console.log("Länge von Array"+ tempArray.length)
													console.log("Inhalt von Array "+ numberOfCurrentDragDropGame +" "+ tempArray)

													for(var i=0;i<tempArray.length;i++) {

														// hole den Namen des Spiels sowie den Titel aus dem Array des ersten Element der Quizlist
														if(tempArray[i][0]=="d0"){
															$('#gameTitle').text(tempArray[i][3]);
															$('#gameDescription').text(tempArray[i][4]);

															// var positionIntempDragAndDropBank =6;
															// for(var z=0;z<numberOfTargets;z++){
															//
															// 	var tempVariable= "#target"+z;
															// 	$('tempVariable').text(tempArray[i][positionIntempDragAndDropBank]);
															//
															// }


															if (numberOfTargetsOfCurrentGame==2){
																$('#target1').text(tempArray[i][6]);
																$('#target2').text(tempArray[i][7]);
															}

															if (numberOfTargetsOfCurrentGame==3){
																$('#target1').text(tempArray[i][6]);
																$('#target2').text(tempArray[i][7]);
																$('#target3').text(tempArray[i][8]);

															}

															if (numberOfTargetsOfCurrentGame==4){
																$('#target1').text(tempArray[i][6]);
																$('#target2').text(tempArray[i][7]);
																$('#target3').text(tempArray[i][8]);
																$('#target4').text(tempArray[i][9]);
															}

														}

														console.log("id des temporären Elements: "+ tempArray[i][0])
														// console.log(questionBank.toString())

														// Füge die neuen draggable Elemente hinzu
														// $('#source').append($('<div/>',{id:data.DragDropGames[k].DragAndDropList[i].id, 'class':"drag", title:data.DragDropGames[k].DragAndDropList[i].target}))
														// <div id="d1" class = "drag" title="target1" style=""></div>	*/
														$('#source').append($('<div/>',{id:tempArray[i][0], 'class':"drag", target:tempArray[i][1]}));

														//Mit Hilfe der ID wird das Element aufgerufen und der Text übergeben, der angezeigt werden soll
														console.log("i"+ i)
														document.getElementById(tempArray[i][0]).innerHTML = tempArray[i][2];

														//Counts draganddropelements now for two games
														counter++;

													}

													// hier wird die anzahl der draganddropelements des gerade ausgeführten Drag and drop Games gepseichert
													// in der checkInput methode wird sie dann dazu benutzt zu überprüfen ob alle Elemente zugeordnet wurden
													currentNumberOfDragAndDropElements=counter;

											//Mache Elemente draggable/droppable
											// folgende Funktion ist Bestandteil von JQuery EasyUi und sorgt dafür, dass die Elemente eine Drag n Drop Funktion haben
											$(function(){
											$('.drag').draggable({
											proxy:'clone',
											revert:true,
											cursor:'auto',
											onStartDrag:function(){
											$(this).draggable('options').cursor='not-allowed';
											$(this).draggable('proxy').addClass('dp');
											},
											onStopDrag:function(){
											$(this).draggable('options').cursor='auto';
											}
											});


											});




}

// checkInput überprüft, ob sich die Elemente an der richtigen Stelle befinden. Wenn alle Daten korrekt in der JSON-Datei angeben wurden, ist hier keine Anpassung notwendig
function checkInput(){



	console.log("currentNumberOfDragAndDropElements"+ currentNumberOfDragAndDropElements)


	// zuerst wird geprüft, ob sich im Ausgangscontainer noch Elemente befinden
	if ($('#source').children().length == 0 ){
		var wrongElement= 0;
		//Wenn der Ausgangscontainer leer ist wird die Schleife sooft durchlaufen, wie das Minispiel Elemente hat. Dazu wird die oben deklarierte und verwendete Variable "counter" benutzt
		for(var i=0; i<currentNumberOfDragAndDropElements; i++){

			/*
			 Wenn ein Element mit dem Title "target1" vorliegt, wird geprüft, ob sich das Element in dem Container mit der ID "target1" befindet
			 Wenn ja, wird die Hintergrundfarbe auf die Ausgangsfarbe gesetzt. Dieses erneute Setzen der Farbe ist notwendig, sollte das Element zuvor
			 falsch eingeordnet und jetzt an die richtige Position bewegt worden sein.
			 Wenn das Element sich nicht in dem richtigen Container befindet, wird der Hintergrund rot
			*/

			// console.log("show me the stage: "+$(stage))
			// var currentId="#d"+i;
			// console.log($("#target1").text())
			// console.log($.contains( "#target1", '#d0'))
			//
			// console.log("jquery "+ $('#d0'))
			// console.log("document.getElementById: "+document.getElementById("d0"))
			// console.log("jquery title is: "+$('#d0').title)
			// console.log("document.getElementById(d+i).title is: "+document.getElementById("d0").title)
			// // console.log("counter is: "+counter)

			if (numberOfTargetsOfCurrentGame==2) {


				var currentid = "#d"+i;
				console.log("currentElement: "+ "d"+i)
				console.log("parentOfcurrentElement" +$("d"+i).parent().text())
				console.log("$('d'+i).target " + $(currentid).attr('target'))

				if($(currentid).attr('target') == "target1"){
					console.log("dfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
					console.log("parentOfcurrentElement" +$("d"+i).parent())

					if ($(document.getElementById("d"+i)).parents("#target1").length == 1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;

					}
				// Sollte das Element den title "target2" haben, werden nachfolgende Befehle ausgeführt. Diese funktionieren genauso wie die oben beschriebenen
				} else if($(currentid).attr('target') =="target2"){
					if ($(document.getElementById("d"+i)).parents("#target2").length ==1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;
					}
				}
			}


			if (numberOfTargetsOfCurrentGame==3) {


				var currentid = "#d"+i;
				console.log("currentElement: "+ "d"+i)
				console.log("parentOfcurrentElement" +$("d"+i).parent().text())
				console.log("$('d'+i).target " + $(currentid).attr('target'))

				if($(currentid).attr('target') == "target1"){
					console.log("dfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
					console.log("parentOfcurrentElement" +$("d"+i).parent())

					if ($(document.getElementById("d"+i)).parents("#target1").length == 1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;

					}
				// Sollte das Element den title "target2" haben, werden nachfolgende Befehle ausgeführt. Diese funktionieren genauso wie die oben beschriebenen
				} else if($(currentid).attr('target') =="target2"){
					if ($(document.getElementById("d"+i)).parents("#target2").length ==1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;
					}
				} else if($(currentid).attr('target') =="target3"){
					if ($(document.getElementById("d"+i)).parents("#target3").length ==1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;
					}
				}
			}

			if (numberOfTargetsOfCurrentGame==4) {


				var currentid = "#d"+i;
				console.log("currentElement: "+ "d"+i)
				console.log("parentOfcurrentElement" +$("d"+i).parent().text())
				console.log("$('d'+i).target " + $(currentid).attr('target'))

				if($(currentid).attr('target') == "target1"){
					console.log("dfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
					console.log("parentOfcurrentElement" +$("d"+i).parent())

					if ($(document.getElementById("d"+i)).parents("#target1").length == 1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;

					}
				// Sollte das Element den title "target2" haben, werden nachfolgende Befehle ausgeführt. Diese funktionieren genauso wie die oben beschriebenen
				} else if($(currentid).attr('target') =="target2"){
					if ($(document.getElementById("d"+i)).parents("#target2").length ==1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;
					}
				}
				else if($(currentid).attr('target') =="target3"){
					if ($(document.getElementById("d"+i)).parents("#target3").length ==1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;
					}
				}
				else if($(currentid).attr('target') =="target4"){
					if ($(document.getElementById("d"+i)).parents("#target4").length ==1){
						document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
					}else{
						document.getElementById("d"+i).style.backgroundColor="red";
						console.log("Test")
						wrongElement++;
					}
				}
			}

			console.log("Wrong Elements:" + wrongElement)

			}




			console.log("wrongElement just before if: " +wrongElement)
		// wenn alle ELemente richtig zugeordnet werden zeige einen "Weiter" button an
		 if(wrongElement==0) {

			 // Falls es den button schon gibt (User klickt zum zweiten Mal auf den Button), füge ihn nicht nochmal hinzu
        if($('#goToNextQuiz').length >0){
					$('#button').remove();
					alert("Glückwunsch, Sie haben alle Elemente richtig zugeordnet!");
        } else {
					alert("Glückwunsch, Sie haben alle Elemente richtig zugeordnet!");
					$('#checkInputButton').remove();
					$('#button')
																.append(
																		'<div id="goToNextQuiz" class="next">Weiter</div>');
				}

				$("#goToNextQuiz").click(function() {
					numberOfDragAndDropGamesPlayed++;
					console.log("In goToNextQuiz stage is :" + stage)



					// console.log("numberOfDragAndDropGamesPlayed"+ numberOfDragAndDropGamesPlayed)

					// Existieren weitere dragAndDropGames
					if (numberOfDragAndDropGames>1) {

						// Prüfe wie viele dragAndDropGames schon gespielt wurden
						// Wenn es dragAndDropGames gibt die noch nicht gespielt wurde, zeige diese an
						console.log("numberOfDragAndDropGamesPlayed"+ numberOfDragAndDropGamesPlayed)
						if(numberOfDragAndDropGames>numberOfDragAndDropGamesPlayed) {
							// Wenn ein weiteres Drag and drop spiel existiert, lade die Elemente
							// for (var i=0;i<numberOfDragAndDropGames;i++){
							console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
								changeDragAndDropGame(numberOfDragAndDropGamesPlayed);
							// }

						}
						// Wenn nicht gehe direkt zum normalen Quiz
						else {
							changeQuestion(numberOfDragAndDropGamesPlayed);
						}

					}
					// wenn nicht gehe direkt zum normalen Quiz
					else {
						console.log("test")

						changeQuestion(numberOfDragAndDropGamesPlayed);
					}


				});

		}


	}
//Sollten nicht alle Elemente bewegt worden sein, erscheint ein Alert
	else {
		 alert("Es wurden nicht alle Elemente verwendet!");
	}

	if (wrongElement==0) {
		// Zähler wird wieder auf null gesetzt, falls noch weiteree dragAndDropGames teil des jsons sind
		currentNumberOfDragAndDropElements=0;
	}



 }// checkinput


	var optionsCounter;
	function displayQuizListQuestion(numberOfDragAndDropGamesPlayed) {

		// drag and drop spiele werden immer im #game1 angezeigt
		if(numberOfDragAndDropGamesPlayed>0) {
			console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
			stage='#game2'
			questionNumber
		}

		optionsCounter=0;
		var q = new Array();
		var contentArray = new Array();
		//Füge die Frage hinzu
		$(stage).append(
				'<div class="questionText">'
						+ questionBank[questionNumber][0]
						+ '</div>')

		// Speichere alle Antworten in einem separatem array, welches dann geshuffelt wird
		for (i = 1; i < questionBank[questionNumber].length; i++) {
					q[i - 1] = questionBank[questionNumber][i];


					contentArray[i - 1] = '<div id=' + i
							+ ' class="option" tabindex="1">' + q[i - 1] + '</div>';

							optionsCounter++;

		}

		console.log("Anzahl Optionen" +optionsCounter)

		// wenn es mehr als 2 Antwortmöglichkeiten gibt, werden Sie zufällige Reihenfolge gebracht...
		if(optionsCounter>2) {
			console.log("shufffffffffffffffline")
			shuffle(contentArray);

			// ...und dann angezeigt
			for (i = 0; i < contentArray.length; i++) {
					console.log("heeaaaaaaaaaaaaaaaaaa")
					$(stage).append(contentArray[i]);
			}

		}
		// wenn es nur zwei Antwortmöglichkeiten gibt, wird die Option "Ja" immer zuerst angezeigt
		else {

			for (i = 0; i < contentArray.length; i++) {
				//gibt es nur eine Antwortmöglichkeit wird immer die Option "Ja" zuerst angezeigt
					if(q[i]=="Richtig") {
						$(stage).append(contentArray[0]);
					} else {
						$(stage).append(contentArray[1]);
					}
			}

		}





		$('.option')
				.click(
						function() {

							// markiere ausgewählte Antwortmöglichkeit weiterhin, auch wenn irgendwo anders auf der Seite geklickt wird
							var styles = {
								border: "#e53f5f solid 2px",

								color:"#e53f5f"
							};
							$(this).css(styles);

							if (questionLock == false) {
								questionLock = true;
								// correct answer
								if (this.id == 1) {
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

									$(stage)
											.append(
													'<div class="feedback2">Falsch</div>');

								}


								$(stage)
										.append(
												'<div class="next">Weiter</div>');

								//wenn eine Antwortmöglichkeit ausgewählt wurde kann keine andere mehr selektiert werden
								$(".option").css("pointer-events", "none");

								$('.next').click(function(){
									changeQuestion(0);
								});
							}
						});
	}// display question

	function displayFinalSlide() {

		$(stage)
				.append(
						'<div class="questionText">Das Quiz wurde erfolgreich absolviert!<br><br>Sie haben  '
								+ score
								+ ' von '
								+ numberOfQuestions + ' Fragen richtig beantwortet!' + '</div>');

								$(stage)
										.append(
												'<div class="backToQuizOverview">Zurück zur Spieleübersicht</div>');

								$('.backToQuizOverview').click(function(){
									window.location.href = "newContent.html";
								});

	}// display final slide

	// ToDO im Moment wird die erste question übersprungen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		function changeQuestion(numberOfDragAndDropGamesPlayed) {
														console.log("QuestionNUmber:"+ questionNumber)



												// if (previousQuizExists==false) {
													if (stage == "#game1") {
														stage2 = "#game1";
														stage = "#game2";
													} else {
														stage2 = "#game2";
														stage = "#game1";
													}
												// // } else if (previousQuizExists==true) {
												//
												// 	stage = "#game1";
												// 	stage2 = "#game2";
												// }


														if (questionNumber < numberOfQuestions) {
															displayQuizListQuestion(numberOfDragAndDropGamesPlayed);
															questionNumber++;
														} else {
															displayFinalSlide();
														}

														$(stage2).animate({
															"right" : "+=100%"
														}, "slow", function() {
															$(stage2).css('right', '-100%');
															$(stage2).empty();
														});
														$(stage).animate({
															"right" : "+=100%"
														}, "slow", function() {
															questionLock = false;
														});
		}// change question


			function changeDragAndDropGame(numberOfDragAndDropGamesPlayed) {




				console.log("in changeDragAndDropGame stage is: " + stage)
			// if (stage == "#game1") {
			// 	console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
			// 	stage2 = "#game1";
			// 	stage = "#game2";
			// } else {
			// 	stage2 = "#game2";
			// 	stage = "#game1";
			// }
		// // } else if (previousQuizExists==true) {
		//
		// 	stage = "#game1";
		// 	stage2 = "#game2";
		// }


				displayDragAndDropGame(numberOfDragAndDropGamesPlayed);

				// $(stage2).animate({
				// 	"right" : "+=100%"
				// }, "slow", function() {
				// 	$(stage2).css('right', '-100%');
				// 	$(stage2).empty();
				// });
				// $(stage).animate({
				// 	"right" : "+=100%"
				// }, "slow", function() {
				// 	questionLock = false;
				// });
			}// change dragdropGame

	/**
	 * Shuffles array in place.
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

	// jQuery.noConflict();

	function expstickybar(usersetting){
		var setting=jQuery.extend({position:'bottom', peekamount:30, revealtype:'mouseover', speed:200}, usersetting)
		var thisbar=this
		var cssfixedsupport=!document.all || document.all && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //check for CSS fixed support
		if (!cssfixedsupport || window.opera)
			return
		jQuery(function($){ //on document.ready
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
			var ajaxfriendlyurl=setting.externalcontent.replace(/^http:\/\/[^\/]+\//i, "http://"+window.location.hostname+"/")
			$.ajax({
				url: ajaxfriendlyurl, //path to external content
				async: true,
				dataType: 'html',
				error:function(ajaxrequest){
					alert('Error fetching Ajax content.<br />Server Response: '+ajaxrequest.responseText)
				},
				success:function(content){
					thisbar.$ajaxstickydiv.html(content)
					thisbar.init($, setting)
				}
			})

		},

		showhide:function(keyword, anim){
			var thisbar=this, $=jQuery
			var finalpx=(keyword=="show")? 0 : -(this.height-this.setting.peekamount)
			var positioncss=(this.setting.position=="bottom")? {bottom:finalpx} : {top:finalpx}
			this.$stickybar.stop().animate(positioncss, (anim)? this.setting.speed : 0, function(){
				thisbar.$indicators.each(function(){
					var $indicator=$(this)
					$indicator.attr('src', (thisbar.currentstate=="show")? $indicator.attr('data-closeimage') : $indicator.attr('data-openimage'))
				})
			})

			thisbar.currentstate=keyword
		},

		toggle:function(){
			var state=(this.currentstate=="show")? "hide" : "show"
			this.showhide(state, true)
		},

		init:function($, setting){
			var thisbar=this
			this.$stickybar=$('#'+setting.id).css('visibility', 'visible')
			this.height=this.$stickybar.outerHeight()
			this.currentstate="hide"
			setting.peekamount=Math.min(this.height, setting.peekamount)
			this.setting=setting
			if (setting.revealtype=="mouseover")
				this.$stickybar.bind("mouseclick touchmove swipe mouseenter mouseleave", function(e){
					thisbar.showhide((e.type=="mouseenter" || e.type=="mouseclick" || e.type=="touchmove")? "show" : "hide", true)
			})
			this.$indicators=this.$stickybar.find('img[data-openimage]') //find images within bar with data-openimage attribute
			this.$stickybar.find('a[href=togglebar]').click(function(){ //find links within bar with href=#togglebar and assign toggle behavior to them
				thisbar.toggle()
				return false
			})
			setTimeout(function(){
				thisbar.height=thisbar.$stickybar.outerHeight() //refetch height of bar after 1 second (last change to properly get height of sticky bar)
			}, 1000)
			this.showhide("hide")
		}
	}

	/////////////Initialization code://///////////////////////////

	//Usage: var unqiuevar=new expstickybar(setting)

	var mystickybar=new expstickybar({
		id: "rocketbar", //id of sticky bar DIV
		position:'bottom', //'top' or 'bottom'
		revealtype:'manual', //'mouseover' or 'manual'
		peekamount:40, //number of pixels to reveal when sticky bar is closed
		externalcontent:'rocketbarcontent.htm', //path to sticky bar content file on your server, or "" if content is defined inline on the page
		speed:500 //duration of animation (in millisecs)
	})
