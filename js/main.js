var mapa = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
var origem = {x: 10, y: 7};
var destino = {x: 5, y:3};
function getChoice(){
	var choices = document.getElementById("choice").algorithm;
	for(var i = 0; i< choices.length; i++){
		if(choices[i].checked){ break; }
	}
	return choices[i].value;
}

function runPathFinding(){
	var option = getChoice();
	graphic.render();
	graphic.drawPoint(origem.x, origem.y, "O");
	graphic.drawPoint(destino.x, destino.y, "X");
}
function Graphic(canvas, linesX, linesY){
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.linesX = linesX;
	this.linesY = linesY;
	this.tileX = this.canvas.width / linesX;
	this.tileY = this.canvas.height / linesY;
}
Graphic.prototype.render = function () {
	this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
	this.drawGridLines();
};
Graphic.prototype.drawGridLines = function () {

	this.context.beginPath();
	for(var line = 0; line < this.linesY; line++){
		this.context.moveTo(0, line * this.tileY - 0.5);
		this.context.lineTo(this.canvas.width ,line * this.tileY - 0.5);
	}
	for(var line = 0; line < this.linesX; line++){
		this.context.moveTo(line * this.tileX - 0.5, 0);
		this.context.lineTo(line * this.tileX - 0.5, this.canvas.height);
	}
	this.context.stroke();
}
Graphic.prototype.drawPoint = function (x, y, text){
	this.context.save();
	this.context.font = "24pt Arial";
	this.context.textAlign ="center";
	this.context.textBaseline = "middle";
	this.context.fillText(text, this.tileX * x + this.tileX/2, this.tileY * y + this.tileY/2);
	this.context.restore();
}
var graphic;

function init(){
	var botao = document.getElementById("run");
	botao.onclick = runPathFinding;
	graphic = new Graphic(document.getElementById("grid"),mapa[0].length,mapa.length);
	graphic.render();
	delete init;
}


window.onload = init;
