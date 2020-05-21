var canvas, ctx;
var player;
var fishes;
var time;
var pause = false;
var requestId;

function initialize(){
	document.getElementById("pauseButton").style.display = "inline-block";
	document.getElementById("resetButton").style.display = "none";
	document.getElementById("startButton").style.display = "none";
	time = 0;
	player = new Object();
	fishes = [];
	var circle1 = new Object();
	circle1.x = 700;
	var yaxis = Math.random() * 500;
	circle1.y = yaxis;
	var radius = (Math.random() * 10)+5;
	circle1.radius = radius;
	circle1.speed = .5;
	fishes.push(circle1);
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	player.x = 50;
	player.y = 250;
	player.radius = 5;
	ctx.beginPath();
	ctx.arc(player.x,player.y,player.radius,0,2*Math.PI);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
	gameLoop();
}

function playGame(){
	pause = false;
	document.getElementById("playButton").style.display = "none";
	console.log("playing again");
}

function pauseGame(){
	pause = true;
	document.getElementById("playButton").style.display = "inline-block";
	console.log("paused the game");
}

function checkCollision(){
	var len = fishes.length;
	for(var q = 0; q < len; q++){
		if(Math.sqrt((Math.pow((player.x - fishes[q].x), 2) + Math.pow((player.y - fishes[q].y), 2))) < Math.abs(player.radius+fishes[q].radius)){
			if(player.radius >= fishes[q].radius){
				player.radius += fishes[q].radius/8;
				fishes.splice(q, 1);
				len -= 1;
				console.log("ATE THE FISH");
			}
			else{
				endGame();
				console.log("YOU GOT EATEN");
			}
		}
	}
}

function updatePlayer(z, q){
	player.x += z;
	player.y += q;
}

 
function draw(){
	ctx.beginPath();
	ctx.arc(player.x,player.y,player.radius,0,2*Math.PI);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
	checkCollision();
}

function drawFish(){
	for(var z = 0; z < fishes.length; z++){
		ctx.beginPath();
		ctx.arc(fishes[z].x,fishes[z].y,fishes[z].radius,0,2*Math.PI);
		ctx.fillStyle = "#FF0000";
		ctx.fill();
		ctx.closePath();
	}
}

function updateFish(){
	var len = fishes.length;
	for(var i = 0; i < len; i++){
		if(fishes[i].x < 0){
			fishes.splice(i, 1);
			len -= 1;
			console.log("KILLED THE FISH");
		}
		else{
			console.log("Before" + fishes[i].x);
			fishes[i].x -=fishes[i].speed;
			console.log("Aftere" + fishes[i].x);
		}
	}
	drawFish();
}

function createNewFish(){
	var randomNumber = Math.floor((Math.random() * 100));;
	var yaxis = Math.random() * 500;
	var radius = (Math.random() * (player.radius+10));
	var circle = new Object();
	circle.speed = ((Math.random()+.3) * player.radius/8);
	circle.radius = radius;
	circle.x = 700;
	circle.y = yaxis;
	fishes.push(circle);
}

function update(){
	time += 1;
	var newFish = Math.round(Math.random());
	if((time%100 == 0) && (newFish == 0)){
		createNewFish();
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	updateFish();
	draw();
}

function gameLoop(){
	requestId = window.requestAnimationFrame(gameLoop);
	if(pause == false){
		update();
	}
}

function endGame(){
	window.cancelAnimationFrame(requestId);
	document.getElementById("resetButton").style.display = "inline-block";
	console.log("You lose");
}

document.onkeydown = function() {
	switch (window.event.keyCode) {
		case 37:
			updatePlayer(-5, 0);
			break;
		case 38:
			updatePlayer(0, -5);
			break;
		case 39:
			updatePlayer(5, 0);
			break;
		case 40:
			updatePlayer(0, 5);
			break;
	}
};