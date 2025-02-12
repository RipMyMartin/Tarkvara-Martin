let burgerIngredients = [];
let savedBurgers = [];
let timer = 30;
let timerInterval;

let taskSets = [
    ["Koosta kuklist, lihast ja juustust burger"],
    ["Lisa kurgid ja tomatid"],
    ["Tee burger kahe kihiga lihaga"],
    ["Lisa salat ja juust"],
    ["Ehitage burger ilma lihata"],
    ["Tee kahe kukliga topeltburger"],
    ["Lisa kõik koostisained"]
];

let currentTaskIndex = 0;
let currentTaskSet = [];

function pickRandomTaskSet() {
    currentTaskSet = taskSets[Math.floor(Math.random() * taskSets.length)];
    updateTask();
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
            alert("Aeg on läbi! Burgerit ei pandud õigeks ajaks kokku.");
            pickRandomTaskSet();
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
            case "Koosta kuklist, lihast ja juustust burger":
                return burgerIngredients.includes('kukkel') && burgerIngredients.includes('Liha') && burgerIngredients.includes('juust');
            case "Lisa kurgid ja tomatid":
                return burgerIngredients.includes('Kurgid') && burgerIngredients.includes('Tomatid');
            case "Tee burger kahe kihiga lihaga":
                return burgerIngredients.filter(i => i === 'Liha').length >= 2;
            case "Добавь листья салата и сыр":
                return burgerIngredients.includes('Salati lehed') && burgerIngredients.includes('juust');
            case "Собери бургер без мяса":
                return !burgerIngredients.includes('Liha');
            case "Сделай двойной бургер с двумя булочками":
                return burgerIngredients.filter(i => i === 'kukkel').length >= 2;
            case "Добавь все ингредиенты":
                return ['kukkel', 'Liha', 'juust', 'Kurgid', 'Tomatid', 'Salati lehed'].every(ing => burgerIngredients.includes(ing));
            default:
                return false;
        }
    });

    if (allTasksCompleted) {
        alert("Palju õnne! Olete burgeri valmistamiseks kõik ülesanded täitnud!");
        pickRandomTaskSet();
    }
}

function saveBurger() {
    if (burgerIngredients.length === 0) {
        alert("Teie burger on tühi! Lisage vähemalt üks koostisosa.");
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
    startTimer();
});
