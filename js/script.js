let tempo = 5;
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

    if (tempo === 0) {
        const minutosInput = document.getElementById('minutos').value;
        const segundosInput = document.getElementById('segundos').value;

        // Converte os valores para número
        let min = parseInt(minutosInput) || 0;
        let seg = parseInt(segundosInput) || 0;
        tempo = min * 60 + seg;

        if (tempo <= 0) {
            alert('Digite um tempo válido!');
            return;
        }

        atualizarDisplay();
    }

    intervalo = setInterval(() => {
        tempo--;
        atualizarDisplay();

        if (tempo <= 0) {
            clearInterval(intervalo);
            intervalo = null;
            animarFinal();
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
    clearInterval(intervalo);
    intervalo = null;
    tempo = 0;
    document.getElementById('display').textContent = '00:00';
    document.getElementById('minutos').value = '';
    document.getElementById('segundos').value = '';
}

// Mostrar tempo inicial
atualizarDisplay();

// Eventos dos botões
btnStart.addEventListener('click', iniciar);
btnPause.addEventListener('click', pausar);
btnReset.addEventListener('click', resetar);

// Animação do GSAP
function animarFinal() {
    gsap.fromTo(
        'body',
        {
            backgroundColor: '#121212',
        },
        {
            backgroundColor: '#ff0044',
            repeat: 7,
            yoyo: true,
            duration: 0.3,
            ease: 'power1.inOut',
        }
    );

    // Anima o display crescendo e piscando
    gsap.fromTo(
        '#display',
        {
            scale: 1,
            opacity: 1,
            color: '#00ff99',
        },
        {
            scale: 1.5,
            opacity: 0.2,
            color: 'fff',
            duration: 0.8,
            repeat: 3,
            yoyo: true,
            ease: 'power2.inOut',
        }
    );
}
