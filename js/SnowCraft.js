function setBackGround() {
	var width = 500;
	var height = 500;

	var canvas = document.getElementById('testCanvas');
	canvas.width = width;
	canvas.height = height;

	ctx = canvas.getContext("2d");

	var background = new Image();
	// background.width = width;
	// background.height = height;
	background.src = "./files/SnowCraft/background.png";

	ctx = canvas.getContext("2d");

	background.onload = function(){
	    ctx.drawImage(background, 0,0, width, height);   
	}
}
