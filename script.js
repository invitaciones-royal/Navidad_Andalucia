// La inicialización de Lucide se ejecutará cuando el script se cargue.
// Esto asegura que los iconos se rendericen correctamente en el DOM.
if (typeof lucide !== 'undefined') {
    // Es mejor esperar a que el DOM esté completamente cargado para manipular los elementos
    document.addEventListener('DOMContentLoaded', () => {
        lucide.createIcons();
    });
}


// --- 1. Configuración de la Nieve ---
const snowContainer = document.getElementById('snow-container');
const numSnowflakes = 50;

function createSnowflake() {
    if (!snowContainer) return; // Cláusula de guardia
    
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Posición inicial aleatoria (x, y encima del viewport)
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.top = `${Math.random() * -10}vh`; 
    
    // Tamaño y duración de la animación aleatoria
    const size = Math.random() * 5 + 5; // 5px a 10px
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    
    const duration = Math.random() * 10 + 15; // 15s a 25s
    snowflake.style.animationDuration = `${duration}s`;
    
    // Retraso para que no caigan todos al mismo tiempo
    snowflake.style.animationDelay = `-${Math.random() * 15}s`;

    snowContainer.appendChild(snowflake);
}

for (let i = 0; i < numSnowflakes; i++) {
    createSnowflake();
}

// --- 2. Contador Regresivo ---
// Fecha del evento: Jueves 11 de Diciembre de 2025 7:00 PM
const eventDate = new Date("December 11, 2025 19:00:00").getTime();
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    if (!countdownElement) return; // Cláusula de guardia

    const now = new Date().getTime();
    const distance = eventDate - now;

    // Cálculos para días, horas, minutos y segundos
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

    // Cuando la cuenta regresiva termina 
    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = '<h4 class="text-2xl gold-text font-title">¡La Posada ha comenzado!</h4>';
    }
}

// Ejecutar inmediatamente y luego cada segundo
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);


// --- 3. Control de Música (Tone.js) ---
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;
let christmasMelody;

// Función para inicializar y tocar una melodía navideña simple
async function initializeMusic() {
    if (typeof Tone === 'undefined') {
        console.error("Tone.js no está cargado. La función de música no estará disponible.");
        return;
    }

    try {
        // Configura un sintetizador simple
        const synth = new Tone.Synth({
            oscillator: { type: "sine" },
            envelope: {
                attack: 0.005,
                decay: 0.1,
                sustain: 0.3,
                release: 1
            }
        }).toDestination();
        
        // Melodía: Primeros compases de Jingle Bells (simulada)
        const melody = [
            { note: "E4", duration: "4n", time: 0 },
            { note: "E4", duration: "4n", time: 0.5 },
            { note: "E4", duration: "2n", time: 1 },
            { note: "E4", duration: "4n", time: 2 },
            { note: "E4", duration: "4n", time: 2.5 },
            { note: "E4", duration: "2n", time: 3 },
            { note: "E4", duration: "4n", time: 4 },
            { note: "G4", duration: "4n", time: 4.5 },
            { note: "C4", duration: "4n", time: 5 },
            { note: "D4", duration: "4n", time: 5.5 },
            { note: "E4", duration: "1n", time: 6 }
        ];
        
        // Crea un loop infinito para la melodía (8 compases)
        christmasMelody = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note.note, note.duration, time);
        }, melody, "8m").start(0); 

        // Detiene el transporte por defecto
        Tone.Transport.stop(); 
        christmasMelody.loop = true;
        christmasMelody.loopEnd = "8m"; 
        
    } catch (error) {
        console.error("Error al inicializar Tone.js:", error);
    }
}

// Inicializa la música cuando la ventana cargue
window.onload = initializeMusic;

if (musicToggle) {
    musicToggle.addEventListener('click', async () => {
        if (typeof Tone === 'undefined') {
            console.error("Tone.js no está disponible para controlar la música.");
            return;
        }

        // Reanuda el contexto de audio en el primer click
        if (Tone.context.state !== 'running') {
            await Tone.start(); 
        }
        
        if (isPlaying) {
            // Pausar
            Tone.Transport.pause();
            musicIcon.setAttribute('data-lucide', 'music');
        } else {
            // Reproducir
            Tone.Transport.start();
            musicIcon.setAttribute('data-lucide', 'volume-2'); // Icono de sonido
        }

        // Vuelve a renderizar el icono con Lucide 
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); 
        }
        isPlaying = !isPlaying;
    });
}
