// --- Theme Switching Logic (Retained) ---
const themeSwitch = document.getElementById('checkbox');

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

themeSwitch.addEventListener('change', switchTheme, false);

// --- Section Navigation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const appSections = document.querySelectorAll('.app-section');

    function showSection(sectionId) {
        appSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Special handling for Teachable Machine to ensure webcam stops when switching sections
        if (sectionId !== 'animal-test' && webcam && webcam.webcamStarted) {
            webcam.stop();
            document.getElementById('webcam-container').innerHTML = '';
            document.getElementById('resetTestBtn').style.display = 'none';
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showSection(button.dataset.section);
        });
    });

    // Show default section on load (e.g., lotto)
    if (navButtons.length > 0) {
        navButtons[0].classList.add('active');
        showSection(navButtons[0].dataset.section);
    }
});


// --- Lotto Number Generator Logic (Restored) ---
const generateBtn = document.getElementById('generate');
const numbersDiv = document.getElementById('numbers');

if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        
        numbersDiv.innerHTML = ''; // Clear previous numbers
        
        for (const number of [...numbers].sort((a, b) => a - b)) {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number');
            numberDiv.textContent = number;
            numbersDiv.appendChild(numberDiv);
        }
    });
}


// --- Teachable Machine Logic (Refactored for Webcam/Image Upload) ---
const URL = "./my_model/"; // User needs to ensure this path is correct and files exist

let model, webcam, labelContainer, maxPredictions;
let currentPredictionSource = null; // 'webcam' or 'image'
let uploadedImageCanvas = null;
let animationFrameId; // To store requestAnimationFrame ID

// Setup elements
const startWebcamBtn = document.getElementById('startWebcamBtn');
const uploadImageInput = document.getElementById('uploadImage');
const uploadImageBtn = document.getElementById('uploadImageBtn');
const webcamContainer = document.getElementById('webcam-container');
const uploadedImageContainer = document.getElementById('uploaded-image-container');
const labelContainerTM = document.getElementById('label-container'); // Renamed to avoid conflict
const resetTestBtn = document.getElementById('resetTestBtn');


async function loadModel() {
    if (model) return; // Model already loaded
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    console.log("Teachable Machine model loaded.");
}

async function initWebcam() {
    await loadModel(); // Ensure model is loaded

    if (webcam && webcam.webcamStarted) {
        webcam.stop(); // Stop previous webcam if running
        webcamContainer.innerHTML = '';
    }
    if(animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    webcamContainer.appendChild(webcam.canvas);
    currentPredictionSource = 'webcam';
    uploadedImageContainer.style.display = 'none';
    webcamContainer.style.display = 'block';
    resetTestBtn.style.display = 'block'; // Show reset button
    labelContainerTM.innerHTML = ''; // Clear previous labels
    for (let i = 0; i < maxPredictions; i++) {
        labelContainerTM.appendChild(document.createElement("div"));
    }
    loop(); // Start prediction loop
}

async function handleImageUpload(event) {
    await loadModel(); // Ensure model is loaded

    if (webcam && webcam.webcamStarted) {
        webcam.stop(); // Stop webcam if running
        webcamContainer.innerHTML = '';
    }
    if(animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
            if (!uploadedImageCanvas) {
                uploadedImageCanvas = document.createElement('canvas');
            }
            const ctx = uploadedImageCanvas.getContext('2d');
            uploadedImageCanvas.width = 200; // Match webcam size for consistency
            uploadedImageCanvas.height = 200;
            ctx.drawImage(img, 0, 0, 200, 200);

            uploadedImageContainer.innerHTML = '';
            uploadedImageContainer.appendChild(uploadedImageCanvas);
            uploadedImageContainer.style.display = 'block';
            webcamContainer.style.display = 'none';
            resetTestBtn.style.display = 'block'; // Show reset button
            currentPredictionSource = 'image';
            labelContainerTM.innerHTML = ''; // Clear previous labels
            for (let i = 0; i < maxPredictions; i++) {
                labelContainerTM.appendChild(document.createElement("div"));
            }
            predictImage(); // Predict once for the image
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

async function loop() {
    if (currentPredictionSource === 'webcam') {
        webcam.update(); // update the webcam frame
        await predictWebcam();
        animationFrameId = window.requestAnimationFrame(loop);
    }
}

async function predictWebcam() {
    const prediction = await model.predict(webcam.canvas);
    displayPredictions(prediction);
}

async function predictImage() {
    if (uploadedImageCanvas) {
        const prediction = await model.predict(uploadedImageCanvas);
        displayPredictions(prediction);
    }
}

function displayPredictions(prediction) {
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainerTM.childNodes[i].innerHTML = classPrediction;
    }
}

function resetTeachableMachine() {
    if (webcam && webcam.webcamStarted) {
        webcam.stop();
    }
    if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }
    webcamContainer.innerHTML = '';
    uploadedImageContainer.innerHTML = '';
    uploadedImageContainer.style.display = 'none';
    webcamContainer.style.display = 'none';
    labelContainerTM.innerHTML = '';
    resetTestBtn.style.display = 'none';
    currentPredictionSource = null;
    uploadedImageCanvas = null;
    console.log("Teachable Machine reset.");
}

// Event Listeners for Teachable Machine buttons
if (startWebcamBtn) startWebcamBtn.addEventListener('click', initWebcam);
if (uploadImageBtn) uploadImageBtn.addEventListener('click', () => uploadImageInput.click());
if (uploadImageInput) uploadImageInput.addEventListener('change', handleImageUpload);
if (resetTestBtn) resetTestBtn.addEventListener('click', resetTeachableMachine);