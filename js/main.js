/*
 * Demostrador de Algoritmos de Pathfinding:
 *	Autor & Bolsista: Emiliano Carlos de Moraes Firmino
 *	Orientador: Jucimar Maia Júnior
 *	Projeto: Desenvolvimento de Interface Web Interativa em HTML5 e CSS3 para jogos de computador online multiusuários massivos.
 *	Programa de Apoio a Iniciação Científica - PAIC
 *
 * */


var graph, graphic, eightEdges = true;
var dirtmapa = [
	[-1,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 ,-1 ,-1 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0  ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 ,-1 ],
	[-1,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 ,-1 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 , 0 ,-1 , 0 , 0 ,-1 , 0 ,-1 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 ,-1 , 0 ,-1 , 0 , 0 , 0 , 0 ,-1 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 ,-1 , -1,-1 ,-1 ,-1 ,-1 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 ,-1 ,-1 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 ,-1 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 ,-1 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 ,-1 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 ,-1 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 ,-1 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 ,-1 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 ,-1 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ]
];
var cleanmapa = [
	[-1,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ]
];
var cmapa = [
	[-1,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,-1 ],
	[-1,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ]
];

//Default
var mapa = cleanmapa;
var origem = {x : 20, y: 16};
var destino = {x : 1, y: 1};

var application = { 
	getOption : function (name) {
		var choices = document.getElementById("choice")[name];
		for(var i = 0; i< choices.length; i++){
			if(choices[i].checked){ break; }
		}
		return choices[i].value;
	},
	setTypeMap : function () {
		var name_map = this.getOption("mapa");
		switch(name_map){
			case "maze":
				mapa = dirtmapa;
				origem = {x: 29, y: 19};
				destino = {x: 1, y:30};
				break;
			case "blockmap1":
				mapa = cmapa;
				origem = {x: 3, y: 15};
				destino = {x: 21, y: 15};
				break;
			case "blockmap2":
				mapa = cmapa;
				destino = {x: 3, y: 28};
				origem = {x: 21, y: 15};
				break;
			case "open":
			default :
				mapa = cleanmapa;
				origem = {x : 20, y: 16};
				destino = {x : 1, y: 1};
		}
	},
	generateStatistic : function(){
		var statistic = {};		
		statistic.tiles = 0;
		statistic.tilesClosed = 0;
		statistic.tilesVisited = 0;
		statistic.tilesOpen = 0;
		var node;
		var i, j;
		for (j = 1; j < graph.grid.length - 1; j++){
			for (i = 1; i < graph.grid[j].length - 1; i++){
				node = graph.grid[j][i];
				if(node.blocked === false){
					statistic.tiles++;
					if(node.visited === true) {
						statistic.tilesVisited++;
						if(node.closed === false){
							statistic.tilesOpen++;
						}
						else{
							statistic.tilesClosed++;
						}
					}
				}
			}
		}
		return statistic;
	},
}

function runPathFinding(){
	application.setTypeMap();
	graph = new Graph(mapa);
	var game;
	var admissible = function (tipo){
		switch (tipo){
			case "sim":
				return true;
			case "nao":
			default:
				return false;	
		}
	}(application.getOption("admissible"));
	switch (application.getOption("algorithm")) {
		case "astar_dd":
			if(admissible){
				game = new aStarDiagonalDistanceSearchPath(graph);
			} else {
				game = new aStarDiagonalDistanceISearchPath(graph);
			}
			break;
		case "astar_md":
			if(admissible){
				game = new aStarManhattanDistanceSearchPath(graph);
			} else {
				game = new aStarManhattanDistanceISearchPath(graph);
			}
			break;
		case "astar_ed":
			if(admissible){
				game = new aStarEuclideanDistanceSearchPath(graph);
			} else {
				game = new aStarEuclideanDistanceISearchPath(graph);
			}
			break;
		case "bfs":
			game = new BreadthFirstSearchPath(graph);
			break;
		case "ucs":
			if(admissible){
				game = new UniformCostSearchPath(graph);
			} else {
				game = new UniformCostSearchIPath(graph);
			}
			break;
		case "bestfs":
			if(admissible){
				game = new bestFirstSearchPath(graph);
			} else {
				game = new bestFirstISearchPath(graph);
			}
			break;
		default:
			game = new aStarSearchPath(graph);
	}
	switch(application.getOption("grid_connected")){
		case "4":
			eightEdges = false;
			break;
		case "8":
		default :
			eightEdges = true;
	}
	game.searchPath(origem, destino);
	graph.grid[origem.y][origem.x].text = "";
	graphic.render();
	var dados = application.generateStatistic();
	var visited = ((dados.tilesVisited / dados.tiles)*100).toFixed(2);
	var notVisited = (((dados.tiles - dados.tilesVisited) / dados.tiles)*100).toFixed(2);
	var opened = ((dados.tilesOpen / dados.tiles)*100).toFixed(2);
	var closed = ((dados.tilesClosed / dados.tiles)*100).toFixed(2)
	var total = (graph.grid[destino.y][destino.x].custo);

	total = function(n){
		if(n <= 0){ 
			return "???"; 
		}
		return n.toFixed(3);
	}(total);
	
	var textBox = document.getElementById("estatistica");
	textBox.textContent  = "Estatística:\n";
	textBox.textContent += "Total de Nós: \t" + dados.tiles +"\n";
	textBox.textContent += "Nós Visitados: \t" + dados.tilesVisited; 
	textBox.textContent += " \t(" +  visited + "%)" + "\n";
	textBox.textContent += "Não visitados: \t" + (dados.tiles - dados.tilesVisited);
	textBox.textContent += " \t(" + notVisited + "%)" + "\n";
	textBox.textContent += "Nós Abertos: \t" + dados.tilesOpen;
	textBox.textContent += " \t(" + opened + "%)" + "\n";
	textBox.textContent += "Nós Fechados: \t" + dados.tilesClosed;
	textBox.textContent += " \t(" + closed + "%)" + "\n";
	textBox.textContent += "Custo Total: \t" + total;

	textBox.style.border = "1px dashed black";
	textBox.style.padding = "10px";
}
function clearPathFinding(){
	application.setTypeMap();
	graph = new Graph(mapa);
	graphic.render();
	var textBox = document.getElementById("estatistica");
	textBox.style.border = "";
	textBox.style.padding = "0px";
	textBox.textContent = "";
}
function init(){
	var botao = document.getElementById("run");
	botao.onclick = runPathFinding;
	var botao = document.getElementById("clear");
	botao.onclick = clearPathFinding;
	graphic = new Graphic(document.getElementById("grid"),mapa[0].length,mapa.length);
	clearPathFinding();
	delete init;
}


window.onload = init;
