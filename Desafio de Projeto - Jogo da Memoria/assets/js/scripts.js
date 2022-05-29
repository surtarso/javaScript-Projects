const cards = document.querySelectorAll('.card');
const cardFace = document.querySelectorAll('.card-front');
const cardBack = document.querySelectorAll('.card-back');
const temasButton = document.getElementsByClassName('temas-button')[0];

let cartaFoiVirada = false; //saber se uma carta ja foi virada
let primeiroClick, segundoClick; //primeiro e segundo clique em cartas
let travaClick = false; //nao deixar virar mais cartas
let numeroAcertos = 0;
let numeroErros = 0;
let temas = ['img', 'img-distros', 'img-masha']; //noma das pastas dos temas
let current = 0; //posicao na array de temas

//função para trocar o tema do jogo
function trocarTema() {
    //anda na array de temas
    current++;
    if (current == temas.length){
        current = 0
    };
    let tema = temas[current];
    //muda a imagem das cartas
    let timestamp = new Date().getTime();
    let i = 1;
    cardFace.forEach(cardface => {
        cardface.src = `assets/${tema}/card${i}.jpg?t=` + timestamp;
        i++;
        if (i > 6) {
            i = 1;
        }
    });
    //muda a imagem traseira
    cardBack.forEach(cardback => {
        cardback.src = `assets/${tema}/box.jpg?t=` + timestamp;
    });
    resetaTabuleiro();
}


//função para virar as cartas
function virarCarta() {
    if(travaClick) return;
    if(this === primeiroClick) return;

    this.classList.add('flip');
    if(!cartaFoiVirada) {
        cartaFoiVirada = true;
        primeiroClick = this;
        return;
    }
    
    segundoClick = this;
    cartaFoiVirada = false;
    checaCartasIguais();
    // checa condicao de vitoria apos segundo click:
    checaVitoria();
}

//função que checa se as cartas são iguais
function checaCartasIguais() {
    //se ambas as cartas forem iguais:
    if(primeiroClick.dataset.card === segundoClick.dataset.card) {
        acerteiCartas();
        return;
    }
    //se as cartas forem diferentes:
    erreiCartas();
}

//função de acerto de pares
function acerteiCartas() {
    // desabilita as cartas removendo o eventlistener:
    primeiroClick.removeEventListener('click', virarCarta);
    segundoClick.removeEventListener('click', virarCarta);
    // contagem para vitoria:
    numeroAcertos += 1;

    ativaJogada();
}

//funcão que desvira as cartas
function erreiCartas() {
    travaClick = true;

    setTimeout(() => {
        primeiroClick.classList.remove('flip');
        segundoClick.classList.remove('flip');
        numeroErros += 1;
        ativaJogada();
    }, 1500);
}

//função que reseta o tabuleiro
function ativaJogada() {
    [cartaFoiVirada, travaClick] = [false, false];
    [primeiroClick, segundoClick] = [null, null];
}

// funcao que (re)inicia o jogo
function iniciaJogo() {
    //embaralha as cartas e adiciona evento de click
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
        card.addEventListener('click', virarCarta);
    });
    ativaJogada();
}

function checaVitoria() {
    if (numeroAcertos == 6) {
        // reseta numero de acertos
        numeroAcertos = 0;
        alert(`Você venceu! e só errou ${numeroErros} vezes!`);
        resetaTabuleiro();
    }
}

function resetaTabuleiro() {
    // reseta numero de erros
    numeroErros = 0;
    // desvirar todas as cartas
    cards.forEach((card) => {
        card.classList.remove('flip')
    });
    //reinicia o jogo:
    iniciaJogo();
}

temasButton.addEventListener('click', trocarTema);

//inicia o jogo.
iniciaJogo();



