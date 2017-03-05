var counter=0; // zählt die Anzahl der Elemente der JSON-Datei
$(document).ready(function () {

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
});



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
        if($('.nextButton').length >0){
					alert("Glückwunsch, Sie haben alle Elemente richtig zugeordnet");
        } else {
					alert("Glückwunsch, Sie haben alle Elemente richtig zugeordnet");
					$('#button')
																.append(
																		'<div class="nextButton">Weiter</div>');
				}

				$(".nextButton").click(function() {
					console.log("test")
					window.location.href = "../quiz/test.html";
				});

		}
		//Sollten nicht alle Elemente bewegt worden sein, erscheint ein Alert
	}else
	 alert("Es wurden nicht alle Elemente verwendet");
	}
