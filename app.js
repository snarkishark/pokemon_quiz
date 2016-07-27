$(document).ready(function(){
	$("section").hide();
	$(".question").hide();
	$("section#start").show();
	$(".start").on("click",function(e){
		$("section#stats").show();
		$("section#theQuiz").show();
		$("section#start").hide();
		$("div.q1").show();
	});
	$(".question li").on("click", function(e){
		console.log("clicked .question li");
			nextQuestion(this);		
	});
});
var correct = 0;
var incorrect = 0;

function nextQuestion(chosenAnswer){
	console.log("in nextQuestion");
	//update progress
	thisQuestion = chosenAnswer.closest("div");
	current = parseInt(thisQuestion.dataset.indexNumber);
	next= current+1;

	$("span.currentQuestion").html(current);

	//check answer
	$(thisQuestion).find("li.correctAnswer").addClass("green");
	if ($(chosenAnswer).hasClass("correctAnswer")){
		correct+=1;
		$("span.correct").html(correct);
	}else{
		$(chosenAnswer).addClass("red");
		incorrect+=1;
		$("span.incorrect").html(incorrect);
	}
	
	wait(current,next); //delay so user can see the right answer

}
function wait(){
	console.log("in wait");
	timeoutID = window.setTimeout(proceed, 1500, current,next);
}

function proceed(current,next){
	console.log("in proceed");
	if (current == 3){
		restart();
	}else{
	$("div.question[data-index-number="+current+"]").hide();
	$("div.question[data-index-number="+next+"]").show();
	}
}
function restart(){
	console.log("in restart");
	$("section").hide();
	$("section#start").find("h1").html("you got "+correct+"/6 right answers!");
	$("section#start").find(".start").removeClass("start").addClass("replay").html("Play again?").on("click", function(e){
		console.log("clicked replay");
		location.reload();
	});
	$("section#start").show();
}