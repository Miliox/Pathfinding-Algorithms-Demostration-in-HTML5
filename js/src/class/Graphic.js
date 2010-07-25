/*
 * Demostrador de Algoritmos de Pathfinding:
 *	Autor & Bolsista: Emiliano Carlos de Moraes Firmino
 *	Orientador: Jucimar Maia Júnior
 *	Projeto: Desenvolvimento de Interface Web Interativa em HTML5 e CSS3 para jogos de computador online multiusuários massivos.
 *	Programa de Apoio a Iniciação Científica - PAIC
 *
 * */

function Graphic(canvas, linesX, linesY){
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.linesX = linesX - 2;
	this.linesY = linesY - 2;
	this.tileX = this.canvas.width / this.linesX;
	this.tileY = this.canvas.height / this.linesY;
}
Graphic.prototype.render = function (graph, origem, destino) {
	this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
	for(var line = 0; line < graph.grid.length - 1; line++){
		for(var col = 0; col < graph.grid[line].length - 1; col++){
			this.drawBox(col, line, graph.grid[line+1][col+1].cor);
			this.drawText(col, line, graph.grid[line+1][col+1].text);
		}
	}
	this.drawBox(origem.x - 1, origem.y - 1, "rgba(255,0,0,0.5)");
	this.drawBox(destino.x - 1, destino.y - 1, "rgba(0,0,255,0.5)");
	this.drawGridLines();
};
Graphic.prototype.drawGridLines = function () {
	this.context.beginPath();
	var line;
	for(line = 0; line < this.linesY; line++){
		this.context.moveTo(0, line * this.tileY - 0.5);
		this.context.lineTo(this.canvas.width ,line * this.tileY - 0.5);
	}
	for(var col = 0; col < this.linesX; col++){
		this.context.moveTo(col * this.tileX - 0.5, 0);
		this.context.lineTo(col * this.tileX - 0.5, this.canvas.height);
	}
	this.context.save();
	this.context.strokeStyle = "#555";
	this.context.stroke();
	this.context.beginPath();
	this.context.restore();
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