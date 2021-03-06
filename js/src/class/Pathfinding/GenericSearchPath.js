function GenericSearchPath(graph){
	this.searchGraph = graph;
	this.openNodes = [];
}
GenericSearchPath.prototype.searchPath = function (start, end){
	this.searchStart(start,end);
	var times = 0;
	while(this.searchLoop() === false){ times++; };
	return times;
};
GenericSearchPath.prototype.searchStart = function (start, end){
	this.start = start;
	this.end = end;
	this.addOpenNode(start);
	this.setVisitedNode(start, start);
};
GenericSearchPath.prototype.searchLoop = function (){
	var node, nodeContent,adjNodes, i;
	if(this.openIsNotEmpty()){
		node = this.getOpenNode();
		nodeContent = this.searchGraph.getNodeContent(node);
		nodeContent.closed = true;
		if (node.x == this.end.x && node.y == this.end.y) {
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
	else{
		return true;
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
};
GenericSearchPath.prototype.reviewOpenNode = function(childrenNode, parentNode){
	//Aqui vai a logica de revisao de Nos abertos
};
GenericSearchPath.prototype.reviewClosedNode = function(childrenNode, parentNode){
	//Aqui vai a logica de revisao de Nos Fechados
};
GenericSearchPath.prototype.openIsNotEmpty = function () {
	if (this.openNodes.length === 0) { return false; }
	return true;
};
GenericSearchPath.prototype.getMoveCusto = function (childrenNode, parentNode) {
	var deltaX = childrenNode.x - parentNode.x;
	var deltaY = childrenNode.y - parentNode.y;
	if(deltaX === 0 || deltaY === 0){ return 1; }
	return 1.4142;
};
GenericSearchPath.prototype.getAdjacentNodes = function (node, parent) {
	var N, NE, NW, W, E, S, SW, SE;
	N  = {x: node.x + 0, y: node.y - 1};
	NE = {x: node.x + 1, y: node.y - 1};
	NW = {x: node.x - 1, y: node.y - 1};
	W  = {x: node.x - 1, y: node.y + 0};
	E  = {x: node.x + 1, y: node.y + 0};
	S  = {x: node.x + 0, y: node.y + 1};
	SE = {x: node.x + 1, y: node.y + 1};
	SW = {x: node.x - 1, y: node.y + 1};
	if(eightEdges){ return [N, E, S, W, NE, SE, SW, NW]; }
	else{ return [N, E, S, W]; }
};
GenericSearchPath.prototype.backtrackingPath = function (childrenNode) {
	var parentNode;
	var oldNode;
	do {
		parentNode = this.searchGraph.getNodeContent(childrenNode).parent;
		oldNode = childrenNode;
		childrenNode = parentNode;
		this.searchGraph.getNodeContent(parentNode).cor = "yellow";
	} while(oldNode.x !== childrenNode.x || oldNode.y !== childrenNode.y);
	this.searchGraph.getNodeContent(oldNode).cor = "white";
};
