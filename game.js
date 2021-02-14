var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOver = 1;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColorChosen = buttonColors[randomNumber]
  gamePattern.push(randomColorChosen);
  $("#level-title").text("Level " + level);
  level += 1;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  for (var i = 0; i < gamePattern.length; ++i) {
    var color = gamePattern[i];
    await sleep(1000);
    playSound(color);
    $('#' + color).fadeOut(100).fadeIn(100);
  }
}

$("#red").click(function() {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

$("#blue").click(function() {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

$("#yellow").click(function() {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

$("#green").click(function() {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

function handler(event) {
  var userChosenColor = event.target.id;
  console.log(event.target.id);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

async function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel] && gameOver === 0) {
    console.log("Correct");
    console.log("Current Level + 1: " + (currentLevel + 1));
    console.log("Level: " + level);
    if (currentLevel + 1 === level) {
      await sleep(1000);
      userClickedPattern = [];
      nextSequence();
      demo();
    }
  } else {
    console.log("False");
    playSound("wrong");
    gameOver = 1;
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").toggleClass("game-over");
    await sleep(200);
    $("body").toggleClass("game-over");;
  }
}


async function animatePress(currentColor) {
  $('#' + currentColor).toggleClass("pressed");
  await sleep(100);
  $('#' + currentColor).toggleClass("pressed");
}

$(document).keypress(function(event) {
  console.log(event.which);
  if (gameOver && event.which === 97) {
    level = 0;
    gameOver = 0;
    nextSequence();
    demo();
  } else if (gameOver && level != 0) {
    level = 0;
    gameOver = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
    demo();
  }
})
