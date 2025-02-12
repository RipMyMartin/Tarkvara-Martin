let burgerIngredients = [];
let savedBurgers = [];
let timer = 30;
let timerInterval;

const tasks = [
    "Собери бургер из булочки, мяса и сыра",
    "Добавь огурцы и помидоры",
    "Сделай вегетарианский бургер с листьями салата, огурцами и помидорами",
    "Добавь двойной сыр и мясо",
    "Собери бургер с булочкой, листьями салата и сыром"
];

let currentTaskIndex = Math.floor(Math.random() * tasks.length);

function updateTask() {
    const taskElement = document.getElementById("task");
    if (taskElement) {
        taskElement.textContent = `Текущая задача: ${tasks[currentTaskIndex]}`;
    }
}

function refreshTask() {
    let newTaskIndex;
    do {
        newTaskIndex = Math.floor(Math.random() * tasks.length);
    } while (newTaskIndex === currentTaskIndex); // Исключаем повтор одного и того же задания

    currentTaskIndex = newTaskIndex;
    updateTask();
    startTimer();
    burgerIngredients = [];
    updateBurgerPreview();
}

function startTimer() {
    clearInterval(timerInterval);
    timer = 30;
    document.getElementById('timer-display').textContent = timer;

    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer-display').textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("Время вышло! Бургер не был собран вовремя.");
            refreshTask(); // Обновляем задание после проигрыша
        }
    }, 1000);
}

function addIngredient(ingredient) {
    burgerIngredients.push(ingredient);
    updateBurgerPreview();
    checkTaskCompletion();
}

function updateBurgerPreview() {
    const burgerList = document.getElementById('burger-list');
    burgerList.innerHTML = '';

    burgerIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        burgerList.appendChild(li);
    });
}

function checkTaskCompletion() {
    const task = tasks[currentTaskIndex];

    const taskConditions = {
        "Собери бургер из булочки, мяса и сыра": () =>
            burgerIngredients.includes('Булочка') && burgerIngredients.includes('Мясо') && burgerIngredients.includes('Сыр'),

        "Добавь огурцы и помидоры": () =>
            burgerIngredients.includes('Огурцы') && burgerIngredients.includes('Помидоры'),

        "Сделай вегетарианский бургер с листьями салата, огурцами и помидорами": () =>
            burgerIngredients.includes('Листья салата') && burgerIngredients.includes('Огурцы') && burgerIngredients.includes('Помидоры'),

        "Добавь двойной сыр и мясо": () =>
            burgerIngredients.filter(ing => ing === 'Сыр').length >= 2 &&
            burgerIngredients.filter(ing => ing === 'Мясо').length >= 2,

        "Собери бургер с булочкой, листьями салата и сыром": () =>
            burgerIngredients.includes('Булочка') && burgerIngredients.includes('Листья салата') && burgerIngredients.includes('Сыр')
    };

    if (taskConditions[task] && taskConditions[task]()) {
        alert(`Задание выполнено: "${task}"`);
        refreshTask(); // Выбираем новое задание после успешного выполнения
    }
}

function saveBurger() {
    if (burgerIngredients.length === 0) {
        alert("Ваш бургер пустой! Добавьте хотя бы один ингредиент.");
        return;
    }

    savedBurgers.push([...burgerIngredients]);
    localStorage.setItem('savedBurgers', JSON.stringify(savedBurgers));
    updateSavedBurgersTable();

    burgerIngredients = [];
    updateBurgerPreview();
}

function updateSavedBurgersTable() {
    const tbody = document.querySelector('#burger-table tbody');
    tbody.innerHTML = '';

    savedBurgers.forEach((burger, index) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        cell1.textContent = index + 1;
        cell2.textContent = burger.join(', ');

        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('savedBurgers');
    if (saved) {
        savedBurgers = JSON.parse(saved);
        updateSavedBurgersTable();
    }

    updateTask();
    startTimer();

    const refreshButton = document.getElementById("refresh-task");
    if (refreshButton) {
        refreshButton.addEventListener("click", refreshTask);
    }
});
