// HTML failis olevate elementide loomine Javascripti kirjutamiseks ID kaudu

const writeTask = document.getElementById('write-task');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


// funktsioon lisamise nupule

function addTask() {

    // Juhul kui tekstiväli on jäetud tühjaks, kuva hoiatussõnum
    if (writeTask.value === '') {
        console.log("You didn't enter anything!"); // testin konsoolis, kas see töötab - eesmärk on iseenesest, et ei toimuks midagi kasutajale
    }

    // Juhul kui tekstiväljale on tekst sisestatud, lisa see task listi
    else {
        const li = document.createElement('li');
        const span = document.createElement('span');
        taskList.appendChild(li);
        li.appendChild(span);
        span.innerHTML = writeTask.value;

        // lisan checkboxi input tüübiga
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkmark'); // lisab CSS classi, et hiljem kujundada

        // lisan muutmise nupu
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Muuda'; // nupul olev tekst
        editBtn.classList.add('edit-btn'); // lisab css classi hiljem nupu kujundamiseks

        // lisan kustutamise nupu
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Kustuta';
        deleteBtn.classList.add('delete-btn');

        // lisan nupud listireale juurde
        li.prepend(checkbox); // paneb checkboxi listirea algusesse
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // teeb tekitatud span ala klikitavaks, et sellele klikkides muutuks ka checkbox
    span.addEventListener('click', function() {
        checkbox.checked = !checkbox.checked;

        // lisan stiili, et eristada checked/unchecked ülesanded
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through'; // kriipsutab teksti läbi inline stiiliga
            li.classList.add('checked'); // lisab klassi li elemendile kui see on täidetud
        } else {
            span.style.textDecoration = 'none';
            li.classList.remove('checked');
        }
    })

        // ülesande kustutamise funktsioon
        deleteBtn.addEventListener('click', () => li.remove());

        // ülesande muutmise funktsioon
        editBtn.addEventListener('click', function() {
            if (editBtn.textContent === 'Muuda') { // kui nupul olev tekst on muuda, siis
                const newTaskText = prompt('Muuda ülesannet:', span.textContent); // too alertiga ette prompt (erineb tavalisest alertist, sest on ka tekstiväli)
                if (newTaskText !== null && newTaskText.trim() !== '') { // tahab, et muudetava teksti väli ei saa olla ainult tühik või tühi väli
                    span.textContent = newTaskText;
                }
            }
        });
    }

    // Tühjenda ülesande lisamise tekstiväli
    writeTask.value = '';
}

// sorteerimise nupp
const sortTaskBtn = document.createElement('button');
sortTaskBtn.textContent = 'Sorteeri';
sortTaskBtn.classList.add('sort-btn')
taskList.appendChild(sortTaskBtn);

// sorteerib täidetud ja täitmata ülesanded
function sortTasks() {
    const tasksArray = Array.from(taskList.getElementsByTagName('li')); // tekitab lsiatud ülesannetest array, mida saab sorteerida

    tasksArray.sort((a, b) => {
        const checkboxA = a.querySelector('input[type="checkbox"]');
        const checkboxB = b.querySelector('input[type="checkbox"]');

        // täitmata ülesanded on üleval ja täidetud ülesanded all
        return checkboxA.checked - checkboxB.checked;
    });

    // lisab ülesanded uuesti sorteeritud järjekorras
    tasksArray.forEach(task => taskList.appendChild(task));
}

// sorteerimise nupule vajutamise funktsioon
sortTaskBtn.addEventListener('click', sortTasks);

// kui vajutada "enter" siis saab ka ülesandeid lisada
writeTask.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// filter???

const allBtn = document.getElementById('all');
const completedBtn = document.getElementById('completed');
const activeBtn = document.getElementById('active');
const tasks = taskList.getElementsByTagName('li'); // võtab arvesse kõiki juba lisatud li elemente ehk ülesandeid

// funktsioon, mis näitab kõiki ülesandeid
function showAll() {
    Array.from(tasks).forEach(task => {
        task.style.display = 'flex'; // näita kõiki
    });
}

// funktsioon, mis näitab täidetud ülesandeid
function showCompleted() {
    Array.from(tasks).forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            task.style.display = 'flex'; // näita täidetud ülesandeid
        } else {
            task.style.display = 'none'; // peida täitmata ülesanded
        }
    });
}

// funktsioon, mis näitab ainult täitmata ülesandeid
function showActive() {
    Array.from(tasks).forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            task.style.display = 'none'; // näita täitmata ülesanded
        } else {
            task.style.display = 'flex'; // peida täidetud ülesanded
        }
    });
}

// Attach event listeners to the buttons
allBtn.addEventListener('click', showAll);
completedBtn.addEventListener('click', showCompleted);
activeBtn.addEventListener('click', showActive);