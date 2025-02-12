let burgerIngredients = [];
let savedBurgers = [];
let timer = 30;
let timerInterval;

let tasks = [
    "Собери бургер из булочки, мяса и сыра",
    "Добавь огурцы и помидоры"
];

let currentTaskIndex = 0;

function updateTask() {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = tasks[currentTaskIndex];
    taskList.innerHTML = '';
    taskList.appendChild(taskItem);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer-display').textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("Время вышло! Бургер не был собран вовремя.");
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

    if (task === "Собери бургер из булочки, мяса и сыра") {
        if (burgerIngredients.includes('Булочка') && burgerIngredients.includes('Мясо') && burgerIngredients.includes('Сыр')) {
            currentTaskIndex++;
            updateTask();
        }
    }

    if (task === "Добавь огурцы и помидоры") {
        if (burgerIngredients.includes('Огурцы') && burgerIngredients.includes('Помидоры')) {
            currentTaskIndex++;
            updateTask();
        }
    }

    if (currentTaskIndex === tasks.length) {
        alert("Поздравляем! Вы собрали бургер по всем заданиям!");
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
});
