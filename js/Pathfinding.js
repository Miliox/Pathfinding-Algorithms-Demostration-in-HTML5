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
			if (
				!nodeContent.visited &&
				!nodeContent.blocked
			){
				this.setVisitedNode(adjNodes[i], node);
				this.addOpenNode(adjNodes[i]);
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
	var list = [];
	N = {x: node.x + 0, y: node.y - 1};
	NE = {x: node.x + 1, y: node.y - 1};
	NW = {x: node.x - 1, y: node.y - 1};

	W = {x: node.x - 1, y: node.y + 0};
	E = {x: node.x + 1, y: node.y + 0};

	S = {x: node.x + 0, y: node.y + 1};
	SE = {x: node.x + 1, y: node.y + 1};
	SW = {x: node.x - 1, y: node.y + 1};

	list.push(N);
	list.push(NE);
	list.push(E);
	list.push(SE);
	list.push(S);
	list.push(SW);
	list.push(W);
	list.push(NW);
	//return [N, NE, E, SE, S, SW, W, NW];
	return list;
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
function aStarSearchPath(graph){
	GenericSearchPath.call(this, graph);
}
aStarSearchPath.prototype = new GenericSearchPath();
delete aStarSearchPath.prototype.openNodes;
delete aStarSearchPath.prototype.searchGraph;
aStarSearchPath.prototype.addOpenNode = function (nodeInsert) {
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
aStarSearchPath.prototype.setVisitedNode = function (childrenNode, parentNode) {
	GenericSearchPath.prototype.setVisitedNode.call(this, childrenNode, parentNode);
	var contentChildren = this.searchGraph.getNodeContent(childrenNode);
	var contentParent = this.searchGraph.getNodeContent(parentNode);
	contentChildren.estimado = Math.max(Math.abs(childrenNode.x - this.end.x), Math.abs(childrenNode.y - this.end.y));
	contentChildren.custo = contentParent.terrain*this.getMoveCusto(childrenNode, parentNode) + contentParent.custo;
};
