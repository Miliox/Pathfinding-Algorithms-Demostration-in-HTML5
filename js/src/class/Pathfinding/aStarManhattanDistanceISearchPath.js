//aStarManhattanDistanceISearchPath <- aStarManhattanDistanceSearchPath <- aStarGenericSearchPath <- GenericSearchPath
function aStarManhattanDistanceISearchPath(graph){
	aStarManhattanDistanceSearchPath.call(this, graph);
}
aStarManhattanDistanceISearchPath.prototype = new aStarManhattanDistanceSearchPath();
delete aStarManhattanDistanceISearchPath.prototype.openNodes;
delete aStarManhattanDistanceISearchPath.prototype.searchGraph;
aStarManhattanDistanceISearchPath.prototype.reviewOpenNode = function(childrenNode, parentNode){ return; };
aStarManhattanDistanceISearchPath.prototype.reviewClosedNode = function(childrenNode, parentNode){ return; };
