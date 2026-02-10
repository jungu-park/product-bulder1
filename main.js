// --- Theme Switching Logic ---
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


// --- Language Switching Logic ---
const langKoBtn = document.getElementById('lang-ko');
const langEnBtn = document.getElementById('lang-en');
let currentLang = localStorage.getItem('lang') || 'ko'; // Default to Korean

function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    currentLang = lang;
    // Visually update buttons
    if (lang === 'ko') {
        langKoBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    } else {
        langEnBtn.classList.add('active');
        langKoBtn.classList.remove('active');
    }
    // Here you would typically load translated content
    // For now, only the HTML lang attribute changes
}

langKoBtn.addEventListener('click', () => setLanguage('ko'));
langEnBtn.addEventListener('click', () => setLanguage('en'));

// Initialize language on load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});


// --- Lottery Number Generator Logic ---
const generateBtn = document.getElementById('generate');
const numbersDiv = document.getElementById('numbers');
const lottoTypeSelect = document.getElementById('lotto-type');
const lottoInfoDiv = document.getElementById('lotto-info');

const lottoDetails = {
    'korea-lotto': {
        range: 45,
        count: 6,
        info: {
            ko: '한국 로또 6/45는 1부터 45까지의 숫자 중 6개를 선택합니다.',
            en: 'Korea Lotto 6/45: Choose 6 numbers from 1 to 45.'
        }
    },
    'us-powerball': {
        range: 69,
        count: 5,
        powerballRange: 26,
        powerballCount: 1,
        info: {
            ko: '미국 파워볼은 1부터 69까지의 숫자 5개와 1부터 26까지의 파워볼 숫자 1개를 선택합니다.',
            en: 'US Powerball: Choose 5 numbers from 1 to 69, and 1 Powerball number from 1 to 26.'
        }
    },
    'euromillions': {
        range: 50,
        count: 5,
        luckyStarRange: 12,
        luckyStarCount: 2,
        info: {
            ko: '유로밀리언은 1부터 50까지의 숫자 5개와 1부터 12까지의 럭키스타 숫자 2개를 선택합니다.',
            en: 'EuroMillions: Choose 5 numbers from 1 to 50, and 2 Lucky Star numbers from 1 to 12.'
        }
    }
};

function generateNumbers() {
    const selectedLotto = lottoTypeSelect.value;
    const details = lottoDetails[selectedLotto];

    numbersDiv.innerHTML = '';
    lottoInfoDiv.textContent = details.info[currentLang]; // Use currentLang for info

    const numbers = new Set();
    while (numbers.size < details.count) {
        numbers.add(Math.floor(Math.random() * details.range) + 1);
    }

    [...numbers].sort((a, b) => a - b).forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numbersDiv.appendChild(numberDiv);
    });

    if (details.powerballCount) {
        const powerballNumbers = new Set();
        while (powerballNumbers.size < details.powerballCount) {
            powerballNumbers.add(Math.floor(Math.random() * details.powerballRange) + 1);
        }
        [...powerballNumbers].forEach(number => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number', 'powerball');
            numberDiv.textContent = number;
            numbersDiv.appendChild(numberDiv);
        });
    }
    
    if (details.luckyStarCount) {
        const luckyStarNumbers = new Set();
        while (luckyStarNumbers.size < details.luckyStarCount) {
            luckyStarNumbers.add(Math.floor(Math.random() * details.luckyStarRange) + 1);
        }
        [...luckyStarNumbers].sort((a, b) => a - b).forEach(number => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number', 'lucky-star');
            numberDiv.textContent = number;
            numbersDiv.appendChild(numberDiv);
        });
    }
}

generateBtn.addEventListener('click', generateNumbers);
lottoTypeSelect.addEventListener('change', generateNumbers); // Generate numbers when lotto type changes


// Generate numbers on initial load
generateNumbers();


// --- Section Navigation (for hash links) ---
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        if (hash.startsWith('#')) {
            e.preventDefault();
            document.querySelectorAll('.app-section').forEach(section => {
                section.classList.remove('active');
            });
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                targetSection.classList.add('active');
                window.history.pushState(null, '', hash); // Update URL hash
            }
        }
    });
});

// Handle direct access to hash links on load
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            document.querySelectorAll('.app-section').forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
        }
    } else {
        // Default to #intro if no hash
        document.getElementById('intro').classList.add('active');
    }
});