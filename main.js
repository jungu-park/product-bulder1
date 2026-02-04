const generateBtn = document.getElementById('generate');
const numbersDiv = document.getElementById('numbers');

generateBtn.addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    numbersDiv.textContent = [...numbers].join(' ');
});