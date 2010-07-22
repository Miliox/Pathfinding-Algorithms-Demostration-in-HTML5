function Graphic(canvas, linesX, linesY){
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.linesX = linesX - 2;
	this.linesY = linesY - 2;
	this.tileX = this.canvas.width / this.linesX;
	this.tileY = this.canvas.height / this.linesY;
}
Graphic.prototype.render = function () {
	this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
	var cor;
	for(var i = 0; i < graph.grid.length - 1; i++){
		for(var j = 0; j < graph.grid[i].length - 1; j++){
			graphic.drawBox(j, i, graph.grid[i+1][j+1].cor);
			graphic.drawText(j, i, graph.grid[i+1][j+1].text);
		}
	}
	graphic.drawBox(origem.x - 1, origem.y - 1, "rgba(255,0,0,0.5)");
	graphic.drawBox(destino.x - 1, destino.y - 1, "rgba(0,0,255,0.5)");
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
	this.context.font = "10pt Georgia";
	this.context.textAlign ="center";
	this.context.textBaseline = "middle";
	this.context.fillText(text, this.tileX * x + this.tileX/2, this.tileY * y + this.tileY/2, this.tileX);
	this.context.restore();
};
Graphic.prototype.drawBox = function (x, y, color){
	this.context.save();
	this.context.fillStyle = color;
	this.context.fillRect(this.tileX * x, this.tileY * y, this.tileX, this.tileY);
	this.context.restore();
};
