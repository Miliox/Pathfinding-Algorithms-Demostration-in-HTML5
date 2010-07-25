//UniformCostSearchPath <-aStarGenericSearchPath <- GenericSearchPath
function UniformCostSearchPath(graph){
	aStarGenericSearchPath.call(this, graph);
}
UniformCostSearchPath.prototype = new aStarGenericSearchPath();
delete UniformCostSearchPath.prototype.openNodes;
delete UniformCostSearchPath.prototype.searchGraph;
