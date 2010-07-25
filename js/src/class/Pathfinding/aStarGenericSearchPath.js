//aStarGenericSearchPath <- GenericSearchPath
aStarGenericSearchPath.prototype = new GenericSearchPath();
delete aStarGenericSearchPath.prototype.openNodes;
delete aStarGenericSearchPath.prototype.searchGraph;
aStarGenericSearchPath.prototype.addOpenNode = function (nodeInsert) {
	var nodeOpenContent;
	var nodeInsertContent = this.searchGraph.getNodeContent(nodeInsert);
	var total = nodeInsertContent.custo + nodeInsertContent.estimado;
	if(this.openNodes.length === 0){
		this.openNodes.unshift(nodeInsert);
	}
	else{
		for(var i = 0; i < this.openNodes.length; i++){
			nodeOpenContent = this.searchGraph.getNodeContent(this.openNodes[i]);
			if(nodeOpenContent.custo + nodeOpenContent.estimado > total){
				this.openNodes.splice(i,0,nodeInsert);
				return;
			}
		}
		this.openNodes.push(nodeInsert);
	}
};
aStarGenericSearchPath.prototype.setVisitedNode = function (childrenNode, parentNode) {
	GenericSearchPath.prototype.setVisitedNode.call(this, childrenNode, parentNode);
	var contentChildren = this.searchGraph.getNodeContent(childrenNode);
	var contentParent = this.searchGraph.getNodeContent(parentNode);
	contentChildren.estimado = this.getEstimatedValue(childrenNode, parentNode);
	contentChildren.custo = contentParent.terrain*this.getMoveCusto(childrenNode, parentNode) + contentParent.custo;
};
aStarGenericSearchPath.prototype.getEstimatedValue = function (childrenNode, parentNode) {
	return 0;
	//heurística vai aqui!
};
aStarGenericSearchPath.prototype.reviewOpenNode = function(childrenNode, parentNode){
	//Aqui vai a logica de revisao de Nos abertos
	var contentChildren = this.searchGraph.getNodeContent(childrenNode);
	var contentParent = this.searchGraph.getNodeContent(parentNode);
	if(contentParent.parent.x === childrenNode.x && contentParent.parent.y === childrenNode.y){
		return;
	}
	var atualCustoTotal = contentChildren.estimado + contentChildren.custo;
	var novoCustoTotal = contentParent.terrain*this.getMoveCusto(childrenNode, parentNode) + 
		contentParent.custo + this.getEstimatedValue(childrenNode, parentNode);
	if (novoCustoTotal < atualCustoTotal){
		this.setVisitedNode(childrenNode, parentNode);
		///*
		for(var i = 0;i < this.openNodes.length;i++){
			if(this.openNodes[i].x === childrenNode.x && this.openNodes[i].y === childrenNode.y){
				this.openNodes.splice(i,1);
			}
		}
		//*/
		this.addOpenNode(childrenNode);
	}
};
aStarGenericSearchPath.prototype.reviewClosedNode = function(childrenNode, parentNode){
	//Aqui vai a logica de revisao de Nos Fechados
	var contentChildren = this.searchGraph.getNodeContent(childrenNode);
	var contentParent = this.searchGraph.getNodeContent(parentNode);
	if(
		contentParent.parent.x === childrenNode.x &&
		contentParent.parent.y === childrenNode.y
	){
		return;
	}
	var atualCustoTotal = contentChildren.estimado + contentChildren.custo;
	var novoCustoTotal = contentParent.terrain*this.getMoveCusto(childrenNode, parentNode) + 
		contentParent.custo + this.getEstimatedValue(childrenNode, parentNode);
	if (novoCustoTotal < atualCustoTotal){
		this.setVisitedNode(childrenNode, parentNode);
		this.addOpenNode(childrenNode);
	}
};
