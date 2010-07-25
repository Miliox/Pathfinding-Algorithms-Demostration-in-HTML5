function createMapaFromImage(a){var b=document.createElement("canvas");b.width=a.width;b.height=a.height;var c=b.getContext("2d");c.drawImage(a,0,0);b=c.getImageData(0,0,b.width,b.height);var d;c=a.height;var e=a.width,f=Array(4),g,i=Array(c);for(a=0;a<c;a++){i[a]=Array(e);for(d=0;d<e;d++){g=(d+a*b.width)*4;f[0]=b.data[g];f[1]=b.data[g+1];f[2]=b.data[g+2];f[3]=b.data[g+3];g=f[0]===0&&f[1]===0&&f[2]===0?-1:0;i[a][d]=g}}return i}
var cleanmapa=function(){var a,b,c=Array(32);for(a=0;a<32;a++){c[a]=Array(42);for(b=0;b<42;b++)c[a][b]=a===0||a===31||b===0||b===41?-1:0}return c}(),dirtmapa,cmapa,dirtmapa2;
function loadMaps(){var a=new Image;a.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAABlBMVEUAAAD///+l2Z/dAAAAu0lEQVQ4y5WUCw6AIAxDu/tf2gS1tvsoEkMQHqMrC8CPFqWhHQ8oHF3U3dkpKDNBdBIA9oKacHCWv4oyzPRtoJRoAvRQDRBQNC8zXriv/enx5LR2uZ0JVSNht2UqdfOKOaKy5xxALjZZw7SugkBOq1rBgvhArUitsmpCk69dTurlO2oLLIYUaUKrPtN9eYt8encRHVpVJhQTig4txYVbYUVrycYnGg3qZumFPy+HiUN6H/KD1b5ZG+h2OwCh/QM8itUojAAAAABJRU5ErkJggg==";a.onload=function(){dirtmapa=createMapaFromImage(a)};var b=new Image;b.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAABlBMVEUAAAD///+l2Z/dAAAAQUlEQVQ4y2NgIAEwEgloq5QIR8GVkmAqfZRiOh1FKbJ6TPaoUqooRQp+AkoZiTd10CvFm6kHT4YhPnMPZEFENAAAQLEEKp9eoTUAAAAASUVORK5CYII=";
b.onload=function(){cmapa=createMapaFromImage(b)};var c=new Image;c.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAIAAADrOn1qAAAABlBMVEUAAAD///+l2Z/dAAABVklEQVRIx8VWSQ7EMAgDif9/OXPIKGVYTaRqckoT2hpsFqK/Liaitdb3gfnss5P6dmTPzM/dvtDX2Qmy9yBCe/Gm+3FD09/SJwf4Wkufh985NtrsOayR+qUxZb6CluJ/abzcMAtA2qFaaAZB4H3GIqKDOgYhRMmcyBj1fGsB65j5WIZhrtCN9D+NivW+8LjVf6ibWss/3rfCKdSA1IyGe3Nn+EPAgTncc49kNpL3bS0Rz2uhL6QcZb0gDDDhKh3Fqa0QeyMtPWBJzpDV2URgl0Mq2qhrPN5PFWvIy/IltAcziEY6AFtOwz3CtLEpavuNl3jXwjO+r3rhwNO+7GlGpr+q6k31PJ0Em6o3IsL3N/96WO+ajjfN9evuIFlHr3sgwkKW5ZZ7fLa5y/JG+WeWbWd7D/wCRKx8fGoDVY3EQBA7T9IUQRgDZpb6N9msEVoiY8gU9LvrA+sn6Tq9RyFwAAAAAElFTkSuQmCC";
c.onload=function(){dirtmapa2=createMapaFromImage(c)}}loadMaps();function Graphic(a,b,c){this.canvas=a;this.context=a.getContext("2d");this.linesX=b-2;this.linesY=c-2;this.tileX=this.canvas.width/this.linesX;this.tileY=this.canvas.height/this.linesY}
Graphic.prototype.render=function(a,b,c){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(var d=0;d<a.grid.length-1;d++)for(var e=0;e<a.grid[d].length-1;e++){this.drawBox(e,d,a.grid[d+1][e+1].cor);this.drawText(e,d,a.grid[d+1][e+1].text)}this.drawBox(b.x-1,b.y-1,"rgba(255,0,0,0.5)");this.drawBox(c.x-1,c.y-1,"rgba(0,0,255,0.5)");this.drawGridLines()};
Graphic.prototype.drawGridLines=function(){this.context.beginPath();var a;for(a=0;a<this.linesY;a++){this.context.moveTo(0,a*this.tileY-0.5);this.context.lineTo(this.canvas.width,a*this.tileY-0.5)}for(a=0;a<this.linesX;a++){this.context.moveTo(a*this.tileX-0.5,0);this.context.lineTo(a*this.tileX-0.5,this.canvas.height)}this.context.save();this.context.strokeStyle="#555";this.context.stroke();this.context.beginPath();this.context.restore()};
Graphic.prototype.drawText=function(a,b,c){this.context.save();this.context.font="10pt Georgia";this.context.textAlign="center";this.context.textBaseline="middle";this.context.fillText(c,this.tileX*a+this.tileX/2,this.tileY*b+this.tileY/2,this.tileX);this.context.restore()};Graphic.prototype.drawBox=function(a,b,c){this.context.save();this.context.fillStyle=c;this.context.fillRect(this.tileX*a,this.tileY*b,this.tileX,this.tileY);this.context.restore()};function Graph(a){this.grid=Array(a.length);for(var b,c=0;c<a.length;c++){this.grid[c]=Array(a[c].length);for(var d=0;d<a[c].length;d++){switch(a[c][d]){case 3:b=this.createNode(8,false,"#888888","");break;case 2:b=this.createNode(4,false,"#BBBBBB","");break;case 1:b=this.createNode(2,false,"#DDDDDD","");break;case 0:b=this.createNode(1,false,"white","");break;case -1:b=this.createNode(-1,true,"black","");break}this.grid[c][d]=b}}}
Graph.prototype.createNode=function(a,b,c,d){return{blocked:b,closed:false,cor:c,custo:0,estimado:0,parent:null,terrain:a,text:d,visited:false}};Graph.prototype.getNodeContent=function(a){return this.grid[a.y][a.x]};function GenericSearchPath(a){this.searchGraph=a;this.openNodes=[]}
GenericSearchPath.prototype.searchPath=function(a,b){var c,d,e,f;this.start=a;this.end=b;this.addOpenNode(a);for(this.setVisitedNode(a,a);this.openIsNotEmpty();){c=this.getOpenNode();d=this.searchGraph.getNodeContent(c);d.closed=true;if(c.x==b.x&&c.y==b.y){this.backtrackingPath(c);return true}e=this.getAdjacentNodes(c);for(f=0;f<e.length;f++){d=this.searchGraph.getNodeContent(e[f]);if(!d.blocked)if(d.visited)d.visited&&this.reviewClosedNode(e[f],c);else{this.setVisitedNode(e[f],c);this.addOpenNode(e[f])}}}return false};
GenericSearchPath.prototype.addOpenNode=function(a){this.openNodes.push(a)};GenericSearchPath.prototype.getOpenNode=function(){return this.openNodes.shift()};GenericSearchPath.prototype.getNodeContent=function(a){return this.searchGraph[a.y][a.x]};GenericSearchPath.prototype.setVisitedNode=function(a,b){var c=this.searchGraph.getNodeContent(a);c.visited=true;c.parent=b;c.text=this.getArrowSymbol(a,b)};GenericSearchPath.prototype.reviewOpenNode=function(){};
GenericSearchPath.prototype.reviewClosedNode=function(){};GenericSearchPath.prototype.openIsNotEmpty=function(){if(this.openNodes.length===0)return false;return true};GenericSearchPath.prototype.getArrowSymbol=function(a,b){var c=a.x-b.x,d=a.y-b.y;return c===0&&d<0?"\u2191":c>0&&d<0?"\u2197":c>0&&d===0?"\u2192":c>0&&d>0?"\u2198":c===0&&d>0?"\u2193":c<0&&d>0?"\u2199":c<0&&d===0?"\u2190":c<0&&d<0?"\u2196":""};
GenericSearchPath.prototype.getMoveCusto=function(a,b){var c=a.y-b.y;if(a.x-b.x===0||c===0)return 1;return 1.4142};GenericSearchPath.prototype.getAdjacentNodes=function(a){var b,c,d,e,f,g,i;b={x:a.x+0,y:a.y-1};c={x:a.x+1,y:a.y-1};d={x:a.x-1,y:a.y-1};e={x:a.x-1,y:a.y+0};f={x:a.x+1,y:a.y+0};g={x:a.x+0,y:a.y+1};i={x:a.x+1,y:a.y+1};a={x:a.x-1,y:a.y+1};return eightEdges?[b,f,g,e,c,i,a,d]:[b,f,g,e]};
GenericSearchPath.prototype.backtrackingPath=function(a){var b,c;do{b=this.searchGraph.getNodeContent(a).parent;c=a;a=b;this.searchGraph.getNodeContent(b).cor="yellow"}while(c.x!==a.x||c.y!==a.y)};function BreadthFirstSearchPath(a){GenericSearchPath.call(this,a)}BreadthFirstSearchPath.prototype=new GenericSearchPath;delete BreadthFirstSearchPath.prototype.openNodes;delete BreadthFirstSearchPath.prototype.searchGraph;function aStarGenericSearchPath(a){GenericSearchPath.call(this,a)}
aStarGenericSearchPath.prototype=new GenericSearchPath;delete aStarGenericSearchPath.prototype.openNodes;delete aStarGenericSearchPath.prototype.searchGraph;aStarGenericSearchPath.prototype.addOpenNode=function(a){var b;b=this.searchGraph.getNodeContent(a);var c=b.custo+b.estimado;if(this.openNodes.length===0)this.openNodes.unshift(a);else{for(var d=0;d<this.openNodes.length;d++){b=this.searchGraph.getNodeContent(this.openNodes[d]);if(b.custo+b.estimado>c){this.openNodes.splice(d,0,a);return}}this.openNodes.push(a)}};
aStarGenericSearchPath.prototype.setVisitedNode=function(a,b){GenericSearchPath.prototype.setVisitedNode.call(this,a,b);var c=this.searchGraph.getNodeContent(a),d=this.searchGraph.getNodeContent(b);c.estimado=this.getEstimatedValue(a,b);c.custo=d.terrain*this.getMoveCusto(a,b)+d.custo};aStarGenericSearchPath.prototype.getEstimatedValue=function(){return 0};
aStarGenericSearchPath.prototype.reviewOpenNode=function(a,b){var c=this.searchGraph.getNodeContent(a),d=this.searchGraph.getNodeContent(b);if(!(d.parent.x===a.x&&d.parent.y===a.y)){c=c.estimado+c.custo;if(d.terrain*this.getMoveCusto(a,b)+d.custo+this.getEstimatedValue(a,b)<c){this.setVisitedNode(a,b);this.addOpenNode(a)}}};
aStarGenericSearchPath.prototype.reviewClosedNode=function(a,b){var c=this.searchGraph.getNodeContent(a),d=this.searchGraph.getNodeContent(b);if(!(d.parent.x===a.x&&d.parent.y===a.y)){c=c.estimado+c.custo;if(d.terrain*this.getMoveCusto(a,b)+d.custo+this.getEstimatedValue(a,b)<c){this.setVisitedNode(a,b);this.addOpenNode(a)}}};function UniformCostSearchPath(a){aStarGenericSearchPath.call(this,a)}UniformCostSearchPath.prototype=new aStarGenericSearchPath;delete UniformCostSearchPath.prototype.openNodes;
delete UniformCostSearchPath.prototype.searchGraph;function aStarDiagonalDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}aStarDiagonalDistanceSearchPath.prototype=new aStarGenericSearchPath;delete aStarDiagonalDistanceSearchPath.prototype.openNodes;delete aStarDiagonalDistanceSearchPath.prototype.searchGraph;aStarDiagonalDistanceSearchPath.prototype.getEstimatedValue=function(a){return Math.max(Math.abs(a.x-this.end.x),Math.abs(a.y-this.end.y))};
function aStarManhattanDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}aStarManhattanDistanceSearchPath.prototype=new aStarGenericSearchPath;delete aStarManhattanDistanceSearchPath.prototype.openNodes;delete aStarManhattanDistanceSearchPath.prototype.searchGraph;aStarManhattanDistanceSearchPath.prototype.getEstimatedValue=function(a){return Math.abs(a.x-this.end.x)+Math.abs(a.y-this.end.y)};function aStarEuclideanDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}
aStarEuclideanDistanceSearchPath.prototype=new aStarGenericSearchPath;delete aStarEuclideanDistanceSearchPath.prototype.openNodes;delete aStarEuclideanDistanceSearchPath.prototype.searchGraph;aStarEuclideanDistanceSearchPath.prototype.getEstimatedValue=function(a){var b=Math.abs(a.x-this.end.x);a=Math.abs(a.y-this.end.y);return Math.sqrt(Math.pow(b,2)+Math.pow(a,2))};function bestFirstSearchPath(a){aStarGenericSearchPath.call(this,a)}bestFirstSearchPath.prototype=new aStarGenericSearchPath;delete bestFirstSearchPath.prototype.openNodes;
delete bestFirstSearchPath.prototype.searchGraph;bestFirstSearchPath.prototype.getEstimatedValue=function(a){var b=Math.abs(a.x-this.end.x);a=Math.abs(a.y-this.end.y);return Math.pow(Math.pow(b,2)+Math.pow(a,2),2)};function UniformCostSearchIPath(a){UniformCostSearchPath.call(this,a)}UniformCostSearchIPath.prototype=new UniformCostSearchPath;delete UniformCostSearchIPath.prototype.openNodes;delete UniformCostSearchIPath.prototype.searchGraph;UniformCostSearchIPath.prototype.reviewOpenNode=function(){};
UniformCostSearchIPath.prototype.reviewClosedNode=function(){};function aStarDiagonalDistanceISearchPath(a){aStarDiagonalDistanceSearchPath.call(this,a)}aStarDiagonalDistanceISearchPath.prototype=new aStarDiagonalDistanceSearchPath;delete aStarDiagonalDistanceISearchPath.prototype.openNodes;delete aStarDiagonalDistanceISearchPath.prototype.searchGraph;aStarDiagonalDistanceISearchPath.prototype.reviewOpenNode=function(){};aStarDiagonalDistanceISearchPath.prototype.reviewClosedNode=function(){};
function aStarManhattanDistanceISearchPath(a){aStarManhattanDistanceSearchPath.call(this,a)}aStarManhattanDistanceISearchPath.prototype=new aStarManhattanDistanceSearchPath;delete aStarManhattanDistanceISearchPath.prototype.openNodes;delete aStarManhattanDistanceISearchPath.prototype.searchGraph;aStarManhattanDistanceISearchPath.prototype.reviewOpenNode=function(){};aStarManhattanDistanceISearchPath.prototype.reviewClosedNode=function(){};
function aStarEuclideanDistanceISearchPath(a){aStarEuclideanDistanceSearchPath.call(this,a)}aStarEuclideanDistanceISearchPath.prototype=new aStarEuclideanDistanceSearchPath;delete aStarEuclideanDistanceISearchPath.prototype.openNodes;delete aStarEuclideanDistanceISearchPath.prototype.searchGraph;aStarEuclideanDistanceISearchPath.prototype.reviewOpenNode=function(){};aStarEuclideanDistanceISearchPath.prototype.reviewClosedNode=function(){};
function bestFirstISearchPath(a){bestFirstSearchPath.call(this,a)}bestFirstISearchPath.prototype=new bestFirstSearchPath;delete bestFirstISearchPath.prototype.openNodes;delete bestFirstISearchPath.prototype.searchGraph;bestFirstISearchPath.prototype.reviewOpenNode=function(){};bestFirstISearchPath.prototype.reviewClosedNode=function(){};var graph,graphic,eightEdges=true,mapa,origem,destino,pathfinding={getOption:function(a){a=document.getElementById("choice")[a];for(var b=0;b<a.length;b++)if(a[b].checked)break;return a[b].value},setMap:function(){switch(this.getOption("mapa")){case "maze1":mapa=dirtmapa;origem={x:29,y:19};destino={x:4,y:15};break;case "maze2":mapa=dirtmapa2;origem={x:40,y:1};destino={x:1,y:27};break;case "blockmap1":mapa=cmapa;origem={x:3,y:15};destino={x:21,y:15};break;case "blockmap2":mapa=cmapa;destino={x:3,y:28};
origem={x:21,y:15};break;case "open":default:mapa=cleanmapa;origem={x:20,y:16};destino={x:4,y:4}}},generateStatistic:function(){var a={};a.tiles=0;a.tilesClosed=0;a.tilesVisited=0;a.tilesOpen=0;var b,c,d;for(c=1;c<graph.grid.length-1;c++)for(d=1;d<graph.grid[c].length-1;d++){b=graph.grid[c][d];if(b.blocked===false){a.tiles++;if(b.visited===true){a.tilesVisited++;if(b.closed===false)a.tilesOpen++;else a.tilesClosed++}}}return a},clear:function(){this.setMap();graph=new Graph(mapa);graphic.render(graph,
origem,destino);var a=document.getElementById("estatistica");a.style.display="none";a.textContent=""},run:function(){this.setMap();graph=new Graph(mapa);var a,b=function(j){switch(j){case "sim":return true;case "nao":default:return false}}(this.getOption("admissible"));switch(this.getOption("algorithm")){case "astar_dd":if(b){a=new aStarDiagonalDistanceSearchPath(graph);break}a=new aStarDiagonalDistanceISearchPath(graph);break;case "astar_md":if(b){a=new aStarManhattanDistanceSearchPath(graph);break}a=
new aStarManhattanDistanceISearchPath(graph);break;case "astar_ed":if(b){a=new aStarEuclideanDistanceSearchPath(graph);break}a=new aStarEuclideanDistanceISearchPath(graph);break;case "bfs":a=new BreadthFirstSearchPath(graph);break;case "ucs":if(b){a=new UniformCostSearchPath(graph);break}a=new UniformCostSearchIPath(graph);break;case "bestfs":if(b){a=new bestFirstSearchPath(graph);break}a=new bestFirstISearchPath(graph);break;default:a=new aStarSearchPath(graph)}switch(this.getOption("grid_connected")){case "4":eightEdges=
false;break;case "8":default:eightEdges=true}b=(new Date).getTime();a.searchPath(origem,destino);a=(new Date).getTime();graph.grid[origem.y][origem.x].text="";graphic.render(graph,origem,destino);var c=this.generateStatistic(),d=(c.tilesVisited/c.tiles*100).toFixed(2),e=((c.tiles-c.tilesVisited)/c.tiles*100).toFixed(2),f=(c.tilesOpen/c.tiles*100).toFixed(2),g=(c.tilesClosed/c.tiles*100).toFixed(2),i=graph.grid[destino.y][destino.x].custo;i=i<=0?"???":i.toFixed(3);var h=document.getElementById("estatistica");
h.textContent="Estat\u00edstica:\n";h.textContent+="Total de N\u00f3s: \t"+c.tiles+"\n";h.textContent+="N\u00f3s Visitados: \t"+c.tilesVisited;h.textContent+=" \t("+d+"%)\n";h.textContent+="N\u00e3o visitados: \t"+(c.tiles-c.tilesVisited);h.textContent+=" \t("+e+"%)\n";h.textContent+="N\u00f3s Abertos: \t"+c.tilesOpen;h.textContent+=" \t("+f+"%)\n";h.textContent+="N\u00f3s Fechados: \t"+c.tilesClosed;h.textContent+=" \t("+g+"%)\n";h.textContent+="Tempo Total: \t"+(a-b)+"ms\n";h.textContent+="Custo Total: \t"+
i;h.style.display="block"},init:function(){var a=document.getElementById("run");a.onclick=function(){pathfinding.run()};a=document.getElementById("clear");a.onclick=function(){pathfinding.clear()};pathfinding.setMap();try{graphic=new Graphic(document.getElementById("grid"),mapa[0].length,mapa.length);pathfinding.clear();delete pathfinding.init}catch(b){window.setTimeout(pathfinding.init,500)}}};window.onload=pathfinding.init;
