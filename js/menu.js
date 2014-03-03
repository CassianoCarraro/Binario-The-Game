var msgs = new Array();
var pauseBtn = "";
var unpauseBtn = "";

$(document).ready(function(){
	if(!$.cookie("lang")){
		$.cookie("lang", "pt");
		
	}
	setLang();
	$("#ico_lang_pt").click(function(){
		$.cookie("lang","pt");
		setLang();
		
	});
	
	$("#ico_lang_es").click(function(){
		$.cookie("lang","es");
		setLang();
		
	});
	
	$("#ico_lang_en").click(function(){
		$.cookie("lang","en");
		setLang();
	});

	$("#inicio").click(function(){
		mudaTela($(this).parent(), $(this).parent().next("#menu_instrucoes"));
		$(".btn_avancar").click(function(){
			mudaTela($(this).parent().parent(), $(this).parent().parent().next());	
		});
		
		$(".btn_voltar").click(function(){
			mudaTela($(this).parent().parent(), $(this).parent().parent().prev());
		});
                
                $("#lets_play").click(function(){
                    mudaTela($(this).parent().parent(), $(this).parent().parent().next());
                    Game.start();
                });
	});
	
	$("#creditos").click(function(){
		mudaTela($(this).parent(), $(this).parent().prev());		
		$(".btn_voltar").click(function(){
			mudaTela($(this).parent().parent(), $(this).parent().parent().next("#menu"));
		});
	});
setInterval("neon()", 500);	
});

function neon(){
	$("#shadow").fadeOut("slow");
	$("#shadow").fadeIn("slow");
}

function mudaTela(atual, para){
	atual.css("visibility", "hidden");
	para.css("visibility", "visible");
}
function setLang(){
	lang = $.cookie("lang");
			
	var intro = new Array();
	intro[1] = {
		'en' : 'This is a puzzle game that aims to demonstrate the basic concept of binary notation. The game is based on convey that should be completed by solving mathematical riddles to come. At the end of each level will appear a puzzle to add to your knowledge.',
		'es' : 'Este es un juego de rompecabezas que tiene como objetivo demostrar que el concepto básico de la notación binaria. El juego se basa en transmitir que debe completarse mediante la resolución de enigmas matemáticos por venir. Al final de cada nivel se aparacer un rompecabezas para agregar a su conocimiento.',
		'pt' : 'Este game é um puzzle que tem como objetivo demonstrar o conceito básico da notação binária. O jogo baseia-se em leveis que devem ser completados resolvendo as charadas matemáticas que virão. Ao final de cada nível um enigma irá aparacer para acrescentar em seu conhecimento.'
 	}
	
	intro[2] = {
		'en' : 'To complete the levels you need to solve the riddles discovering binary combination that corresponds to the decimal number or find the decimal number that will be formed by binary combination.',
		'es' : 'Para completar los niveles tienen que descubrir la combinación binaria que corresponde al número decimal o encontrar el número de decimales que se formará mediante la combinación binaria.',
		'pt' : 'Para completar os níveis você precisa resolver as charadas descobrindo a combinação binária que corresponde ao número decimal ou descobrir o numero decimal que sera formado pela combinação binária.'
	}
	intro[2][1] =  {
		'en' : '<img src="./css/imagens/intru_1.png"><br />Discover the result of the binary number formed. Knowing that 0 is disabled and 1 enabled.',
		'es' : '<img src="./css/imagens/intru_1.png"><br />Descubre el resultado del número binario formado. Sabiendo que 0 es deshabilitado y 1 habilitada.',
		'pt' : '<img src="./css/imagens/intru_1.png"><br />Descubra o resultado do número binário formado.<br />Sabendo que 0 é desativado e 1 ativado.'
	}
	intro[2][2] = {
		'en' : '<img src="./css/imagens/intru_2.png"><br />Discover the binary number for the decimal clicking the bit to activate it and deactivate it. <br /> Knowing that 0 is disabled and 1 enabled.',
		'es' : '<img src="./css/imagens/intru_2.png"><br />Descubre el número binario para el decimal clic en el bit para activarlo y desactivarlo. Sabiendo que 0 es deshabilitado y 1 habilitada.',
		'pt' : '<img src="./css/imagens/intru_2.png"><br />Descubra o número binário referente ao decimal clicando no bit para ativa-lo e desativa-lo.<br />Sabendo que 0 é desativado e 1 ativado.'
	}
	
	var credits = new Array();
	credits[0] = {
		'en' : '<p>Developed by:</p><p>Ânderson Dalmina<br />(<a href="mailto:andersondalmina@hotmail.com">andersondalmina@hotmail.com</a>)</p><p>Cassiano Carraro<br />(<a href="mailto:cassianocarraro@hotmail.com">cassianocarraro@hotmail.com</a>)</p><p>This game is only for educational purposes.</p><div class="btn_voltar"><img src="css/imagens/seta_back.png"/></div>',
		'es' : '<p>Desarrollado por:</p><p>Ânderson Dalmina<br />(<a href="mailto:andersondalmina@hotmail.com">andersondalmina@hotmail.com</a>)</p><p>Cassiano Carraro<br />(<a href="mailto:cassianocarraro@hotmail.com">cassianocarraro@hotmail.com</a>)</p><p>Este juego es sólo para fines educativos.</p><div class="btn_voltar"><img src="css/imagens/seta_back.png"/></div>',
		'pt' : '<p>Desenvolvido por:</p><p>Ânderson Dalmina<br />(<a href="mailto:andersondalmina@hotmail.com">andersondalmina@hotmail.com</a>)</p><p>Cassiano Carraro<br />(<a href="mailto:cassianocarraro@hotmail.com">cassianocarraro@hotmail.com</a>)</p><p>Este jogo é somente para fins educativos.</p><div class="btn_voltar"><img src="css/imagens/seta_back.png"/></div>'
	}
	
	var buttons = new Array();
	buttons[0] = {
		'en' : 'Play',
		'es' : 'Iniciar',
		'pt' : 'Iniciar'
	}
	buttons[1] = {
		'en' : 'Credits',
		'es' : 'Créditos',
		'pt' : 'Créditos'
	}
	buttons[2] = {
		'en' : 'Play',
		'es' : 'Jugar',
		'pt' : 'Jogar'
	}
	
	var texts = new Array();
	texts[0] = {
		'en' : 'Score',
		'es' : 'Puntuacion',
		'pt' : 'Pontuação'
	}
	
	msgs[1] = {
		'en' : 'Bit (binary digit shorthand for "binary digit" in English) is the smallest unit of information that can be stored or transmitted. Used in Computing and Information Theory. A bit can take only two values​​, eg, 0 or 1, true or false.',
		'es' : 'Bits (dígitos binarios abreviatura de "dígito binario" en Inglés) es la unidad más pequeña de información que puede ser almacenada o transmitida. Se utiliza en Informática y teoría de la información. Un bit puede tener sólo dos valores, por ejemplo, 0 ó 1, verdadero o falso.',
		'pt' : 'Bit (simplificação para dígito binário, "BInary digiT" em inglês) é a menor unidade de informação que pode ser armazenada ou transmitida. Usada na Computação e na Teoria da Informação. Um bit pode assumir somente 2 valores, por exemplo: 0 ou 1, verdadeiro ou falso.'
	}
	msgs[2] = {
		'en' : 'Every computer has a set of instructions that your processor is capable of performing. These instructions, called machine code, are represented by sequences of bits, typically limited by the number of bits of the register of the main CPU. This code is called binary code. Are formed by 0 and 1.',
		'es' : 'Cada equipo tiene un conjunto de instrucciones que el procesador es capaz de realizar. Estas instrucciones de código de máquina, llamados, están representados por secuencias de bits, típicamente limitado por el número de bits del registro de la CPU principal. Este código se denomina código binario. Se forman por 0 y 1.',
		'pt' : 'Todo computador possui um conjunto de instruções que seu processador é capaz de executar. Essas instruções, chamadas de código de máquina, são representadas por sequências de bits, normalmente limitadas pelo número de bits do registrador principal da CPU. Esse código é chamado de código binário. São formados por 0 e 1.'
	}
	msgs[3] = {
		'en' : 'Common sense and mathematical logic confirms that the bit is the smallest block of information understandable and distinguishable, and can serve as building blocks for more complex information more understandable and distinguishable. In groups of eight bits form the most important unit in the representation of information - the byte - by which is for instance represented the storage capacity and memory.',
		'es' : 'El sentido común y la lógica matemática confirma que el bit es la piedra más pequeña de información comprensible y distinguible, y pueden servir de base para una información más compleja sea más comprensible y distinguible. En grupos de ocho bits forman la unidad más importante en la representación de la información - el byte - por el cual se representa por ejemplo la capacidad de almacenamiento y la memoria.',
		'pt' : 'O senso comum e a lógica matemática confirmam que o bit é o mais pequeno bloco de informação compreensível e distinguível, e que pode servir para a construção de blocos de informação mais complexos, mais compreensíveis e distinguíveis. Em grupos de oito, os bits formam a unidade mais importante na representação de informação - o byte - através da qual é, por exemplo, representada a capacidade de armazenamento e memória.'
	}
	msgs[4] = {
		'en' : 'The binary coded decimal or binary encoding is a numbering system widely used in data processing, as well as in mathematics, electronics and digital systems.',
		'es' : 'El código binario decimal o codificación binaria es un sistema de numeración utilizado en el procesamiento de datos, así como en las matemáticas, la electrónica y los sistemas digitales.',	
		'pt' : 'A codificação binária decimal ou codificação binária é um sistema de numeração muito utilizado na Informática, assim como na Matemática, e em sistemas digitais eletrônicos.'
	}
	msgs[5] = {
		'en' : 'Unlike ordinary algebra of real variables which can take values ​​in infinite range, the Boolean variables can only take a finite number of values​​.',
		'es' : 'A diferencia de álgebra ordinaria de las variables reales que pueden tomar valores en el rango infinito, las variables booleanas sólo pueden tomar un número finito de valores.',
		'pt' : 'Diferentemente da álgebra ordinária dos reais, onde as variáveis podem assumir valores no intervalo infinito, as variáveis Booleanas só podem assumir um número finito de valores.'
	}
	msgs[6] = {
		'en' : 'The binary system is the alphabet of electronic computers, the basic language for which all information is translated and in which they are stored and used inside a computer.',
		'es' : 'El sistema binario es el alfabeto de equipos electrónicos, el lenguaje básico para el que toda la información se traduce y en el que se almacena y se utiliza dentro de una computadora.',
		'pt' : 'O sistema binário é o alfabeto dos computadores eletrônicos, a base da linguagem para a qual todas as informações são traduzidas e na qual são armazenadas e utilizadas no interior de um computador.'
	}
	msgs[10] = {
		'en' : 'THE END!',
		'es' : 'FIN!',
		'pt' : 'FIM!'
	}
	
	switch(lang){
		case "en":
			var objs = new Array("#menu_instrucoes .balao_principal p","#menu_instrucoes2 .balao_principal p:eq(0)","#menu_instrucoes2 .balao_principal p[id=instru_1]", "#menu_instrucoes2 .balao_principal p[id=instru_2]","#menu_creditos .balao_principal","#inicio","#creditos", "#lets_play", "#txt_pontuacao");
			limpaText(objs);
			setObjs(intro, credits, buttons, texts, "en");
			pauseBtn = "./css/imagens/pause_game_ico_en.png";
			unpauseBtn = "./css/imagens/unpause_game_ico_en.png";
			break;
		case "es":
			var objs = new Array("#menu_instrucoes .balao_principal p","#menu_instrucoes2 .balao_principal p:eq(0)","#menu_instrucoes2 .balao_principal p[id=instru_1]", "#menu_instrucoes2 .balao_principal p[id=instru_2]","#menu_creditos .balao_principal","#inicio","#creditos", "#lets_play", "#txt_pontuacao");
			limpaText(objs);
			setObjs(intro, credits, buttons, texts, "es");
			pauseBtn = "./css/imagens/pause_game_ico.png";
			unpauseBtn = "./css/imagens/unpause_game_ico_es.png";
			break;
		default:
			var objs = new Array("#menu_instrucoes .balao_principal p","#menu_instrucoes2 .balao_principal p:eq(0)","#menu_instrucoes2 .balao_principal p[id=instru_1]", "#menu_instrucoes2 .balao_principal p[id=instru_2]","#menu_creditos .balao_principal","#inicio","#creditos", "#lets_play", "#txt_pontuacao");
			limpaText(objs);
			setObjs(intro, credits, buttons, texts, "pt");
			pauseBtn = "./css/imagens/pause_game_ico.png";
			unpauseBtn = "./css/imagens/unpause_game_ico.png";
			break;
	}
	$("#pausa_jogo input").attr("src",pauseBtn);
}

function limpaText(objs){
	var length = objs.length;
	for(var i = 0; i<length; i++){
		$(objs[i]).empty();
	}
}
function setObjs(intro, credits, buttons, texts, lang){
	$("#menu_instrucoes .balao_principal p").text(intro[1][lang]);
	$("#menu_instrucoes2 .balao_principal p:eq(0)").text(intro[2][lang]);
	$("#menu_instrucoes2 .balao_principal p[id=instru_1]").append(intro[2][1][lang]);
	$("#menu_instrucoes2 .balao_principal p[id=instru_2]").append(intro[2][2][lang]);
	$("#menu_creditos .balao_principal").append(credits[0][lang]);
	$("#inicio").append("<p>"+buttons[0][lang]+"</p>");
	$("#creditos").append("<p>"+buttons[1][lang]+"</p>");
	$("#lets_play").append("<p>"+buttons[2][lang]+"</p>");
	$("#txt_pontuacao").text(texts[0][lang]);
}
function getLang(){
	if($.cookie("lang")){
		return $.cookie("lang");
	}else{
		alert("Ative os cookies de seu navegador!");
	}
}