var width = 1000;
var height = 500;

var canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.textAlign = "center";

var textFont = "px Helvetica bold"

var canvasData = {}

var imageCount = 0;
var audioCount = 0;
var imagesLoaded = false;
var audioLoaded = false;

function Player(x, y, hitTime, hitCount) {
    this.x = x;
    this.y = y;
    this.hitTime = hitTime;
    this.hitCount = hitCount;
}

////////////////////////Initialize
function initialGreenLevel(level) { //creates green initial green players for level one
    playerSeparation = 4 * canvasData.playerRadius;
    greenOneX = canvasData.width / 10;
    greenOneY = canvasData.height / 10;
    greenTwoX = greenOneX;
    greenTwoY = greenOneY + playerSeparation;
    greenThreeX = greenOneX + playerSeparation;
    greenThreeY = greenOneX;
    greenFourX = greenOneX + 2 * playerSeparation;
    greenFourY = greenOneY;
    greenFiveX = greenFourX - playerSeparation;
    greenFiveY = greenFourY + playerSeparation;
    greenSixX = greenFourX - 2 * playerSeparation;
    greenSixY = greenFourY + 2 * playerSeparation;
    hitCount = 0;
    hitTime = 0;
    canvasData.greenPlayersList[canvasData.greenPlayersList.length] =
        new Player(greenOneX, greenOneY, hitTime, hitCount);
    canvasData.greenPlayersList[canvasData.greenPlayersList.length] =
        new Player(greenTwoX, greenTwoY, hitTime, hitCount);
    canvasData.greenPlayersList[canvasData.greenPlayersList.length] =
        new Player(greenThreeX,greenThreeY,hitTime, hitCount);
    if (level == 2) {
        canvasData.greenPlayersList[canvasData.greenPlayersList.length] =
        new Player(greenFourX, greenFourY, hitTime, hitCount);
        canvasData.greenPlayersList[canvasData.greenPlayersList.length] =
        new Player(greenFiveX, greenFiveY, hitTime, hitCount);
        canvasData.greenPlayersList[canvasData.greenPlayersList.length] =
        new Player(greenSixX, greenSixY, hitTime, hitCount);
    }
    canvasData.greenOrders = new Array(canvasData.greenPlayersList.length).fill(0);
    // for (player = 0; player < canvasData.greenPlayersList.length; player++) {
    //     drawGreenPlayers(player);
    // }
}

function drawGreenPlayers(player) { //creates green players
    x = canvasData.greenPlayersList[player].x;
    y = canvasData.greenPlayersList[player].y;
    hitCount = canvasData.greenPlayersList[player].hitCount;
    hitTime = canvasData.greenPlayersList[player].hitTime;
    gStand = canvasData.images["gstand"];        //at given location
    gHit = canvasData.images["ghit"];
    gThrow = canvasData.images["gthrow"];
    gBrushOne = canvasData.images["gbrushOne"];
    gBrushTwo = canvasData.images["gbrushTwo"];
    maxHitCount = canvasData.maxHitCount;
    playerWidth = 2 * canvasData.playerRadius;
    playerHeight = 2 * canvasData.playerRadius;
    if (hitCount == maxHitCount) { //player has been hit 3 times, player is dead
        canvasData.audios["dead"].play(); //add player to dead list
        canvasData.deadGreen.push([x, y]); //remove from alive list
        canvasData.greenPlayersList.splice(player, 1);
    }
    else if (hitTime > 0) { //player is hit
        if (hitCount ==1) { //first time being hit,player brushes snow off face
            if (hitTime > 50) { 
                gBrushOne = canvasData.images["gBrushOne"];
                ctx.drawImage(gBrushOne, x, y, playerWidth, playerHeight);
            }
            else {
                gBrushTwo = canvasData.images["gBrushTwo"];
                ctx.drawImage(gBrushTwo, x, y, playerWidth, playerHeight);
            }
        }
        else if (hitCount == 2) {
            gHit = canvasData.images["gHit"];
            ctx.drawImage(gHit, x, y, playerWidth, playerHeight);
        }
    }
    else if (canvasData.greenOrders[player] == -1) { //player must wait until snowball lands 
        gThrow = canvasData.images["gThrow"];
        ctx.drawImage(gThrow, x, y, playerWidth, playerHeight);
    }
    else {
        gStand = canvasData.images["gStand"];
        ctx.drawImage(gStand, x, y, playerWidth, playerHeight);
    }
}

function incrementImagesCount() {
    imageCount++;
}

function incrementAudioCount() {
    audioCount++;
}

function initImages() { //stores the images in dictionary
    canvasData.images = {};
    var background = new Image();
    background.src = "./files/SnowCraft/background.png";
    background.onload = incrementImagesCount;
    canvasData.images["background"] = background;
    var rStand = new Image();
    rStand.src = "./files/SnowCraft/rstand.gif";
    rStand.onload = incrementImagesCount;
    canvasData.images["rStand"] = rStand;
    var gStand = new Image();
    gStand.src = "./files/SnowCraft/gstand.gif";
    gStand.onload = incrementImagesCount;
    canvasData.images["gStand"] = gStand;
    var rDead = new Image();
    rDead.src = "./files/SnowCraft/rdead.gif";
    rDead.onload = incrementImagesCount;
    canvasData.images["rDead"] = rDead;
    var gDead = new Image();
    gDead.src = "./files/SnowCraft/gdead.gif";
    gDead.onload = incrementImagesCount;
    canvasData.images["gDead"] = gDead;
    var rSelected = new Image();
    rSelected.src = "./files/SnowCraft/rselected.gif";
    rSelected.onload = incrementImagesCount;
  	canvasData.images["rSelected"] = rSelected;
  	var gThrow = new Image();
  	gThrow.src = "./files/SnowCraft/gthrow.gif";
    gThrow.onload = incrementImagesCount;
  	canvasData.images["gThrow"] = gThrow;
  	var gHit = new Image();
  	gHit.src = "./files/SnowCraft/ghit.gif";
    gHit.onload = incrementImagesCount;
  	canvasData.images["gHit"] = gHit;
  	var rPlayerHit = new Image();
  	rPlayerHit.src = "./files/SnowCraft/rplayerhit.gif";
    rPlayerHit.onload = incrementImagesCount;
  	canvasData.images["rPlayerHit"] = rPlayerHit;
  	var gBrushOne = new Image();
  	gBrushOne.src = "./files/SnowCraft/gbrushone.gif";
    gBrushOne.onload = incrementImagesCount;
  	canvasData.images["gBrushOne"] = gBrushOne;
  	var gBrushTwo = new Image();
  	gBrushTwo.src = "./files/SnowCraft/gbrushtwo.gif";
    gBrushTwo.onload = incrementImagesCount;
  	canvasData.images["gBrushTwo"] = gBrushTwo;
  	var snowSplash = new Image();
  	snowSplash.src = "./files/SnowCraft/snowsplash.gif";
    snowSplash.onload = incrementImagesCount;
  	canvasData.images["snowSplash"] = snowSplash;
}

function initAudios() {
	canvasData.audios = {};
    var dead = new Audio("./files/SnowCraft/dead.wav");
    var greenHit = new Audio("./files/SnowCraft/greenHit.wav");
    var greenThrow = new Audio("./files/SnowCraft/greenThrow.wav");
    var redHit = new Audio("./files/SnowCraft/redHit.wav");
    var redThrow = new Audio("./files/SnowCraft/redThrow.wav");
    var footstep = new Audio("./files/SnowCraft/footstep.wav");
    var newLevel = new Audio("./files/SnowCraft/newLevel.wav");
    dead.onload = incrementAudioCount;
    greenHit.onload = incrementAudioCount;
    greenThrow.onload = incrementAudioCount;
    redHit.onload = incrementAudioCount;
    redThrow.onload = incrementAudioCount;
    footstep.onload = incrementAudioCount;
    newLevel.onload = incrementAudioCount;
    canvasData.audios["footstep"] = footstep;
    canvasData.audios["dead"]= dead;
    canvasData.audios["greenHit"] = greenHit;
    canvasData.audios["greenThrow"] = greenThrow;
    canvasData.audios["redHit"] = redHit;
    canvasData.audios["redThrow"] = redThrow;
    canvasData.audios["newLevel"] = newLevel;
}

function keyPressed(e) {
    if (e.key == "Enter" && canvasData.level == 0 && canvasData.instruction == false) { // must be at starting screen
        startGame();
    }
    if (e.key == "h") {
    	setInstructions();
    }
    if (e.key == "w") {
        canvasData.greenPlayersList = []; //cheats
    }
    if (e.key == "l") {
        canvasData.redPlayersList = []; //cheats
    }
    // if (e.key == "q") {
    //     qPressed();
    // }
    // if (e.key == "r") {
    //     rPressed();
    // }
    // if (e.key=="p" && canvasData.instruction == false)  {
    //     canvasData.paused = !canvasData.paused
    // }
    // if (e.key == "n"
    //    and len(canvasData.greenPlayersList) == 0 and canvasData.level != 0) {
    //     nPressed(); //can only go to next level when player has beaten level
    // }
    // redrawAll();                                  
}

function startGame() { //start the game
    canvasData.audios["newLevel"].play();
    canvasData.loadTimer = 100
    canvasData.level = 1
    init();
}

function setInstructions() { //show instructions
    canvasData.instruction = !canvasData.instruction;
    canvasData.paused = !canvasData.paused;
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawStartScreen() {  //starting screen
	width = canvas.width;
	height = canvas.height;
	textSize = 50;
	x = width / 2;
	y = height / 3;
	ctx.font = textSize + textFont;
	text = "Snow Craft";
	ctx.fillText(text, x, y);
	ctx.font = (textSize / 3) + textFont;
	text = "Press 'enter' to start";
	ctx.fillText(text, x, y + textSize);
	text = "Press 'h' for help";
	ctx.font = (textSize / 3) + textFont;
	ctx.fillText(text, x, y + textSize + (textSize / 2));
}

function redrawAll() {
    clearCanvas();
    drawBackGround(); //draws background
    if (canvasData.instruction == true) {
        drawInstructions(); //draw instructions
        return; //don't do anything else
    }
    if (canvasData.level == 0) {
        drawStartScreen(); //starting screen
    }
    if (canvasData.redPlayersList.length ==0 ||
        canvasData.greenPlayersList.length ==0) {
        canvasData.paused = true; //game is paused in between levels
        canvasData.playerSelected[0] = false; //player is no longer selected
    }
    for (player = 0; player < canvasData.redPlayersList.length; player++) {
        drawRedPlayers(player);
    }
    for (player = 0; player < canvasData.greenPlayersList.length; player++) {
        drawGreenPlayers(player);
    }
    // if canvasData.snowballThrown == True: drawSnowball()
    // if canvasData.playerSelected[0] == True: drawThrowStrength(), snowHand()
    // drawFallingSnowBall(), drawSnowSplashes(), drawLevelLoad(), gameOver()
}

////////////////////////Instructions
function drawInstructions() { //instruction screen
    x = canvasData.width;
    y = canvasData.height;
    var text = [];
    text[text.length] = "Click on red player to select player.";
    text[text.length] = "Drag mouse to move player release mouse to throw snowball.";
    text[text.length] = "Green bars next to player indicates strength of the throw.";
    text[text.length] = "Hit each green player three times to knock them out. ";
    text[text.length] = "On seond hit green player will fall. ";
    text[text.length] = "Green player may not be hit while on ground. ";
    text[text.length] = "Once all green players are knocked out, you win! ";
    text[text.length] = "If red player is hit, player is stunned for a bit. ";
    text[text.length] = "If stunned player is hit again, player is knocked out. ";
    text[text.length] = "Players may not cross into enemy territory. ";
    text[text.length] = "Press 'h' to resume play. ";
    text[text.length] = "Press 'p' to pause. ";
    text[text.length] = "Press 'q' to return to starting screen. ";
    text[text.length] = "Press 'r' to restart current level. ";
    textSize = 20;
    ctx.font = textSize + textFont;
    for (i = 0; i < text.length; i++) {
        ctx.fillText(text[i], x / 2, textSize * 5 + textSize * i);
    }
    canvasData.paused = true;
}
////////////////////////

function drawBackGround() {
    width = canvasData.width;
    height = canvasData.height;
    background = canvasData.images["background"]
	ctx.drawImage(background, 0, 0, width, height);
}

function waitImagesLoad() {
    if (Object.keys(canvasData.images).length == imageCount) {
        imagesLoaded = true;
    }
}

function waitAudioLoad() {
    if (Object.keys(canvasData.audios).length == audioCount) {
        audioLoaded = true;
    }
}

///////////////Timer Fired
function timerFired() {
    if (!imagesLoaded) {
        waitImagesLoad();
    }
    if (!audioLoaded) {
        waitAudioLoad();
    }
    if (canvasData.paused) {
        redrawAll();
        return;
    } 
    if (canvasData.playerSelected[0] == true) {
    	canvasData.throwStrength += 1;
    }
    snowBallSpeed = canvasData.snowBallSpeed;     //throw strength increases
    // for (i = 0; i < canvasData.redSnow.length; i++) {
    // 	index = canvasData.redSnow[i];
    //     (l, t, r, b, throwStrength) = canvasData.d[index]; //move snowball
    //     canvasData.d[index] = (l - snowBallSpeed, t - snowBallSpeed, 
    //                            r - snowBallSpeed, b - snowBallSpeed, 
    //                            throwStrength - 1);
    // }
    // for element in canvasData.greenSnow: //move snowball
    //     (l, t, r, b, throwStrength) = canvasData.d[element]
    //     canvasData.d[element]=(l+snowBallSpeed, t+snowBallSpeed, \
    //                             r+snowBallSpeed, b+snowBallSpeed, \
    //                             throwStrength)
    // greenPlayerAI();
    // checkGreen();
    // checkRed();
    redrawAll();
}
///////////////

function init() {  //stores initial values
    initImages();
    initAudios();
    canvasData.deadRed = [];
    canvasData.deadGreen = [];
    canvasData.snowSplashes = [];
    canvasData.fallingSnowBall = []; 
    canvasData.snowBallSpeed = 5;
    canvasData.boxHeight = 5;
    canvasData.boxWidth = 10;
    canvasData.playerSelected = [false, 0, 0];
    width = canvasData.width;
    canvasData.hitTime = 100;
    canvasData.fallSpeed= 5;
    canvasData.redPlayersList = [];
    canvasData.greenPlayersList = [];
    canvasData.redSnow = [];
    canvasData.greenSnow = [];
    canvasData.throwStrength = 0;
    canvasData.d = {};
    canvasData.throwStrengthMaximum = (width) / canvasData.snowBallSpeed;
    canvasData.shadowDistance = 25;
    canvasData.maxHitCount = 3;
    canvasData.mouse["leftPosn"] = (0, 0)
    canvasData.steps = 50;
    canvasData.snowBallCounter = 0;
    canvasData.playerRadius = width / 30;
    canvasData.paused = false;
    canvasData.snowballThrown = false;
    canvasData.snowballSize = canvasData.playerRadius / 2;
    if (canvasData.level == 1) {
        initialRedPlayers();
        initialGreenLevel(1);
    }
    if (canvasData.level == 2) {
        initialRedPlayers();
        initialGreenLevel(2);
    }
    // for (player in canvasData.redPlayersList)
    //     createRedPlayers(element);

}

function initialRedPlayers() { //creates 3 red players at initial locations
    width = canvasData.width;
    height = canvasData.height;
    hitTime = 0;
    playerRadius = canvasData.playerRadius;
    redOneX = ((width * 3) / 5) + playerRadius;
    redOneY = ((height / 3) * 2) + playerRadius;
    redTwoX = redOneX + (playerRadius * 3);
    redTwoY = redOneY;
    redThreeX = redOneX + (playerRadius * 3);
    redThreeY = redOneY - (playerRadius * 3);
    canvasData.redplayersList = [];
    canvasData.redPlayersList[0] = new Player(redOneX, redOneY, hitTime);
    canvasData.redPlayersList[1] = new Player(redTwoX, redTwoY, hitTime);
    canvasData.redPlayersList[2] = new Player(redThreeX, redThreeY, hitTime);
}

function drawRedPlayers(player) {  //creates red players at given location
    x = canvasData.redPlayersList[player].x;
    y = canvasData.redPlayersList[player].y;
    hitTime = canvasData.redPlayersList[player].hitTime;
    rStand = canvasData.images["rstand"];
    rSelected = canvasData.images["rselected"];
    rPlayerHit = canvasData.images["rplayerhit"];
    dead = canvasData.audios["dead"];
    playerRadius = canvasData.playerRadius;
    playerWidth = playerRadius * 2;
    playerHeight = playerRadius * 2;
    if (hitTime > canvasData.hitTime) { //the player was hit while stunned
        dead.play();
        canvasData.redPlayersList.splice(player, 1);
        canvasData.deadRed.push([x, y]); //draw dead player on background
    }
    else if (hitTime > 0) { //the player was hit while not stunned
        rPlayerHit = canvasData.images["rPlayerHit"];
        ctx.drawImage(rPlayerHit, x, y - playerRadius, playerWidth, playerHeight);
    }
    else if (canvasData.playerSelected == [true, x, y]) { //draw image for selected player
        rSelected = canvasData.images["rSelected"];
        ctx.drawImage(rSelected, x, y - playerRadius, playerWidth, playerHeight);
    }
    else {
        rStand = canvasData.images["rStand"];
        ctx.drawImage(rStand, x, y - playerRadius, playerWidth, playerHeight);
    }
    //otherwise, player is just standing
}

window.onload = function () {
    canvasData.level = 0;
    canvasData.width = width;
    canvasData.height = height;
    canvasData.mouse = {};
    canvasData.level = 0;
    canvasData.loadTimer = 0;
    canvasData.instruction = false;
    canvasData.playerSelected = [false, 0, 0];
    canvasData.redPlayersList = [];
    canvasData.commands = ["Move","Throw"];
    canvasData.directions = ["Left","Up","Right","Down"];
	init();
	delay = 5;
	setInterval(timerFired, delay);
    document.addEventListener('keypress', keyPressed);
};


