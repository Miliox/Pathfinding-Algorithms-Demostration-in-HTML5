//aStarEuclideanDistanceISearchPath <- aStarEuclideanDistanceSearchPath <- aStarGenericSearchPath <- GenericSearchPath
function aStarEuclideanDistanceISearchPath(graph){
	aStarEuclideanDistanceSearchPath.call(this, graph);
}
aStarEuclideanDistanceISearchPath.prototype = new aStarEuclideanDistanceSearchPath();
delete aStarEuclideanDistanceISearchPath.prototype.openNodes;
delete aStarEuclideanDistanceISearchPath.prototype.searchGraph;
aStarEuclideanDistanceISearchPath.prototype.reviewOpenNode = function(childrenNode, parentNode){ return; };
aStarEuclideanDistanceISearchPath.prototype.reviewClosedNode = function(childrenNode, parentNode){ return; };
