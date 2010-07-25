//aStarDiagonalDistanceSearchIPath <- aStarDiagonalDistanceSearchPath <- aStarGenericSearchPath <- GenericSearchPath
function aStarDiagonalDistanceISearchPath(graph){
	aStarDiagonalDistanceSearchPath.call(this, graph);
}
aStarDiagonalDistanceISearchPath.prototype = new aStarDiagonalDistanceSearchPath();
delete aStarDiagonalDistanceISearchPath.prototype.openNodes;
delete aStarDiagonalDistanceISearchPath.prototype.searchGraph;
aStarDiagonalDistanceISearchPath.prototype.reviewOpenNode = function(childrenNode, parentNode){ return; };
aStarDiagonalDistanceISearchPath.prototype.reviewClosedNode = function(childrenNode, parentNode){ return; };
