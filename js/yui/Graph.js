function Graph(d){this.grid=new Array(d.length);var c;for(var a=0;a<d.length;a++){this.grid[a]=new Array(d[a].length);for(var b=0;b<d[a].length;b++){switch(d[a][b]){case 3:c=this.createNode(8,false,"#888888","");break;case 2:c=this.createNode(4,false,"#BBBBBB","");break;case 1:c=this.createNode(2,false,"#DDDDDD","");break;case 0:c=this.createNode(1,false,"white","");break;case -1:c=this.createNode(-1,true,"black","");break}this.grid[a][b]=c}}}Graph.prototype.createNode=function(b,a,d,c){return{blocked:a,closed:false,cor:d,custo:0,estimado:0,parent:null,terrain:b,text:c,visited:false}};Graph.prototype.getNodeContent=function(a){return this.grid[a.y][a.x]};