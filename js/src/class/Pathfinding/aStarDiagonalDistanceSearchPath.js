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
