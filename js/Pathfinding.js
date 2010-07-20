function aStarPathFind(originInLimitedMap, destinyInLimitedMap, limitedMap){
	var estimatedCost = function (nodeStart, nodeEnd) {
		var dx = nodeStart.x - nodeEnd.x;
		var dy = nodeStart.y - nodeEnd.y;

		var d = Math.abs(dx) + Math.abs(dy);
		return d;
	};
	var insertNodeInPQ = function (priorQueue, limitedMap, nodeToInsertPos) {
		var nodePos, nodeContent;
		var nodeToInsertContent = limitedMap.getCell(nodeToInsertPos);
		var nodeToInsertTotal = nodeToInsertContent.custo + nodeToInsertContent.estimado;
		if(priorQueue.length === 0){
			priorQueue.unshift(nodeToInsertPos);
			return;
		}
		else{
			for(var i = 0; i < priorQueue.length; i++){
				nodePos = priorQueue[i];
				nodeContent = limitedMap.getCell(nodePos);
				if(nodeContent.custo + nodeContent.estimado > nodeToInsertTotal){
					priorQueue.splice(i,0,nodeToInsertPos);
					return;
				}
			}
			priorQueue.push(nodeToInsertPos);
			return;
		}
	};
	//direcoes
	var vec_unit =	[
			{x : 0, y : -1},
			{x : 1, y : 0},
			{x : 0, y : 1},
			{x : -1, y : -1},
			];

	var nodeToEvaluate;
	var nodeToEvaluateContent;
	var nodeInLimitedMap;
	var nodesPriorityQueue = [];

	nodesPriorityQueue.push(originInLimitedMap);
	while(nodesPriorityQueue.length > 0){
		nodeToEvaluate = nodesPriorityQueue.shift();
		nodeToEvaluateContent = limitedMap[nodeToEvaluate.y][nodeToEvaluate.x];
		for(var direcao = 0; direcao < vec_unit.length; direcao++){
			nodeInLimitedMap = {x: nodeToEvaluate.x + vec_unit[direcao].x, y: nodeToEvaluate.x + vec_unit[direcao].y};
			if (limitedMap[nodeInLimitedMap.y][nodeInLimitedMap.x].visited == true && !limitedMap[nodeInLimitedMap.y][nodeInLimitedMap.x]){
				limitedMap[nodeInLimitedMap.y][nodeInLimitedMap.x].visited = true;
				limitedMap[nodeInLimitedMap.y][nodeInLimitedMap.x].text = "";
			}
		}
	}

};
