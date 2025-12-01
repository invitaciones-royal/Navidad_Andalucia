// --- 1. Inicialización de Lucide Icons ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});


// --- 2. Configuración de la Nieve ---
const snowContainer = document.getElementById('snow-container');
const numSnowflakes = 50;

function createSnowflake() {
    if (!snowContainer) return;
    
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake'; 
    
    // Posición, tamaño y duración de animación aleatorios
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.top = `${Math.random() * -10}vh`; 
    
    const size = Math.random() * 5 + 5;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    
    const duration = Math.random() * 10 + 15;
    snowflake.style.animationDuration = `${duration}s`;
    
    snowflake.style.animationDelay = `-${Math.random() * 15}s`;

    snowContainer.appendChild(snowflake);
}

for (let i = 0; i < numSnowflakes; i++) {
    createSnowflake();
}

// --- 3. Contador Regresivo ---
const eventDate = new Date("December 11, 2025 19:00:00").getTime();
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    if (!countdownElement) return;

    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let htmlContent = '';
    const units = [
        { value: days, label: 'Día(s)' },
        { value: hours, label: 'Hrs' },
        { value: minutes, label: 'Min' },
        { value: seconds, label: 'Seg' }
    ];

    units.forEach(unit => {
        const displayValue = unit.value < 0 ? '00' : String(unit.value).padStart(2, '0');

        htmlContent += `
            <div class="text-center p-3 sm:p-4 rounded-full w-20 h-20 sm:w-28 sm:h-28 flex flex-col justify-center gold-border gold-text bg-white/10 backdrop-blur-sm shadow-xl">
                <span class="font-title text-2xl sm:text-4xl font-bold">${displayValue}</span>
                <span class="font-body text-xs sm:text-sm mt-0.5">${unit.label}</span>
            </div>
        `;
    });

    countdownElement.innerHTML = htmlContent;

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = '<h4 class="text-2xl gold-text font-title">¡La Posada ha comenzado!</h4>';
    }
}

// Inicia el contador
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);


// --- 4. Control de Música (Audio API) ---
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');

// Carga el archivo de audio (debe estar en la misma raíz)
const audio = new Audio('musica.mp3');
audio.loop = true; // Asegura que se repita

let isPlaying = false;

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            // Pausar
            audio.pause();
            musicIcon.setAttribute('data-lucide', 'music'); // Icono de pausa
        } else {
            // Reproducir
            // El .play() debe ser iniciado por una acción del usuario (el click)
            audio.play().catch(error => {
                console.error("Error al intentar reproducir la música:", error);
                // Si falla (ej. por restricciones del navegador), podría ser útil notificar
            });
            musicIcon.setAttribute('data-lucide', 'volume-2'); // Icono de sonido
        }

        // Vuelve a renderizar el icono y actualiza el estado
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); 
        }
        isPlaying = !isPlaying;
    });
}
