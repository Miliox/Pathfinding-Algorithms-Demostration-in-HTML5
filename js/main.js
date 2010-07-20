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

var graph;
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
