var origem = {x: 10, y: 7};
var destino = {x: 5, y:3};
var mapa = [
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];
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
	var cor;
	for(var i = 0; i < graph.grid.length; i++){
		for(var j = 0; j < graph.grid[i].length; j++){
			graphic.drawBox(j, i, graph.grid[i][j].cor);
		}
	}
	graphic.drawBox(origem.x, origem.y, "rgba(255,0,0,0.5)");
	graphic.drawBox(destino.x, destino.y, "rgba(0,0,255,0.5)");
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
};
Graphic.prototype.drawPoint = function (x, y, text){
	this.context.save();
	this.context.font = "24pt Arial";
	this.context.textAlign ="center";
	this.context.textBaseline = "middle";
	this.context.fillText(text, this.tileX * x + this.tileX/2, this.tileY * y + this.tileY/2);
	this.context.restore();
};
Graphic.prototype.drawBox = function (x, y, color){
	this.context.save();
	this.context.fillStyle = color;
	this.context.fillRect(this.tileX * x, this.tileY * y, this.tileX, this.tileY);
	this.context.restore();
};
var graph;
function Graph(gameGrid){
	this.grid = new Array(gameGrid.length);
	for(var j =0; j < gameGrid.length; j++){
		this.grid[j] = new Array(gameGrid[j].length);
		for(var i = 0;i < gameGrid[j].length; i++){
			switch(gameGrid[j][i]){
				case 2:
					this.grid[j][i] = {custo : 3, block : false, cor : "#BBBBBB"};
					break;
				case 1:
					this.grid[j][i] = {custo : 2, block : false, cor : "#DDDDDD"};
					break;
				case 0:
					this.grid[j][i] = {custo : 1, block : false, cor : "white"};
					break;
				case -1:
					this.grid[j][i] = {custo : -1,block : true, cor : "black"}
					break;
			}
		}
	}
}
var graphic;

function init(){
	var botao = document.getElementById("run");
	botao.onclick = runPathFinding;
	graphic = new Graphic(document.getElementById("grid"),mapa[0].length,mapa.length);
	graph = new Graph(mapa);
	graphic.render();
	delete init;
}


window.onload = init;
