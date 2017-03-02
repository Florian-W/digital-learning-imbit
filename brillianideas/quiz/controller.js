var counter=0; // zählt die Anzahl der Elemente der JSON-Datei
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



						//Check game types
						if(data.DragAndDrop.length>0) {

											// Füge DragAndDrop ELemente hinzu
											$(stage)
															.append(
																	'<h2>Indische Küche</h2>'
																	+ '<p>Ziehe alle Elemente in das richtige Feld. Mit "Eingabe prüfen"  kannst du überprüfen, ob alle Elemente richtig sind. Falsche Elemente werden rot makiert</p>'
																	+	'<div class="container"><div id="source"></div>'
																	+ '<div id="target1">Indisch</div>'
																	+ '<div id="target2">Nicht Indisch</div>'
																	+ '</div>'
																	+ '<div style="clear:both"></div>'
																	+ '<div id="button"><button id= "button" class ="button" onclick="checkInput()">Eingabe prüfen</button></div>'

																);

																var obj = new Array(); //speichert den Inhalt der JSON-Datei

	var elementid = 0; // speichert die ID des div Elements

			// getJson liest die Daten aus der Datei content.json aus. Die Informationen werden dann in der Funktion verarbeitet
		    $.getJSON("content.json", function(data) {

			// Die Schleife wird so oft durchlaufen, wie das Spiel "IndianCuisine" Elemente hat.
			for(var i=0; i < data.DragDropGames.IndianCuisine.length; i++) {

				/* für jedes Element der JSON-Datei wird ein neues div-Element innerhalb des divs mit der ID "source" angelegt. Aus dem Befehl ergibt sich folgende Struktur:
				<div id="d1" class = "drag" title="target1" style=""></div>	*/
				$('#source').append($('<div/>',{id:data.DragDropGames.IndianCuisine[i].id, 'class':"drag", title:data.DragDropGames.IndianCuisine[i].target}))

				//Mit Hilfe der ID wird das Element aufgerufen und der Text übergeben, der angezeigt werden soll
				document.getElementById(data.DragDropGames.IndianCuisine[i].id).innerHTML = data.DragDropGames.IndianCuisine[i].elementtext;

				counter ++;

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

			});



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

						numberOfQuestions = questionBank.length;

						// entferne '.json' vom String
						var trimmedFileName = jsonFileName.replace('.json','');
						//Setze SpieleNamen in <div> element mit id=navbar und in html <title> element
						$('#topbar').text(trimmedFileName)
						$(document).find("title").text(trimmedFileName +" Quiz")
						console.log("page title: "+ $(document).find("title").text(trimmedFileName +" Quiz"))

						if (data.quizlist.length>0){
							displayQuestion();
						};

					});// gtjson








});// doc ready

// checkInput überprüft, ob sich die Elemente an der richtigen Stelle befinden. Wenn alle Daten korrekt in der JSON-Datei angeben wurden, ist hier keine Anpassung notwendig
function checkInput(){



	// zuerst wird geprüft, ob sich im Ausgangscontainer noch Elemente befinden
	if ( $('#source').children().length == 0 ){
		var wrongElement= 0;
		//Wenn der Ausgangscontainer leer ist wird die Schleife sooft durchlaufen, wie das Minispiel Elemente hat. Dazu wird die oben deklarierte und verwendete Variable "counter" benutzt
		for(var i=0; i<counter; i++){



			/*
			 Wenn ein Element mit dem Title "target1" vorliegt, wird geprüft, ob sich das Element in dem Container mit der ID "target1" befindet
			 Wenn ja, wird die Hintergrundfarbe auf die Ausgangsfarbe gesetzt. Dieses erneute Setzen der Farbe ist notwendig, sollte das Element zuvor
			 falsch eingeordnet und jetzt an die richtige Position bewegt worden sein.
			 Wenn das Element sich nicht in dem richtigen Container befindet, wird der Hintergrund rot
			*/
			if(document.getElementById("d"+i).title == "target1"){
				if ($(document.getElementById("d"+i)).parents("#target1").length == 1){
					document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
				}else{
					document.getElementById("d"+i).style.backgroundColor="red";
					console.log("Test")
					wrongElement++;

				}
			// Sollte das Element den title "target2" haben, werden nachfolgende Befehle ausgeführt. Diese funktionieren genauso wie die oben beschriebenen
			}else if(document.getElementById("d"+i).title =="target2"){
				if ($(document.getElementById("d"+i)).parents("#target2").length ==1){
					document.getElementById("d"+i).style.backgroundColor ="rgb(153,27,51)";
				}else{
					document.getElementById("d"+i).style.backgroundColor="red";
					console.log("Test")
					wrongElement++;
				}
			}
		}	console.log("Wrong Elements:" + wrongElement)

		// wenn alle ELemente richtig zugeordnet werden zeige einen "Weiter" button an
		 if(wrongElement==0) {

			 // Falls es den button schon gibt (User klickt zum zweiten Mal auf den Button), füge ihn nicht nochmal hinzu
        if($('#backToOtherQuiz').length >0){
					alert("Glückwunsch, Sie haben alle Elemente richtig zugeordnet");
        } else {
					alert("Glückwunsch, Sie haben alle Elemente richtig zugeordnet");
					$('#button')
																.append(
																		'<div id="backToOtherQuiz" class="next">Weiter</div>');
				}

				$("#backToOtherQuiz").click(function() {
					console.log("test")
					changeQuestion();
				});

		}
		//Sollten nicht alle Elemente bewegt worden sein, erscheint ein Alert
	}else
	 alert("Es wurden nicht alle Elemente verwendet");
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
						'<div class="questionText">Das Quiz wurde erfolgreich absolviert!<br><br>Sie haben  '
								+ score
								+ ' von '
								+ numberOfQuestions + ' Fragen richtig beantwortet!' + '</div>');

								$(stage)
										.append(
												'<div class="backToQuizOverview">Zurück zur Spieleübersicht</div>');

								$('.backToQuizOverview').click(function(){
									window.location.href = "test.html";
								});

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
