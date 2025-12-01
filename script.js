document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURACIÓN DEL CONTADOR ---
    const targetDate = new Date('December 11, 2025 19:00:00').getTime();

    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Formato con ceros a la izquierda
        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "<h2 style='color: white;'>¡Es Hoy!</h2>";
        }
    }, 1000);

    // --- 2. REPRODUCTOR DE MÚSICA MEJORADO ---
    const music = document.getElementById('christmas-music');
    const btn = document.getElementById('play-pause-btn');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');

    // Función para actualizar iconos
    function updateIcon(isPlaying) {
        if (isPlaying) {
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
            btn.classList.add('music-playing'); // Añade efecto de pulso
        } else {
            iconPlay.classList.remove('hidden');
            iconPause.classList.add('hidden');
            btn.classList.remove('music-playing');
        }
    }

    btn.addEventListener('click', () => {
        if (music.paused) {
            music.play().then(() => {
                updateIcon(true);
            }).catch(error => {
                console.log("Error al reproducir: ", error);
            });
        } else {
            music.pause();
            updateIcon(false);
        }
    });
});
