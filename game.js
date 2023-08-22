var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userChosenPattern =[];
var level=0;
var numberOfClick=0;



$(document).keydown(function()
{
    if(level===0)
    {
        nextSequence();
        $(".btn").click(handleClick);
    }
})

function handleClick()
{
    numberOfClicks++;

    var userChosenColor=$(this).attr('id');

    document.querySelector("#"+userChosenColor).classList.add("pressed");
    setTimeout(function (){
        document.querySelector("#"+userChosenColor).classList.remove("pressed");
        }, 100);

    playSound(userChosenColor);

    userChosenPattern.push(userChosenColor);
    
    if(userChosenPattern[numberOfClicks-1]!=gamePattern[numberOfClicks-1])
    {
        gameOver();
    }
    else if(numberOfClicks===gamePattern.length)
    {
        setTimeout(function () {
            nextSequence();
        }, 1000);
        
    }
}

function nextSequence()
{
    level++;
    numberOfClicks=0;

    $("h1").text("Level "+String(level));
    userChosenPattern=[];

    var randomNumber = Math.floor(4*Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(btnColor) 
{
    switch (btnColor) 
    {
        case "green":
            var green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case "red":
            var red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case "yellow":
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;
        case "blue":
            var blue=new Audio('sounds/blue.mp3');
            blue.play();
            break;
        default:
            console.log(btnColor);
            break;
    }
}
 function gameOver() 
 {
    $("body").addClass("game-over");
    setTimeout(function (){
        document.querySelector("body").classList.remove("game-over");
        }, 200);
    var wrong=new Audio('sounds/wrong.mp3');
    wrong.play();

    $("h1").text("Game Over! Press A Key to Restart");

    startOver();   
 }

 function startOver() 
 {
    gamePattern = [];
    userChosenPattern =[];
    level=0;
    numberOfClicks=0;
    $(".btn").unbind();
 }
