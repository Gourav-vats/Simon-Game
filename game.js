// Variables --------------------------------------------------------------------

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Functions---------------------------------------------------------------------

function nextSquence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(randomChosenColour);

    // show the randombutton by playing sound & visual effect.

    $("." + randomChosenColour)
        .fadeOut(100)
        .fadeIn(200);
    playSound(randomChosenColour);

    level++;
    $("h1").text("Level " + level);
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("userPress");

    setTimeout(function () {
        $("." + currentColour).removeClass("userPress");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSquence();
            }, 1000);
        }
    } else {
        $("body").addClass("gameOver");
        setTimeout(function () {
            $("body").removeClass("gameOver");
        }, 200);

        playSound("wrong");
        $("h1").text("Game Over! Press any Key to Restart");
        reset();
    }
}

function reset() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

// Main -------------------------------------------------------------------------

$(document).keydown(function () {
    if (gamePattern.length === 0) {
        nextSquence();
    }
});

$(".btn").click(function () {
    var userChosenColour = this.id;
    // console.log(userChosenColour);

    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

