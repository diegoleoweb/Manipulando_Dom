/* criando uma const e selecionando tag e class */

const html =  document.querySelector ('HTML');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const inicarOuPausarBt = document.querySelector('#start-pause span'); //select id for play and pause
const pausarBT = document.querySelector ('.app__card-primary-butto-icon') //select class for play pause
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const tempoNaTela = document.querySelector ('#timer') //tempo na tela
const musica = new Audio ('./sons/luna-rise-part-one.mp3');

let tempoEmSegundos = 1500 
let intervaloId = null

const audioBeep = new Audio('./sons/beep.mp3')
const audioPlay = new Audio('./sons/play.wav')
const audioPause = new Audio('./sons/pause.mp3')
/* const foco = document.getElementByClassName('app__card-button--foco')[0] , selecioan a arrey no final */
musica.loop  = true 

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

/* Adicinando eventos (addEventListener)  e atribuindo ação ( setAttribute) */
focobt.addEventListener('click' , () => {
    tempoEmSegundos = 1500
    alterarContexto('foco')
    focobt.classList.add('active')
});
curtobt.addEventListener('click' , () => {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtobt.classList.add('active')
});
longobt.addEventListener('click' , () => {
    tempoEmSegundos = 900
   alterarContexto('descanso-longo')
   longobt.classList.add('active')
});

function alterarContexto(contexto){
    mostrarTempo()
    /*funçao para retirar o active dos botões */
    botoes.forEach (function (contexto) {
        contexto.classList.remove('active')
    })
    /* trocando o contexto do HTML  */
    html.setAttribute('data-contexto', contexto);

    /* Trocando o nome das img para contexto com string e crase */
    banner.setAttribute('src' , `./imagens/${contexto}.png`);

    /*switch uma forma de adicionar texto no html via js */
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo" :
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;  
    
        default:
            break;
    }
}

const contagemRegressiva = ()=> {
    if( tempoEmSegundos <= 0 ){
        zera()
        audioBeep.play()
        alert('Fim do tempo')
        return
    }
    tempoEmSegundos -= 1
    mostrarTempo()
}
startPauseBt.addEventListener('click' , iniciarOuPausar)

function iniciarOuPausar (){
    if(intervaloId){
        zera()
        audioPause.play()
        return
    }
    audioPlay.play()
    intervaloId = setInterval( contagemRegressiva, 1000)
    inicarOuPausarBt.textContent = "pausar"
    pausarBT.setAttribute ('src' , `./imagens/pause.png`) //acionando a img pause
}
function zera (){
    clearInterval (intervaloId)
    inicarOuPausarBt.textContent =  "começar"
    pausarBT.setAttribute ('src' , `./imagens/play_arrow.png`) //add img play 
    intervaloId =  null
}
function mostrarTempo (){
    const tempo = new Date (tempoEmSegundos * 1000 ) //atribuindo tempo x mil == segundos 
    const tempoFormatado = tempo.toLocaleString('pt-br' , {minute :'2-digit' , second :'2-digit'}) 
    tempoNaTela.innerHTML = `${tempoFormatado}` //function para mostrar o tempo na tela
}
mostrarTempo()
