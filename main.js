// --- Translations ---
const translations = {
    ko: {
        lottoLuck: "LottoLuck",
        home: "홈",
        lottoNumberRecommendation: "로또 번호 추천",
        about: "소개",
        contact: "문의",
        privacyPolicy: "개인정보처리방침",
        countrySpecificLottoNumberRecommendation: "국가별 로또 번호 추천",
        koreaLotto: "한국 로또 6/45",
        usPowerball: "미국 파워볼",
        euromillions: "유로밀리언",
        generateNumbers: "번호 생성",
        lottoMachineEffectTitle: "로또 추첨기계",
        getLuckyNumbersNow: "지금 바로 행운의 번호를 받아가세요!",
        siteIntroduction: "사이트 소개",
        welcomeMessage: "환영합니다! 이 플랫폼은 사용자 여러분의 일상에 재미와 편리함을 더하기 위해 다양한 기능을 한데 모았습니다. 하나의 웹사이트에서 여러 가지 유용한 도구들을 경험해보세요.",
        keyFeatures: "주요 기능",
        feature1: "<strong>국가별 로또 번호 추천:</strong> 전 세계 다양한 로또의 번호를 생성하고 행운을 시험해 보세요.",
        feature2: "<strong>문의:</strong> 궁금한 점이나 제휴 제안이 있으시면 언제든지 문의할 수 있는 편리한 폼을 제공합니다.",
        feature3: "<strong>다크/라이트 모드:</strong> 사용자 환경에 맞춰 다크 모드와 라이트 모드를 자유롭게 전환할 수 있습니다.",
        feature4: "<strong>한국어/영어 선택:</strong> 원하는 언어로 사이트를 이용할 수 있습니다.",
        aboutUs: "About Us",
        aboutUsWelcome: "Welcome to LottoLuck! We are dedicated to providing you with the best and most entertaining lottery number generation experience.",
        aboutUsMission: "Our mission is to offer a simple, fun, and useful tool for lottery enthusiasts around the world. We believe in the thrill of the game and the dream of hitting the jackpot, and we want to be a part of your journey.",
        aboutUsProject: "This website is a one-person project, created and maintained by a passionate developer who loves to build useful things for the web. We are constantly working to improve the site and add new features.",
        aboutUsThanks: "Thank you for visiting, and good luck!",
        contactUsTitle: "Contact Us",
        contactUsMessage: "If you have any questions, feedback, or partnership inquiries, please don't hesitate to reach out to us using the form below.",
        nameLabel: "이름:",
        emailLabel: "이메일:",
        messageLabel: "문의 내용:",
        submitInquiry: "문의 제출",
        koreaLottoInfo: "한국 로또 6/45는 1부터 45까지의 숫자 중 6개를 선택합니다.",
        usPowerballInfo: "미국 파워볼은 1부터 69까지의 숫자 5개와 1부터 26까지의 파워볼 숫자 1개를 선택합니다.",
        euromillionsInfo: "유로밀리언은 1부터 50까지의 숫자 5개와 1부터 12까지의 럭키스타 숫자 2개를 선택합니다."
    },
    en: {
        lottoLuck: "LottoLuck",
        home: "Home",
        lottoNumberRecommendation: "Lotto Number Recommendation",
        about: "About",
        contact: "Contact",
        privacyPolicy: "Privacy Policy",
        countrySpecificLottoNumberRecommendation: "Country-Specific Lotto Number Recommendation",
        koreaLotto: "Korea Lotto 6/45",
        usPowerball: "US Powerball",
        euromillions: "EuroMillions",
        generateNumbers: "Generate Numbers",
        lottoMachineEffectTitle: "Lotto Drawing Machine",
        getLuckyNumbersNow: "Get your lucky numbers now!",
        siteIntroduction: "Site Introduction",
        welcomeMessage: "Welcome! This platform brings together various features to add fun and convenience to your daily life. Experience a variety of useful tools all in one website.",
        keyFeatures: "Key Features",
        feature1: "<strong>Country-Specific Lotto Number Recommendation:</strong> Generate numbers for various lotteries around the world and try your luck.",
        feature2: "<strong>Inquiry:</strong> If you have any questions or partnership proposals, feel free to contact us using the convenient form.",
        feature3: "<strong>Dark/Light Mode:</strong> Switch freely between dark and light modes to suit your environment.",
        feature4: "<strong>Korean/English Selection:</strong> You can use the site in your preferred language.",
        aboutUs: "About Us",
        aboutUsWelcome: "Welcome to LottoLuck! We are dedicated to providing you with the best and most entertaining lottery number generation experience.",
        aboutUsMission: "Our mission is to offer a simple, fun, and useful tool for lottery enthusiasts around the world. We believe in the thrill of the game and the dream of hitting the jackpot, and we want to be a part of your journey.",
        aboutUsProject: "This website is a one-person project, created and maintained by a passionate developer who loves to build useful things for the web. We are constantly working to improve the site and add new features.",
        aboutUsThanks: "Thank you for visiting, and good luck!",
        contactUsTitle: "Contact Us",
        contactUsMessage: "If you have any questions, feedback, or partnership inquiries, please don't hesitate to reach out to us using the form below.",
        nameLabel: "Name:",
        emailLabel: "Email:",
        messageLabel: "Message:",
        submitInquiry: "Submit Inquiry",
        koreaLottoInfo: "Korea Lotto 6/45 chooses 6 numbers from 1 to 45.",
        usPowerballInfo: "US Powerball chooses 5 numbers from 1 to 69, and 1 Powerball number from 1 to 26.",
        euromillionsInfo: "EuroMillions chooses 5 numbers from 1 to 50, and 2 Lucky Star numbers from 1 to 12."
    }
};

// --- Theme Switching Logic ---
const themeSwitch = document.getElementById('checkbox');
let currentTheme = localStorage.getItem('theme');

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


// --- Internationalization (i18n) Logic ---
const langKoBtn = document.getElementById('lang-ko');
const langEnBtn = document.getElementById('lang-en');
let currentLang = localStorage.getItem('lang') || 'ko'; // Default to Korean

function translatePage() {
    document.documentElement.lang = currentLang;

    // Update button active state
    if (currentLang === 'ko') {
        langKoBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    } else {
        langEnBtn.classList.add('active');
        langKoBtn.classList.remove('active');
    }

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            // Handle strong tags within translations
            const translatedText = translations[currentLang][key];
            if (translatedText.includes('<strong>') || translatedText.includes('<b>')) {
                element.innerHTML = translatedText;
            } else {
                element.textContent = translatedText;
            }
        }
    });

    // Handle placeholder attributes separately
    document.querySelector('input#name')?.setAttribute('placeholder', translations[currentLang]?.nameLabel.replace(':', '') || '');
    document.querySelector('input#email')?.setAttribute('placeholder', translations[currentLang]?.emailLabel.replace(':', '') || '');
    document.querySelector('textarea#message')?.setAttribute('placeholder', translations[currentLang]?.messageLabel.replace(':', '') || '');
    
    // Update lotto info if it's visible
    if (lottoInfoDiv && lottoTypeSelect) {
        const selectedLottoKey = lottoTypeSelect.value + 'Info';
        lottoInfoDiv.textContent = translations[currentLang][selectedLottoKey];
    }
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    currentLang = lang;
    translatePage();
}

langKoBtn.addEventListener('click', () => setLanguage('ko'));
langEnBtn.addEventListener('click', () => setLanguage('en'));


// --- Lottery Number Generator Logic ---
const generateBtn = document.getElementById('generate');
const numbersDiv = document.getElementById('numbers'); // This is lotto-balls-container now
const lottoTypeSelect = document.getElementById('lotto-type');
const lottoInfoDiv = document.getElementById('lotto-info');

const lottoDetails = {
    'korea-lotto': {
        range: 45,
        count: 6,
        infoKey: 'koreaLottoInfo' // Reference translation key
    },
    'us-powerball': {
        range: 69,
        count: 5,
        powerballRange: 26,
        powerballCount: 1,
        infoKey: 'usPowerballInfo' // Reference translation key
    },
    'euromillions': {
        range: 50,
        count: 5,
        luckyStarRange: 12,
        luckyStarCount: 2,
        infoKey: 'euromillionsInfo' // Reference translation key
    }
};

function generateNumbers() {
    const selectedLotto = lottoTypeSelect.value;
    const details = lottoDetails[selectedLotto];

    numbersDiv.innerHTML = ''; // Clear previous numbers
    lottoInfoDiv.textContent = translations[currentLang][details.infoKey]; // Use i18n for info

    const numbers = new Set();
    while (numbers.size < details.count) {
        numbers.add(Math.floor(Math.random() * details.range) + 1);
    }

    [...numbers].sort((a, b) => a - b).forEach((number, index) => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number', 'lotto-ball-animated');
        numberDiv.textContent = number;
        numberDiv.style.animationDelay = `${index * 0.1}s`; // Stagger animation
        numbersDiv.appendChild(numberDiv);
    });

    if (details.powerballCount) {
        const powerballNumbers = new Set();
        while (powerballNumbers.size < details.powerballCount) {
            powerballNumbers.add(Math.floor(Math.random() * details.powerballRange) + 1);
        }
        [...powerballNumbers].forEach((number, index) => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number', 'powerball', 'lotto-ball-animated');
            numberDiv.textContent = number;
            numberDiv.style.animationDelay = `${(numbers.size + index) * 0.1}s`; // Stagger animation
            numbersDiv.appendChild(numberDiv);
        });
    }
    
    if (details.luckyStarCount) {
        const luckyStarNumbers = new Set();
        while (luckyStarNumbers.size < details.luckyStarCount) {
            luckyStarNumbers.add(Math.floor(Math.random() * details.luckyStarRange) + 1);
        }
        [...luckyStarNumbers].sort((a, b) => a - b).forEach((number, index) => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number', 'lucky-star', 'lotto-ball-animated');
            numberDiv.textContent = number;
            numberDiv.style.animationDelay = `${(numbers.size + (details.powerballCount || 0) + index) * 0.1}s`; // Stagger animation
            numbersDiv.appendChild(numberDiv);
        });
    }
}

generateBtn.addEventListener('click', generateNumbers);
lottoTypeSelect.addEventListener('change', generateNumbers);


// --- Section Navigation (for hash links and initial active section) ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language and translation
    setLanguage(currentLang);

    // Initial number generation
    generateNumbers();

    // Handle section activation based on URL hash
    function activateSection() {
        const hash = window.location.hash;
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.remove('active');
        });

        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                targetSection.classList.add('active');
            } else {
                // Fallback to #intro if hash doesn't match an existing section
                document.getElementById('intro').classList.add('active');
            }
        } else {
            // Default to #intro if no hash
            document.getElementById('intro').classList.add('active');
        }
    }

    // Activate section on load
    activateSection();

    // Activate section when hash changes (e.g., back/forward buttons)
    window.addEventListener('hashchange', activateSection);

    // Handle navigation links (prevent default for hash links and manually activate)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                window.location.hash = href; // Update hash, which will trigger activateSection
            } else if (href === 'index.html') { // Handle direct link to home
                e.preventDefault();
                window.location.hash = ''; // Clear hash, activate home
                window.location.pathname = '/'; // Go to root path
            }
            // For other absolute links (about.html, contact.html), default browser behavior is fine
        });
    });
});