const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('roll-button');
const result = document.getElementById('result');

rollButton.addEventListener('click', () => {
    const num1 = Math.floor(Math.random() * 6) + 1;
    const num2 = Math.floor(Math.random() * 6) + 1;

    dice1.textContent = num1;
    dice2.textContent = num2;

    result.textContent = `결과: ${num1 + num2}`;
});
