/*
 * Demostrador de Algoritmos de Pathfinding:
 *	Autor & Bolsista: Emiliano Carlos de Moraes Firmino
 *	Orientador: Jucimar Maia Júnior
 *	Projeto: Desenvolvimento de Interface Web Interativa em HTML5 e CSS3 para jogos de computador online multiusuários massivos.
 *	Programa de Apoio a Iniciação Científica - PAIC
 *
 * */

function Graph(gameGrid){
	this.grid = new Array(gameGrid.length);
	var node;
	for(var j =0; j < gameGrid.length; j++){
		this.grid[j] = new Array(gameGrid[j].length);
		for(var i = 0;i < gameGrid[j].length; i++){
			switch(gameGrid[j][i]){
				case 3:
					node = this.createNode(8, false, "#888888");
					break;
				case 2:
					node = this.createNode(4, false, "#BBBBBB");
					break;
				case 1:
					node = this.createNode(2, false, "#DDDDDD");
					break;
				case 0:
					node = this.createNode(1, false, "white");
					break;
				case -1:
					node = this.createNode( -1, true, "black");
					break;
			}
			this.grid[j][i] = node;
		}
	}
}
Graph.prototype.createNode = function(_terrain, _blocked, _cor) {
	return {
		blocked : _blocked,
		closed : false,
		cor : _cor,
		custo : 0,
		estimado : 0,
		parent: null,
		terrain : _terrain,
		visited : false
	};
};
Graph.prototype.getNodeContent = function (pos, y) {
	if(arguments.length === 1){
		return this.grid[pos.y][pos.x];
	} else if (arguments.length === 2){
		return this.grid[y][pos];
	}
};
Graph.prototype.getWidth = function(){
	return this.grid[0].length;
};
Graph.prototype.getHeight = function(){
	return this.grid.length;
};
