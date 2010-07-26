<?php  
	header('Content-type: text/html; charset=utf-8');
	if(isset($_GET['js'])){
		if(in_array($_GET['js'],array('src','yui','closure'))){
			$code_version = $_GET['js'];
		} else {
		$code_version = 'closure';
		}	
	}
	else{
		$code_version = 'closure';
	}		
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
		<!-- Google Closure Compiler -->
		<?php if($code_version != 'closure'){ echo "<!--"; }?> 
		<script type="text/javascript" src="js/closure/pathfinding.js"></script>
		<?php if($code_version != 'closure'){ echo "-->"; }?> 
		<!-- Yahoo Yui Compressor -->
		<?php if($code_version != 'yui'){ echo "<!--"; }?> 
		<script type="text/javascript" src="js/yui/pathfinding.js"></script>
		<?php if($code_version != 'yui'){ echo "-->"; }?> 
		<!-- Source Code -->
		<?php if($code_version != 'src'){ echo "<!--"; }?> 
		<script type="text/javascript" src="js/src/data/maps.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/GenericSearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/BreadthFirstSearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/aStarGenericSearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/UniformCostSearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/BestFirstSearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/aStarDiagonalDistanceSearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/aStarEuclideanDistanceSearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/aStarManhattanDistanceSearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/UniformCostSearchIPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/BestFirstISearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/aStarDiagonalDistanceISearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/aStarEuclideanDistanceISearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Pathfinding/aStarManhattanDistanceISearchPath.js"></script>
		<script type="text/javascript" src="js/src/class/Graph.js"></script>
		<script type="text/javascript" src="js/src/class/Graphic.js"></script>
		<script type="text/javascript" src="js/src/main.js"></script>
		<?php if($code_version != 'src'){ echo "-->"; }?> 
		<style type="text/css">@import url("css/style.css");</style>
	</head>
	<body>
	<div id="pagina">
		<header>
			<h1>Pathfinding</h1>
			<p>Demonstração dos Algoritmos</p>
		</header>
		<div>
			<canvas width="640" height="480" id="grid">Você precisa de um browser compatível com HTML5</canvas>
			<aside>
				<form id="choice">
					Algoritmo:
					<span class="options">
						<input type="radio" name="algorithm" value="bfs" checked/>BFS
						<input type="radio" name="algorithm" value="ucs" />UCS
						<input type="radio" name="algorithm" value="bestfs" />Best-FS
						<input type="radio" name="algorithm" value="astar_dd" />A*<abbr title="Diagonal Distance">[DD]</abbr>
						<input type="radio" name="algorithm" value="astar_ed" />A*<abbr title="Euclidean Distance">[ED]</abbr>
						<input type="radio" name="algorithm" value="astar_md" />A*<abbr title="Manhattan Distance">[MD]</abbr>
					</span><br />
					Heurística Admissível:
					<span class="options">
						<input type="radio" name="admissible" value="sim" checked/>Sim
						<input type="radio" name="admissible" value="nao"/>Não<br />
					</span>
					Conexões do Grid:
					<span class="options">
						<input type="radio" name="grid_connected" value="4" />4
						<input type="radio" name="grid_connected" value="8" checked/>8
					</span><br />
					Mapa:
					<span class="options">
						<input type="radio" name="mapa" value="open" checked/>Vazio
						<input type="radio" name="mapa" value="maze1"/>Labirinto1
						<input type="radio" name="mapa" value="maze2"/>Labirinto2
						<input type="radio" name="mapa" value="blockmap1"/>Barreira1
						<input type="radio" name="mapa" value="blockmap2"/>Barreira2
					</span><br />
					<input type="button" value="RUN" id="run"/>
					<input type="button" value="STEP" id="step"/>
					<input type="button" value="CLEAR" id="clear"/>
					<pre id="estatistica"></pre>
				</form>
			</aside>
			<div>
			</div>
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
