var Game = {
    start: function(){
        Game.createBitLine();
        Game.time();
        Game.atualizar_funcoes();
        Game.startMusic();
        
        var interval = setInterval(function(){
            if($("#linha_5").length > 0){
                alert("GAME OVER");
                
                clearInterval(interval);
            } else {
                Game.createBitLine();
                Game.atualizar_funcoes();
            }
        }, 10000);
    },
            
    createBitLine: function(){
        var id = $(".linha_bit").length;
        var parent_div = $("<div>").addClass('linha_bit').attr('id', 'linha_'+id);
        
        var resultado = Math.floor((Math.random()*256)+1); //numero entre 1 e 100
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
        var input = $('<input>').addClass('resultado_player_input').attr({'type': 'text', 'maxlength': '3', 'value': '0'});
        var resultado = $('<div>').addClass('bit_out resultado_payer').append(input);
        
        parent_div.append(igual);
        parent_div.append(resultado);
        
        $("#area_game").append(parent_div);
        Game.moveBitLine();
    },
    
    moveBitLine: function(){
        $(".linha_bit").each(function(){
            var id = $(this).attr('id').substr(6, 7);
            var this_position = $(this).position();
            
            if($('#linha_0').length > 0 && id > 0){
                var div_position = $('#linha_'+(id -1)).position();   
            } else {
                var div_position = $('#fundo').position();
            }
            
            var new_position = (div_position.top - this_position.top) - ($(this).height() + 3);
            
            $(this).animate({
                top: "+="+new_position
            }, 1500);
            
            if($('#linha_0').length == 0 && id > 0){
                $(this).attr('id', 'linha_'+(id -1));
            }
        });
    },
            
    deleteBitLine: function(id){
        $("#"+id).remove();
        Game.moveBitLine();
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
        var min = 0;
        var seg = 0;
        
        $("#time").find('.minutes').html("0");
        $("#time").find('.seconds').html("0");
        
        var time = setInterval(function() {
            seg++;
            if (seg + 1 > 59) { 
                min++;
            }
            
            $("#time").find('.minutes').html(min);
            $("#time").find('.seconds').html(seg);
        }, 1000);
    },
            
    verifica_resultado: function(){
        $(".resultado_player_input").keyup(function(){
            var resultado_certo = $(this).parent().parent().find('.resultado').val();
            var resultado_player = $(this).val();
            
            if(resultado_player == resultado_certo){
                Game.deleteBitLine($(this).parent().parent().attr('id'));
            }
            
        });
    },
            
    atualizar_funcoes: function(){
        Game.verifica_resultado();
    },
    
    startMusic: function(){ 
    	soundNum = 0;
    	while(soundNum == 0){
    		soundNum = Math.floor(Math.random() * (5 - 1 + 1));
    	}
    	
    	$("#controleSom").attr("src","./music/ogg/sound"+soundNum+".ogg");
    	$("#controleSom").attr("autoplay","");
    	$("#controleSom").attr("loop","");
    },
         	
};


$(document).ready(function(){
});