#!/bin/sh
#Une os arquivos com o Google Closure Compiler removendo os espaços em branco
echo "reunindo arquivos em um só"
java -jar /home/mangaka/jscompiler/closure_compiler.jar --compilation_level=WHITESPACE_ONLY --js=js/src/data/maps.js  --js=js/src/class/Pathfinding/GenericSearchPath.js --js=js/src/class/Pathfinding/BreadthFirstSearchPath.js --js=js/src/class/Pathfinding/aStarGenericSearchPath.js --js=js/src/class/Pathfinding/UniformCostSearchPath.js --js=js/src/class/Pathfinding/BestFirstSearchPath.js --js=js/src/class/Pathfinding/aStarDiagonalDistanceSearchPath.js --js=js/src/class/Pathfinding/aStarEuclideanDistanceSearchPath.js --js=js/src/class/Pathfinding/aStarManhattanDistanceSearchPath.js --js=js/src/class/Pathfinding/UniformCostSearchIPath.js --js=js/src/class/Pathfinding/BestFirstISearchPath.js --js=js/src/class/Pathfinding/aStarDiagonalDistanceISearchPath.js --js=js/src/class/Pathfinding/aStarEuclideanDistanceISearchPath.js --js=js/src/class/Pathfinding/aStarManhattanDistanceISearchPath.js --js=js/src/class/Graph.js --js=js/src/class/Graphic.js --js=js/src/main.js --js_output_file=js/pathfinding_ws.js
echo "OK"
#Compila com Closure Compiler de fato
echo "compilando com Closure Compiler"
java -jar /home/mangaka/jscompiler/closure_compiler.jar --compilation_level=SIMPLE_OPTIMIZATIONS --js=js/pathfinding_ws.js --js_output_file=js/closure/pathfinding.js
echo "OK"
#Compila a versão com Yui Compressor
echo "compilando com Yui Compressor"
java -jar /home/mangaka/jscompiler/yuicompressor-2.4.2.jar js/pathfinding_ws.js -o js/yui/pathfinding.js
#Deleto arquivo desnecessário
echo "OK"
echo "compilação completa, removendo arquivos temporarios"
rm js/pathfinding_ws.js
echo "concluido"
