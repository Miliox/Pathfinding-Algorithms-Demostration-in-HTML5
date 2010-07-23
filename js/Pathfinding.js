function GenericSearchPath(graph){
	this.searchGraph = graph;
	this.openNodes = [];
}
GenericSearchPath.prototype.searchPath = function (start, end){
	var node, nodeContent,adjNodes, i;
	this.start = start;
	this.end = end;
	this.addOpenNode(start);
	this.setVisitedNode(start, start);
	while(this.openIsNotEmpty()){
		node = this.getOpenNode();
		nodeContent = this.searchGraph.getNodeContent(node);
		nodeContent.closed = true;
		if (node.x == end.x && node.y == end.y) {
			this.backtrackingPath(node);
			return true;
		}
		adjNodes = this.getAdjacentNodes(node);
		for(i = 0; i < adjNodes.length; i++){
			nodeContent = this.searchGraph.getNodeContent(adjNodes[i]);
			if (!nodeContent.blocked){
				if(!nodeContent.visited){
					this.setVisitedNode(adjNodes[i], node);
					this.addOpenNode(adjNodes[i]);
				}
				else if(nodeContent.visited){
					if(nodeContent.closed) {
						this.reviewClosedNode(adjNodes[i],node);
					}
					else {
						this.reviewOpenNode(adjNodes[i], node);
					}
				}
			}
		}
	}
	return false;
};
GenericSearchPath.prototype.addOpenNode = function (node){
	this.openNodes.push(node);
};
GenericSearchPath.prototype.getOpenNode = function (){
	return this.openNodes.shift();
};
GenericSearchPath.prototype.getNodeContent = function (node) {
	return this.searchGraph[node.y][node.x];
};
GenericSearchPath.prototype.setVisitedNode = function (childrenNode, parentNode) {
	var content = this.searchGraph.getNodeContent(childrenNode);
	content.visited = true;
	content.parent = parentNode;
	content.text = this.getArrowSymbol(childrenNode, parentNode);
};
GenericSearchPath.prototype.reviewOpenNode = function(childrenNode, parentNode){
	//Aqui vai a logica de revisao de Nos abertos
};
GenericSearchPath.prototype.reviewClosedNode = function(childrenNode, parentNode){
	//Aqui vai a logica de revisao de Nos Fechados
};
GenericSearchPath.prototype.openIsNotEmpty = function () {
	if (this.openNodes.length === 0) {
		return false;
	}
	return true;
};
GenericSearchPath.prototype.getArrowSymbol = function (childrenNode, parentNode) {
	var deltaX = childrenNode.x - parentNode.x;
	var deltaY = childrenNode.y - parentNode.y;

	if (deltaX == 0 && deltaY < 0){
		return "\u2191";
	}
	else if (deltaX > 0 && deltaY < 0){
		return "\u2197";
	}
	else if (deltaX > 0 && deltaY == 0){
		return "\u2192";
	}
	else if (deltaX > 0 && deltaY > 0){
		return "\u2198";
	}
	else if (deltaX == 0 && deltaY > 0){
		return "\u2193";
	}
	else if (deltaX < 0 && deltaY > 0){
		return "\u2199";
	}
	else if (deltaX < 0 && deltaY == 0){
		return "\u2190";
	}
	else if (deltaX < 0 && deltaY < 0){
		return "\u2196";
	}
	else {
		return "";
	}
};
GenericSearchPath.prototype.getMoveCusto = function (childrenNode, parentNode) {
	var deltaX = childrenNode.x - parentNode.x;
	var deltaY = childrenNode.y - parentNode.y;

	if(deltaX == 0 || deltaY == 0){
		return 1;
	}
	return 1.4142;
};
GenericSearchPath.prototype.getAdjacentNodes = function (node, parent) {
	var N, NE, NW, W, E, S, SW, SE;
	N = {x: node.x + 0, y: node.y - 1};
	NE = {x: node.x + 1, y: node.y - 1};
	NW = {x: node.x - 1, y: node.y - 1};

	W = {x: node.x - 1, y: node.y + 0};
	E = {x: node.x + 1, y: node.y + 0};

	S = {x: node.x + 0, y: node.y + 1};
	SE = {x: node.x + 1, y: node.y + 1};
	SW = {x: node.x - 1, y: node.y + 1};

	if(eightEdges){
		//return [N, NE, E, SE, S, SW, W, NW];
		return [N, E, S, W, NE, SE, SW, NW];
	}
	else{
		return [N, E, S, W];
	}
};
GenericSearchPath.prototype.backtrackingPath = function (childrenNode) {
	var parentNode;
	var oldNode;
	var content;
	do {
		parentNode = this.searchGraph.getNodeContent(childrenNode).parent;
		oldNode = childrenNode;		
		childrenNode = parentNode;
		content = this.searchGraph.getNodeContent(parentNode);
		content.cor = "yellow";
	} while(oldNode.x !== childrenNode.x || oldNode.y !== childrenNode.y);
};
//BFS <- GenericSearchPath
function BreadthFirstSearchPath(graph){
	GenericSearchPath.call(this, graph);
}
BreadthFirstSearchPath.prototype = new GenericSearchPath();
delete BreadthFirstSearchPath.prototype.openNodes;
delete BreadthFirstSearchPath.prototype.searchGraph;

function aStarGenericSearchPath(graph){
	GenericSearchPath.call(this, graph);
}

//aStarGenericSearchPath <- GenericSearchPath
aStarGenericSearchPath.prototype = new GenericSearchPath();
delete aStarGenericSearchPath.prototype.openNodes;
delete aStarGenericSearchPath.prototype.searchGraph;
aStarGenericSearchPath.prototype.addOpenNode = function (nodeInsert) {
	var nodeOpenContent;
	var nodeInsertContent = this.searchGraph.getNodeContent(nodeInsert);
	var total = nodeInsertContent.custo + nodeInsertContent.estimado;
	if(this.openNodes.length === 0){
		this.openNodes.unshift(nodeInsert);
	}
	else{
		for(var i = 0; i < this.openNodes.length; i++){
			nodeOpenContent = this.searchGraph.getNodeContent(this.openNodes[i]);
			if(nodeOpenContent.custo + nodeOpenContent.estimado > total){
				this.openNodes.splice(i,0,nodeInsert);
				return;
			}
		}
		this.openNodes.push(nodeInsert);
	}
};
aStarGenericSearchPath.prototype.setVisitedNode = function (childrenNode, parentNode) {
	GenericSearchPath.prototype.setVisitedNode.call(this, childrenNode, parentNode);
	var contentChildren = this.searchGraph.getNodeContent(childrenNode);
	var contentParent = this.searchGraph.getNodeContent(parentNode);
	contentChildren.estimado = this.getEstimatedValue(childrenNode, parentNode);
	contentChildren.custo = contentParent.terrain*this.getMoveCusto(childrenNode, parentNode) + contentParent.custo;
};
aStarGenericSearchPath.prototype.getEstimatedValue = function (childrenNode, parentNode) {
	return 0;
	//heurística vai aqui!
};
aStarGenericSearchPath.prototype.reviewOpenNode = function(childrenNode, parentNode){
	//Aqui vai a logica de revisao de Nos abertos
	var contentChildren = this.searchGraph.getNodeContent(childrenNode);
	var contentParent = this.searchGraph.getNodeContent(parentNode);
	if(contentParent.parent.x === childrenNode.x && contentParent.parent.y === childrenNode.y){
		return;
	}
	var atualCustoTotal = contentChildren.estimado + contentChildren.custo;
	var novoCustoTotal = contentParent.terrain*this.getMoveCusto(childrenNode, parentNode) + 
		contentParent.custo + this.getEstimatedValue(childrenNode, parentNode);
	if (novoCustoTotal < atualCustoTotal){
		this.setVisitedNode(childrenNode, parentNode);
		
		for(var i = 0;i < this.openNodes.length;i++){
			if(this.openNodes[i].x === childrenNode.x && this.openNodes[i].y === childrenNode.y){
				this.openNodes.splice(i,1);
			}
		}
		this.addOpenNode(childrenNode);
	}
};
aStarGenericSearchPath.prototype.reviewClosedNode = function(childrenNode, parentNode){
	//Aqui vai a logica de revisao de Nos Fechados
	var contentChildren = this.searchGraph.getNodeContent(childrenNode);
	var contentParent = this.searchGraph.getNodeContent(parentNode);
	if(contentParent.parent.x === childrenNode.x && contentParent.parent.y === childrenNode.y){
		return;
	}
	var atualCustoTotal = contentChildren.estimado + contentChildren.custo;
	var novoCustoTotal = contentParent.terrain*this.getMoveCusto(childrenNode, parentNode) + 
		contentParent.custo + this.getEstimatedValue(childrenNode, parentNode);
	if (novoCustoTotal < atualCustoTotal){
		this.setVisitedNode(childrenNode, parentNode);
		this.addOpenNode(childrenNode);
	}
};

//UniformCostSearchPath <-aStarGenericSearchPath <- GenericSearchPath
function UniformCostSearchPath(graph){
	aStarGenericSearchPath.call(this, graph);
}
UniformCostSearchPath.prototype = new aStarGenericSearchPath();
delete UniformCostSearchPath.prototype.openNodes;
delete UniformCostSearchPath.prototype.searchGraph;


//aStarDiagonalDistanceSearchPath <-aStarGenericSearchPath <- GenericSearchPath
function aStarDiagonalDistanceSearchPath(graph){
	aStarGenericSearchPath.call(this, graph);
}
aStarDiagonalDistanceSearchPath.prototype = new aStarGenericSearchPath();
delete aStarDiagonalDistanceSearchPath.prototype.openNodes;
delete aStarDiagonalDistanceSearchPath.prototype.searchGraph;
aStarDiagonalDistanceSearchPath.prototype.getEstimatedValue = function (childrenNode, parentNode) {
	return Math.max(Math.abs(childrenNode.x - this.end.x), Math.abs(childrenNode.y - this.end.y));
};

//aStarManhattanDistanceSearchPath <-aStarGenericSearchPath <- GenericSearchPath
function aStarManhattanDistanceSearchPath(graph){
	aStarGenericSearchPath.call(this, graph);
}
aStarManhattanDistanceSearchPath.prototype = new aStarGenericSearchPath();
delete aStarManhattanDistanceSearchPath.prototype.openNodes;
delete aStarManhattanDistanceSearchPath.prototype.searchGraph;
aStarManhattanDistanceSearchPath.prototype.getEstimatedValue = function (childrenNode, parentNode) {
	return Math.abs(childrenNode.x - this.end.x) + Math.abs(childrenNode.y - this.end.y);
};

//aStarEuclideanDistanceSearchPath <-aStarGenericSearchPath <- GenericSearchPath
function aStarEuclideanDistanceSearchPath(graph){
	aStarGenericSearchPath.call(this, graph);
}
aStarEuclideanDistanceSearchPath.prototype = new aStarGenericSearchPath();
delete aStarEuclideanDistanceSearchPath.prototype.openNodes;
delete aStarEuclideanDistanceSearchPath.prototype.searchGraph;
aStarEuclideanDistanceSearchPath.prototype.getEstimatedValue = function (childrenNode, parentNode) {
	var deltaX = Math.abs(childrenNode.x - this.end.x);
	var deltaY = Math.abs(childrenNode.y - this.end.y);
	var deltaXSquare = Math.pow(deltaX,2);
	var deltaYSquare = Math.pow(deltaY,2);
	return Math.sqrt(deltaXSquare + deltaYSquare);
};

//bestFirstSearchPath <-aStarGenericSearchPath <- GenericSearchPath
function bestFirstSearchPath(graph){
	aStarGenericSearchPath.call(this, graph);
}
bestFirstSearchPath.prototype = new aStarGenericSearchPath();
delete bestFirstSearchPath.prototype.openNodes;
delete bestFirstSearchPath.prototype.searchGraph;
bestFirstSearchPath.prototype.getEstimatedValue = function (childrenNode, parentNode) {
	var deltaX = Math.abs(childrenNode.x - this.end.x);
	var deltaY = Math.abs(childrenNode.y - this.end.y);
	var deltaXSquare = Math.pow(deltaX,2);
	var deltaYSquare = Math.pow(deltaY,2);
	return pow((deltaXSquare + deltaYSquare),2);
};

