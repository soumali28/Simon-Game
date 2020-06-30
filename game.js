var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//keypress-To start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});


//gamesequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}
//detects the user click
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkanswer(userClickedPattern.length-1);
});
// plays sound when the user clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//animation when the user click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//checkanswer
function checkanswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  console.log("success");
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
    nextSequence();
  },1000);
}
}
else{
console.log("wrong");
var audio = new Audio("sounds/wrong.mp3")
$("body").addClass("game-over");
setTimeout(function(){
  $("body").removeClass("game-over");
} , 200);
$("h1").text("Game Over, Press Any Key to Restart");
startover();
}
}

//restarts the game when the user gets it wrong
function startover(){
  level = 0;
  gamePattern = [];
  started = false;
}
