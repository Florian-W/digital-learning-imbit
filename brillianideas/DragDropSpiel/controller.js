$(document).ready(function () {
	
var obj = new Array(); //speichert den Inhalt der JSON-Datei
var counter=0; //zählt die Schleifendurchläufe und 	wird verwendet, um die ID des div zu erstellen	 
var elementid = 0; // speichert die ID des div Elements
		 
		 
		 

 
 		$.getJSON('masterfile.json', function(data) { //liest Inhalt aus der JSON Datei aus

		 for (var i=0; i<data.DragDropGames.IndianCuisine.length; i++){ //Schleife wird so oft ausgeführt, wie Elemente in IndianCuisine sind (siehe masterfile.json)
			  obj = data.DragDropGames.IndianCuisine[i]; // Das Element an der Stelle i wird in das Array obj geschrieben
		 
			 for(var key in obj){ // in jedem Schleifendurchlauf wird der Name der Eigenschaft (hier d1 etc.) der Variablen key zugewiesen

				 var value =obj[key]; // Der Inhalt des Arrays an der Stelle "key" wird der Variablen value zugewiesen
				 $('#source').append($('<div/>',{id:key,'class':"drag"})) // ein neues <div> wird in der html-Datei erstellt. Die ID ist der Inhalt der Variablen key
				document.getElementById(key).innerHTML =value; // Dem zuvor erstellten Element wird der Inhalt der Variablen value als Text übergeben.


			 }
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
			 
		 })
		 

		}//gtjson
		});
		


			$('#target1').droppable({
				//accept:'#d1,#d3, #d2',
				onDragEnter:function(e,source){
					$(source).draggable('options').cursor='auto';
					$(source).draggable('proxy').css('border','1px solid red');
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
					$(source).draggable('proxy').css('border','1px solid red');
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
 // checkInput überprüft, ob die Elemente an die richtige Stelle gezogen wurden
 /*
 !!!Achtung!!! Für jedes Spiel muss die einzeln neu implementiert werden. Keine Universallogik!!!
 Grundgerüst:
 
 function name(){
	 if(('#Startelement').children().length == 0){
		 if ($("#ElementID").parents(ZielID).length ==1){
			 document.getElementById("ElementID").style.backgroundColor = "Ausgangsfarbe";
		 }else{
			 document.getElementById("ElementID").style.backgroundColor = "Wunschfarbe";
		 }
	 }else{
		 alert("Text der Alert-Message");
	 }
 }
 */
function checkInput(){
		if( $('#source').children().length == 0 ) { //Überprüft, ob das div-Element mit der ID keine Child-Elemente mehr enthält
			
			if ( $("#d1").parents("#target1").length == 1 ) { //überprüft ob das Element im passenden Zielcontainer ist, muss so oft wiederholt werden, wie es Elemente gibt
					document.getElementById("d1").style.backgroundColor = "#AACCFF"; // nötig, damit das Element die ursprüngliche Farbe bekommt, wenn es ein zweites Mal positioniert wird
			}else{
				document.getElementById("d1").style.backgroundColor = "red" ; // wenn das Element falsch positioniert wurde, wird der Hintergrund rot
			}
			if ( $("#d2").parents("#target1").length == 1 ) {
					document.getElementById("d2").style.backgroundColor = "#AACCFF";
			}else{
				document.getElementById("d2").style.backgroundColor = "red" ;
			}
			if ( $("#d3").parents("#target1").length == 1 ) {
					document.getElementById("d3").style.backgroundColor = "#AACCFF";
			}else{
				document.getElementById("d3").style.backgroundColor = "red" ;
			}
			if ( $("#d4").parents("#target2").length == 1 ) {
					document.getElementById("d4").style.backgroundColor = "#AACCFF";
			}else{
				document.getElementById("d4").style.backgroundColor = "red" ;
			}
			if ( $("#d5").parents("#target2").length == 1 ) {
					document.getElementById("d5").style.backgroundColor = "#AACCFF";
			}else{
				document.getElementById("d5").style.backgroundColor = "red" ;
			}
			if ( $("#d6").parents("#target2").length == 1 ) {
					document.getElementById("d6").style.backgroundColor = "#AACCFF";
			}else{
				document.getElementById("d6").style.backgroundColor = "red" ;
			}
			if ( $("#d7").parents("#target1").length == 1 ) {
					document.getElementById("d7").style.backgroundColor = "#AACCFF";
			}else{
				document.getElementById("d7").style.backgroundColor = "red" ;
			}
			if ( $("#d8").parents("#target1").length == 1 ) {
					document.getElementById("d8").style.backgroundColor = "#AACCFF";
			}else{
				document.getElementById("d8").style.backgroundColor = "red" ;
			}
		}else{ // wenn der Ausgangscontainer noch Elemente beinhaltet wird ein Allert ausgelöst
			alert("You have not dragged all elements");
		}
}
 



