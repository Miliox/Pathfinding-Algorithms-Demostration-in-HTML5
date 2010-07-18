function Grid(width, height){
	//dimensoes
	this.width = width;
	this.height = height;

	this.grid = new Array(height);
	for (var i = 0; i < grid.length; i++){
		grid[i] = new Array(width);
		for(var j = 0; j < grid[i].length; j++){
			grid[i][j] = 0;
		}
	}
}
