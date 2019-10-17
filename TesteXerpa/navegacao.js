$(document).ready(function () {
    
    $('#btn-navegar').on('click', function () {
        var inicialx = parseInt($("#pinicial").val().substr(0,1));
        var inicialy = parseInt($("#pinicial").val().substr(1,1));
        var direcao = $("#pinicial").val().substr(2,1).toUpperCase();
        var planaltox = parseInt($("#planalto").val().substr(0,1));
        var planaltoy = parseInt($("#planalto").val().substr(1,1));

        $("#resultado").css("visibility", "hidden");
        
        Navegar([inicialx,inicialy],direcao, [planaltox,planaltoy],$("#coordenadas").val().toLowerCase());

        return false;
    });

    $('#btn-left').on('click', function () {
        return AdicionarCoordenada("L");
    });

    $('#btn-right').on('click', function () {
        return AdicionarCoordenada("R");
    });

    $('#btn-move').on('click', function () {
        return AdicionarCoordenada("M");
    });

});

function AdicionarCoordenada(acao){
    var coordenada = $("#coordenadas").val();
    coordenada = coordenada.concat(acao);

    $("#coordenadas").val(coordenada);

    return false;
}

function Navegar(localizacao, direcao, planalto,comandos) {
    
    var localizacao = (localizacao === undefined) ? [0, 0] : localizacao;
    var direcao = (direcao === undefined) ? 'N' : direcao;
    var planalto = (planalto === undefined) ? [5,5] : planalto;
    var direcoes = ['N', 'E', 'S', 'W'];
    var novaLocalizacao = (localizacao === undefined) ? [0, 0] : localizacao;

    Comandar()

    function Comandar() {
        for(var i = 0; i < comandos.length; i++) {
            var comando = comandos[i];
            if (comando === 'm') {
                Mover();
            } else if (comando === 'l' || comando === 'r') {
                Virar(comando);
            }
        }

        $("#resultado").css("visibility", "visible");
        $("#resultado").text("Localização final da nave: (" + novaLocalizacao + ", " + direcao +")");
    };


    function Mover() {
        var posicaoX = 0, posicaoY = 0;
        if (direcao === 'N') {
            posicaoY = 1;
        } else if (direcao === 'E') {
            posicaoX = 1;
        } else if (direcao === 'S') {
            posicaoY = -1;
        } else if (direcao === 'W') {
            posicaoX = -1;
        }
        
        novaLocalizacao = [localizacao[0] + posicaoX, localizacao[1] + posicaoY];
        
        localizacao = novaLocalizacao;
    }

    function Virar(comando) {
        var dir = DirecaoNumero(direcao);
        if (comando === 'l') {
            dir = (dir + 4 - 1) % 4;
        } else {
            dir = (dir + 1) % 4;
        }
        direcao = direcoes[dir];
    }

    function DirecaoNumero(dir) {
        for(var i = 0; i < 4; i++) {
            if (direcoes[i] === dir) return i;
        }
    }
}