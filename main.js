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
        localStorage.setItem('light', 'light');
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

        // Reset Teachable Machine when switching away or on initial load
        if (sectionId !== 'animal-test') {
            resetTeachableMachine();
        } else {
            // If navigating to animal-test, ensure model is loaded
            loadModel();
            resetTeachableMachine(); // To ensure clean state
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showSection(button.dataset.section);
        });
    });

    // Show default section on load (now 'intro')
    // Find the 'intro' button and activate it
    const introButton = document.querySelector('.nav-button[data-section="intro"]');
    if (introButton) {
        introButton.classList.add('active');
        showSection('intro');
    }


    // Call loadModel early and reset TM section
    loadModel();
    resetTeachableMachine();
});


// --- Lotto Number Generator Logic (Retained) ---
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


// --- Teachable Machine Logic (Webcam and Image Upload) ---
const URL = "https://teachablemachine.withgoogle.com/models/guvsM29DK/"; // User needs to ensure this path is correct and files exist

let model, webcam, labelContainer, maxPredictions; // labelContainer here as per snippet
let uploadedImageCanvas = null;
let animationFrameId; // To store requestAnimationFrame ID

// Setup elements
const startWebcamBtn = document.getElementById('startWebcamBtn');
const uploadImageInput = document.getElementById('uploadImage');
const uploadImageBtn = document.getElementById('uploadImageBtn');
const webcamContainer = document.getElementById('webcam-container');
const uploadedImageContainer = document.getElementById('uploaded-image-container');
const labelContainerTM = document.getElementById('label-container'); // Renamed labelContainer from snippet to labelContainerTM to avoid conflict.
const resetTestBtn = document.getElementById('resetTestBtn');


async function loadModel() {
    if (model) return; // Model already loaded
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Teachable Machine model loaded.");
    } catch (error) {
        console.error("Failed to load Teachable Machine model:", error);
        labelContainerTM.innerHTML = '<div>모델 로드 실패! my_model 폴더에 model.json, metadata.json 파일을 확인해주세요.</div>';
    }
}

async function initWebcam() { // Reintroduced initWebcam
    await loadModel(); // Ensure model is loaded

    if (!model) { // If model failed to load, don't proceed
        return;
    }

    // Stop image processing if running
    if(uploadedImageCanvas) {
        uploadedImageCanvas = null;
    }
    uploadedImageContainer.innerHTML = '';
    uploadedImageContainer.style.display = 'none';

    if (webcam && webcam.webcamStarted) {
        webcam.stop(); // Stop previous webcam if running
    }
    if(animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    webcamContainer.innerHTML = ''; // Clear previous content
    webcamContainer.appendChild(webcam.canvas);
    webcamContainer.style.display = 'block'; // Show webcam
    
    resetTestBtn.style.display = 'block'; // Show reset button
    labelContainerTM.innerHTML = ''; // Clear previous labels
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainerTM.appendChild(document.createElement("div"));
    }
    window.requestAnimationFrame(loop); // Start prediction loop
}

async function handleImageUpload(event) {
    await loadModel(); // Ensure model is loaded

    if (!model) { // If model failed to load, don't proceed
        return;
    }

    if (webcam && webcam.webcamStarted) { // Stop webcam if running
        webcam.stop();
    }
    webcamContainer.innerHTML = '';
    webcamContainer.style.display = 'none';

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
            uploadedImageCanvas.width = 200; // Match model input size
            uploadedImageCanvas.height = 200;
            ctx.drawImage(img, 0, 0, uploadedImageCanvas.width, uploadedImageCanvas.height);

            uploadedImageContainer.innerHTML = '';
            uploadedImageContainer.appendChild(uploadedImageCanvas);
            uploadedImageContainer.style.display = 'block'; // Ensure it's visible
            resetTestBtn.style.display = 'block'; // Show reset button
            
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

async function loop() { // Reintroduced loop for webcam
    webcam.update(); // update the webcam frame
    await predictWebcam();
    animationFrameId = window.requestAnimationFrame(loop);
}

async function predictWebcam() { // Reintroduced predictWebcam
    const prediction = await model.predict(webcam.canvas);
    displayPredictions(prediction);
}

async function predictImage() {
    if (uploadedImageCanvas && model) {
        const prediction = await model.predict(uploadedImageCanvas);
        displayPredictions(prediction);
    }
}

function displayPredictions(prediction) {
    if (!labelContainerTM) { // Ensure labelContainerTM exists
        console.error("label-container not found.");
        return;
    }
    labelContainerTM.innerHTML = ''; // Clear previous predictions
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + '%'; // Changed to percentage
        const predictionDiv = document.createElement("div");
        predictionDiv.textContent = classPrediction;
        labelContainerTM.appendChild(predictionDiv);
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
    webcamContainer.style.display = 'none'; // Hide webcam
    uploadedImageContainer.innerHTML = '';
    uploadedImageContainer.style.display = 'none'; // Hide image
    labelContainerTM.innerHTML = '';
    resetTestBtn.style.display = 'none';
    uploadedImageCanvas = null;
    if (uploadImageInput) {
        uploadImageInput.value = ''; // Clear selected file
    }
    console.log("Teachable Machine reset.");
}

// Event Listeners for Teachable Machine buttons
if (startWebcamBtn) startWebcamBtn.addEventListener('click', initWebcam); // startWebcamBtn listener reintroduced
if (uploadImageBtn) uploadImageBtn.addEventListener('click', () => uploadImageInput.click());
if (uploadImageInput) uploadImageInput.addEventListener('change', handleImageUpload);
if (resetTestBtn) resetTestBtn.addEventListener('click', resetTeachableMachine);