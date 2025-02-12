let burgerIngredients = [];
let savedBurgers = [];
let timer = 30;
let timerInterval;

let taskSets = [
    ["Собери бургер из булочки, мяса и сыра"],
    ["Добавь огурцы и помидоры"],
    ["Сделай бургер с двумя слоями мяса"],
    ["Добавь листья салата и сыр"],
    ["Собери бургер без мяса"],
    ["Сделай двойной бургер с двумя булочками"],
    ["Добавь все ингредиенты"]
];

let currentTaskIndex = 0;
let currentTaskSet = [];

function pickRandomTaskSet() {
    currentTaskSet = taskSets[Math.floor(Math.random() * taskSets.length)];
}

function updateTask() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    currentTaskSet.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
    });
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
    let allTasksCompleted = currentTaskSet.every(task => {
        switch (task) {
            case "Собери бургер из булочки, мяса и сыра":
                return burgerIngredients.includes('Булочка') && burgerIngredients.includes('Мясо') && burgerIngredients.includes('Сыр');
            case "Добавь огурцы и помидоры":
                return burgerIngredients.includes('Огурцы') && burgerIngredients.includes('Помидоры');
            case "Сделай бургер с двумя слоями мяса":
                return burgerIngredients.filter(i => i === 'Мясо').length >= 2;
            case "Добавь листья салата и сыр":
                return burgerIngredients.includes('Листья салата') && burgerIngredients.includes('Сыр');
            case "Собери бургер без мяса":
                return !burgerIngredients.includes('Мясо');
            case "Сделай двойной бургер с двумя булочками":
                return burgerIngredients.filter(i => i === 'Булочка').length >= 2;
            case "Добавь все ингредиенты":
                return ['Булочка', 'Мясо', 'Сыр', 'Огурцы', 'Помидоры', 'Листья салата'].every(ing => burgerIngredients.includes(ing));
            default:
                return false;
        }
    });

    if (allTasksCompleted) {
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
    pickRandomTaskSet();
    updateTask();
    startTimer();
});
