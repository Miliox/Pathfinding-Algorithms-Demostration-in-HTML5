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
function clearPathFinding(){
	graph = new Graph(mapa);
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
			graphic.drawText(j, i, graph.grid[i][j].text);
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
Graphic.prototype.drawText = function (x, y, text){
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
					this.grid[j][i] = {custo : 3, block : false, cor : "#BBBBBB", text : ""};
					break;
				case 1:
					this.grid[j][i] = {custo : 2, block : false, cor : "#DDDDDD", text : ""};
					break;
				case 0:
					this.grid[j][i] = {custo : 1, block : false, cor : "white", text : ""};
					break;
				case -1:
					this.grid[j][i] = {custo : -1,block : true, cor : "black", text : ""}
					break;
			}
		}
	}
}
var graphic;
function aStarPathFind(originInLimitedMap, destinyInLimitedMap, limitedMap){
	//funcoes
	var estimatedCost = function (nodeStart, nodeEnd) {
		var dx = nodeStart.x - nodeEnd.x;
		var dy = nodeStart.y - nodeEnd.y;

		var d = Math.abs(dx) + Math.abs(dy);
		return d;
	};
	var insertNodeInPQ = function (priorQueue, limitedMap, nodeToInsertPos) {
		var nodePos, nodeContent;
		var nodeToInsertContent = limitedMap.getCell(nodeToInsertPos);
		var nodeToInsertTotal = nodeToInsertContent.custo + nodeToInsertContent.estimado;
		if(priorQueue.length === 0){
			priorQueue.unshift(nodeToInsertPos);
			return;
		}
		else{
			for(var i = 0; i < priorQueue.length; i++){
				nodePos = priorQueue[i];
				nodeContent = limitedMap.getCell(nodePos);
				if(nodeContent.custo + nodeContent.estimado > nodeToInsertTotal){
					priorQueue.splice(i,0,nodeToInsertPos);
					return;
				}
			}
			priorQueue.push(nodeToInsertPos);
			return;
		}
	};
	//direcoes
	var vec_unit =	[
			{x : 0, y : -1},
			{x : 1, y : 0},
			{x : 0, y : 1},
			{x : -1, y : -1},
			];

	var nodeToEvaluate;
	var nodeToEvaluateContent;
	var nodeInLimitedMap;
	var nodesPriorityQueue = [];

	nodesPriorityQueue.push(originInLimitedMap);
	while(nodesPriorityQueue.length > 0){
		nodeToEvaluate = nodesPriorityQueue.shift();
		nodeToEvaluateContent = limitedMap[nodeToEvaluate.y][nodeToEvaluate.x];
		for(var direcao = 0; direcao < vec_unit.length; direcao++){
			nodeInLimitedMap = {x: nodeToEvaluate.x + vec_unit[direcao].x, y: nodeToEvaluate.x + vec_unit[direcao].y};
			switch(limitednodeInLimitedMap){
				case 0://destino
					limitedMap.setCell(nodeInLimitedMap,
						createNodeContent(direcao, nodeToEvaluate, nodeToEvaluateContent.custo+1,
								estimatedCost(nodeInLimitedMap, destinyInLimitedMap)));
					insertNodeInPQ(nodesPriorityQueue,limitedMap,nodeInLimitedMap);
					for(var i = 0; i < 70; i++){
						this.path.unshift((limitedMap.getCell(nodeInLimitedMap)).sentido);
						nodeInLimitedMap = (limitedMap.getCell(nodeInLimitedMap)).origem;
						if(nodeInLimitedMap.equals(originInLimitedMap)){ return; }
					}
					return;
				case 1://nao visitado
					limitedMap.setCell(nodeInLimitedMap,
						createNodeContent(direcao, nodeToEvaluate, nodeToEvaluateContent.custo+1,
							estimatedCost(nodeInLimitedMap, destinyInLimitedMap)));
					insertNodeInPQ(nodesPriorityQueue,limitedMap,nodeInLimitedMap);
					break;
				case 2://visitado
					break;
				case 3://invalido
					limitedMap.setWallCell(nodeInLimitedMap);
					break;
			}
		}
	}

};

function init(){
	var botao = document.getElementById("run");
	botao.onclick = runPathFinding;
	var botao = document.getElementById("clear");
	botao.onclick = clearPathFinding;
	graphic = new Graphic(document.getElementById("grid"),mapa[0].length,mapa.length);
	graph = new Graph(mapa);
	graphic.render();
	delete init;
}


window.onload = init;
