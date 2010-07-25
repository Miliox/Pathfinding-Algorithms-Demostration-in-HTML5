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
