var num_div = 0; // Variável com o número de blocos na tela.
var interval; //Variável para o intervalo do surgimento das barras.
var time; //Variável para o cronômetro.
var min;
var seg;
var gamePaused = false; //Variável para o estado do jogo.
var nivel = 1; //Variável apra o nível.
var pontuacao; //Variável para a pontuação.
var randedMsg = 0; //Variável para a mensagem exibida ao passar de nível.

var Game = {
    /*
        Inicia o jogo.
    */
    start: function(){
        Game.createBitLine();
        Game.time();
        Game.atualizar_funcoes();
        Game.startMusic();
        
        pontuacao = 0;
        
        Game.atualizar_pontuacao();
		
        interval = setInterval(function(){
            total_barras = 0;

            $(".linha_bit").each(function(){
                     total_barras++;
            }); 
            
            if(total_barras == 7){
                Game.gameOver()
                clearInterval(interval);
            } else {
                if(nivel == 1){
                    Game.createBitLine();
                } else if(nivel == 2){
                    Game.createInvertedBitLine();
                } else if(nivel == 3){
                    var num = Math.floor((Math.random()*2)+1);
                    if(num == 1){
                        Game.createBitLine();
                    } else {
                        Game.createInvertedBitLine();
                    }
                }
                total_barras = 0;
            }
        }, 10000);
    },
    
    /*
        Cria o bloco dos bits onde o resultado deve ser digitado.
    */      
    createBitLine: function(){
        var id = num_div++;
        var parent_div = $("<div>").addClass('linha_bit').attr('id', 'linha_'+id);
        
        var resultado = Math.floor((Math.random()*255)+1); //numero entre 1 e 255
        var binario_resultado = Game.numberToBinarie(resultado);
        for(var i = 0; i < binario_resultado.length; i++){
            var bit = $('<div>').addClass('bit');
            var p = $('<p>').html(binario_resultado[i]);
            
            p.appendTo(bit);
            bit.appendTo(parent_div);
        }
        
        var input_result = $('<input>').addClass("resultado").attr({'type': 'hidden'}).val(resultado);
        parent_div.append(input_result);
        var igual = $('<div>').addClass('bit_out igual').append($('<p>').html("="));
        var input = $('<input>').addClass('resultado_player_input').attr({'type': 'text', 'maxlength': '3', 'placeholder': '0'});
        var resultado = $('<div>').addClass('bit_out resultado_payer').append(input);
        
        parent_div.append(igual);
        parent_div.append(resultado);
        
        $("#area_game").append(parent_div);
        Game.moveCreatedLine(id);
        Game.atualizar_funcoes();
    },
    
    /*
        Cria o bloco dos bits selecionáveis.
    */  
    createInvertedBitLine: function(){
        var id = num_div++;
        var parent_div = $("<div>").addClass('linha_bit').attr('id', 'linha_'+id);
        
        var resultado = Math.floor((Math.random()*255)+1); //numero entre 1 e 255
        var binario_resultado = Game.numberToBinarie(resultado);
        var valores_bit = 128;
        for(var i = 0; i < binario_resultado.length; i++){
            var bit = $('<div>').addClass('bit manipulavel').attr('valor', valores_bit);
            var p = $('<p>').html(0);
            
            valores_bit = valores_bit/2;
             
            p.appendTo(bit);
            bit.appendTo(parent_div);
        }
        
        var input_result = $('<input>').addClass("resultado").attr({'type': 'hidden'}).val(resultado);
        parent_div.append(input_result);
        var igual = $('<div>').addClass('bit_out igual').append($('<p>').html("="));
        var input = $('<input>').addClass('resultado_player_input').attr({'type': 'text', 'maxlength': '3', 'placeholder': '0', 'disabled':'disabled'}).val(resultado);
        var resultado = $('<div>').addClass('bit_out resultado_payer').append(input);
        
        parent_div.append(igual);
        parent_div.append(resultado);
        
        $("#area_game").append(parent_div);
        Game.moveCreatedLine(id);
        Game.atualizar_funcoes(); 
    },
	
    /*
        Move os blocos criados.
    */
    moveCreatedLine: function(id){
        var this_position = $('#linha_'+id).position();

        if($('#linha_'+id).prev('#fundo').length != 0){
                var div_position = $('#fundo').position();
        } else {
                var div_position = $('#linha_'+id).prev('.linha_bit').position();
        }
        var new_position = (div_position.top - this_position.top) - ($('#linha_'+id).height() + 3);

        $('#linha_'+id).animate({
            top: "+="+new_position
        }, 1500);
    },
    
    /*
        Reorganiza os blocos existentes na tela.
    */
    moveBitLine: function(){
        $(".linha_bit").each(function(){
            var this_position = $(this).position();
			var next_position = $(this).prev('div').position();
            var new_position = (next_position.top - this_position.top) - ($(this).height() + 3);
            
            $(this).animate({
                top: "+="+new_position
            }, {
                duration: 1500,
                    complete: function(){
                            Game.atualizar_funcoes();
                    }
            });
        });
    },
    
    /*
        Deleta blocos específicos.
    */   
    deleteBitLine: function(id){
        var next_div = $("#"+id).next();
        var next_location = $("#"+id).position().top;
		
        var x = $("#"+id).next();

        while (x.length) {
            $(x).animate({
                    top: x.prev().position().top
            }, 1500);
            x = x.next();
        }

        $("#"+id).remove();
		
        Game.verifica_resultado();
    },
    
    /*
        Deleta todos os blocos da tela.
    */    
    deleteAllBitLines: function(){
        $('.linha_bit').each(function(){
            var id = $(this).attr('id');
            Game.deleteBitLine(id);
        });
    },
      
    numberToBinarie: function(num){
        var bin = new Array();
        var n = 0;
        while(num != 0){
            bin[n] = num%2;
            num = Math.floor(num/2);
            n++;
        }
        
        if(bin.length < 8){
            while(bin.length < 8){
                bin[bin.length] = 0;
            }
        }
        
        return bin.reverse();
    },
    
    time: function(){
        min = 00;
        seg = 00;
        
        $("#time").find('.minutes').html("0");
        $("#time").find('.seconds').html("00");
        
        time = setInterval(function() {
            seg++;
            if (seg + 1 > 59) {
                seg = 0;
                min++;
            }
            
            if(seg < 10){
                seg = '0'+seg;
            }
            
            $("#time").find('.minutes').html(min);
            $("#time").find('.seconds').html(seg);
            
            if(min == 2 && nivel == 1){
                Game.nextLevel();
            } else if (min == 3 && nivel == 2){
            	Game.nextLevel();
            } else if(min == 4 && nivel==3){
            	Game.nextLevel();
            } else if(min > 5 && nivel > 3){
            	Game.end();
            }
            
        }, 1000);
    },
    
    /*
        Verifica o resultado do valor do input com o valor da bit line.
    */        
    verifica_resultado: function(){
        $(".resultado_player_input").unbind('click');
        $(".resultado_player_input").keyup(function(){
            var resultado_certo = $(this).parent().parent().find('.resultado').val();
            var resultado_player = $(this).val();

            if(resultado_player == resultado_certo){
                pontuacao += parseInt(resultado_certo);
                Game.atualizar_pontuacao();
                Game.hitMusic();
                Game.deleteBitLine($(this).parent().parent().attr('id'));
            }
        });

        $(".manipulavel").unbind('click');
        $(".manipulavel").click(function(){
            var valor = $(this).find('p').html();
            if(valor == 0){
                $(this).find('p').html(1);
            } else {
                $(this).find('p').html(0);
            }

            var resultado = 0;
            $(".manipulavel").each(function(){
                resultado += (parseInt($(this).attr('valor')) * parseInt($(this).find('p').html()));
            });

            if(resultado == $(this).parent().find('.resultado').val()){
                pontuacao += parseInt(resultado);
                Game.atualizar_pontuacao();
                Game.hitMusic();
                Game.deleteBitLine($(this).parent().attr('id'));
            }
        });
    },

    atualizar_funcoes: function(){
        Game.verifica_resultado();
    },

    atualizar_pontuacao: function(){
        $('#num_pontuacao').html(pontuacao);
    },
    
    startMusic: function(){ 
    	soundNum = 0;
    	while(soundNum == 0){
    		soundNum = Math.floor((Math.random()*2) + 1);
    	}
    	
    	$("#controleSom").prop("volume", 1.0);
    	
    	var nav = BrowserDetect.browser;
    	if(nav == "Explorer" || nav == "Safari"){
    		$("#controleSom").attr("src","./music/mp3/sound"+soundNum+".mp3");
    	}else{
    		$("#controleSom").attr("src","./music/ogg/sound"+soundNum+".ogg");
    	}
    	
    	$("#controleSom").attr("autoplay","");
    	$("#controleSom").attr("loop","");
    	
    },
    
    stopMusic: function(){
    	$("#controleSom")[0].pause();
    },
    
    resumeMusic: function(){
    	$("#controleSom")[0].play();
    },
    
    hitMusic: function(){
    	var nav = BrowserDetect.browser;
    	if(nav == "Explorer" || nav == "Safari"){
    		$("#hitSom").attr("src","./music/mp3/acerto_sound.mp3");
    	}else{
    		$("#hitSom").attr("src","./music/ogg/acerto_sound.ogg");
    	}
    	$("#hitSom")[0].play();
    },
    
    gamePause: function(){
    	Game.stopMusic();
    	clearInterval(time);
    	clearInterval(interval);
    	gamePaused = true;
        
        $(".linha_bit").hide();
    },
    
    gameUnpause: function(){
    	Game.resumeMusic();
    	time = setInterval(function() {
            seg++;
            if (seg + 1 > 59) {
                seg = 0;
                min++;
            }
            
            $("#time").find('.minutes').html(min);
            $("#time").find('.seconds').html(seg);
            
            if(min == 2 && nivel == 1){
                Game.nextLevel();
            } else if (min == 4 && nivel == 2){
            	Game.nextLevel();
            } else if(min == 6 && nivel==3){
            	Game.nextLevel();
            } else if(min > 8 && nivel > 3){
            	Game.end();
            }
            
        }, 1000);
    	
    	interval = setInterval(function(){
            total_barras = 0;

            $(".linha_bit").each(function(){
                     total_barras++;
            }); 
            
            if(total_barras == 7){
                Game.gameOver()
                clearInterval(interval);
            } else {
                if(nivel == 1){
                    Game.createBitLine();
                } else if(nivel == 2){
                    Game.createInvertedBitLine();
                } else if(nivel == 3){
                    var num = Math.floor((Math.random()*2)+1);
                    if(num == 1){
                        Game.createBitLine();
                    } else {
                        Game.createInvertedBitLine();
                    }
                }
                total_barras = 0;
            }
        }, 10000);
    	gamePaused = false;
        $('.linha_bit').show();
    },
            
    nextLevel: function(){
    	if(min == 2 && nivel == 1){
            nivel = 2;
            Game.showEnigma();
            
        } else if (min == 4 && nivel == 2){
            nivel = 3;
            Game.showEnigma();
        } else{
            nivel = 4;
            Game.showEnigma();
        }
    	
    	var nav = BrowserDetect.browser;
    	if(nav == "Explorer" || nav == "Safari"){
    		$("#nxtLvl").attr("src", "./music/mp3/next_lvl.mp3");
    	}else{
    		$("#nxtLvl").attr("src","./music/ogg/next_lvl.ogg");
    	}
    	$("#nxtLvl")[0].play();
    },
    
    gameOver: function(){
    	Game.gamePause();
    	var nav = BrowserDetect.browser;
    	if(nav == "Explorer" || nav == "Safari"){
    		$("#controleSom").attr("src", "./music/mp3/game_over.mp3");
    		$("#controleSom").removeAttr("loop");
    	}else{
    		$("#controleSom").attr("src","./music/ogg/game_over.ogg");
    		$("#controleSom").removeAttr("loop");
    	}
    	$("#controleSom")[0].play();
    	
    	var msg = "<div id='game_over'></div>" +
    			"<div id='game_over_txt' onClick='reload()'>GAME OVER!</div>";
    	
    	$(msg).appendTo("#jogo");
    },
    
    showEnigma: function(){
    	Game.gamePause();
    	randMsg = (Math.floor((Math.random()*5) + 1));
    	while(randMsg == randedMsg){
    		randMsg = (Math.floor((Math.random()*5) + 1));
    	}
    	randedMsg = randMsg;
    	var container = "<div class='enigma'><img src='./css/imagens/enigma.png'><p>"+msgs[randMsg][getLang()]+"</p><div class='btn_avancar' name='avancar_nivel' onClick='nxtNivel()'><img src='css/imagens/seta_forward.png'/></div></div>";
    	$(container).appendTo("#jogo");
    },
    
    closeEnigma: function(){
    	$(".enigma").remove();
    },
    
    end: function(){
    	if($("#jogo").find(".enigma").length == 0){
        	Game.gamePause();
        	var nav = BrowserDetect.browser;
        	if(nav == "Internet Explorer" || nav == "Safari"){
        		$("#nxtLvl").attr("src", "./music/ogg/final_music.mp3");
        	}else{
        		$("#nxtLvl").attr("src","./music/ogg/final_music.ogg");
        	}
        	$("#nxtLvl")[0].play();
        	
        	var msg = "<div id='game_over'></div>" +
    		"<div id='game_over_txt' onClick='reload()'>"+msgs[10][getLang()]+"</div>";
    		$(msg).appendTo("#jogo");
    	}
    }
};


$(document).ready(function(){
	var musicaPausada = false;
		$("#contrl_musica").click(function (){
			if(!gamePaused){
				if(!musicaPausada){
					$(this).attr("src","./css/imagens/ico_sem_som.png");
					Game.stopMusic();
					musicaPausada = true;
				}else if(musicaPausada){
					$(this).attr("src","./css/imagens/ico_som.png");
					Game.resumeMusic();
					musicaPausada = false;
				}
			}
	});
		
	var jogoPausado = false;
	$("#pausa_jogo").click(function(){
		if(!jogoPausado){
			$("#pausa_jogo input[type=image]").attr("src",unpauseBtn);
			Game.gamePause();
			jogoPausado = true;
		}else if(jogoPausado){
			$("#pausa_jogo input[type=image]").attr("src",pauseBtn);
			Game.gameUnpause();
			jogoPausado = false;
		}
	});
});
function reload(){
	location.reload();
}
function nxtNivel(){
	Game.closeEnigma();
	Game.gameUnpause();
}