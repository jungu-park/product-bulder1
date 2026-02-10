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


// --- Lottery Number Generator Logic ---
const generateBtn = document.getElementById('generate');
const numbersDiv = document.getElementById('numbers');
const lottoTypeSelect = document.getElementById('lotto-type');
const lottoInfoDiv = document.getElementById('lotto-info');

const lottoDetails = {
    'korea-lotto': {
        range: 45,
        count: 6,
        info: '한국 로또 6/45는 1부터 45까지의 숫자 중 6개를 선택합니다.'
    },
    'us-powerball': {
        range: 69,
        count: 5,
        powerballRange: 26,
        powerballCount: 1,
        info: '미국 파워볼은 1부터 69까지의 숫자 5개와 1부터 26까지의 파워볼 숫자 1개를 선택합니다.'
    },
    'euromillions': {
        range: 50,
        count: 5,
        luckyStarRange: 12,
        luckyStarCount: 2,
        info: '유로밀리언은 1부터 50까지의 숫자 5개와 1부터 12까지의 럭키스타 숫자 2개를 선택합니다.'
    }
};

function generateNumbers() {
    const selectedLotto = lottoTypeSelect.value;
    const details = lottoDetails[selectedLotto];

    numbersDiv.innerHTML = '';
    lottoInfoDiv.textContent = details.info;

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

// Generate numbers on initial load
generateNumbers();