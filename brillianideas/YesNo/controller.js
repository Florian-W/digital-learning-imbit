$(document).ready(function () {

var questionNumber=0;
var questionBank=new Array();
var q=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var score=0;
var progress=0;
var yourAnswers=new Array();

// switch (gametype) {
//   case ValueChainYesNo: $.getJSON('masterfile.json', function(data) {
//
//   for(i=0;i<data.MultipleChoice.TestGame.length;i++){
//     questionBank[i]=new Array;
//     questionBank[i][0]=data.MultipleChoice.TestGame[i].question;
//     questionBank[i][1]=data.MultipleChoice.TestGame[i].option1;
//     questionBank[i][2]=data.MultipleChoice.TestGame[i].option2;
//     console.log(data.MultipleChoice.TestGame[0].question)
//   }
//    numberOfQuestions=questionBank.length;
//
//   displayQuestion();
//   })//gtjson
//
//     break;
//   default:
//
// }

 		$.getJSON('masterfile.json', function(data) {

		for(i=0;i<data.MultipleChoice.TestGame.length;i++){
			questionBank[i]=new Array;
			questionBank[i][0]=data.MultipleChoice.TestGame[i].question;
			questionBank[i][1]=data.MultipleChoice.TestGame[i].option1;
			questionBank[i][2]=data.MultipleChoice.TestGame[i].option2;
      console.log(data.MultipleChoice.TestGame[0].question)
		}
		 numberOfQuestions=questionBank.length;




		displayQuestion();
		})//gtjson






function displayQuestion(){


var q=new Array();
var contentArray =new Array();
$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div>')

for(i=1;i<questionBank[questionNumber].length;i++){
	q[i-1]=questionBank[questionNumber][i];


	contentArray[i-1] = '<div id='+ i +' class="option" tabindex="1">'+q[i-1]+'</div>';
}

	//shuffle(contentArray);

	for(i=0;i<contentArray.length;i++){
		if(q[i]=="Ja") { //ja soll immer oben angezeigt egal ob richtig oder falsch
			$(stage).append(contentArray[0]);
		} else {
			$(stage).append(contentArray[1]);
		}


	}



 $('.option').click(function(){

   yourAnswers.push(this.innerHTML);
  if(questionLock==false){questionLock=true;
  //correct answer
  if(this.id==1){
   $(stage).append('<div class="feedback1">CORRECT</div>');
   score++;
   }
  //wrong answer
  if(this.id!=1){
   $(stage).append('<div class="feedback2">WRONG</div>');
  }

   setTimeout(function(){changeQuestion()},1000);

 }})

 $(stage).append('<br><br><div id="myProgress"><div id="myBar" style="width:'+progress+'%;"><div id="label"> '+progress+'%</div></div></div>');

}//display question


	function changeQuestion(){

		questionNumber++;

    progress=(100/numberOfQuestions)*questionNumber;
    moveProgress();

	if(stage=="#game1"){stage2="#game1";stage="#game2";}
		else{stage2="#game2";stage="#game1";}

	if(questionNumber<numberOfQuestions){displayQuestion();}else{displayFinalSlide();}

	 $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}//change question

  function moveProgress() {
  var elem = document.getElementById("myBar");
  var width = 5;
  var id = setInterval(frame, 5);
  function frame() {
    // if (width >= progress) {
    //   clearInterval(id);
    // } else {
    //   width++;
    //
    //   document.getElementById("label").innerHTML = width * 1  + '%';
    // elem.style.width = progress + '%';
    // document.getElementById("label").innerHTML = progress  + '%';
    // }
  }
}




	function displayFinalSlide(){
		var percentage=(score/numberOfQuestions)*100;

		if (percentage!=100){
			$(stage).append('<div class="questionText">Overview of you answers:<br><br></div>');
  			// questionBank[0][0]=data.MultipleChoice.TestGame[i].question;
  			// questionBank[0][1]=data.MultipleChoice.TestGame[i].option1;
  			// questionBank[0][2]=data.MultipleChoice.TestGame[i].option2;

      // $(stage).append('<div class="questionText">'+ questionBank[0][0]=data.MultipleChoice.TestGame[i].question+' Answer: '+yourAnswers[0]+'</div>');
console.log(yourAnswers)
		}


		$(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+numberOfQuestions+'<br>Correct answers: '+score+'<br>You scored a: '+percentage+'%'+'</div>');

	}//display final slide


	/**
	 * Shuffles array in place.
	 * @param {Array} a items The array containing the items.
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




	});//doc ready
