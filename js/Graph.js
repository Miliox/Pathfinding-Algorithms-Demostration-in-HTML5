function Graph(gameGrid){
	this.grid = new Array(gameGrid.length);
	var node;
	for(var j =0; j < gameGrid.length; j++){
		this.grid[j] = new Array(gameGrid[j].length);
		for(var i = 0;i < gameGrid[j].length; i++){
			switch(gameGrid[j][i]){
				case 2:
					node = this.createNode(3, false, "#BBBBBB", "");
					break;
				case 1:
					node = this.createNode(2, false, "#DDDDDD", "");
					break;
				case 0:
					node = this.createNode(1, false, "white", "");
					break;
				case -1:
					node = this.createNode( -1, true, "black", "");
					break;
			}
			this.grid[j][i] = node;
		}
		
	}
}
Graph.prototype.createNode = function(_custo, _blocked, _cor, _text) {
	return {custo : _custo,block : _blocked, cor : _cor, text : _text};
}
