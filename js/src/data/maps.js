/*
 * Demostrador de Algoritmos de Pathfinding:
 *	Autor & Bolsista: Emiliano Carlos de Moraes Firmino
 *	Orientador: Jucimar Maia Júnior
 *	Projeto: Desenvolvimento de Interface Web Interativa em HTML5 e CSS3 para jogos de computador online multiusuários massivos.
 *	Programa de Apoio a Iniciação Científica - PAIC
 *
 * */

function createMapaFromImage (maze) {
	//manipulo o canvas para gerar o ImageData
	var mazeCv = document.createElement('canvas');
	mazeCv.width = maze.width;
	mazeCv.height = maze.height;
	var context = mazeCv.getContext("2d");
	context.drawImage(maze,0,0);

	//Obtenho o array do ImageData
	var imagem = context.getImageData(0, 0, mazeCv.width, mazeCv.height);

	//Variaveis de controle do loop
	var line, col;
	var maxline = maze.height;
	var maxcol = maze.width;

	//Variaveis de Manipulação do Pixel
	var rgba = new Array(4);
	var index;


	//Valor do Tile
	var tileValue;
	var ABERTO = 0;
	var FECHADO = -1;

	//Crio o Mapa
	var map = new Array(maxline);	
	for(line = 0; line < maxline; line++){
		map[line] = new Array(maxcol);
		for(col = 0; col < maxcol; col++){
			//Obtenho o pixel
			index = (col + line*(imagem.width))*4;
			rgba[0] = imagem.data[index];
			rgba[1] = imagem.data[index+1];
			rgba[2] = imagem.data[index+2];
			rgba[3] = imagem.data[index+3];

			//Defino o Tile
			if (
				rgba[0] === 0x00 &&
				rgba[1] === 0x00 &&
				rgba[2] === 0x00
			) {
				tileValue = FECHADO;
			}else if (
				rgba[0] === 0xFF &&
				rgba[1] === 0xFF &&
				rgba[2] === 0xFF
			){
				tileValue = ABERTO;
			}
			else {
				tileValue = ABERTO;
			}
			map[line][col] = tileValue;
		}
	}
	return map;
}
var cleanmapa = function () {
	var maxline = 32;
	var maxcol = 42;
	var line, col;
	var map = new Array(maxline);
	for(line = 0; line < maxline; line++){
		map[line] = new Array(maxcol);
		for(col = 0; col < maxcol; col++){
			if (
				(line === 0 || line === (maxline-1) ) ||
				(col === 0 || col === (maxcol-1))
			){
				map[line][col] = -1;
			} else {
				map[line][col] = 0;
			}
		}
	}
	return map;
}();
var bigcleanmapa = function () {
	var maxline = 62;
	var maxcol = 82;
	var line, col;
	var map = new Array(maxline);
	for(line = 0; line < maxline; line++){
		map[line] = new Array(maxcol);
		for(col = 0; col < maxcol; col++){
			if (
				(line === 0 || line === (maxline-1) ) ||
				(col === 0 || col === (maxcol-1))
			){
				map[line][col] = -1;
			} else {
				map[line][col] = 0;
			}
		}
	}
	return map;
}();

var dirtmapa, cmapa, dirtmapa2, bigmaze;
function loadMaps() {
	var maze1 = new Image();
	maze1.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAABlBMVEUAAAD///+l2Z/dAAAAu0lEQVQ4y5WUCw6AIAxDu/tf2gS1tvsoEkMQHqMrC8CPFqWhHQ8oHF3U3dkpKDNBdBIA9oKacHCWv4oyzPRtoJRoAvRQDRBQNC8zXriv/enx5LR2uZ0JVSNht2UqdfOKOaKy5xxALjZZw7SugkBOq1rBgvhArUitsmpCk69dTurlO2oLLIYUaUKrPtN9eYt8encRHVpVJhQTig4txYVbYUVrycYnGg3qZumFPy+HiUN6H/KD1b5ZG+h2OwCh/QM8itUojAAAAABJRU5ErkJggg==';
	maze1.onload = function(){ dirtmapa = createMapaFromImage(maze1); };

	var maze2 = new Image();
	maze2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAMAAABThhoPAAAABlBMVEUAAAD///+l2Z/dAAAAQUlEQVQ4y2NgIAEwEgloq5QIR8GVkmAqfZRiOh1FKbJ6TPaoUqooRQp+AkoZiTd10CvFm6kHT4YhPnMPZEFENAAAQLEEKp9eoTUAAAAASUVORK5CYII=';	
	maze2.onload = function(){ cmapa = createMapaFromImage(maze2); };

	var maze3 = new Image();
	maze3.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAIAAADrOn1qAAAABlBMVEUAAAD///+l2Z/dAAABVklEQVRIx8VWSQ7EMAgDif9/OXPIKGVYTaRqckoT2hpsFqK/Liaitdb3gfnss5P6dmTPzM/dvtDX2Qmy9yBCe/Gm+3FD09/SJwf4Wkufh985NtrsOayR+qUxZb6CluJ/abzcMAtA2qFaaAZB4H3GIqKDOgYhRMmcyBj1fGsB65j5WIZhrtCN9D+NivW+8LjVf6ibWss/3rfCKdSA1IyGe3Nn+EPAgTncc49kNpL3bS0Rz2uhL6QcZb0gDDDhKh3Fqa0QeyMtPWBJzpDV2URgl0Mq2qhrPN5PFWvIy/IltAcziEY6AFtOwz3CtLEpavuNl3jXwjO+r3rhwNO+7GlGpr+q6k31PJ0Em6o3IsL3N/96WO+ajjfN9evuIFlHr3sgwkKW5ZZ7fLa5y/JG+WeWbWd7D/wCRKx8fGoDVY3EQBA7T9IUQRgDZpb6N9msEVoiY8gU9LvrA+sn6Tq9RyFwAAAAAElFTkSuQmCC';	
	maze3.onload = function(){ dirtmapa2 = createMapaFromImage(maze3); };

	var maze4 = new Image();
	maze4.src = 'img/bigmaze.png';
	maze4.onload = function(){ bigmaze = createMapaFromImage(maze4); };
}
loadMaps();
