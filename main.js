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

        // Reset Teachable Machine when switching away or on initial load
        if (sectionId !== 'animal-test') {
            resetTeachableMachine();
        } else {
            // If navigating to animal-test, ensure model is loaded
            loadModel();
            // And ensure previous image/predictions are cleared if any
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

    // Show default section on load (e.g., lotto)
    if (navButtons.length > 0) {
        navButtons[0].classList.add('active');
        showSection(navButtons[0].dataset.section);
    }

    // Call loadModel early and reset TM section
    loadModel();
    resetTeachableMachine();
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


// --- Teachable Machine Logic (Image Upload Only) ---
const URL = "./my_model/"; // User needs to ensure this path is correct and files exist

let model, labelContainer, maxPredictions;
let uploadedImageCanvas = null;
let animationFrameId; // To store requestAnimationFrame ID - (No longer used for loop, but kept for consistency if needed)

// Setup elements
const uploadImageInput = document.getElementById('uploadImage');
const uploadImageBtn = document.getElementById('uploadImageBtn');
const uploadedImageContainer = document.getElementById('uploaded-image-container');
const labelContainerTM = document.getElementById('label-container');
const resetTestBtn = document.getElementById('resetTestBtn');


async function loadModel() {
    if (model) return; // Model already loaded
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    console.log("Teachable Machine model loaded.");
}

// Initial setup, load model but don't start prediction until image is uploaded
document.addEventListener('DOMContentLoaded', loadModel);


async function handleImageUpload(event) {
    // No need to await loadModel here, as it's called on DOMContentLoaded
    // await loadModel();

    // Clear previous prediction results
    if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }
    labelContainerTM.innerHTML = '';

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
            
            // Generate labels containers for new prediction
            labelContainerTM.innerHTML = '';
            for (let i = 0; i < maxPredictions; i++) {
                labelContainerTM.appendChild(document.createElement("div"));
            }
            
            predictImage(); // Predict once for the image
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

async function predictImage() {
    if (uploadedImageCanvas && model) {
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
    if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }
    uploadedImageContainer.innerHTML = '';
    uploadedImageContainer.style.display = 'none'; // Hide image container
    labelContainerTM.innerHTML = '';
    resetTestBtn.style.display = 'none';
    uploadedImageCanvas = null;
    // Re-enable file input for new selection
    if (uploadImageInput) {
        uploadImageInput.value = ''; // Clear selected file
    }
    console.log("Teachable Machine reset.");
}

// Event Listeners for Teachable Machine buttons
if (uploadImageBtn) uploadImageBtn.addEventListener('click', () => uploadImageInput.click());
if (uploadImageInput) uploadImageInput.addEventListener('change', handleImageUpload);
if (resetTestBtn) resetTestBtn.addEventListener('click', resetTeachableMachine);
