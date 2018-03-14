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
					ResultText = "Das duale Studium scheint deinen Interessen und Wünschen nicht zu entsprechen.<br>Du solltest dich nach Alternativen umschauen!";
					color = red;
					break;
				case 112:
					ResultText = "Das duale Studium scheint deinen Interessen und Wünschen nicht zu entsprechen.<br>Du solltest dich nach Alternativen umschauen!";
					color = red;
					break;
				case 113:
					ResultText = "Du scheinst noch unentschlossen zu sein.<br>" + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html target=_blank> Hier</a>" + "findest du viele interessante, duale Studienangebote der DHBW Mannheim!";
					color = amber;
					break;
				case 121:
					ResultText = "Das duale Studium scheint deinen Interessen und Wünschen nicht zu entsprechen.<br>Du solltest dich nach Alternativen umschauen!";
					color = red;
					break;
				case 122:
					ResultText = "Du bist noch unentschlossen?<br>" + "<a href=https://www.wegweiser-duales-studium.de/ target=_blank>Hier </a>" + "bekommst du Antworten auf deine Fragen!";
					color = amber;
					break;
				case 123:
					ResultText = "Du scheinst noch unentschlossen zu sein.<br>" + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html target=_blank>Hier </a>" + "findest du viele interessante, duale Studienangebote der DHBW Mannheim!";
					color = amber;
					break;
				case 131:
					ResultText = "Die Idee des dualen Studiums scheint dir zu gefallen.<br>" + "<a href=https://www.dhbw-mannheim.de/duales-studium/bewerbung-und-immatrikulation.html target=_blank>Hier </a>" + "kannst du dich über die Erwartungen an duale Studierende informieren!";
					color = amber;
					break;
				case 132:
					ResultText = "Die finanziellen Möglichkeiten, die dir das duale Studium bietet, scheinen dir zu gefallen.<br>" + "<a href=https://www.dhbw-mannheim.de/duales-studium/bewerbung-und-immatrikulation.html target=_blank>Hier </a>" + "kannst du dich über die Erwartungen an duale Studierende informieren!";
					color = amber;
					break;
				case 133:
					ResultText = "Du und das duale Studium, das passt!<br>Welche Studiengänge dich an der DHBW Mannheim erwarten, siehst du " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html target=_blank>hier</a>" + "!";
					color = green;
					break;
				case 211:
					ResultText = "Das duale Studium scheint deinen Interessen und Wünschen nicht zu entsprechen.<br>Du solltest dich nach Alternativen umschauen!";
					color = red;
					break;
				case 212:
					ResultText = "Duales Studium? Das passt!<br>Die finanziellen Möglichkeiten, die ein duales Studium bietet, nutzen viele Studierende um neue Orte, sowohl beruflich als auch privat, kennenzulernen:<br>" + "<a href=http://www.dhbw.de/around-the-world.html target=_blank>Gute Gründe für ein Duales Studium</a>";
					color = green;
					break;
				case 213:
					ResultText = "Duales Studium? Das passt!<br>Die finanziellen Möglichkeiten, die ein duales Studium bietet, nutzen viele Studierende um neue Orte, sowohl beruflich als auch privat, kennenzulernen:<br>" + "<a href=http://www.dhbw.de/around-the-world.html target=_blank>Gute Gründe für ein Duales Studium</a>";
					color = green;
					break;
				case 221:
					ResultText = "Du bist noch unentschlossen?<br>" + "<a href=https://www.wegweiser-duales-studium.de target=_blank> Hier </a>" + "findest du Antworten auf deine Fragen!";
					color = amber;
					break;
				case 222:
					ResultText = "Duales Studium? Das passt!<br>Spannende Studiengänge der DHBW Mannheim findest du " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html target=_blank>hier</a>" + "!";
					color = green;
					break;
				case 223:
					ResultText = "Super!<br>Du scheinst wie gemacht zu sein für ein duales Studium!<br>Deinen zukünftigen Arbeitgeber findest du bei deinem Studiengang: " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html target=_blank>Zukunft planen</a>" + "!";
					color = green;
					break;
				case 231:
					ResultText = "Du bist noch unentschlossen?<br>" + "<a href=https://www.wegweiser-duales-studium.de/ target=_blank>Hier </a>" + "bekommst du Antworten auf deine Fragen.";
					color = amber;
					break;
				case 232:
					ResultText = "Klasse! Dir scheint ein duales Studium zu gefallen.<br>" + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html target=_blank>Hier </a>" + "findest du die verschiedenen dualen Studiengänge der DHBW Mannheim.";
					color = green;
					break;
				case 233:
					ResultText = "Super!<br>Du scheinst wie gemacht zu sein für ein duales Studium!<br>Melde dich doch an unserer " + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html target=_blank>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
				case 311:
					ResultText = "Du bist noch unentschlossen?" + "<a href=https://www.wegweiser-duales-studium.de target=_blank> Hier </a>" + "bekommst du Antworten auf deine Fragen.";
					color = amber;
					break;
				case 312:
					ResultText = "Die finanziellen Möglichkeiten, die dir das duale Studium bietet, scheinen dich nicht besonders zu interessieren.<br>Vielleicht begeistern dich die " + "<a href=http://www.dhbw.de/around-the-world.html target=_blank>Urlaube</a>" + ", die mit diesem Geld finanziert wurden?";
					color = amber;
					break;
				case 313:
					ResultText = "Sehr gut!<br>Du bringst viele wichtige Eigenschaften mit.<br>Finanziell scheinst du zwar abgesichert zu sein, aber das Gefühl selbstständig Geld zu verdienen, bekommst du nur " + "<a href=https://www.dhbw-mannheim.de/duales-studium/studienangebot.html target=_blank>hier!</a>";
					color = green;
					break;
				case 321:
					ResultText = "Klasse! Dir scheint ein duales Studium zu gefallen.<br>Melde dich gleich an unserer " + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html target=_blank>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
				case 322:
					ResultText = "Super! Du scheinst für das duale Studium sehr geeignet zu sein!<br>Melde dich gleich an unserer " + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html target=_blank>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
				case 323:
					ResultText = "Super! Du bringst viele wichtige Eigenschaften mit!<br>Melde dich gleich an unserer " + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html target=_blank>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
				case 331:
					ResultText = "Super! Du scheinst für das duale Studium sehr geeignet zu sein!<br>Melde dich gleich an unserer " + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html target=_blank>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
				case 332:
					ResultText = "Spitze! Du scheinst wie für das duale Studium gemacht zu sein! Melde dich doch an unserer "  + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html target=_blank>Partnerbörse</a>" + " an und lass dich finden!";
					color = green;
					break;
				case 333:
					ResultText = "Wahnsinn! Deine Vorstellungen passen genau zum dualen Studium.<br>Registriere dich an unserer "  + "<a href=http://www.partner.dhbw-mannheim.de/bewerberboerse.html target=_blank>Partnerbörse</a>" + " und lass dich von deinem künftigen Arbeitgeber finden!";
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
