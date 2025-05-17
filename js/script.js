let tempo = 300;

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
display.textContent = formatarTempo(tempo);

const intervalo = setInterval(() => {
    tempo--;

    display.textContent = formatarTempo(tempo);

    if (tempo <= 0) {
        clearInterval(intervalo);
        alert('⏰ Tempo esgotado!');
    }
}, 1000);
