var width = 1000;
var height = 500;

var canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.textAlign = "center";

var textFont = "px Helvetica bold"

var canvasData = {
	width: width,
	height: height,
	deadRed: [],
	deadGree: [],
	snowSplashes: [],
	fallingSnowBall: [],
	snowBallSpeed: 5,
	boxHeight: 5,
	boxWidth: 10,
	playerSelected: [false, 0, 0],
	width: width,
	hitTime: 100,
	fallSpeed: 5,
	redPlayersList: [],
	greenPlayersList: [],
	redSnow: [],
	greenSnow: [],
	throwStrength: 0,
	d: {},
	throwStrengthMaximum: function() {
		return (width) / this.snowBallSpeed;
	},
	shadowDistance: 25,
	maxHitCount: 3,
	mouse: {
		x: 0,
		y: 0,
	},
	steps: 50,
	snowballCounter: 0,
	playerRadius: 30,
	paused: false,
	snowballThrown: false,
	snowballSize: function () {
		return this.playerRadius / 2;
	},
	level: 0,
	instruction: false,
	paused: false,
}

var imageCount = 0;
var audioCount = 0;
var imagesLoaded = false;
var audioLoaded = false;

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

function playNewLevel() {
	canvasData.audios["newLevel"].play();
}

function keyPressed(e) {
    if (e.key == "Enter") {
        playNewLevel();
        gameStart();
    }
    if (e.key == "h") {
    	setInstructions();
    }                                  
}

function setInstructions() { //show instructions
    canvasData.instruction = !canvasData.instruction;
    canvasData.paused = !canvasData.paused;
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameStart() {  //starting screen
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
        gameStart(); //starting screen
    }
    // if len(canvasData.redPlayersList) ==0 or\
    //    len(canvasData.greenPlayersList)==0:
    //     canvasData.paused = True //game is paused in between levels
    //     canvasData.playerSelected[0]=False //player is no longer selected
    // for player in canvasData.redPlayersList: createRedPlayers(player)
    // for player in canvasData.greenPlayersList: createGreenPlayers(player)
    // if canvasData.snowballThrown == True: drawSnowball()
    // if canvasData.playerSelected[0] == True: drawThrowStrength(), snowHand()
    // drawFallingSnowBall(),drawSnowSplashes(),drawLevelLoad(),gameOver()
}

////////////////////////Instructions
function drawInstructions() { //instruction screen
    x = canvasData.width
    y = canvasData.height
    var text = [];
    text[text.length] = "Click on red player to select player."
    text[text.length] = "Drag mouse to move player release mouse to throw snowball."
    text[text.length] = "Green bars next to player indicates strength of the throw."
    text[text.length] = "Hit each green player three times to knock them out. "
    text[text.length] = "On seond hit green player will fall. "
    text[text.length] = "Green player may not be hit while on ground. "
    text[text.length] = "Once all green players are knocked out, you win! "
    text[text.length] = "If red player is hit, player is stunned for a bit. "
    text[text.length] = "If stunned player is hit again, player is knocked out. "
    text[text.length] = "Players may not cross into enemy territory. "
    text[text.length] = "Press 'h' to resume play. "
    text[text.length] = "Press 'p' to pause. "
    text[text.length] = "Press 'q' to return to starting screen. "
    text[text.length] = "Press 'r' to restart current level. "
    textSize = 20;
    ctx.font = textSize + textFont;
    for (i = 0; i < text.length; i++) {
        ctx.fillText(text[i], x / 2, textSize * 5 + textSize * i);
    }
    canvasData.paused = true;
}
////////////////////////

function drawBackGround() {
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
    // if (canvasData.paused == false) { //only if game isn't paused  
    //     if (canvasData.playerSelected[0] == true) {
    //     	canvasData.throwStrength += 1;
    //     }
    //     snowBallSpeed = canvasData.snowBallSpeed;     //throw strength increases
        // for (i = 0; i < canvasData.redSnow.length(); i++) {
        // 	index = canvasData.redSnow[i];
        //     (l,t,r,b,throwStrength) = canvasData.d[index]; //move snowball
        //     canvasData.d[index] = (l - snowBallSpeed, t - snowBallSpeed,
        //                            r - snowBallSpeed, b - snowBallSpeed,
        //                            throwStrength - 1);
        // }
        // for element in canvasData.greenSnow: //move snowball
        //     (l,t,r,b,throwStrength) = canvasData.d[element]
        //     canvasData.d[element]=(l+snowBallSpeed,t+snowBallSpeed,\
        //                             r+snowBallSpeed,b+snowBallSpeed,\
        //                             throwStrength)
        // greenPlayerAI();
        // checkGreen();
        // checkRed();
    // }
    redrawAll();
}
///////////////

function init() {  //stores initial values
    initImages();
    initAudios();
}

window.onload = function () {
	init();
	delay = 5;
    // drawBackGround();
    // setInterval(timerFired(), delay);
	setInterval(timerFired, delay);
    document.addEventListener('keypress', keyPressed);
};


