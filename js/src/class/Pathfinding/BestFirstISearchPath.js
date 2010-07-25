//bestFirstISearchPath <- bestFirstSearchPath <-aStarGenericSearchPath <- GenericSearchPath
function bestFirstISearchPath(graph){
	bestFirstSearchPath.call(this, graph);
}
bestFirstISearchPath.prototype = new bestFirstSearchPath();
delete bestFirstISearchPath.prototype.openNodes;
delete bestFirstISearchPath.prototype.searchGraph;
bestFirstISearchPath.prototype.reviewOpenNode = function(childrenNode, parentNode){ return; };
bestFirstISearchPath.prototype.reviewClosedNode = function(childrenNode, parentNode){ return; };
