
const canvas = document.getElementById("ballsCanvas");
const ballsContext = canvas.getContext("2d");

const blobCount = 20;
const colors = new Array("red","orange","yellow","green","purple","white","pink");

let blobs = new Array();

class Blob {
  constructor (color , size, givenCanvas, givenContext){
    this.context = givenContext;
    this.canvas = givenCanvas;
    this.x = Math.random()*canvas.width;
    this.y = Math.random() * canvas.height;
    this.color = color;
    this.size = size;
    this.xChange = Math.random();
    this.yChange = Math.random();
  }

  move(){
    if (this.x >= canvas.width-this.size || this.x <= this.size){
      this.xChange *= -1;
    }

    else if (this.y >= canvas.height-this.size || this.y <= this.size){
      this.yChange *= -1;
    }

    this.x += this.xChange;
    this.y += this.yChange;
  }

  draw(){
    this.context.beginPath();
    this.context.arc(this.x,this.y,this.size,0,2*Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.stroke();
  }
}

function randomChoice(array){
  return array[Math.floor(Math.random()*array.length)];
}

for (let i=0; i<blobCount ; i++){
  blobs.push(new Blob(randomChoice(colors),25, canvas, ballsContext));
}

function canvasDraw(){
  ballsContext.clearRect(0,0,canvas.width,canvas.height);
  blobs.forEach(function (obj){
    obj.draw();
    obj.move();
  })
}

setInterval(canvasDraw,15);

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }    
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

const gameCanvas = document.getElementById("gameCanvas");
const gameContext = gameCanvas.getContext("2d")
let change = 4;

class Rect {
  constructor (givenCanvas , givenContext, givenWidth, givenHeight, givenColor, givenChange){
    this.context = givenContext;
    this.canvas = givenCanvas;
    this.x = gameCanvas.width-Math.floor(Math.random() * 50);
    this.y = gameCanvas.height-(Math.floor(Math.random() *100)+100);
    this.width = givenWidth;
    this.height = givenHeight+100;
    this.change = givenChange;
    this.color = givenColor;
  }

  move(){
    this.x -= this.change;
  }

  draw(){
    gameContext.beginPath();
    gameContext.rect(this.x,this.y,this.width, this.height);
    gameContext.fillStyle = this.color;
    gameContext.fill();
    gameContext.stroke();
  }
} 

window.addEventListener("keydown",keyPressed,false);
document.getElementById("gameCanvas").addEventListener("ontouchstart",touchEvent);
ballYCoord = 475;
ballXCoord = 150;
move = 10;
var myInterval;
var score = 0;
var highestScore=0;

function gameCanvasDraw(){
  gameContext.clearRect(0,0,gameCanvas.width,gameCanvas.height);
  rect.draw();
  rect.move();
  title();
  drawCircle(ballYCoord,ballXCoord);
  if (rect.x <  -rect.width){
    createRect();
    score += 100;
  }
  if ((rect.x-(ballXCoord+25)<=0) && (rect.x-(ballXCoord+25)>-25) && (rect.y<ballYCoord)){
    clearInterval(game);
  }
  if (score > highestScore){
    highestScore=score;
  }
}

function createRect(){
  rect = new Rect(gameCanvas, gameContext,Math.random()*70,Math.random()*200,randomChoice(colors),change), 10000;
}
setInterval(changeSpeed , 4500);
createRect();

function changeSpeed(){
  change +=1.5;
}

function keyPressed(key){
  if ((key.keyCode == "13") && ballYCoord == 475){
     myInterval = setInterval(moveCircle,10);
  }
}
function touchEvent(){
  myInterval = setInterval(moveCircle,10);
  alert("hello");
}
function stop(){
  clearInterval(myInterval);
}

function drawCircle(yCoord,xCoord){
  gameContext.beginPath();
  gameContext.arc(xCoord,yCoord,25,0,2*Math.PI);
  gameContext.fillStyle = "red";
  gameContext.fill();
  gameContext.stroke();
}

var collision = false;
function moveCircle(){
  if( ballYCoord > 85 && collision ==false){
    ballYCoord -= move;
  }
  else if(ballYCoord >= 85 && ballYCoord < gameCanvas.height-25){
    ballYCoord += move;
    collision = true;
  }
  else if (ballYCoord == 475){
    collision = false;
    stop();
  }
}

function title(){
  gameContext.font = "30px Comic Sans MS";
  gameContext.fillStyle = "white";
  gameContext.textAlign = "center";
  gameContext.fillText("Highest Score "+highestScore.toString(), 500, 100);
  gameContext.fillText("Score: "+score.toString(), 800, 100);
  gameContext.fillText("Press Enter", 150, 100);
}

var game = setInterval(gameCanvasDraw,15);

var array = ["Project 1","Project 2","Project 3","Project 4","Project 5"];
var projects = ["project1.jpg", "project2.png", "project3.jpg","project4.jpg","project5.png"];
var index = 0;
document.getElementById("h1").innerHTML=array[0];


function projectForward(){
  index +=1;
  if (index == 5){
    index =0;
  }
  document.getElementById("projectImage").src="images/"+projects[index].toString();
  document.getElementById("h1").innerHTML=array[index]
}

function projectBackward(){
  index -=1;
  if (index == -1){
    index =4;
  }
  document.getElementById("projectImage").src="images/"+projects[index].toString();
  document.getElementById("h1").innerHTML=array[index];
}

















