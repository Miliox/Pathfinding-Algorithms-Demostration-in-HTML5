var origem = {x: 10, y: 7};
var destino = {x: 5, y:3};
var graph;
var graphic;
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
/*
	graph.grid[origem.y][origem.x].text = "Start";
	graph.grid[destino.y][destino.x].text = "End";
*/
	var game;
	switch (option) { 
		case "astar_dd":		
			game = new aStarSearchPath(graph);
			break;
		default:
			game = new aStarSearchPath(graph);
	}
	game.searchPath(origem, destino);
	graph.grid[origem.y][origem.x].text = "";
	graphic.render();
}
function clearPathFinding(){
	graph = new Graph(mapa);
	graphic.render();
}
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
