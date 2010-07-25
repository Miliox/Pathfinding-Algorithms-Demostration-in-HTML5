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
