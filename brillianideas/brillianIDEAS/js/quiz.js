// scripts here:

	function submitQuiz() {
		console.log('submitted');


	//Scroll down
	window.setTimeout('scrollBy(0,10000)',0);


	// get each answer score
		function answerScore (qName) {
			var checkboxNo = document.getElementsByName(qName);
			var answerValue = 0;
			for (var i = 0, length = checkboxNo.length; i < length; i++) {
   				if (checkboxNo[i].checked) {
			// do something with checkboxNo
					answerValue = answerValue + Number(checkboxNo[i].value);
				}
			}
			// change NaNs to zero
			if (isNaN(answerValue)) {
				answerValue = 0;
			}
			return answerValue;
		}



	// categorization Q1 Interests Box
		if (answerScore('q1') <= 0) {
			var Interests = 1;
		}
		if (answerScore('q1') >= 1 && answerScore('q1') <= 3) {
			var Interests = 2;
		}
		if (answerScore('q1') >= 4 && answerScore('q1')<= 6) {
			var Interests = 3;
		}

			// categorization Q2 Finance Box
		if (answerScore('q2') <= 0) {
			var Finance = 1;
		}
		if (answerScore('q2') >= 1 && answerScore('q2') <= 3) {
			var Finance = 2;
		}
		if (answerScore('q2') >= 4 && answerScore('q2')<= 6) {
			var Finance = 3;
		}

			// categorization Q3 SoftSkills Box
		if (answerScore('q3') <= 1) {
			var SoftSkills = 1;
		}
		if (answerScore('q3') >= 2 && answerScore('q3') <= 5) {
			var SoftSkills = 2;
		}
		if (answerScore('q3') >= 6 && answerScore('q3')<= 8) {
			var SoftSkills = 3;
		}

		//Create Index
		var AnswerIndexString = String(Interests+""+""+Finance+""+SoftSkills);
		var AnswerIndex = parseInt(AnswerIndexString);
		// Assingn ResultText to AnswerIndex
		var ResultText = 123;

		//var color;
		var color;
			var green = document.getElementById("TrafficLightGreen");
			var amber = document.getElementById("TrafficLightAmber");
			var red = document.getElementById("TrafficLightRed");


			switch (AnswerIndex) {
				case 111:
					ResultText = "Das duale Studium scheint deinen Interessen und Wünschen nicht zu entsprechen. Mache dir besser noch einmal ein paar " + "<a href=https://www.dhbw-mannheim.de/duales-studium/bewerbung-und-immatrikulation.html>Gedanken</a>" + "!";
					color = red;
					break;
				case 112:
					ResultText = "Das duale Studium scheint deinen Interessen und Wünschen nicht zu entsprechen. Mache dir besser noch einmal ein paar " + "<a href=https://www.dhbw-mannheim.de/duales-studium/bewerbung-und-immatrikulation.html>Gedanken</a>" + "!";
					color = red;
					break;
				case 113:
					ResultText = "Du scheinst noch etwas unentschlossen zu sein. " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html>Hier</a>" + " bekommst du viele interessante, duale Studienangebote!";
					color = amber;
					break;
				case 121:
					ResultText = "Das duale Studium scheint deinen Interessen und Wünschen nicht zu entsprechen. Mache dir besser noch einmal ein paar " + "<a href=https://www.dhbw-mannheim.de/duales-studium/bewerbung-und-immatrikulation.html>Gedanken</a>" + "!";
					color = red;
					break;
				case 122:
					ResultText = "Du bist noch unentschlossen? " + "<a href=https://www.wegweiser-duales-studium.de/>Hier</a>" + " bekommst du Antworten auf deine Fragen!";
					color = amber;
					break;
				case 123:
					ResultText = "Du scheinst noch etwas unentschlossen zu sein. " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html>Hier</a>" + " bekommst du viele interessante, duale Studienangebote!";
					color = amber;
					break;
				case 131:
					ResultText = "Die Idee des dualen Studiums scheint dir zu gefallen. " + "<a href=https://www.dhbw-mannheim.de/duales-studium/bewerbung-und-immatrikulation.html>Hier</a>" + " kannst du dich über die Erwartungen an duale Studierende informieren!";
					color = amber;
					break;
				case 132:
					ResultText = "Die finanziellen Möglichkeiten, die dir das duale Studium bietet, scheinen dir zu gefallen. Ob sich deine Interessen tatsächlich mit einem dualen Studium vereinbaren lassen, solltest du noch einmal genauer klären: " + "<a href=https://www.wegweiser-duales-studium.de>Wegweiser duales Studium</a>";
					color = amber;
					break;
				case 133:
					ResultText = "Du und das duale Studium, das scheint zu passen. Welche Studiengänge dich erwarten, siehst du " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html>hier</a>" + "!";
					color = green;
					break;
				case 211:
					ResultText = "Das duale Studium scheint deinen Interessen und Wünschen nicht zu entsprechen. Mache dir besser noch einmal ein paar " + "<a href=https://www.dhbw-mannheim.de/duales-studium/bewerbung-und-immatrikulation.html>Gedanken</a>" + "!";
					color = red;
					break;
				case 212:
					ResultText = "Ein duales Studium scheint interessant für dich zu sein. Die finanziellen Möglichkeiten, die dir ein duales Studium bietet, nutzen viele Studenten um neue Orte, sowohl beruflich als auch privat, kennenzulernen: " + "<a href=http://www.dhbw.de/around-the-world.html>Gute Gründe für ein Duales Studium</a>";
					color = amber;
					break;
				case 213:
					ResultText = "Ein duales Studium scheint interessant für dich zu sein. Die finanziellen Möglichkeiten, die dir ein duales Studium bietet, nutzen viele Studenten um neue Orte, sowohl beruflich als auch privat, kennenzulernen: " + "<a href=http://www.dhbw.de/around-the-world.html>Gute Gründe für ein Duales Studium</a>";
					color = amber;
					break;
				case 221:
					ResultText = "Du bist noch unentschlossen? Hier bekommst du Antworten auf deine Fragen: " + "<a href=https://www.wegweiser-duales-studium.de>Wegweiser duales Studium</a>";
					color = amber;
					break;
				//tbd
				case 222:
					ResultText = "Ein duales Studium scheint interessant für dich zu sein. " + "<a href=https://www.wegweiser-duales-studium.de/>Hier</a>" + " holst du dir aktuelle Informationen!";
					color = amber;
					break;
				case 223:
					ResultText = "Super! Für dich scheint das duale Studium gut geeignet zu sein! Bewirb dich gleich " + "<a href=https://www.wegweiser-duales-studium.de>hier</a>" + "!";
					color = green;
					break;
				case 231:
					ResultText = "Du bist noch unentschlossen? Hier bekommst du Antworten auf deine Fragen: " + "<a href=https://www.wegweiser-duales-studium.de/>Wegweiser duales Studium</a>";
					color = amber;
					break;
				case 232:
					ResultText = "Klasse! Dir scheint ein duales Studium zu gefallen. " + "<a href=http://www.dhbw.de/studienangebot/bachelor.html>Hier</a>" + " findest du die einzelnen dualen Studiengänge";
					color = green;
					break;
				case 233:
					ResultText = "Super! Du scheinst perfekt für das duale Studium geeignet zu sein! Melde dich doch an unserer " + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
				case 311:
					ResultText = "Du bist noch unentschlossen? Hier bekommst du Antworten auf deine Fragen: " + "<a href=https://www.wegweiser-duales-studium.de>Wegweiser duales Studium</a>";
					color = amber;
					break;
				case 312:
					ResultText = "Sehr gut! Du bringst Eigenschaften mit, die für ein duales Studium wichtig sind. Die finanziellen Möglichkeiten, die dir das duale Studium bietet, scheinen dich nicht besonders zu interessieren. Vielleicht interessieren dich ja die " + "<a href=http://www.dhbw.de/around-the-world.html>Urlaube</a>" + ", die mit diesem Geld finanziert wurden?";
					color = amber;
					break;
				case 313:
					ResultText = "Ein duales Studium würde gut zu deinen Interessen und deinen Softskills passen. Finanziell scheinst du zwar abgesichert zu sein, aber das Gefühl selbstständig Geld zu verdienen bekommst du nur " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html>hier!</a>";
					color = green;
					break;
				case 321:
					ResultText = "Klasse! Dir scheint ein duales Studium zu gefallen. Hier findest du weitere hilfreiche Informationen für ein erfolgreiches duales Studium: " + "<a href=https://www.wegweiser-duales-studium.de>Wegweiser duales Studium</a>";
					color = amber;
					break;
				case 322:
					ResultText = "Super! Du scheinst perfekt für das duale Studium geeignet zu sein! Bewirb dich gleich " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html>hier</a>" + "!";
					color = green;
					break;
				case 323:
					ResultText = "Super! Du scheinst perfekt für das duale Studium geeignet zu sein! Bewirb dich gleich " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html>hier</a>" + "!";
					color = green;
					break;
				case 331:
					ResultText = "Das duale Studium passt zu dir! Welche Softskills dir für ein erfolgreiches duales Studium helfen, findest du hier: " + "<a href=https://www.wegweiser-duales-studium.de>Wegweiser duales Studium</a>";
					color = green;
					break;
				case 332:
					ResultText = "Super! Du scheinst perfekt für das duale Studium geeignet zu sein! Melde dich doch an unserer "  + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
				case 333:
					ResultText = "Super! Du scheinst perfekt für das duale Studium geeignet zu sein! Melde dich doch an unserer "  + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
			}


		// Show TrafficLight

		red.className='hidden';
		amber.className='hidden';
		green.className='hidden';
			 if (color) {
      color.className='unhidden';

    }

	// show score as "score/possible score"
		var showScore = ResultText;
		document.getElementById('userScore').innerHTML = showScore;
	}

$(document).ready(function() {

	$('#submitButton').click(function() {
		$(this).addClass('hide');
	});

});
