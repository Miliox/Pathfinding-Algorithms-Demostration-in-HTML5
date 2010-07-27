function createMapaFromImage(k){var j=document.createElement("canvas");j.width=k.width;j.height=k.height;var b=j.getContext("2d");b.drawImage(k,0,0);var m=b.getImageData(0,0,j.width,j.height);var n,d;var h=k.height;var l=k.width;var e=new Array(4);var i;var g;var c=0;var f=-1;var a=new Array(h);for(n=0;n<h;n++){a[n]=new Array(l);for(d=0;d<l;d++){i=(d+n*m.width)*4;e[0]=m.data[i];e[1]=m.data[i+1];e[2]=m.data[i+2];e[3]=m.data[i+3];if(e[0]===0&&e[1]===0&&e[2]===0){g=f}else{if(e[0]===255&&e[1]===255&&e[2]===255){g=c}else{g=c}}a[n][d]=g}}return a}var cleanmapa=function(){var e=32;var d=42;var a,b;var c=new Array(e);for(a=0;a<e;a++){c[a]=new Array(d);for(b=0;b<d;b++){if(a===0||a===e-1||b===0||b===d-1){c[a][b]=-1}else{c[a][b]=0}}}return c}();var bigcleanmapa=function(){var e=62;var d=82;var a,b;var c=new Array(e);for(a=0;a<e;a++){c[a]=new Array(d);for(b=0;b<d;b++){if(a===0||a===e-1||b===0||b===d-1){c[a][b]=-1}else{c[a][b]=0}}}return c}();var dirtmapa,cmapa,dirtmapa2,bigmaze;function loadMaps(){var d=new Image;d.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAABlBMVEUAAAD///+l2Z/dAAAAu0lEQVQ4y5WUCw6AIAxDu/tf2gS1tvsoEkMQHqMrC8CPFqWhHQ8oHF3U3dkpKDNBdBIA9oKacHCWv4oyzPRtoJRoAvRQDRBQNC8zXriv/enx5LR2uZ0JVSNht2UqdfOKOaKy5xxALjZZw7SugkBOq1rBgvhArUitsmpCk69dTurlO2oLLIYUaUKrPtN9eYt8encRHVpVJhQTig4txYVbYUVrycYnGg3qZumFPy+HiUN6H/KD1b5ZG+h2OwCh/QM8itUojAAAAABJRU5ErkJggg==";d.onload=function(){dirtmapa=createMapaFromImage(d)};var c=new Image;c.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAABlBMVEUAAAD///+l2Z/dAAAAQUlEQVQ4y2NgIAEwEgloq5QIR8GVkmAqfZRiOh1FKbJ6TPaoUqooRQp+AkoZiTd10CvFm6kHT4YhPnMPZEFENAAAQLEEKp9eoTUAAAAASUVORK5CYII=";c.onload=function(){cmapa=createMapaFromImage(c)};var b=new Image;b.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAIAAADrOn1qAAAABlBMVEUAAAD///+l2Z/dAAABVklEQVRIx8VWSQ7EMAgDif9/OXPIKGVYTaRqckoT2hpsFqK/Liaitdb3gfnss5P6dmTPzM/dvtDX2Qmy9yBCe/Gm+3FD09/SJwf4Wkufh985NtrsOayR+qUxZb6CluJ/abzcMAtA2qFaaAZB4H3GIqKDOgYhRMmcyBj1fGsB65j5WIZhrtCN9D+NivW+8LjVf6ibWss/3rfCKdSA1IyGe3Nn+EPAgTncc49kNpL3bS0Rz2uhL6QcZb0gDDDhKh3Fqa0QeyMtPWBJzpDV2URgl0Mq2qhrPN5PFWvIy/IltAcziEY6AFtOwz3CtLEpavuNl3jXwjO+r3rhwNO+7GlGpr+q6k31PJ0Em6o3IsL3N/96WO+ajjfN9evuIFlHr3sgwkKW5ZZ7fLa5y/JG+WeWbWd7D/wCRKx8fGoDVY3EQBA7T9IUQRgDZpb6N9msEVoiY8gU9LvrA+sn6Tq9RyFwAAAAAElFTkSuQmCC";b.onload=function(){dirtmapa2=createMapaFromImage(b)};var a=new Image;a.src="img/bigmaze.png";a.onload=function(){bigmaze=createMapaFromImage(a)}}loadMaps();function GenericSearchPath(a){this.searchGraph=a;this.openNodes=[]}GenericSearchPath.prototype.searchPath=function(c,a){this.searchStart(c,a);var b=0;while(this.searchLoop()===false){b++}return b};GenericSearchPath.prototype.searchStart=function(b,a){this.start=b;this.end=a;this.addOpenNode(b);this.setVisitedNode(b,b)};GenericSearchPath.prototype.searchLoop=function(){var c,a,d,b;if(this.openIsNotEmpty()){c=this.getOpenNode();a=this.searchGraph.getNodeContent(c);a.closed=true;if(c.x==this.end.x&&c.y==this.end.y){this.backtrackingPath(c);return true}d=this.getAdjacentNodes(c);for(b=0;b<d.length;b++){a=this.searchGraph.getNodeContent(d[b]);if(!a.blocked){if(!a.visited){this.setVisitedNode(d[b],c);this.addOpenNode(d[b])}else{if(a.visited){if(a.closed){this.reviewClosedNode(d[b],c)}else{this.reviewOpenNode(d[b],c)}}}}}}else{return true}return false};GenericSearchPath.prototype.addOpenNode=function(a){this.openNodes.push(a)};GenericSearchPath.prototype.getOpenNode=function(){return this.openNodes.shift()};GenericSearchPath.prototype.getNodeContent=function(a){return this.searchGraph[a.y][a.x]};GenericSearchPath.prototype.setVisitedNode=function(c,a){var b=this.searchGraph.getNodeContent(c);b.visited=true;b.parent=a};GenericSearchPath.prototype.reviewOpenNode=function(b,a){};GenericSearchPath.prototype.reviewClosedNode=function(b,a){};GenericSearchPath.prototype.openIsNotEmpty=function(){if(this.openNodes.length===0){return false}return true};GenericSearchPath.prototype.getMoveCusto=function(d,b){var c=d.x-b.x;var a=d.y-b.y;if(c===0||a===0){return 1}return 1.4142};GenericSearchPath.prototype.getAdjacentNodes=function(d,h){var g,i,a,c,j,f,e,b;g={x:d.x+0,y:d.y-1};i={x:d.x+1,y:d.y-1};a={x:d.x-1,y:d.y-1};c={x:d.x-1,y:d.y+0};j={x:d.x+1,y:d.y+0};f={x:d.x+0,y:d.y+1};b={x:d.x+1,y:d.y+1};e={x:d.x-1,y:d.y+1};if(eightEdges){return[g,j,f,c,i,b,e,a]}else{return[g,j,f,c]}};GenericSearchPath.prototype.backtrackingPath=function(c){var a;var b;do{a=this.searchGraph.getNodeContent(c).parent;b=c;c=a;this.searchGraph.getNodeContent(a).cor="yellow"}while(b.x!==c.x||b.y!==c.y);this.searchGraph.getNodeContent(b).cor="white"};function BreadthFirstSearchPath(a){GenericSearchPath.call(this,a)}BreadthFirstSearchPath.prototype=new GenericSearchPath;delete BreadthFirstSearchPath.prototype.openNodes;delete BreadthFirstSearchPath.prototype.searchGraph;function aStarGenericSearchPath(a){GenericSearchPath.call(this,a)}aStarGenericSearchPath.prototype=new GenericSearchPath;delete aStarGenericSearchPath.prototype.openNodes;delete aStarGenericSearchPath.prototype.searchGraph;aStarGenericSearchPath.prototype.addOpenNode=function(b){var e;var a=this.searchGraph.getNodeContent(b);var d=a.custo+a.estimado;if(this.openNodes.length===0){this.openNodes.unshift(b)}else{for(var c=0;c<this.openNodes.length;c++){e=this.searchGraph.getNodeContent(this.openNodes[c]);if(e.custo+e.estimado>d){this.openNodes.splice(c,0,b);return}}this.openNodes.push(b)}};aStarGenericSearchPath.prototype.setVisitedNode=function(d,b){GenericSearchPath.prototype.setVisitedNode.call(this,d,b);var c=this.searchGraph.getNodeContent(d);var a=this.searchGraph.getNodeContent(b);c.estimado=this.getEstimatedValue(d,b);c.custo=a.terrain*this.getMoveCusto(d,b)+a.custo};aStarGenericSearchPath.prototype.getEstimatedValue=function(b,a){return 0};aStarGenericSearchPath.prototype.reviewOpenNode=function(g,b){var d=this.searchGraph.getNodeContent(g);var a=this.searchGraph.getNodeContent(b);if(a.parent.x===g.x&&a.parent.y===g.y){return}var e=d.estimado+d.custo;var f=a.terrain*this.getMoveCusto(g,b)+a.custo+this.getEstimatedValue(g,b);if(f<e){this.setVisitedNode(g,b);for(var c=0;c<this.openNodes.length;c++){if(this.openNodes[c].x===g.x&&this.openNodes[c].y===g.y){this.openNodes.splice(c,1)}}this.addOpenNode(g)}};aStarGenericSearchPath.prototype.reviewClosedNode=function(f,b){var c=this.searchGraph.getNodeContent(f);var a=this.searchGraph.getNodeContent(b);if(a.parent.x===f.x&&a.parent.y===f.y){return}var d=c.estimado+c.custo;var e=a.terrain*this.getMoveCusto(f,b)+a.custo+this.getEstimatedValue(f,b);if(e<d){this.setVisitedNode(f,b);this.addOpenNode(f)}};function UniformCostSearchPath(a){aStarGenericSearchPath.call(this,a)}UniformCostSearchPath.prototype=new aStarGenericSearchPath;delete UniformCostSearchPath.prototype.openNodes;delete UniformCostSearchPath.prototype.searchGraph;function bestFirstSearchPath(a){aStarGenericSearchPath.call(this,a)}bestFirstSearchPath.prototype=new aStarGenericSearchPath;delete bestFirstSearchPath.prototype.openNodes;delete bestFirstSearchPath.prototype.searchGraph;bestFirstSearchPath.prototype.getEstimatedValue=function(f,b){var c=Math.abs(f.x-this.end.x);var a=Math.abs(f.y-this.end.y);var d=Math.pow(c,2);var e=Math.pow(a,2);return Math.pow(d+e,2)};function aStarDiagonalDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}aStarDiagonalDistanceSearchPath.prototype=new aStarGenericSearchPath;delete aStarDiagonalDistanceSearchPath.prototype.openNodes;delete aStarDiagonalDistanceSearchPath.prototype.searchGraph;aStarDiagonalDistanceSearchPath.prototype.getEstimatedValue=function(b,a){return Math.max(Math.abs(b.x-this.end.x),Math.abs(b.y-this.end.y))};function aStarEuclideanDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}aStarEuclideanDistanceSearchPath.prototype=new aStarGenericSearchPath;delete aStarEuclideanDistanceSearchPath.prototype.openNodes;delete aStarEuclideanDistanceSearchPath.prototype.searchGraph;aStarEuclideanDistanceSearchPath.prototype.getEstimatedValue=function(f,b){var c=Math.abs(f.x-this.end.x);var a=Math.abs(f.y-this.end.y);var d=Math.pow(c,2);var e=Math.pow(a,2);return Math.sqrt(d+e)};function aStarManhattanDistanceSearchPath(a){aStarGenericSearchPath.call(this,a)}aStarManhattanDistanceSearchPath.prototype=new aStarGenericSearchPath;delete aStarManhattanDistanceSearchPath.prototype.openNodes;delete aStarManhattanDistanceSearchPath.prototype.searchGraph;aStarManhattanDistanceSearchPath.prototype.getEstimatedValue=function(b,a){return Math.abs(b.x-this.end.x)+Math.abs(b.y-this.end.y)};function UniformCostSearchIPath(a){UniformCostSearchPath.call(this,a)}UniformCostSearchIPath.prototype=new UniformCostSearchPath;delete UniformCostSearchIPath.prototype.openNodes;delete UniformCostSearchIPath.prototype.searchGraph;UniformCostSearchIPath.prototype.reviewOpenNode=function(b,a){return};UniformCostSearchIPath.prototype.reviewClosedNode=function(b,a){return};function bestFirstISearchPath(a){bestFirstSearchPath.call(this,a)}bestFirstISearchPath.prototype=new bestFirstSearchPath;delete bestFirstISearchPath.prototype.openNodes;delete bestFirstISearchPath.prototype.searchGraph;bestFirstISearchPath.prototype.reviewOpenNode=function(b,a){return};bestFirstISearchPath.prototype.reviewClosedNode=function(b,a){return};function aStarDiagonalDistanceISearchPath(a){aStarDiagonalDistanceSearchPath.call(this,a)}aStarDiagonalDistanceISearchPath.prototype=new aStarDiagonalDistanceSearchPath;delete aStarDiagonalDistanceISearchPath.prototype.openNodes;delete aStarDiagonalDistanceISearchPath.prototype.searchGraph;aStarDiagonalDistanceISearchPath.prototype.reviewOpenNode=function(b,a){return};aStarDiagonalDistanceISearchPath.prototype.reviewClosedNode=function(b,a){return};function aStarEuclideanDistanceISearchPath(a){aStarEuclideanDistanceSearchPath.call(this,a)}aStarEuclideanDistanceISearchPath.prototype=new aStarEuclideanDistanceSearchPath;delete aStarEuclideanDistanceISearchPath.prototype.openNodes;delete aStarEuclideanDistanceISearchPath.prototype.searchGraph;aStarEuclideanDistanceISearchPath.prototype.reviewOpenNode=function(b,a){return};aStarEuclideanDistanceISearchPath.prototype.reviewClosedNode=function(b,a){return};function aStarManhattanDistanceISearchPath(a){aStarManhattanDistanceSearchPath.call(this,a)}aStarManhattanDistanceISearchPath.prototype=new aStarManhattanDistanceSearchPath;delete aStarManhattanDistanceISearchPath.prototype.openNodes;delete aStarManhattanDistanceISearchPath.prototype.searchGraph;aStarManhattanDistanceISearchPath.prototype.reviewOpenNode=function(b,a){return};aStarManhattanDistanceISearchPath.prototype.reviewClosedNode=function(b,a){return};function Graph(d){this.grid=new Array(d.length);var c;for(var a=0;a<d.length;a++){this.grid[a]=new Array(d[a].length);for(var b=0;b<d[a].length;b++){switch(d[a][b]){case 3:c=this.createNode(8,false,"#888888");break;case 2:c=this.createNode(4,false,"#BBBBBB");break;case 1:c=this.createNode(2,false,"#DDDDDD");break;case 0:c=this.createNode(1,false,"white");break;case -1:c=this.createNode(-1,true,"black");break}this.grid[a][b]=c}}}Graph.prototype.createNode=function(b,a,c){return{blocked:a,closed:false,cor:c,custo:0,estimado:0,parent:null,terrain:b,visited:false}};Graph.prototype.getNodeContent=function(b,a){if(arguments.length===1){return this.grid[b.y][b.x]}else{if(arguments.length===2){return this.grid[a][b]}}};Graph.prototype.getWidth=function(){return this.grid[0].length};Graph.prototype.getHeight=function(){return this.grid.length};function Graphic(a){this.canvas=a;this.context=a.getContext("2d")}Graphic.prototype.render=function(h,g,d,b){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);this.linesX=h.getWidth()-2;this.linesY=h.getHeight()-2;this.tileX=this.canvas.width/this.linesX;this.tileY=this.canvas.height/this.linesY;var a,c;for(a=0;a<h.getHeight()-1;a++){for(c=0;c<h.getWidth()-1;c++){this.drawBox(c,a,h.grid[a+1][c+1].cor)}}this.drawBox(g.x-1,g.y-1,"rgba(255,0,0,0.5)");this.drawBox(d.x-1,d.y-1,"rgba(0,0,255,0.5)");var e,f;this.context.save();this.context.beginPath();for(a=0;a<h.getHeight()-1;a++){for(c=0;c<h.getWidth()-1;c++){f=h.getNodeContent(c+1,a+1);if(f.visited===true){e=f.parent;this.drawLine(c,a,e.x-1,e.y-1);if(f.closed===false){this.drawPoint(c,a)}}}}this.context.strokeStyle="brown";this.context.lineWidth=1;this.context.stroke();this.context.beginPath();this.context.restore();if(b===true){this.drawGridLines()}};Graphic.prototype.drawGridLines=function(){this.context.beginPath();var a;for(a=0;a<this.linesY;a++){this.context.moveTo(0,a*this.tileY-0.5);this.context.lineTo(this.canvas.width,a*this.tileY-0.5)}for(var b=0;b<this.linesX;b++){this.context.moveTo(b*this.tileX-0.5,0);this.context.lineTo(b*this.tileX-0.5,this.canvas.height)}this.context.save();this.context.strokeStyle="#555";this.context.stroke();this.context.beginPath();this.context.restore()};Graphic.prototype.drawLine=function(b,a,d,c){b=this.tileX*b+this.tileX/2-0.5;a=this.tileY*a+this.tileY/2-0.5;d=this.tileX*d+this.tileX/2-0.5;c=this.tileY*c+this.tileY/2-0.5;this.context.moveTo(d,c);this.context.lineTo(b,a)};Graphic.prototype.drawPoint=function(a,b){a=this.tileX*a+this.tileX/2-0.5;b=this.tileY*b+this.tileY/2-0.5;this.context.arc(a,b,1,0,2*Math.PI,true)};Graphic.prototype.drawBox=function(a,c,b){this.context.save();this.context.fillStyle=b;this.context.fillRect(this.tileX*a,this.tileY*c,this.tileX,this.tileY);this.context.restore()};var graph,game,graphic,eightEdges=true,mapa,origem,destino;var pathfinding={id:null,lines:true,times:null,getOption:function(a){var c=document.getElementById("choice")[a];for(var b=0;b<c.length;b++){if(c[b].checked){break}}return c[b].value},setMap:function(){var a=this.getOption("mapa");switch(a){case"maze1":mapa=dirtmapa;origem={x:29,y:19};destino={x:4,y:15};break;case"maze2":mapa=dirtmapa2;origem={x:40,y:1};destino={x:1,y:27};break;case"blockmap1":mapa=cmapa;origem={x:3,y:15};destino={x:21,y:15};break;case"blockmap2":mapa=cmapa;destino={x:3,y:28};origem={x:21,y:15};break;case"bigopen":mapa=bigcleanmapa;origem={x:41,y:31};destino={x:4,y:4};break;case"bigmaze":mapa=bigmaze;origem={x:77,y:57};destino={x:51,y:15};break;case"open":default:mapa=cleanmapa;origem={x:20,y:16};destino={x:4,y:4}}},generateStatistic:function(){var c={};c.tiles=0;c.tilesClosed=0;c.tilesVisited=0;c.tilesOpen=0;var d;var a,b;for(a=1;a<graph.grid.length-1;a++){for(b=1;b<graph.grid[a].length-1;b++){d=graph.grid[a][b];if(d.blocked===false){c.tiles++;if(d.visited===true){c.tilesVisited++;if(d.closed===false){c.tilesOpen++}else{c.tilesClosed++}}}}}return c},clear:function(){this.removeStep();this.configure();graph=new Graph(mapa);graphic.render(graph,origem,destino,this.lines);var a=document.getElementById("estatistica");a.style.display="none";a.textContent=""},run:function(){this.removeStep();this.configure();var b=(new Date).getTime();this.times=game.searchPath(origem,destino);var a=(new Date).getTime();this.stats(a-b)},stats:function(f){graph.grid[origem.y][origem.x].text="";graphic.render(graph,origem,destino,this.lines);var d=this.generateStatistic();var b=(d.tilesVisited/d.tiles*100).toFixed(2);var a=((d.tiles-d.tilesVisited)/d.tiles*100).toFixed(2);var h=(d.tilesOpen/d.tiles*100).toFixed(2);var c=(d.tilesClosed/d.tiles*100).toFixed(2);var e=graph.grid[destino.y][destino.x].custo;e=function(i){if(i<=0){return"???"}return i.toFixed(3)}(e);var g=document.getElementById("estatistica");g.textContent="Estat\u00edstica:\n";g.textContent+="Total de N\u00f3s: \t"+d.tiles+"\n";g.textContent+="N\u00f3s Visitados: \t"+d.tilesVisited;g.textContent+=" \t("+b+"%)\n";g.textContent+="N\u00e3o visitados: \t"+(d.tiles-d.tilesVisited);g.textContent+=" \t("+a+"%)\n";g.textContent+="N\u00f3s Abertos: \t"+d.tilesOpen;g.textContent+=" \t("+h+"%)\n";g.textContent+="N\u00f3s Fechados: \t"+d.tilesClosed;g.textContent+=" \t("+c+"%)\n";g.textContent+="Tempo Total: \t"+f+"ms\n";g.textContent+="Qtde. Ciclos: \t"+this.times+"\n";g.textContent+="Custo Total: \t"+e;g.style.display="block"},configure:function(){this.setMap();graph=new Graph(mapa);var a=function(b){switch(b){case"sim":return true;case"nao":default:return false}}(this.getOption("admissible"));switch(this.getOption("algorithm")){case"astar_dd":if(a){game=new aStarDiagonalDistanceSearchPath(graph);break}game=new aStarDiagonalDistanceISearchPath(graph);break;case"astar_md":if(a){game=new aStarManhattanDistanceSearchPath(graph);break}game=new aStarManhattanDistanceISearchPath(graph);break;case"astar_ed":if(a){game=new aStarEuclideanDistanceSearchPath(graph);break}game=new aStarEuclideanDistanceISearchPath(graph);break;case"bfs":game=new BreadthFirstSearchPath(graph);break;case"ucs":if(a){game=new UniformCostSearchPath(graph);break}game=new UniformCostSearchIPath(graph);break;case"bestfs":if(a){game=new bestFirstSearchPath(graph);break}game=new bestFirstISearchPath(graph);break;default:game=new aStarSearchPath(graph)}switch(this.getOption("grid_connected")){case"4":eightEdges=false;break;case"8":default:eightEdges=true}switch(this.getOption("grid_show")){case"nao":this.lines=false;break;case"sim":default:this.lines=true}},runStep:function(){this.removeStep();this.configure();this.times=0;game.searchStart(origem,destino);this.id=window.setInterval(function(){pathfinding.step()},50)},step:function(){var a=game.searchLoop(origem,destino);if(a===true){this.removeStep();this.stats("???")}else{this.times++}graphic.render(graph,origem,destino,this.lines)},removeStep:function(){var a=this.id;if(this.id){window.clearInterval(a);this.id=null}},init:function(){var a=document.getElementById("run");a.onclick=function(){pathfinding.run()};a=document.getElementById("step");a.onclick=function(){pathfinding.runStep()};a=document.getElementById("clear");a.onclick=function(){pathfinding.clear()};pathfinding.setMap();try{graphic=new Graphic(document.getElementById("grid"),mapa[0].length,mapa.length);pathfinding.clear();delete pathfinding.init}catch(b){window.setTimeout(pathfinding.init,500)}}};window.onload=pathfinding.init;