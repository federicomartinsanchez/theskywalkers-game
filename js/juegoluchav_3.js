//contexto de canvas
ctx = null;
pinta = null;
//timers para animaciones de movimiento
timer1 = 0;
timer2 = 0;
dormido = false;
//variables de contenido multimedia
var sound = null;
var sableluke = null;
var sablevader = null;
//cambio de tama�o de video
var anchop = screen.width;
var altop = screen.height;
var vizq = null;
var vder = null;

var anchovi = null;
var altovi = null;

var anchovd = null;
var altovd = null;


var plataforma1 = {
    x: 150,
    y: 400
}
var plataforma2 = {
    u: 400,
    v: 250
}
//variables para cambiar el movimiento de las plataformas
deltax = 1;
deltau = 1;
//Luke
var personaje1 = {
    x1: 100,
    y1: 400,
    largo: 100,
    ancho: 70,
    vida: 10,
    ultimadireccion: 'derecha',
    saltando: false,
    pegando: false,
    movimientoi: 'parado',
    movimientod: 'parado'
}
//Darthvader
var personaje2 = {
    x2: 500,
    y2: 400,
    largo: 100,
    ancho: 70,
    vida: 10,
    ultimadireccion: 'izquierda',
    saltando: false,
    pegando: false,
    movimientoi: 'parado',
    movimientod: 'parado'
}
//Ataque de Luke
var porrazo1 = {
    x: 0,
    y: 0,
    ancho: 0,
    largo: 0
}
//Ataque de Darthvader
var porrazo2 = {
    x: 0,
    y: 0,
    ancho: 0,
    largo: 0
}

function init() {

    im1 = new Image();
    im1.src = "./img/lukequietor.png"; //Personaje1 parado
    im2 = new Image();
    im2.src = "./img/lukesaltando.png"; //Personaje1 saltando
    im3 = new Image();
    im3.src = "./img/vaderquietor.png"; //Personaje2 parado
    im4 = new Image();
    im4.src = "./img/vadersaltando.png"; //Personaje2 saltando
    im5 = new Image();
    im5.src = "./img/vaderiz2.png"; //Personaje2 movimiento izquierda
    im6 = new Image();
    im6.src = "./img/movluke.png"; //Personaje1 movimiento derecha
    im7 = new Image();
    im7.src = "./img/vaderder.png"; //Personaje2 movimiento derecha
    im8 = new Image();
    im8.src = "./img/movlukeizq.png"; //Personaje1 movimiento izquierda
    im9 = new Image();
    im9.src = "./img/porrazosimpleluke.png"; //Personaje1 porrazo derecha
    im10 = new Image();
    im10.src = "./img/porrazosimplelukeizquierda.png"; //Personaje1 porrazo izquierda
    im11 = new Image();
    im11.src = "./img/vaderporrazoderecha.png"; //Personaje2 porrazo derecha
    im12 = new Image();
    im12.src = "./img/vaderporrazoizquierda.png"; //Personaje2 porrazo izquierda
    im13 = new Image();
    im13.src = "./img/sablelukefijo.png"; //Barra fija de vida Personaje1
    im14 = new Image();
    im14.src = "./img/sablelukevida.png"; //Barra de vida Personaje1
    im15 = new Image();
    im15.src = "./img/sablevaderfijo.png"; //Barra fija de vida Personaje2
    im16 = new Image();
    im16.src = "./img/sablevadervida.png"; //Barra de vida Personaje2
    im17 = new Image();
    im17.src = "./img/plataformanave.png"; //Plataforma nave

    //eventos de las teclas
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyDown);
    canvas = document.getElementById('myCanvas');
    //videos
    vizq = document.getElementById("vi");
    vder = document.getElementById('vd');

    anchovi = vizq.videoWidth;
    altovi = vizq.videoHeight;

    anchovd = vder.videowidth;
    altovd = vder.videoHeight;
    //sonidos
    sound = document.getElementById('soundtrack');
    sableluke = document.getElementById('sable1');
    sablevader = document.getElementById('sable2');

    if (canvas && canvas.getContext) {

        ctx = canvas.getContext('2d');
        pinta = setInterval(Pintar, 10);

    } else {
        alert("Su navegador no es compatible con esta app.");
    }


}
window.onload = init;

//Funcion para pintar el canvas
function Pintar() {

    MovimientoPlataformas();
    MovimientoPersonaje();
    ctx.clearRect(0, 0, 800, 600);
    DibujaPlataformas();
    DibujarPersonaje();
    dibujarVida();

}
//Funcion que calcula y dibuja las vidas de los personajes
function dibujarVida() {
    var vidacalc1 = (personaje1.vida) / 10;
    var vidacalc2 = (personaje2.vida) / 10;
    ctx.drawImage(im14, 90, 16, 293 * vidacalc1, 49);
    ctx.drawImage(im13, 10, 20, 80, 40);
    ctx.drawImage(im16, 501, 27, 293 * vidacalc2, 40);
    ctx.drawImage(im15, 425, 20, 80, 40);
}
//Funcion que dibuja las plataformas
function DibujaPlataformas() {

    ctx.fillStyle = "#CC6600";

    ctx.drawImage(im17, plataforma1.x, plataforma1.y - 20, 200, 60);
    ctx.drawImage(im17, plataforma2.u, plataforma2.v - 20, 200, 60);
    ctx.strokeStyle = "#A3A375";
    ctx.stroke();

}
//Funcion que mueve las plataformas
function MovimientoPlataformas() {
    if (plataforma1.x + deltax > 600 || plataforma1.x + deltax < 0)
        deltax = -deltax;

    if (plataforma2.u + deltau > 600 || plataforma2.u + deltau < 0)
        deltau = -deltau;

    plataforma1.x = plataforma1.x + deltax;
    plataforma2.u = plataforma2.u + deltau;
}
//Funci�n que actualiza la posici�n de los personajes
function MovimientoPersonaje() {
    //PERSONAJE1

    //Colisi�n: Comprobamos si ha sido atacado por el personaje2
    if (personaje1.x1 + personaje1.ancho >= porrazo2.x && personaje1.x1 <= porrazo2.x + porrazo2.ancho && personaje1.y1 >= porrazo2.y && personaje1.y1 <= porrazo2.y + porrazo2.largo) {
        personaje1.x1 = 50;
        personaje1.y1 = 50;
        personaje1.vida--;
        //Si muere:
        if (personaje1.vida == 0) {
            //reseteo de los valores
            personaje1.vida = 10;
            personaje2.vida = 10;
            personaje1.x1 = 100;
            personaje1.y1 = 400;
            personaje2.x2 = 500;
            personaje2.y2 = 400
            personaje1.movimientod = 'parado';
            personaje1.movimientoi = 'parado';
            personaje2.movimientod = 'parado';
            personaje2.movimientoi = 'parado';
            //Reproducimos el video del perdedor
            pauseSoundtrack();
            playVidizq();
            dormido = true;
            setTimeout(function() {
                window.location.reload();
                dormido = false;
            }, 7000);
        }
    } else {
        //Si no esta saltando, el personaje cae.
        if (!personaje1.saltando) {
            if (personaje1.y1 < 500) {
                //Comprobamos si cae sobre alguna plataforma, si lo hace, contrarestamos la gravedad
                if (personaje1.y1 == 315 && personaje1.x1 > plataforma1.x - 35 && personaje1.x1 < plataforma1.x + 185) {
                    personaje1.y1 = personaje1.y1 - 5;
                } else if (personaje1.y1 == 165 && personaje1.x1 > plataforma2.u - 35 && personaje1.x1 < plataforma2.u + 185) {
                    personaje1.y1 = personaje1.y1 - 5;
                }
                personaje1.y1 = personaje1.y1 + 5;
            }
        }
        //Si salta contrarestamos la gravedad
        if (personaje1.saltando) {
            if (personaje1.y1 > 0) {
                personaje1.y1 = personaje1.y1 - 5;
            }
        }
        //Movimiento hacia la izquierda
        if (personaje1.movimientoi == 'izquierda') {
            personaje1.ultimadireccion = 'izquierda';
            if (personaje1.x1 > 5) {
                personaje1.x1 = personaje1.x1 - 5;
                timer1++;

            }
        }
        //Movimiento hacia la derecha
        if (personaje1.movimientod == 'derecha') {
            personaje1.ultimadireccion = 'derecha';
            if (personaje1.x1 < 730) {
                personaje1.x1 = personaje1.x1 + 5;
                timer1++;
            }
        }
        //Si ataca le paramos y reproducimos el sonido del sable-laser
        if (personaje1.pegando == true) {
            personaje1.movimientoi = 'parado';
            personaje1.movimientod = 'parado';
            playSable1();
            //Si su ultima direccion fue la izquierda, entonces ataca hacia la izquierda
            if (personaje1.ultimadireccion == 'izquierda') {
                porrazo1.ancho = personaje1.ancho + 70;
                porrazo1.largo = personaje1.largo;
                porrazo1.x = personaje1.x1 - 70;
                porrazo1.y = personaje1.y1;


            }
            //Si su ultima direccion fue la derecha, entonces ataca hacia la derecha
            else if (personaje1.ultimadireccion == 'derecha') {
                porrazo1.ancho = personaje1.ancho + 70;
                porrazo1.largo = personaje1.largo;
                porrazo1.x = personaje1.x1;
                porrazo1.y = personaje1.y1;
            }
            //Una vez termina de atacar, resetamos el ataque
            setTimeout(function() {
                porrazo1.x = -50;
                porrazo1.y = -50;
                porrazo1.ancho = 0;
                porrazo1.largo = 0;
                personaje1.pegando = false
            }, 350);

        }

    }
    //PERSONAJE2

    //Colisi�n: Comprobamos si ha sido atacado por el personaje2
    if (personaje2.x2 + personaje2.ancho >= porrazo1.x && personaje2.x2 <= porrazo1.x + porrazo1.ancho && personaje2.y2 >= porrazo1.y && personaje2.y2 <= porrazo1.y + porrazo1.largo) {
        personaje2.x2 = 730;
        personaje2.y2 = 50;
        personaje2.vida--;
        //Si muere:
        if (personaje2.vida == 0) {
            //reseteo de los valores
            personaje1.vida = 10;
            personaje2.vida = 10;
            personaje1.x1 = 100;
            personaje1.y1 = 400;
            personaje2.x2 = 500;
            personaje2.y2 = 400
            personaje1.movimientod = 'parado';
            personaje1.movimientoi = 'parado';
            personaje2.movimientod = 'parado';
            personaje2.movimientoi = 'parado';
            //Reproducimos el video del perdedor
            pauseSoundtrack();
            playVidder();
            dormido = true;
            setTimeout(function() {
                window.location.reload();
                dormido = false;
            }, 7000);
        }
    } else {
        //Si no esta saltando, el personaje cae.
        if (!personaje2.saltando) {
            if (personaje2.y2 < 500) {
                //Comprobamos si cae sobre alguna plataforma, si lo hace, contrarestamos la gravedad
                if (personaje2.y2 == 315 && personaje2.x2 > plataforma1.x - 35 && personaje2.x2 < plataforma1.x + 170) {
                    personaje2.y2 = personaje2.y2 - 5;
                } else if (personaje2.y2 == 165 && personaje2.x2 > plataforma2.u - 35 && personaje2.x2 < plataforma2.u + 170) {
                    personaje2.y2 = personaje2.y2 - 5;
                }
                personaje2.y2 = personaje2.y2 + 5;
            }
        }
        //Si salta contrarestamos la gravedad
        if (personaje2.saltando) {
            if (personaje2.y2 > 0) {
                personaje2.y2 = personaje2.y2 - 5;
            }
        }
        //Movimiento hacia la izquierda
        if (personaje2.movimientoi == 'izquierda') {
            personaje2.ultimadireccion = 'izquierda';
            if (personaje2.x2 > 5) {
                personaje2.x2 = personaje2.x2 - 5;
                timer2++;
            }
        }
        //Movimiento hacia la derecha
        if (personaje2.movimientod == 'derecha') {
            personaje2.ultimadireccion = 'derecha';
            if (personaje2.x2 < 730) {
                personaje2.x2 = personaje2.x2 + 5;
                timer2++;
            }
        }
        //Si ataca le paramos y reproducimos el sonido del sable-laser
        if (personaje2.pegando == true) {
            personaje2.movimientoi = 'parado';
            personaje2.movimientod = 'parado';
            playSable2();
            //Si su ultima direccion fue la izquierda, entonces ataca hacia la izquierda
            if (personaje2.ultimadireccion == 'izquierda') {
                porrazo2.ancho = personaje2.ancho + 70;
                porrazo2.largo = personaje2.largo;
                porrazo2.x = personaje2.x2 - 70;
                porrazo2.y = personaje2.y2;



            }
            //Si su ultima direccion fue la derecha, entonces ataca hacia la derecha
            else if (personaje2.ultimadireccion == 'derecha') {
                porrazo2.ancho = personaje2.ancho + 70;
                porrazo2.largo = personaje2.largo;
                porrazo2.x = personaje2.x2;
                porrazo2.y = personaje2.y2;
            }
            setTimeout(function() {
                porrazo2.x = -50;
                porrazo2.y = -50;
                porrazo2.ancho = 0;
                porrazo2.largo = 0;
                personaje2.pegando = false;
            }, 350);
        }

    }

}
//Funci�n que dibuja los personajes
function DibujarPersonaje() {
    //PERSONAJE1
    if (personaje1.saltando == true) {
        ctx.drawImage(im2, personaje1.x1, personaje1.y1, 70, 100);
    } //Para el salto
    else if (personaje1.movimientoi == 'izquierda') {
        ctx.drawImage(im8, (~~(timer1 / 8) % 4) * 52, 0, 47, 73, personaje1.x1, personaje1.y1 - 20, 80, 110);
    } //MOvimiento hacia la izquierda
    else if (personaje1.movimientod == 'derecha') {
        ctx.drawImage(im6, (~~(timer1 / 8) % 4) * 52, 0, 46, 73, personaje1.x1 - 20, personaje1.y1 - 20, 80, 110);
    } //Movimiento hacia la derecha
    else if (personaje1.pegando == true && personaje1.ultimadireccion == 'derecha') {
        ctx.drawImage(im9, personaje1.x1, personaje1.y1 - 10, 145, 110);
    } //Ataque hacia la derecha
    else if (personaje1.pegando == true && personaje1.ultimadireccion == 'izquierda') {
        ctx.drawImage(im10, personaje1.x1 - 80, personaje1.y1, 150, 100);
    } //Ataque hacia la izquierda
    else {
        ctx.drawImage(im1, personaje1.x1, personaje1.y1, 70, 100);
    } //Parado
    //PERSONAJE2
    if (personaje2.saltando == true) {
        ctx.drawImage(im4, personaje2.x2, personaje2.y2, 85, 120);
    } //Para el salto
    else if (personaje2.movimientoi == 'izquierda') {
        ctx.drawImage(im5, (~~(timer2 / 15) % 2) * 67, 0, 67, 89, personaje2.x2, personaje2.y2 - 30, 100, 130);
    } //Movimiento hacia la izquierda
    else if (personaje2.movimientod == 'derecha') {
        ctx.drawImage(im7, (~~(timer2 / 15) % 2) * 66, 0, 66, 89, personaje2.x2, personaje2.y2 - 30, 100, 130);
    } //Movimiento hacia la derecha
    else if (personaje2.pegando == true && personaje2.ultimadireccion == 'derecha') {
        ctx.drawImage(im11, personaje2.x2, personaje2.y2 - 10, 145, 110);
    } //Ataque hacia la derecha
    else if (personaje2.pegando == true && personaje2.ultimadireccion == 'izquierda') {
        ctx.drawImage(im12, personaje2.x2 - 80, personaje2.y2, 150, 100);
    } //Ataque hacia la izquierda
    else {
        ctx.drawImage(im3, personaje2.x2, personaje2.y2, 70, 100);
    } //Parado
}
//Funciones que actualizan el salto del personaje1
function jump1() {

    if (personaje1.y1 == 500 || personaje1.y1 == 315 || personaje1.y1 == 165) {
        personaje1.saltando = true;
        setTimeout(land1, 500);
    }
}

function land1() {
    personaje1.saltando = false;
}
//Funciones que actualizan el salto del personaje2
function jump2() {

    if (personaje2.y2 == 500 || personaje2.y2 == 315 || personaje2.y2 == 165) {
        personaje2.saltando = true;
        setTimeout(land2, 500);
    }
}

function land2() {
    personaje2.saltando = false;
}
//Funcion de las de las teclas al pulsarlas
function onKeyDown(e) {
    var pulsada = e;
    //personaje1
    if (dormido == false) {
        if (pulsada.keyCode == 65) personaje1.movimientoi = 'izquierda';
        if (pulsada.keyCode == 68) personaje1.movimientod = 'derecha';
        if (pulsada.keyCode == 87) jump1();
        if (pulsada.keyCode == 81) personaje1.pegando = true;
        //personaje2
        if (pulsada.keyCode == 37) personaje2.movimientoi = 'izquierda';
        if (pulsada.keyCode == 39) personaje2.movimientod = 'derecha';
        if (pulsada.keyCode == 38) jump2();
        if (pulsada.keyCode == 77) personaje2.pegando = true;
    }
}
//Funcion de las teclas al soltarlas
function onKeyUp(e) {
    var soltada = e;
    if (dormido == false) {
        //personaje1
        if (soltada.keyCode == 65) personaje1.movimientoi = 'parado';
        if (soltada.keyCode == 68) personaje1.movimientod = 'parado';

        //personaje2
        if (soltada.keyCode == 37) personaje2.movimientoi = 'parado';
        if (soltada.keyCode == 39) personaje2.movimientod = 'parado';

    }
}

//VIDEOS
function playVidizq() {
    anchovi = anchop;
    altovi = altop;
    vizq.play();
}

function playVidder() {
    anchovd = anchop;
    altovd = altop;
    vder.play();
}

function playSoundtrack() {
    sound.play();
}

function pauseSoundtrack() {
    sound.pause();
}

function playSable1() {
    sableluke.play();
}

function playSable2() {
    sablevader.play();
}
