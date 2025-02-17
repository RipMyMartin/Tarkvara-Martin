let burgeriKoostisosad = [];
let salvestatudBurgerid = [];
let taimer = 30;
let taimeriIntervall;

let ülesanded = [
    "Koosta burger kuklist, lihast ja juustust",
    "Lisa kurgid ja tomatid"
];

let praeguneÜlesandeIndeks = 0;

function uuendaÜlesannet() {
    const ülesanneteNimekiri = document.getElementById('task-list');
    const ülesanneElement = document.createElement('li');
    ülesanneElement.textContent = ülesanded[praeguneÜlesandeIndeks];
    ülesanneteNimekiri.innerHTML = '';
    ülesanneteNimekiri.appendChild(ülesanneElement);
}

function alustaTaimerit() {
    taimeriIntervall = setInterval(() => {
        taimer--;
        document.getElementById('timer-display').textContent = taimer;
        if (taimer <= 0) {
            clearInterval(taimeriIntervall);
            alert("Aeg on läbi! Sa ei jõudnud burgerit õigel ajal kokku panna.");
        }
    }, 1000);
}

function lisaKoostisosa(koostisosa) {
    burgeriKoostisosad.push(koostisosa);
    uuendaBurgeriEelvaadet();
    kontrolliÜlesandeTäitumist();
}

function uuendaBurgeriEelvaadet() {
    const burgeriNimekiri = document.getElementById('burger-list');
    burgeriNimekiri.innerHTML = '';

    burgeriKoostisosad.forEach(koostisosa => {
        const li = document.createElement('li');
        li.textContent = koostisosa;
        burgeriNimekiri.appendChild(li);
    });
}

function kontrolliÜlesandeTäitumist() {
    const ülesanne = ülesanded[praeguneÜlesandeIndeks];

    if (ülesanne === "Koosta burger kuklist, lihast ja juustust") {
        if (burgeriKoostisosad.includes('Kukkel') && burgeriKoostisosad.includes('Liha') && burgeriKoostisosad.includes('Juust')) {
            praeguneÜlesandeIndeks++;
            uuendaÜlesannet();
        }
    }

    if (ülesanne === "Lisa kurgid ja tomatid") {
        if (burgeriKoostisosad.includes('Kurgid') && burgeriKoostisosad.includes('Tomatid')) {
            praeguneÜlesandeIndeks++;
            uuendaÜlesannet();
        }
    }

    if (praeguneÜlesandeIndeks === ülesanded.length) {
        alert("Palju õnne! Sa panid burgeri kõikide ülesannete järgi kokku!");
    }
}

function salvestaBurger() {
    if (burgeriKoostisosad.length === 0) {
        alert("Sinu burger on tühi! Lisa vähemalt üks koostisosa.");
        return;
    }

    salvestatudBurgerid.push([...burgeriKoostisosad]);

    localStorage.setItem('salvestatudBurgerid', JSON.stringify(salvestatudBurgerid));

    uuendaSalvestatudBurgeriteTabel();

    burgeriKoostisosad = [];
    uuendaBurgeriEelvaadet();
}

function uuendaSalvestatudBurgeriteTabel() {
    const tbody = document.querySelector('#burger-table tbody');
    tbody.innerHTML = '';

    salvestatudBurgerid.forEach((burger, indeks) => {
        const rida = document.createElement('tr');
        const lahter1 = document.createElement('td');
        const lahter2 = document.createElement('td');

        lahter1.textContent = indeks + 1;
        lahter2.textContent = burger.join(', ');

        rida.appendChild(lahter1);
        rida.appendChild(lahter2);
        tbody.appendChild(rida);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const salvestatud = localStorage.getItem('salvestatudBurgerid');
    if (salvestatud) {
        salvestatudBurgerid = JSON.parse(salvestatud);
        uuendaSalvestatudBurgeriteTabel();
    }
    uuendaÜlesannet();
    alustaTaimerit();
});

// Lisa uus funktsionaalsus Jalopenie jaoks
function addIngredient(ingredient) {
    lisaKoostisosa(ingredient);
}
