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
	return Math.pow((deltaXSquare + deltaYSquare),2);
};
