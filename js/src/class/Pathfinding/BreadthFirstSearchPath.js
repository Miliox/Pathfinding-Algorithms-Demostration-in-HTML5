//BFS <- GenericSearchPath
function BreadthFirstSearchPath(graph){
	GenericSearchPath.call(this, graph);
}
BreadthFirstSearchPath.prototype = new GenericSearchPath();
delete BreadthFirstSearchPath.prototype.openNodes;
delete BreadthFirstSearchPath.prototype.searchGraph;

function aStarGenericSearchPath(graph){
	GenericSearchPath.call(this, graph);
}
