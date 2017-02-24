$(document)
		.ready(
				function() {

					var questionNumber = 0;
					var questionBank = new Array();
					var q = new Array();
					var stage = "#game1";
					var stage2 = new Object;
					var questionLock = false;
					var numberOfQuestions;
					var score = 0;
					var numberOfFalseOptions;
					var jsonFileName;


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

				var jsonFileName = getUrlParameter('jsonFileName');
				console.log("json in use: " +jsonFileName)


					$.getJSON(jsonFileName, function(data) {
						// Alle fragen und antwortmöglichkeiten im json werden durchlaufen
						for (i = 0; i < data.quizlist.length; i++) {
							questionBank[i] = new Array();
							//Die Frage und die richtige Antwort werden in einem zweidimensionalen Array gespeichert
							questionBank[i][0] = data.quizlist[i].question;
							questionBank[i][1] = data.quizlist[i].optionTrue;



							// Es werden entweder mehrere falsche (SingleChoice Minispiel) oder nur eine Antwortmöglichkeit (Yes/No Minispiele) zum Array hinzugefügt
								for (j = 0; j < data.quizlist[i].optionFalse.length; j++) {
								questionBank[i][j+2] = data.quizlist[i].optionFalse[j];
								}

								// Anzahl der Optionen die falsch sind wird nochmal extra in einer globalen variable für späteren Nutzen gespeichert
								numberOfFalseOptions =data.quizlist[i].optionFalse.length


						}
						numberOfQuestions = questionBank.length;

						// entferne '.json' vom String
						var trimmedFileName = jsonFileName.replace('.json','');
						//Setze SpieleNamen in <div> element mit id=navbar und in html <title> element
						$('#topbar').text(trimmedFileName)
						$(document).find("title").text(trimmedFileName +" Quiz")
						console.log("page title: "+ $(document).find("title").text(trimmedFileName +" Quiz"))

						displayQuestion();
					});// gtjson

					function displayQuestion() {

						var q = new Array();
						var contentArray = new Array();
						$(stage).append(
								'<div class="questionText">'
										+ questionBank[questionNumber][0]
										+ '</div>')
						for (i = 1; i < questionBank[questionNumber].length; i++) {
							q[i - 1] = questionBank[questionNumber][i];

							contentArray[i - 1] = '<div id=' + i
									+ ' class="option" tabindex="1">' + q[i - 1] + '</div>';
						}

						// wenn es mehr als eine falsche Antwortmöglichkeit gibt, werden sie in eine zufällige Reihenfolge gebracht...
						if(numberOfFalseOptions>1) {
							shuffle(contentArray);
						};

						// ...und dann angezeigt
						for (i = 0; i < contentArray.length; i++) {
							if(numberOfFalseOptions>1){
								$(stage).append(contentArray[i]);
							} else {
								//gibt es nur eine Antwortmöglichkeit wird immer die Option "Ja" zuerst angezeigt
									if(q[i]=="Ja") {
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
													changeQuestion();
												});
											}
										});
					}// display question

					function displayFinalSlide() {

						$(stage)
								.append(
										'<div class="questionText">Sie haben das Quiz erfolgreich absolviert!<br><br>Anzahl Fragen: '
												+ numberOfQuestions
												+ '<br>Richtige Antworten: '
												+ score + '</div>');

					}// display final slide

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

					function changeQuestion() {

						questionNumber++;

						if (stage == "#game1") {
							stage2 = "#game1";
							stage = "#game2";
						} else {
							stage2 = "#game2";
							stage = "#game1";
						}

						if (questionNumber < numberOfQuestions) {
							displayQuestion();
						} else {
							displayFinalSlide();
						}

						$(stage2).animate({
							"right" : "+=800px"
						}, "slow", function() {
							$(stage2).css('right', '-800px');
							$(stage2).empty();
						});
						$(stage).animate({
							"right" : "+=800px"
						}, "slow", function() {
							questionLock = false;
						});
					}// change question

				});// doc ready
