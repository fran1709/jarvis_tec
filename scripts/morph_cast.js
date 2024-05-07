// morphcast.js

CY.loader()
    .licenseKey("sk965995790ef1fdf16327781c4e8006441319d0dd9b80")
    .addModule(CY.modules().FACE_EMOTION.name, { smoothness: 0.40 })
    .addModule(CY.modules().FACE_ATTENTION.name, { smoothness: 0.83 })
    .addModule(CY.modules().FACE_AGE.name, { rawOutput: false })
    .addModule(CY.modules().FACE_GENDER.name, { smoothness: 0.95, threshold: 0.70 })
    .addModule(CY.modules().FACE_DETECTOR.name, { maxInputFrameSize: 320, smoothness: 0.83 })
    .addModule(CY.modules().FACE_POSITIVITY.name, { smoothness: 0.40, gain: 2, angle: 17 })
    .load()
    .then(({ start, stop }) => start());

window.addEventListener(CY.modules().EVENT_BARRIER.eventName, (evt) => {
    const faceDataTextarea = document.getElementById("faceData");
    
    if (evt.detail.face_attention && evt.detail.face_age && evt.detail.face_emotion && evt.detail.face_detector && evt.detail.face_positivity && evt.detail.face_gender) {
        const faceDataString = `Atención: ${evt.detail.face_attention.attention}\t\t\t\t\t\t` +
            `Edad:${evt.detail.face_age.numericAge}\t\t\t\t\t\t` +
            `Emoción:${evt.detail.face_emotion.dominantEmotion}\n` +
            `Cantidad de rostros: ${evt.detail.face_detector.totalFaces}\t\t\t\t` +
            `Positividad del rostro: ${evt.detail.face_positivity.positivity}\t\t` +
            `Género:${evt.detail.face_gender.mostConfident}`;

        faceDataTextarea.value = faceDataString;
    } else {
        // Manejar la situación si falta alguna propiedad o simplemente mantener los valores anteriores
        
    }
});

MphTools.CameraPrivacyPopup.setText({
    "title": "Permíteme utilizar tu cámara...",
    "description": "Esta experiencia está diseñada para ser vista con la cámara encendida. La siguiente pantalla le pedirá su consentimiento para acceder a los datos de su cámara.",
    "url": "https://YOUR_DOMAIN/<YOUR_PRIVACY_POLICY>"
});
