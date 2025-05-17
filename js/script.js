let tempo = 0;
let intervalo = null;
let pausado = false;

function atualizarDisplay() {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    document.getElementById('display').textContent = `${String(
        minutos
    ).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function contar() {
    tempo--;
    atualizarDisplay();

    if (tempo <= 0) {
        clearInterval(intervalo);
        intervalo = null;
        document.getElementById('btn-iniciar').textContent = 'Iniciar';
        animarFinal();
    }
}

function iniciarOuPausar() {
    const btn = document.getElementById('btn-iniciar');

    // Se está contando => Pausar
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
        pausado = true;
        btn.textContent = 'Continuar';
        return;
    }

    // Se estava pausado => Continuar
    if (pausado && tempo > 0) {
        intervalo = setInterval(contar, 1000);
        pausado = false;
        btn.textContent = 'Pausar';
        return;
    }

    // Se tempo zerado => Iniciar novo tempo
    const minutosInput = document.getElementById('minutos').value;
    const segundosInput = document.getElementById('segundos').value;

    const min = parseInt(minutosInput) || 0;
    const seg = parseInt(segundosInput) || 0;

    tempo = min * 60 + seg;

    if (tempo <= 0) {
        alert('Digite um tempo válido!');
        return;
    }

    atualizarDisplay();
    intervalo = setInterval(contar, 1000);
    btn.textContent = 'Pausar';
    pausado = false;
}

function resetar() {
    clearInterval(intervalo);
    intervalo = null;
    tempo = 0;
    pausado = false;
    document.getElementById('minutos').value = '';
    document.getElementById('segundos').value = '';

    document.getElementById('display').textContent = '00:00';
    document.getElementById('btn-iniciar').textContent = 'Iniciar';

    // Animação de saída da mensagem que acabou o texto
    gsap.to('#mensagem-final', {
        opacity: 0,
        y: 50,
        duration: 0.5,
        onComplete: () => {
            document.getElementById('mensagem-final').style.display = 'none';
        },
    });
}

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

    // Aparece o texto de "Tempo Esgotado"
    const mensagem = document.getElementById('mensagem-final');

    // Mostra o elemento antes de animar
    mensagem.style.display = 'block';
    mensagem.style.opacity = 0;
    mensagem.style.transform = 'translateY(50px)';

    gsap.to(mensagem, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.inOut',
    });
}
