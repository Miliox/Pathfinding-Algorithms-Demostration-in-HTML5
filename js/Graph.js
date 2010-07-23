function Graph(gameGrid){
	this.grid = new Array(gameGrid.length);
	var node;
	for(var j =0; j < gameGrid.length; j++){
		this.grid[j] = new Array(gameGrid[j].length);
		for(var i = 0;i < gameGrid[j].length; i++){
			switch(gameGrid[j][i]){
				case 3:
					node = this.createNode(8, false, "#888888", "");
					break;
				case 2:
					node = this.createNode(4, false, "#BBBBBB", "");
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
	return {
		terrain : _custo,
		custo : 0,
		estimado : 0,
		blocked : _blocked,
		visited : false,
		parent: null,
		closed : false,
		cor : _cor,
		text : _text
	};
}
Graph.prototype.getNodeContent = function (pos) {
	return this.grid[pos.y][pos.x];
};
