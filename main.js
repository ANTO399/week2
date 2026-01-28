const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('roll-button');
const result = document.getElementById('result');

rollButton.addEventListener('click', () => {
    // Disable the button during animation
    rollButton.disabled = true;
    result.textContent = '굴리는 중...';

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

            dice1.textContent = finalNum1;
            dice2.textContent = finalNum2;

            result.textContent = `결과: ${finalNum1 + finalNum2}`;

            // Re-enable the button
            rollButton.disabled = false;
        }
    }, 100);
});
