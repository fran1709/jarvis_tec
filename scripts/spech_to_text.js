//spech_to_text.js

const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const textArea = document.getElementById('inputText');
const responseText = document.getElementById('responseText');

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;

btnStart.addEventListener('click', () => {
    console.log('Se inicio escucha.')
    recognition.start();
});

btnStop.addEventListener('click', () => {
    console.log('Se apagó escucha.')
    recognition.abort();
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
