
// Variaveis da Bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 15
let raio = diametro / 2

// Velocidade da Bolinha
let velocidadeXBolinha = 6
let velocidadeYBolinha = 6

// Variaveis da Raquete
let xRaquete = 5
let yRaquete = 150
let alturaRaquete = 90
let comprimentoRaquete = 10
let colidiu = false;

// Raquete Oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Placar
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons

let trilha;
let ponto;
let raquetada;

//Chance de Errar

let chanceDeErrar = 0;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    verificaColisaoRaquete(xRaquete,yRaquete);
    verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
    movimentaRaqueteOponente();
    marcaPonto();  
    incluiPlacar();
    calculaChanceDeErrar();

} 
    
    
  function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro)
}
  function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}
function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) 
        velocidadeXBolinha *= -1;
    
    if (yBolinha + raio > height || yBolinha - raio < 0) 
        velocidadeYBolinha *= -1;
    }
function mostraRaquete(x,y){
   rect(x, y, comprimentoRaquete, alturaRaquete);
  
}


function movimentaMinhaRaquete(){
  
  if (keyIsDown(UP_ARROW)){
    yRaquete -=10;
  }
if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
  }

}
  
function verificaColisaoRaquete(x,y){
 colidiu = collideRectCircle(x,y,comprimentoRaquete,alturaRaquete,xBolinha,yBolinha, raio);
  if(colidiu){
   velocidadeXBolinha *= -1; 
    raquetada.play();
  }
  
}

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
    yRaqueteOponente += velocidadeYOponente
    calculaChanceDeErrar();
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}


function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

