var width = 1000;
var height = 500;

var canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

ctx = canvas.getContext("2d");

var canvasData = {
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
	}
}

function initImages() { //stores the images in dictionary
    canvasData.images = {};
    var background = new Image();
    background.src = "./files/SnowCraft/background.png";
    background.onload = function () {
    	ctx.drawImage(background, 0, 0, width, height);
    }
    canvasData.images[background] = background;
    var rStand = new Image();
    rStand.src = "./files/SnowCraft/rstand.gif";
    canvasData.images[rStand] = rStand;
    var gStand = new Image();
    gStand.src = "./files/SnowCraft/gstand.gif";
    canvasData.images[gStand] = gStand;
    var rDead = new Image();
    rDead.src = "./files/SnowCraft/rdead.gif";
    canvasData.images[rDead] = rDead;
    var gDead = new Image();
    gDead.src = "./files/SnowCraft/gdead.gif";
    canvasData.images[gDead] = gDead;
    var rSelected = new Image();
    rSelected.src = "./files/SnowCraft/rselected.gif";
  	canvasData.images[rSelected] = rSelected;
  	var gThrow = new Image();
  	gThrow.src = "./files/SnowCraft/gthrow.gif";
  	canvasData.images[gThrow] = gThrow;
  	var gHit = new Image();
  	gHit.src = "./files/SnowCraft/ghit.gif";
  	canvasData.images[gHit] = gHit;
  	var rPlayerHit = new Image();
  	rPlayerHit.src = "./files/SnowCraft/rplayerhit.gif";
  	canvasData.images[rPlayerHit] = rPlayerHit;
  	var gBrushOne = new Image();
  	gBrushOne.src = "./files/SnowCraft/gbrushone.gif";
  	canvasData.images[gBrushOne] = gBrushOne;
  	var gBrushTwo = new Image();
  	gBrushTwo.src = "./files/SnowCraft/gbrushtwo.gif";
  	canvasData.images[gBrushTwo] = gBrushTwo;
  	var snowSplash = new Image();
  	snowSplash.src = "./files/SnowCraft/snowsplash.gif";
  	canvasData.images[snowSplash] = snowSplash;
}

function initSound() {
	canvasData.sound = {};
    var dead = new Audio("./files/SnowCraft/dead.wav");
    var greenHit = new Audio("./files/SnowCraft/greenHit.wav");
    var greenThrow = new Audio("./files/SnowCraft/greenThrow.wav");
    var redHit = new Audio("./files/SnowCraft/redHit.wav");
    var redThrow = new Audio("./files/SnowCraft/redThrow.wav");
    var footstep = new Audio("./files/SnowCraft/footstep.wav");
    var newLevel = new Audio("./files/SnowCraft/newLevel.wav");
    canvasData.sound["footstep"] = footstep;
    canvasData.sound["dead"]= dead;
    canvasData.sound["greenHit"] = greenHit;
    canvasData.sound["greenThrow"] = greenThrow;
    canvasData.sound["redHit"] = redHit;
    canvasData.sound["redThrow"] = redThrow;
    canvasData.sound["newLevel"] = newLevel;
}

function enterPressed() {
	canvasData.sound["newLevel"].play();
}

function keyPressed(e) {
    if (e.key == "Enter") {
        enterPressed();
    }                                  
}


function init() {  //stores initial values
    initImages();
    initSound();
}

window.addEventListener('load', function () {
	init();
	document.addEventListener('keypress', keyPressed);
});


