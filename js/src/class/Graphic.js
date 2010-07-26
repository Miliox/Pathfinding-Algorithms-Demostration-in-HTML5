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
}
Graphic.prototype.render = function (graph, origem, destino) {
	this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
	this.linesX = graph.getWidth() - 2;
	this.linesY = graph.getHeight() - 2;
	this.tileX = this.canvas.width / this.linesX;
	this.tileY = this.canvas.height / this.linesY;
	var line,col;
	for(line = 0; line < graph.getHeight() - 1; line++){
		for(col = 0; col < graph.getWidth() - 1; col++){
			this.drawBox(col, line, graph.grid[line+1][col+1].cor);
		}
	}
	this.drawBox(origem.x - 1, origem.y - 1, "rgba(255,0,0,0.5)");
	this.drawBox(destino.x - 1, destino.y - 1, "rgba(0,0,255,0.5)");
	//desenha arvore de busca
	var parent, node;
	this.context.save();
	this.context.beginPath();
	for(line = 0; line < graph.getHeight() - 1; line++){
		for(col = 0; col < graph.getWidth() - 1; col++){
			node = graph.getNodeContent(col+1,line+1);
			if(node.visited === true){
				parent = node.parent;
				this.drawLine(col, line, parent.x-1, parent.y-1);
				if(node.closed === false){
					this.drawPoint(col, line);
				}
			}
		}
	}
	this.context.strokeStyle = "brown";
	this.context.lineWidth = 1.5;
	this.context.stroke();
	this.context.beginPath();
	this.context.restore();
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
Graphic.prototype.drawLine = function (dx, dy, sx, sy){
	dx = this.tileX * dx + this.tileX/2 - 0.5;
	dy = this.tileY * dy + this.tileY/2 - 0.5;
	sx = this.tileX * sx + this.tileX/2 - 0.5;
	sy = this.tileY * sy + this.tileY/2 - 0.5;
	this.context.moveTo(sx,sy);
	this.context.lineTo(dx,dy);
};
Graphic.prototype.drawPoint = function (x, y){
	x = this.tileX * x + this.tileX/2 - 0.5;
	y = this.tileY * y + this.tileY/2 - 0.5;
	this.context.arc(x,y, 1.5, 0, 2*Math.PI, true);
};
Graphic.prototype.drawBox = function (x, y, color){
	this.context.save();
	this.context.fillStyle = color;
	this.context.fillRect(this.tileX * x, this.tileY * y, this.tileX, this.tileY);
	this.context.restore();
};
