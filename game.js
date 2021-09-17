
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


// Detecting first keyboard press
$(document).on("keydown", function(){
  if(!started){
    $("#lever-title").text("Level " + level);
  nextSequence();
  started = true;
  }
});

$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  sound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern = [];

  level += 1;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(randomChosenColor);


}
// Function to play Sound

function sound(chosenColor){
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}
// Function to add animation on click
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// matching whether the click was right or wrong

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
    else{
      console.log("wrong");
      var wrong = new Audio("sounds/wrong.mp3");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game over! Press any key to restart");
      startOver();
    }
}
// Restarting The Game
function startOver() {
  setTimeout(function(){
    level = 0;
    gamePattern = [];
    started = false;
  }, 500);

}
