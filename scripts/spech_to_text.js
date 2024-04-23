// spech_to_text.js

const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const textArea = document.getElementById('inputText');
const responseText = document.getElementById('responseText');
const listeningStatus = document.getElementById('listeningStatus'); // Referencia al elemento de estado de escucha

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;

let isListening = false; // Variable para almacenar el estado de la escucha

btnStart.addEventListener('click', () => {
    console.log('Se inicio escucha.')
    recognition.start();
    isListening = true; // Actualiza el estado de la escucha
    updateListeningStatus(); // Actualiza el estado de la escucha en la interfaz
});

btnStop.addEventListener('click', () => {
    console.log('Se apagó escucha.')
    recognition.abort();
    isListening = false; // Actualiza el estado de la escucha
    updateListeningStatus(); // Actualiza el estado de la escucha en la interfaz
});

recognition.onresult = (event) => {
    try {
        const texto = event.results[event.results.length - 1][0].transcript;
        textArea.value = texto;
        ejecutarAccion(texto.toLowerCase());
    } catch (error) {
        console.error("Error:", error);
        responder("He tenido un fallo interno.");
    }
}

function ejecutarAccion(texto) {
    if (texto.includes('hola')) {
        responder('¡Hola! ¿En qué puedo ayudarte?');
    } else if (texto.includes('buenas noches')) {
        responder('¡Buenas noches!');
        recognition.abort();
        isListening = false; // Actualiza el estado de la escucha
        updateListeningStatus(); // Actualiza el estado de la escucha en la interfaz
    } else if (texto.includes('hora')) {
        const time = new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });        
        responder(`La hora actual es ${time}`);
    } else {
        responder('Lo siento, no entendí lo que dijiste.');
    }
}

function responder(texto) {
    responseText.value = texto;
    const speech = new SpeechSynthesisUtterance(texto);
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = 'es-ES';
    window.speechSynthesis.speak(speech);
}

// Función para actualizar el estado de la escucha en la interfaz
function updateListeningStatus() {
    if (isListening) {
        listeningStatus.textContent = "Escuchando..."; // Muestra el mensaje de escuchando
    } else {
        listeningStatus.textContent = "No está escuchando"; // Muestra el mensaje de no escuchando
    }
}
