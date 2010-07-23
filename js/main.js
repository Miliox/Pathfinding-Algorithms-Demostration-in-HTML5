/*
 * Demostrador de Algoritmos de Pathfinding:
 *	Autor & Bolsista: Emiliano Carlos de Moraes Firmino
 *	Orientador: Jucimar Maia Júnior
 *	Projeto: Desenvolvimento de Interface Web Interativa em HTML5 e CSS3 para jogos de computador online multiusuários massivos.
 *	Programa de Apoio a Iniciação Científica - PAIC
 *
 * */

//Variaveis Globais
var graph;
var graphic;
var eightEdges = true;
var mapa;
var origem;
var destino;

//Aplicação
var application = {
	getOption : function (name) {
		var choices = document.getElementById("choice")[name];
		for(var i = 0; i< choices.length; i++){
			if(choices[i].checked){ break; }
		}
		return choices[i].value;
	},
	setTypeMap : function () {
		var name_map = this.getOption("mapa");
		switch(name_map){
			case "maze":
				mapa = dirtmapa;
				origem = {x: 29, y: 19};
				destino = {x: 1, y:30};
				break;
			case "blockmap1":
				mapa = cmapa;
				origem = {x: 3, y: 15};
				destino = {x: 21, y: 15};
				break;
			case "blockmap2":
				mapa = cmapa;
				destino = {x: 3, y: 28};
				origem = {x: 21, y: 15};
				break;
			case "open":
			default :
				mapa = cleanmapa;
				origem = {x : 20, y: 16};
				destino = {x : 1, y: 1};
		}
	},
	generateStatistic : function(){
		var statistic = {};
		statistic.tiles = 0;
		statistic.tilesClosed = 0;
		statistic.tilesVisited = 0;
		statistic.tilesOpen = 0;
		var node;
		var i, j;
		for (j = 1; j < graph.grid.length - 1; j++){
			for (i = 1; i < graph.grid[j].length - 1; i++){
				node = graph.grid[j][i];
				if(node.blocked === false){
					statistic.tiles++;
					if(node.visited === true) {
						statistic.tilesVisited++;
						if(node.closed === false){
							statistic.tilesOpen++;
						}
						else{
							statistic.tilesClosed++;
						}
					}
				}
			}
		}
		return statistic;
	},
	clearPathFinding : function (){
		this.setTypeMap();
		graph = new Graph(mapa);
		graphic.render();
		var textBox = document.getElementById("estatistica");
		textBox.style.border = "";
		textBox.style.padding = "0px";
		textBox.textContent = "";
	},
	runPathFinding : function (){
		this.setTypeMap();
		graph = new Graph(mapa);
		var game;
		var admissible = function (tipo){
			switch (tipo){
				case "sim":
					return true;
				case "nao":
				default:
					return false;	
			}
		}(this.getOption("admissible"));
		switch (this.getOption("algorithm")) {
			case "astar_dd":
				if(admissible){
					game = new aStarDiagonalDistanceSearchPath(graph);
					break
				}
				game = new aStarDiagonalDistanceISearchPath(graph);
				break;
			case "astar_md":
				if(admissible){
					game = new aStarManhattanDistanceSearchPath(graph);
					break;
				}
				game = new aStarManhattanDistanceISearchPath(graph);
				break;
			case "astar_ed":
				if(admissible){
					game = new aStarEuclideanDistanceSearchPath(graph);
					break;
				}
				game = new aStarEuclideanDistanceISearchPath(graph);
				break;
			case "bfs":
				game = new BreadthFirstSearchPath(graph);
				break;
			case "ucs":
				if(admissible){
					game = new UniformCostSearchPath(graph);
					break;				
				}
				game = new UniformCostSearchIPath(graph);
				break;
			case "bestfs":
				if(admissible){
					game = new bestFirstSearchPath(graph);
					break;
				}
				game = new bestFirstISearchPath(graph);
				break;
			default:
				game = new aStarSearchPath(graph);
		}
		switch(this.getOption("grid_connected")){
			case "4":
				eightEdges = false;
				break;
			case "8":
			default :
				eightEdges = true;
		}
		game.searchPath(origem, destino);
		graph.grid[origem.y][origem.x].text = "";
		graphic.render();
		var dados = this.generateStatistic();
		var visited = ((dados.tilesVisited / dados.tiles)*100).toFixed(2);
		var notVisited = (((dados.tiles - dados.tilesVisited) / dados.tiles)*100).toFixed(2);
		var opened = ((dados.tilesOpen / dados.tiles)*100).toFixed(2);
		var closed = ((dados.tilesClosed / dados.tiles)*100).toFixed(2)
		var total = (graph.grid[destino.y][destino.x].custo);

		total = function(n){
			if(n <= 0){ return "???"; }
			return n.toFixed(3);
		}(total);
		var textBox = document.getElementById("estatistica");
		textBox.textContent  = "Estatística:\n";
		textBox.textContent += "Total de Nós: \t" + dados.tiles +"\n";
		textBox.textContent += "Nós Visitados: \t" + dados.tilesVisited;
		textBox.textContent += " \t(" +  visited + "%)" + "\n";
		textBox.textContent += "Não visitados: \t" + (dados.tiles - dados.tilesVisited);
		textBox.textContent += " \t(" + notVisited + "%)" + "\n";
		textBox.textContent += "Nós Abertos: \t" + dados.tilesOpen;
		textBox.textContent += " \t(" + opened + "%)" + "\n";
		textBox.textContent += "Nós Fechados: \t" + dados.tilesClosed;
		textBox.textContent += " \t(" + closed + "%)" + "\n";
		textBox.textContent += "Custo Total: \t" + total;

		textBox.style.border = "1px dashed black";
		textBox.style.padding = "10px";
	},
};

function init(){
	var botao = document.getElementById("run");
	botao.onclick = function (){ application.runPathFinding(); };
	var botao = document.getElementById("clear");
	botao.onclick = function (){ application.clearPathFinding(); };
	application.setTypeMap();
	graphic = new Graphic(document.getElementById("grid"),mapa[0].length,mapa.length);
	application.clearPathFinding();
	delete init;
}


window.onload = init;
