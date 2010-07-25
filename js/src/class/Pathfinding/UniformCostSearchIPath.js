//UniformCostSearchIPath <- UniformCostSearchPath <-aStarGenericSearchPath <- GenericSearchPath
function UniformCostSearchIPath(graph){
	UniformCostSearchPath.call(this, graph);
}
UniformCostSearchIPath.prototype = new UniformCostSearchPath();
delete UniformCostSearchIPath.prototype.openNodes;
delete UniformCostSearchIPath.prototype.searchGraph;
UniformCostSearchIPath.prototype.reviewOpenNode = function(childrenNode, parentNode){ return; };
UniformCostSearchIPath.prototype.reviewClosedNode = function(childrenNode, parentNode){ return; };
