<?php  
	header('Content-type: text/html; charset=utf-8');
?><!doctype html>
<html lang="pt-BR">
	<head>
		<meta charset="utf-8"/>
		<title>Pathfinding</title>
		<meta name="description" content="Programa em javascript que demonstra o funcionamento dos algoritmos de pathfinding em um grid."/>
		<meta name="keywords" content="javascript, canvas, algorithm, pathfinding"/>
		<meta name="author" content="Emiliano Carlos de Moraes Firmino"/>
		<meta name="copyright" content="©Laboratório de Pós Graduação 2010"/>
		<meta name="classification" content=""/>
		<style type="text/css">@import url("css/style.css");</style>
	</head>
	<body>
	<div id="pagina">
		<header>
			<h1>Pathfinding</h1>
            <h2>Explicação dos Algoritmos</h2>
		</header>
		<div>
            <img alt="Exemplo 1" />
            <p>Os algoritmos de pathfind (busca de caminho) são algoritmos de busca que permitem ao computador planejar um caminho em ambientes virtuais são muito utilizados em jogos.<br />
            Esses algoritmos não são capazes de lidar diretamento com a representação geométrica dos ambientes, para utilizá-los é necessário converter o ambiente para uma representação mais simples em gráfo.<br />
            Na representação em gráfo é aplicada o algoritmo de pathfinding, este algoritmos percorre o gráfo, ao encontrar o destino produz um caminho a ser seguido pelo computador, ou informará que não existe um caminho.<br />
            </p>
            <h3>Breadth-First Search</h3>
            <p>Algoritmos de busca sem informação que expande a fronteira (nós abertos) considerando o numero de arestas apartir da origem, expandindo a fronteira de forma uniforme mas desconsiderando o custo do movimento da aresta.
            </p>
            <h3>Uniform-Cost Search</h3>
            <p>Melhora do algoritmos de BFS que considera o custo de movimento, priorizando a expansão de nós que possuem o menor custo total.</p>
            <h3>Best-First Search</h3>
              <p>Algoritmo de busca com informação que expande a fronteira considerando o custo do nós na fronteira e com um chute (heurística) sobre o quão favorável é este nó para alcançar o destino, neste algoritmo a fronteira se expande nos nós mais favoráveis primeiro.</p>
            <h3>A*(star)</h3>
            <p>O A* é um tipo de Best-First Search que busca se expandir o mínimo, encontrar o melhor caminho expandindo preferencialmente nos nós mais proximos ao destino, o principal algoritmo encontrado em jogos.<br />
            A diferença nas implementações do A* é na função que calcula a heurística:</p>
            <ul>
              <li>Diagonal Distance: h(nó) = max(&#x0394x, &#x0394y)</li>
              <li>Euclidean Distance: h(nó) = &#x221A(&#x0394x² + &#x0394y²)</li>
              <li>Manhattan Distance: h(nó) = &#x0394x + &#x0394y</li>
            </ul>
		</div>
		<footer>
			<p>
				©Emiliano Carlos de Moraes Firmino<br />
				©Laboratório de Pós Graduação<br />
				©PAIC
			</p>
		</footer>
	</div>
	</body>
</html>
