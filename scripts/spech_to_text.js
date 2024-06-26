// spech_to_text.js
import { avocadoData } from "../myData/avocadoData.js";
import { houseData } from "../myData/houseData.js";
import { personalData } from "../myData/personalData.js";
import { wineData } from "../myData/wineData.js";
import { carData } from "../myData/carData.js";
import { strokeData } from "../myData/strokeData.js";
import { phoneData } from "../myData/phoneData.js";

const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const textArea = document.getElementById("inputText");
const responseText = document.getElementById("responseText");
const listeningStatus = document.getElementById("listeningStatus"); // Referencia al elemento de estado de escucha

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = "es-ES";
recognition.interimResult = false;

let isListening = false; // Variable para almacenar el estado de la escucha

btnStart.addEventListener("click", () => {
  console.log("Se inicio escucha.");
  recognition.start();
  isListening = true; // Actualiza el estado de la escucha
  updateListeningStatus(); // Actualiza el estado de la escucha en la interfaz
});

btnStop.addEventListener("click", () => {
  console.log("Se apagó escucha.");
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
};

function ejecutarAccion(texto) {
  if (texto.includes("hola")) {
    responder("¡Hola! ¿En qué puedo ayudarte?");
  } else if (texto.includes("buenas noches")) {
    responder("¡Hasta pronto, buenas noches!");
    recognition.abort();
    isListening = false; // Actualiza el estado de la escucha
    updateListeningStatus(); // Actualiza el estado de la escucha en la interfaz
  } else if (texto.includes("hora")) {
    const time = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    responder(`La hora actual es ${time}`);
  } else if (texto.includes("hacer") || texto.includes("predicciones")) {
    responder(
      "Está en mi capacidad decirte si tienes sobrepeso, el valor de tu casa, el precio del aguacate, calificar un vino, el precio de un auto, si una persona cambiará de empresa telefónica, si tendrás un accidente cerebro vascular."
    );
  } else if (texto.includes("gracias")) {
    responder("Con mucho gusto! estoy para servirte.");
  } else if (texto.includes("sobrepeso")) {
    fetch("http://localhost:5000/areFat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personalData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo ser completada.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.prediction) {
          console.log("Predicción:", data.prediction);
          responder(data.prediction);
        } else {
          responder("No se pudo obtener una predicción.");
        }
      })
      .catch((error) => {
        responder("Error al procesar las medidas del cuerpo:", error);
      });
  } else if (texto.includes("aguacate")) {
    fetch("http://localhost:5000/avocado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avocadoData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo ser completada.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.prediction) {
          console.log("Predicción:", data.prediction);
          responder(data.prediction);
        } else {
          responder("No se pudo obtener una predicción.");
        }
      })
      .catch((error) => {
        responder("Error al procesar los datos del aguacate:", error);
      });
  } else if (texto.includes("vino")) {
    fetch("http://localhost:5000/wine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wineData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo ser completada.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.prediction) {
          console.log("Predicción:", data.prediction);
          responder(data.prediction);
        } else {
          responder("No se pudo obtener una predicción.");
        }
      })
      .catch((error) => {
        responder("Error al procesar los datos del vino:", error);
      });
  } else if (texto.includes("casa")) {
    fetch("http://localhost:5000/house", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(houseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo ser completada.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.prediction) {
          console.log("Predicción:", data.prediction);
          responder(data.prediction);
        } else {
          responder("No se pudo obtener una predicción.");
        }
      })
      .catch((error) => {
        responder("Error al procesar las medidas de la casa:", error);
      });
  } else if (texto.includes("auto")) {
    fetch("http://localhost:5000/car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo ser completada.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.prediction) {
          console.log("Predicción:", data.prediction);
          responder(data.prediction);
        } else {
          responder("No se pudo obtener una predicción.");
        }
      })
      .catch((error) => {
        responder("Error al procesar los datos del auto:", error);
      });
  } else if (texto.includes("teléfono")) {
    fetch("http://localhost:5000/phone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phoneData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo ser completada.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.prediction) {
          console.log("Predicción:", data.prediction);
          responder(data.prediction);
        } else {
          responder("No se pudo obtener una predicción.");
        }
      })
      .catch((error) => {
        responder("Error al procesar los datos del teléfono:", error);
      });
  } else if (texto.includes("cerebro")) {
    fetch("http://localhost:5000/stroke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(strokeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo ser completada.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.prediction) {
          console.log("Predicción:", data.prediction);
          responder(data.prediction);
        } else {
          responder("No se pudo obtener una predicción.");
        }
      })
      .catch((error) => {
        responder("Error al procesar las datos de la persona:", error);
      });
  } else {
    responder("Lo siento, no entendí lo que dijiste.");
  }
}

function responder(texto) {
  responseText.value = texto;
  const speech = new SpeechSynthesisUtterance(texto);
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.lang = "es-ES";
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
