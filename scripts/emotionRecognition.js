class ScriptLoader {
    static loadScript(url, config = null) {
        return new Promise(resolve => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve();
                    }
                };
            } else {
                script.onload = function () {
                    resolve();
                };
            }
            if (config) {
                script.setAttribute('data-config', config);
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        });
    }
}

function downloadAiSDK() {
    if (ScriptLoader.p == null) {
        ScriptLoader.p = ScriptLoader.loadScript("https://sdk.morphcast.com/mphtools/v1.1/mphtools.js", "cameraPrivacyPopup, compatibilityUI, compatibilityAutoCheck")
            .then(() => ScriptLoader.loadScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js"))
            .then(() => CY); // CY is a global var
    }
    return ScriptLoader.p;
}

downloadAiSDK().then((CY) => {
    CY.loader()
    .licenseKey("sk49c8c603ae0452e16603e2f624b2faab8b6e224e5dee")
    .addModule(CY.modules().FACE_EMOTION.name, {smoothness: 0.40})
    .addModule(CY.modules().FACE_GENDER.name, {smoothness: 0.95, threshold: 0.70})
    .load()
    .then(({ start, stop }) => start());

    window.addEventListener(CY.modules().EVENT_BARRIER.eventName, (evt) => {
        console.log('EVENT_BARRIER result', evt.detail);
    });

    MphTools.CameraPrivacyPopup.setText({
        "title": "Allow us to use your camera",
        "description": "This experience is designed to be viewed with your camera on. The next screen will ask your consent to access data from your camera.",
        "url": "http://127.0.0.1:5500/"
    });
});
