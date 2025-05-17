let tempo = 300;
let intervalo = null;

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    // Adiciona um zero na frente se for menor que 10.
    const m = minutos < 10 ? '0' + minutos : minutos;
    const s =
        segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;

    return `${m}:${s}`;
}

const display = document.getElementById('display');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnReset = document.getElementById('reset');

function atualizarDisplay() {
    display.textContent = formatarTempo(tempo);
}

function iniciar() {
    if (intervalo) return;

    intervalo = setInterval(() => {
        tempo--;
        atualizarDisplay();

        if (tempo <= 0) {
            clearInterval(intervalo);
            intervalo = null;
            alert('⏰ Tempo esgotado!');
        }
    }, 1000);
}

function pausar() {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

function resetar() {
    pausar();
    tempo = 300;
    atualizarDisplay();
}

// Mostrar tempo inicial
atualizarDisplay();

// Eventos dos botões
btnStart.addEventListener('click', iniciar);
btnPause.addEventListener('click', pausar);
btnReset.addEventListener('click', resetar);
