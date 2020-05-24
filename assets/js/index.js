var player;
var fishes = [];
var time;
var pause = false;
var requestId;
var playerImg;
var fishCounter;

function initialize(){
	var temp = document.getElementById('container');
	var len = fishes.length;
	if(len > 0){
		for(var i = 0; i < len; i++){
			temp.removeChild(document.getElementById(fishes[i].iD));
			fishes.splice(i, 1);
			if(len - 1 > 0){
				i -= 1;
			}
			len -= 1;
		}
	}
	if(player){
		temp.removeChild(document.getElementById('player'));
	}
	fishCounter = 0;
	document.getElementById("pauseButton").style.display = "inline-block";
	document.getElementById("stopButton").style.display = "inline-block";
	document.getElementById("resetButton").style.display = "none";
	document.getElementById("startButton").style.display = "none";
	time = 0;
	player = new Object();
	fishes = [];
	var fish = new Object();
	fish.x = 700;
	var yaxis = Math.random() * 500;
	fish.y = yaxis;
	var dim = (Math.random() * 10)+5;
	fish.dim = dim;
	fish.speed = .5;
	fish.iD = fishCounter;
	fish.side = 1;
	if(fish.dim <= 20){
		fish.img = 0;
	}
	else if(fish.dim > 20 && fish.dim < 50){
		fish.img = 1;
	}
	else if(fish.dim >= 50 && fish.dim < 100 ){
		fish.img = 2;
	}
	else if(fish.dim >= 100 && fish.dim < 200){
		fish.img = 3;
	}
	else if(fish.dim >= 200 && fish.dim < 300){
		fish.img = 4;
	}
	else if(fish.dim >= 300 && fish.dim < 400){
		fish.img = 5;
	}
	else if(fish.dim >= 400 && fish.dim < 500){
		fish.img = 6;
	}
	else{
		fish.img = 7;
	}
	var fishImg = document.createElement('img');
	fishImg.style.position = "absolute";
	fishImg.style.top = fish.y + 'px';
	fishImg.style.left = fish.x + 'px';
	fishImg.src = 'assets/img/fish'+fish.img+'-b.png';
	fishImg.style.width = fish.dim + 'px';
	fishImg.style.height = fish.dim + 'px';
	fishImg.id = fishCounter + '';
	fish.iD = fishCounter;
	fishCounter += 1;
	fishes.push(fish);
	document.getElementById('container').appendChild(fishImg);
	player.x = 50;
	player.y = 250;
	player.dim = 5;
	player.orientation = 1;
	player.img = 0;
	playerImg = document.createElement('img');
	playerImg.style.position = "absolute";
	playerImg.style.top = player.y + 'px';
	playerImg.style.left = player.x + 'px';
	playerImg.src = 'assets/img/fish'+player.img+'-b.png';
	playerImg.style.width = player.dim + 'px';
	playerImg.style.height = player.dim + 'px';
	playerImg.id = 'player';
	document.getElementById('container').appendChild(playerImg);
	gameLoop();
}

function playGame(){
	pause = false;
	document.getElementById("playButton").style.display = "none";
}

function pauseGame(){
	pause = true;
	document.getElementById("playButton").style.display = "inline-block";
}

function overlap(playLeft, playTop, playRight, playBot, fishLeft, fishTop, fishRight, fishBot){
	if((playTop > fishBot) || (playBot < fishTop)){
		return false;
	}
	if((playRight < fishLeft) || (playLeft > fishRight)){
		return false;
	}
	return true;
}

function checkCollision(){
	var len = fishes.length;
	for(var q = 0; q < len; q++){
		if(overlap(player.x, player.y, player.x + player.dim, player.y + player.dim, fishes[q].x, fishes[q].y, fishes[q].x + fishes[q].dim, fishes[q].y + fishes[q].dim)){
			if(player.dim >= fishes[q].dim - 1){
				player.dim += fishes[q].dim/8;
				var elem = document.getElementById(fishes[q].iD);
				document.getElementById('container').removeChild(elem);
				fishes.splice(q, 1);
				len -= 1;
			}
			else{
				endGame();
			}
		}
	}
}

function updatePlayer(z, q){ 
	player.x += z;
	player.y += q;
	if(player.x > 700){
		player.x = 0;
	}
	if(player.x < 0){
		player.x = 655;
	}
	if(player.y < 0){
		player.y = 495;
	}
	if(player.y > 500){
		player.y = 0;
	}
}

 
function draw(){
	playerImg.style.left = player.x + 'px';
	playerImg.style.top = player.y + 'px';
	playerImg.style.width = player.dim + 'px';
	playerImg.style.height = player.dim + 'px';
	if(player.dim <= 20){
		player.img = 0;
	}
	else if(player.dim > 20 && player.dim < 50){
		player.img = 1;
	}
	else if(player.dim >= 50 && player.dim < 100 ){
		player.img = 2;
	}
	else if(player.dim >= 100 && player.dim < 200){
		player.img = 3;
	}
	else if(player.dim >= 200 && player.dim < 300){
		player.img = 4;
	}
	else if(player.dim >= 300 && player.dim < 400){
		player.img = 5;
	}
	else if(player.dim >= 400 && player.dim < 500){
		player.img = 6;
	}
	else{
		player.img = 7;
	}
	if(player.orientation){
		playerImg.src = 'assets/img/fish'+player.img+'.png';
	}
	else{
		playerImg.src = 'assets/img/fish'+player.img+'-b.png';
	}
	checkCollision();
}

function drawFish(){
	for(var z = 0; z < fishes.length; z++){
		if(fishes[z].dim <= 20){
			fishes[z].img = 0;
		}
		else if(fishes[z].dim > 20 && fishes[z].dim < 50){
			fishes[z].img = 1;
		}
		else if(fishes[z].dim >= 50 && fishes[z].dim < 100 ){
			fishes[z].img = 2;
		}
		else if(fishes[z].dim >= 100 && fishes[z].dim < 200){
			fishes[z].img = 3;
		}
		else if(fishes[z].dim >= 200 && fishes[z].dim < 300){
			fishes[z].img = 4;
		}
		else if(fishes[z].dim >= 300 && fishes[z].dim < 400){
			fishes[z].img = 5;
		}
		else if(fishes[z].dim >= 400 && fishes[z].dim < 500){
			fishes[z].img = 6;
		}
		else{
			fishes[z].img = 7;
		}
		var fish = document.getElementById(fishes[z].iD + '');
		fish.style.left = fishes[z].x + 'px';
		fish.style.top = fishes[z].y + 'px';
		fish.style.width = fishes[z].dim + 'px';
		fish.style.height = fishes[z].dim + 'px';
	}
}

function updateFish(){
	var len = fishes.length;
	for(var i = 0; i < len; i++){
		if((fishes[i].x < 0) || (fishes[i].x > 700)){
			var elem = document.getElementById(fishes[i].iD);
			document.getElementById('container').removeChild(elem);
			fishes.splice(i, 1);
			len -= 1;
		}
		else{
			if(fishes[i].side){
				fishes[i].x -= fishes[i].speed;
			}
			else{
				fishes[i].x += fishes[i].speed;
			}
		}
	}
	drawFish();
}

function createNewFish(side){
	var dim = Math.floor(Math.random() * ((player.dim + 10) - (player.dim - 10) + 1) + (player.dim - 10));
	var fish = new Object();
	fish.speed = ((Math.random()+0.2) * player.dim/8);
	fish.dim = dim;
	fish.side = side;
	var yaxis = Math.random() * 500;
	fish.y = yaxis;
	if(side){
		fish.x = 700;
	}
	else{
		fish.x = 0;
	}
	if(fish.dim <= 20){
		fish.img = 0;
	}
	else if(fish.dim > 20 && fish.dim < 50){
		fish.img = 1;
	}
	else if(fish.dim >= 50 && fish.dim < 100 ){
		fish.img = 2;
	}
	else if(fish.dim >= 100 && fish.dim < 200){
		fish.img = 3;
	}
	else if(fish.dim >= 200 && fish.dim < 300){
		fish.img = 4;
	}
	else if(fish.dim >= 300 && fish.dim < 400){
		fish.img = 5;
	}
	else if(fish.dim >= 400 && fish.dim < 500){
		fish.img = 6;
	}
	else{
		fish.img = 7;
	}
	var fishImg = document.createElement('img');
	fishImg.style.position = "absolute";
	fishImg.style.top = fish.y + 'px';
	fishImg.style.left = fish.x + 'px';
	if(side){
		fishImg.src = 'assets/img/fish'+fish.img+'-b.png';
	}
	else{
		fishImg.src = 'assets/img/fish'+fish.img+'.png';
	}
	fishImg.style.width = fish.dim + 'px';
	fishImg.style.height = fish.dim + 'px';
	fishImg.id = fishCounter + '';
	fish.iD = fishCounter;
	fishCounter += 1;
	fishes.push(fish);
	document.getElementById('container').appendChild(fishImg);
}

function update(){
	time += 1;
	var newFish = Math.round(Math.random());
	if(((time%100 == 5) || (time%100 == 3)) && (newFish == 0)){
		createNewFish(1);
	}
	if(((time%100 == 0) || (time%100 == 8)) && (newFish == 1)){
		createNewFish(0);
	}
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
	document.getElementById("pauseButton").style.display = "none";
}

function stopGame(){
	window.cancelAnimationFrame(requestId);
	var temp = document.getElementById('container');
	if(fishes.length > 0){
		var len = fishes.length;
		for(var i = 0; i <= len; i++){
			temp.removeChild(document.getElementById(fishes[i].iD));
			fishes.splice(i, 1);
			if(len - 1 > 0){
				i -= 1;
			}
			len -= 1;
		}
	}
	if(player){
		temp.removeChild(document.getElementById('player'));
		player = 0;
	}
	document.getElementById("pauseButton").style.display = "none";
	document.getElementById("playButton").style.display = "none";
	document.getElementById("resetButton").style.display = "none";
	document.getElementById("stopButton").style.display = "none";
	document.getElementById("startButton").style.display = "inline-block";
}

document.onkeydown = function() {
	switch (window.event.keyCode) {
		case 37:
			player.orientation = 0;
			updatePlayer(-5, 0);
			break;
		case 38:
			updatePlayer(0, -5);
			break;
		case 39:
			player.orientation = 1;
			updatePlayer(5, 0);
			break;
		case 40:
			updatePlayer(0, 5);
			break;
	}
};