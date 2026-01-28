const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('roll-button');
const result = document.getElementById('result');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const languageSelect = document.getElementById('language-select');

const translations = {
    ko: {
        rolling: '굴리는 중...',
        result: '결과: ',
    },
    en: {
        rolling: 'Rolling...',
        result: 'Result: ',
    }
};

let currentLang = 'ko';
let lastSum = 0;

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-ko]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
    // Update result text separately as it's dynamic
    if (result.textContent) {
        result.textContent = `${translations[lang].result}${lastSum}`;
    }
}

rollButton.addEventListener('click', () => {
    // Disable the button during animation
    rollButton.disabled = true;
    result.textContent = translations[currentLang].rolling;

    let intervalCount = 0;
    const interval = setInterval(() => {
        const num1 = Math.floor(Math.random() * 6) + 1;
        const num2 = Math.floor(Math.random() * 6) + 1;
        dice1.textContent = num1;
        dice2.textContent = num2;
        intervalCount++;

        if (intervalCount > 10) { // Animate for 1 second (10 * 100ms)
            clearInterval(interval);

            // Generate final numbers
            const finalNum1 = Math.floor(Math.random() * 6) + 1;
            const finalNum2 = Math.floor(Math.random() * 6) + 1;
            lastSum = finalNum1 + finalNum2;

            dice1.textContent = finalNum1;
            dice2.textContent = finalNum2;

            result.textContent = `${translations[currentLang].result}${lastSum}`;

            // Re-enable the button
            rollButton.disabled = false;
        }
    }, 100);
});

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});

languageSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

// Set initial language
setLanguage('ko');
