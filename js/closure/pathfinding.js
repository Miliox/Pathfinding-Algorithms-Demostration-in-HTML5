function createMapaFromImage(a){var b=document.createElement("canvas");b.width=a.width;b.height=a.height;var c=b.getContext("2d");c.drawImage(a,0,0);b=c.getImageData(0,0,b.width,b.height);var d;c=a.height;var g=a.width,e=Array(4),h,f=Array(c);for(a=0;a<c;a++){f[a]=Array(g);for(d=0;d<g;d++){h=(d+a*b.width)*4;e[0]=b.data[h];e[1]=b.data[h+1];e[2]=b.data[h+2];e[3]=b.data[h+3];h=e[0]===0&&e[1]===0&&e[2]===0?-1:0;f[a][d]=h}}return f}
var cleanmapa=function(){var a,b,c=Array(32);for(a=0;a<32;a++){c[a]=Array(42);for(b=0;b<42;b++)c[a][b]=a===0||a===31||b===0||b===41?-1:0}return c}(),bigcleanmapa=function(){var a,b,c=Array(62);for(a=0;a<62;a++){c[a]=Array(82);for(b=0;b<82;b++)c[a][b]=a===0||a===61||b===0||b===81?-1:0}return c}(),dirtmapa,cmapa,dirtmapa2,bigmaze;
function loadMaps(){var a=new Image;a.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAABlBMVEUAAAD///+l2Z/dAAAAu0lEQVQ4y5WUCw6AIAxDu/tf2gS1tvsoEkMQHqMrC8CPFqWhHQ8oHF3U3dkpKDNBdBIA9oKacHCWv4oyzPRtoJRoAvRQDRBQNC8zXriv/enx5LR2uZ0JVSNht2UqdfOKOaKy5xxALjZZw7SugkBOq1rBgvhArUitsmpCk69dTurlO2oLLIYUaUKrPtN9eYt8encRHVpVJhQTig4txYVbYUVrycYnGg3qZumFPy+HiUN6H/KD1b5ZG+h2OwCh/QM8itUojAAAAABJRU5ErkJggg==";a.onload=function(){dirtmapa=createMapaFromImage(a)};var b=new Image;b.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAABlBMVEUAAAD///+l2Z/dAAAAQUlEQVQ4y2NgIAEwEgloq5QIR8GVkmAqfZRiOh1FKbJ6TPaoUqooRQp+AkoZiTd10CvFm6kHT4YhPnMPZEFENAAAQLEEKp9eoTUAAAAASUVORK5CYII=";
b.onload=function(){cmapa=createMapaFromImage(b)};var c=new Image;c.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAIAAADrOn1qAAAABlBMVEUAAAD///+l2Z/dAAABVklEQVRIx8VWSQ7EMAgDif9/OXPIKGVYTaRqckoT2hpsFqK/Liaitdb3gfnss5P6dmTPzM/dvtDX2Qmy9yBCe/Gm+3FD09/SJwf4Wkufh985NtrsOayR+qUxZb6CluJ/abzcMAtA2qFaaAZB4H3GIqKDOgYhRMmcyBj1fGsB65j5WIZhrtCN9D+NivW+8LjVf6ibWss/3rfCKdSA1IyGe3Nn+EPAgTncc49kNpL3bS0Rz2uhL6QcZb0gDDDhKh3Fqa0QeyMtPWBJzpDV2URgl0Mq2qhrPN5PFWvIy/IltAcziEY6AFtOwz3CtLEpavuNl3jXwjO+r3rhwNO+7GlGpr+q6k31PJ0Em6o3IsL3N/96WO+ajjfN9evuIFlHr3sgwkKW5ZZ7fLa5y/JG+WeWbWd7D/wCRKx8fGoDVY3EQBA7T9IUQRgDZpb6N9msEVoiY8gU9LvrA+sn6Tq9RyFwAAAAAElFTkSuQmCC";
c.onload=function(){dirtmapa2=createMapaFromImage(c)};var d=new Image;d.src="img/bigmaze.png";d.onload=function(){bigmaze=createMapaFromImage(d)}}loadMaps();function GenericSearchPath(a){this.searchGraph=a;this.openNodes=[]}GenericSearchPath.prototype.searchPath=function(a,b){this.searchStart(a,b);for(var c=0;this.searchLoop()===false;)c++;return c};GenericSearchPath.prototype.searchStart=function(a,b){this.start=a;this.end=b;this.addOpenNode(a);this.setVisitedNode(a,a)};
GenericSearchPath.prototype.searchLoop=function(){var a,b,c,d;if(this.openIsNotEmpty()){a=this.getOpenNode();b=this.searchGraph.getNodeContent(a);b.closed=true;if(a.x==this.end.x&&a.y==this.end.y){this.backtrackingPath(a);return true}c=this.getAdjacentNodes(a);for(d=0;d<c.length;d++){b=this.searchGraph.getNodeContent(c[d]);if(!b.blocked)if(b.visited){if(b.visited)b.closed?this.reviewClosedNode(c[d],a):this.reviewOpenNode(c[d],a)}else{this.setVisitedNode(c[d],a);this.addOpenNode(c[d])}}}else return true;
return false};GenericSearchPath.prototype.addOpenNode=function(a){this.openNodes.push(a)};GenericSearchPath.prototype.getOpenNode=function(){return this.openNodes.shift()};GenericSearchPath.prototype.getNodeContent=function(a){return this.searchGraph[a.y][a.x]};GenericSearchPath.prototype.setVisitedNode=function(a,b){var c=this.searchGraph.getNodeContent(a);c.visited=true;c.parent=b};GenericSearchPath.prototype.reviewOpenNode=function(){};GenericSearchPath.prototype.reviewClosedNode=function(){};
GenericSearchPath.prototype.openIsNotEmpty=function(){if(this.openNodes.length===0)return false;return true};GenericSearchPath.prototype.getMoveCusto=function(a,b){var c=a.y-b.y;if(a.x-b.x===0||c===0)return 1;return 1.4142};
GenericSearchPath.prototype.getAdjacentNodes=function(a){var b,c,d,g,e,h,f;b={x:a.x+0,y:a.y-1};c={x:a.x+1,y:a.y-1};d={x:a.x-1,y:a.y-1};g={x:a.x-1,y:a.y+0};e={x:a.x+1,y:a.y+0};h={x:a.x+0,y:a.y+1};f={x:a.x+1,y:a.y+1};a={x:a.x-1,y:a.y+1};return eightEdges?[b,e,h,g,c,f,a,d]:[b,e,h,g]};
GenericSearchPath.prototype.backtrackingPath=function(a){var b,c;do{b=this.searchGraph.getNodeContent(a).parent;c=a;a=b;this.searchGraph.getNodeContent(b).cor="yellow"}while(c.x!==a.x||c.y!==a.y);this.searchGraph.getNodeContent(c).cor="white"};function BreadthFirstSearchPath(a){GenericSearchPath.call(this,a)}BreadthFirstSearchPath.prototype=new GenericSearchPath;delete BreadthFirstSearchPath.prototype.openNodes;delete BreadthFirstSearchPath.prototype.searchGraph;
function aStarGenericSearchPath(a){GenericSearchPath.call(this,a)}aStarGenericSearchPath.prototype=new GenericSearchPath;delete aStarGenericSearchPath.prototype.openNodes;delete aStarGenericSearchPath.prototype.searchGraph;
aStarGenericSearchPath.prototype.addOpenNode=function(a){var b;b=this.searchGraph.getNodeContent(a);var c=b.custo+b.estimado;if(this.openNodes.length===0)this.openNodes.unshift(a);else{for(var d=0;d<this.openNodes.length;d++){b=this.searchGraph.getNodeContent(this.openNodes[d]);if(b.custo+b.estimado>c){this.openNodes.splice(d,0,a);return}}this.openNodes.push(a)}};
aStarGenericSearchPath.prototype.setVisitedNode=function(a,b){GenericSearchPath.prototype.setVisitedNode.call(this,a,b);var c=this.searchGraph.getNodeContent(a),d=this.searchGraph.getNodeContent(b);c.estimado=this.getEstimatedValue(a,b);c.custo=d.terrain*this.getMoveCusto(a,b)+d.custo};aStarGenericSearchPath.prototype.getEstimatedValue=function(){return 0};
aStarGenericSearchPath.prototype.reviewOpenNode=function(a,b){var c=this.searchGraph.getNodeContent(a),d=this.searchGraph.getNodeContent(b);if(!(d.parent.x===a.x&&d.parent.y===a.y)){c=c.estimado+c.custo;if(d.terrain*this.getMoveCusto(a,b)+d.custo+this.getEstimatedValue(a,b)<c){this.setVisitedNode(a,b);for(d=0;d<this.openNodes.length;d++)this.openNodes[d].x===a.x&&this.openNodes[d].y===a.y&&this.openNodes.splice(d,1);this.addOpenNode(a)}}};
aStarGenericSearchPath.prototype.reviewClosedNode=function(a,b){var c=this.searchGraph.getNodeContent(a),d=this.searchGraph.getNodeContent(b);if(!(d.parent.x===a.x&&d.parent.y===a.y)){c=c.estimado+c.custo;if(d.terrain*this.getMoveCusto(a,b)+d.custo+this.getEstimatedValue(a,b)<c){this.setVisitedNode(a,b);this.addOpenNode(a)}}};function UniformCostSearchPath(a){aStarGenericSearchPath.call(this,a)}UniformCostSearchPath.prototype=new aStarGenericSearchPath;delete UniformCostSearchPath.prototype.openNodes;
delete UniformCostSearchPath.prototype.searchGraph;function bestFirstSearchPath(a){aStarGenericSearchPath.call(this,a)}bestFirstSearchPath.prototype=new aStarGenericSearchPath;delete bestFirstSearchPath.prototype.openNodes;delete bestFirstSearchPath.prototype.searchGraph;bestFirstSearchPath.prototype.getEstimatedValue=function(a){var b=Math.abs(a.x-this.end.x);a=Math.abs(a.y-this.end.y);return Math.pow(Math.pow(b,2)+Math.pow(a,2),2)};
function aStarDiagonalDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}aStarDiagonalDistanceSearchPath.prototype=new aStarGenericSearchPath;delete aStarDiagonalDistanceSearchPath.prototype.openNodes;delete aStarDiagonalDistanceSearchPath.prototype.searchGraph;aStarDiagonalDistanceSearchPath.prototype.getEstimatedValue=function(a){return Math.max(Math.abs(a.x-this.end.x),Math.abs(a.y-this.end.y))};function aStarEuclideanDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}
aStarEuclideanDistanceSearchPath.prototype=new aStarGenericSearchPath;delete aStarEuclideanDistanceSearchPath.prototype.openNodes;delete aStarEuclideanDistanceSearchPath.prototype.searchGraph;aStarEuclideanDistanceSearchPath.prototype.getEstimatedValue=function(a){var b=Math.abs(a.x-this.end.x);a=Math.abs(a.y-this.end.y);return Math.sqrt(Math.pow(b,2)+Math.pow(a,2))};function aStarManhattanDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}aStarManhattanDistanceSearchPath.prototype=new aStarGenericSearchPath;
delete aStarManhattanDistanceSearchPath.prototype.openNodes;delete aStarManhattanDistanceSearchPath.prototype.searchGraph;aStarManhattanDistanceSearchPath.prototype.getEstimatedValue=function(a){return Math.abs(a.x-this.end.x)+Math.abs(a.y-this.end.y)};function UniformCostSearchIPath(a){UniformCostSearchPath.call(this,a)}UniformCostSearchIPath.prototype=new UniformCostSearchPath;delete UniformCostSearchIPath.prototype.openNodes;delete UniformCostSearchIPath.prototype.searchGraph;
UniformCostSearchIPath.prototype.reviewOpenNode=function(){};UniformCostSearchIPath.prototype.reviewClosedNode=function(){};function bestFirstISearchPath(a){bestFirstSearchPath.call(this,a)}bestFirstISearchPath.prototype=new bestFirstSearchPath;delete bestFirstISearchPath.prototype.openNodes;delete bestFirstISearchPath.prototype.searchGraph;bestFirstISearchPath.prototype.reviewOpenNode=function(){};bestFirstISearchPath.prototype.reviewClosedNode=function(){};
function aStarDiagonalDistanceISearchPath(a){aStarDiagonalDistanceSearchPath.call(this,a)}aStarDiagonalDistanceISearchPath.prototype=new aStarDiagonalDistanceSearchPath;delete aStarDiagonalDistanceISearchPath.prototype.openNodes;delete aStarDiagonalDistanceISearchPath.prototype.searchGraph;aStarDiagonalDistanceISearchPath.prototype.reviewOpenNode=function(){};aStarDiagonalDistanceISearchPath.prototype.reviewClosedNode=function(){};
function aStarEuclideanDistanceISearchPath(a){aStarEuclideanDistanceSearchPath.call(this,a)}aStarEuclideanDistanceISearchPath.prototype=new aStarEuclideanDistanceSearchPath;delete aStarEuclideanDistanceISearchPath.prototype.openNodes;delete aStarEuclideanDistanceISearchPath.prototype.searchGraph;aStarEuclideanDistanceISearchPath.prototype.reviewOpenNode=function(){};aStarEuclideanDistanceISearchPath.prototype.reviewClosedNode=function(){};
function aStarManhattanDistanceISearchPath(a){aStarManhattanDistanceSearchPath.call(this,a)}aStarManhattanDistanceISearchPath.prototype=new aStarManhattanDistanceSearchPath;delete aStarManhattanDistanceISearchPath.prototype.openNodes;delete aStarManhattanDistanceISearchPath.prototype.searchGraph;aStarManhattanDistanceISearchPath.prototype.reviewOpenNode=function(){};aStarManhattanDistanceISearchPath.prototype.reviewClosedNode=function(){};
function Graph(a){this.grid=Array(a.length);for(var b,c=0;c<a.length;c++){this.grid[c]=Array(a[c].length);for(var d=0;d<a[c].length;d++){switch(a[c][d]){case 3:b=this.createNode(8,false,"#888888");break;case 2:b=this.createNode(4,false,"#BBBBBB");break;case 1:b=this.createNode(2,false,"#DDDDDD");break;case 0:b=this.createNode(1,false,"white");break;case -1:b=this.createNode(-1,true,"black");break}this.grid[c][d]=b}}}
Graph.prototype.createNode=function(a,b,c){return{blocked:b,closed:false,cor:c,custo:0,estimado:0,parent:null,terrain:a,visited:false}};Graph.prototype.getNodeContent=function(a,b){if(arguments.length===1)return this.grid[a.y][a.x];else if(arguments.length===2)return this.grid[b][a]};Graph.prototype.getWidth=function(){return this.grid[0].length};Graph.prototype.getHeight=function(){return this.grid.length};function Graphic(a){this.canvas=a;this.context=a.getContext("2d")}
Graphic.prototype.render=function(a,b,c,d){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);this.linesX=a.getWidth()-2;this.linesY=a.getHeight()-2;this.tileX=this.canvas.width/this.linesX;this.tileY=this.canvas.height/this.linesY;var g,e;for(g=0;g<a.getHeight()-1;g++)for(e=0;e<a.getWidth()-1;e++)this.drawBox(e,g,a.grid[g+1][e+1].cor);this.drawBox(b.x-1,b.y-1,"rgba(255,0,0,0.5)");this.drawBox(c.x-1,c.y-1,"rgba(0,0,255,0.5)");this.context.save();this.context.beginPath();for(g=0;g<a.getHeight()-
1;g++)for(e=0;e<a.getWidth()-1;e++){c=a.getNodeContent(e+1,g+1);if(c.visited===true){b=c.parent;this.drawLine(e,g,b.x-1,b.y-1);c.closed===false&&this.drawPoint(e,g)}}this.context.strokeStyle="brown";this.context.lineWidth=1;this.context.stroke();this.context.beginPath();this.context.restore();d===true&&this.drawGridLines()};
Graphic.prototype.drawGridLines=function(){this.context.beginPath();var a;for(a=0;a<this.linesY;a++){this.context.moveTo(0,a*this.tileY-0.5);this.context.lineTo(this.canvas.width,a*this.tileY-0.5)}for(a=0;a<this.linesX;a++){this.context.moveTo(a*this.tileX-0.5,0);this.context.lineTo(a*this.tileX-0.5,this.canvas.height)}this.context.save();this.context.strokeStyle="#555";this.context.stroke();this.context.beginPath();this.context.restore()};
Graphic.prototype.drawLine=function(a,b,c,d){a=this.tileX*a+this.tileX/2-0.5;b=this.tileY*b+this.tileY/2-0.5;c=this.tileX*c+this.tileX/2-0.5;d=this.tileY*d+this.tileY/2-0.5;this.context.moveTo(c,d);this.context.lineTo(a,b)};Graphic.prototype.drawPoint=function(a,b){a=this.tileX*a+this.tileX/2-0.5;b=this.tileY*b+this.tileY/2-0.5;this.context.arc(a,b,1,0,2*Math.PI,true)};
Graphic.prototype.drawBox=function(a,b,c){this.context.save();this.context.fillStyle=c;this.context.fillRect(this.tileX*a,this.tileY*b,this.tileX,this.tileY);this.context.restore()};
var graph,game,graphic,eightEdges=true,mapa,origem,destino,pathfinding={id:null,lines:true,times:null,getOption:function(a){a=document.getElementById("choice")[a];for(var b=0;b<a.length;b++)if(a[b].checked)break;return a[b].value},setMap:function(){switch(this.getOption("mapa")){case "maze1":mapa=dirtmapa;origem={x:29,y:19};destino={x:4,y:15};break;case "maze2":mapa=dirtmapa2;origem={x:40,y:1};destino={x:1,y:27};break;case "blockmap1":mapa=cmapa;origem={x:3,y:15};destino={x:21,y:15};break;case "blockmap2":mapa=
cmapa;destino={x:3,y:28};origem={x:21,y:15};break;case "bigopen":mapa=bigcleanmapa;origem={x:41,y:31};destino={x:4,y:4};break;case "bigmaze":mapa=bigmaze;origem={x:77,y:57};destino={x:51,y:15};break;case "open":default:mapa=cleanmapa;origem={x:20,y:16};destino={x:4,y:4}}},generateStatistic:function(){var a={};a.tiles=0;a.tilesClosed=0;a.tilesVisited=0;a.tilesOpen=0;var b,c,d;for(c=1;c<graph.grid.length-1;c++)for(d=1;d<graph.grid[c].length-1;d++){b=graph.grid[c][d];if(b.blocked===false){a.tiles++;
if(b.visited===true){a.tilesVisited++;if(b.closed===false)a.tilesOpen++;else a.tilesClosed++}}}return a},clear:function(){this.removeStep();this.configure();graph=new Graph(mapa);graphic.render(graph,origem,destino,this.lines);var a=document.getElementById("estatistica");a.style.display="none";a.textContent=""},run:function(){this.removeStep();this.configure();var a=(new Date).getTime();this.times=game.searchPath(origem,destino);this.stats((new Date).getTime()-a)},stats:function(a){graph.grid[origem.y][origem.x].text=
"";graphic.render(graph,origem,destino,this.lines);var b=this.generateStatistic(),c=(b.tilesVisited/b.tiles*100).toFixed(2),d=((b.tiles-b.tilesVisited)/b.tiles*100).toFixed(2),g=(b.tilesOpen/b.tiles*100).toFixed(2),e=(b.tilesClosed/b.tiles*100).toFixed(2),h=graph.grid[destino.y][destino.x].custo;h=h<=0?"???":h.toFixed(3);var f=document.getElementById("estatistica");f.textContent="Estat\u00edstica:\n";f.textContent+="Total de N\u00f3s: \t"+b.tiles+"\n";f.textContent+="N\u00f3s Visitados: \t"+b.tilesVisited;
f.textContent+=" \t("+c+"%)\n";f.textContent+="N\u00e3o visitados: \t"+(b.tiles-b.tilesVisited);f.textContent+=" \t("+d+"%)\n";f.textContent+="N\u00f3s Abertos: \t"+b.tilesOpen;f.textContent+=" \t("+g+"%)\n";f.textContent+="N\u00f3s Fechados: \t"+b.tilesClosed;f.textContent+=" \t("+e+"%)\n";f.textContent+="Tempo Total: \t"+a+"ms\n";f.textContent+="Qtde. Ciclos: \t"+this.times+"\n";f.textContent+="Custo Total: \t"+h;f.style.display="block"},configure:function(){this.setMap();graph=new Graph(mapa);
var a=function(b){switch(b){case "sim":return true;case "nao":default:return false}}(this.getOption("admissible"));switch(this.getOption("algorithm")){case "astar_dd":if(a){game=new aStarDiagonalDistanceSearchPath(graph);break}game=new aStarDiagonalDistanceISearchPath(graph);break;case "astar_md":if(a){game=new aStarManhattanDistanceSearchPath(graph);break}game=new aStarManhattanDistanceISearchPath(graph);break;case "astar_ed":if(a){game=new aStarEuclideanDistanceSearchPath(graph);break}game=new aStarEuclideanDistanceISearchPath(graph);
break;case "bfs":game=new BreadthFirstSearchPath(graph);break;case "ucs":if(a){game=new UniformCostSearchPath(graph);break}game=new UniformCostSearchIPath(graph);break;case "bestfs":if(a){game=new bestFirstSearchPath(graph);break}game=new bestFirstISearchPath(graph);break;default:game=new aStarSearchPath(graph)}switch(this.getOption("grid_connected")){case "4":eightEdges=false;break;case "8":default:eightEdges=true}switch(this.getOption("grid_show")){case "nao":this.lines=false;break;case "sim":default:this.lines=
true}},runStep:function(){this.removeStep();this.configure();this.times=0;game.searchStart(origem,destino);this.id=window.setInterval(function(){pathfinding.step()},50)},step:function(){if(game.searchLoop(origem,destino)===true){this.removeStep();this.stats("???")}else this.times++;graphic.render(graph,origem,destino,this.lines)},removeStep:function(){var a=this.id;if(this.id){window.clearInterval(a);this.id=null}},init:function(){var a=document.getElementById("run");a.onclick=function(){pathfinding.run()};
a=document.getElementById("step");a.onclick=function(){pathfinding.runStep()};a=document.getElementById("clear");a.onclick=function(){pathfinding.clear()};pathfinding.setMap();try{graphic=new Graphic(document.getElementById("grid"),mapa[0].length,mapa.length);pathfinding.clear();delete pathfinding.init}catch(b){window.setTimeout(pathfinding.init,500)}}};window.onload=pathfinding.init;
