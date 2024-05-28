const inputBoxData = document.querySelector("#input");
const listContainer = document.querySelector(".check");
const button = document.querySelector("#btn");

const count = document.querySelector(".count");
const comp = document.querySelector("#complete");
var x = 0;

const createCircle = (circle, h1) => {
    circle.style.width = "13px";
    circle.style.height = "13px";
    circle.style.borderRadius = "50%";
    circle.style.border = '1px solid black'
    circle.style.cursor = 'pointer';
    circle.addEventListener('click', function () {
        if (h1.style.textDecoration != 'line-through') {
            comp.textContent = ++x;
        }
        circle.style.background = 'red';
        h1.style.textDecoration = 'line-through';
        saveData();
    });
}

function updateCount() {
    count.textContent = listContainer.childElementCount;
}



function createCross() {
    const cross = document.createElement("div");
    cross.innerHTML = '&times;';  // You can use an 'X' or any other symbol
    cross.classList.add("cross");
    cross.style.cursor = 'pointer';
    cross.style.fontSize = '24px';

    cross.style.paddingBottom = '3px';
    cross.style.marginLeft = '20px';

    cross.addEventListener('mouseover', function () {
        cross.style.color = 'red';
    });

    cross.addEventListener('mouseout', function () {
        cross.style.color = 'black';
    });

    cross.addEventListener('click', function () {
        cross.parentElement.remove();
        updateCount();
        saveData();

    });
    return cross;
}

function createTaskElement(text, isCompleted = false) {
    let newdiv = document.createElement("div");
    newdiv.classList.add("todo")
    let newh1 = document.createElement("h1");
    newh1.innerHTML = text;
    if (isCompleted) {
        newh1.style.textDecoration = 'line-through';
    }

    newdiv.style.display = "flex";
    newdiv.style.alignItems = "center";
    newdiv.style.gap = "5px";
    const circle = document.createElement("div");
    createCircle(circle, newh1);
    if (isCompleted) {
        circle.style.background = 'red';
    }

    newdiv.appendChild(circle);
    newdiv.appendChild(newh1);
    const cross = createCross();
    newdiv.appendChild(cross);

    return newdiv
}

function addTask() {
    if (inputBoxData.value === '') {
        alert("You must write something!");
    }
    else {
        const newTaskElement = createTaskElement(inputBoxData.value, false)
        listContainer.appendChild(newTaskElement);
        updateCount();
        saveData();
    }
    inputBoxData.value = "";
}

button.addEventListener('click', function () {
    addTask();
    // listContainer.appendChild(Uncheck);
})

inputBoxData.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


function saveData() {
    const tasks = [];
    listContainer.querySelectorAll(".todo").forEach(todo => {
        const h1 = todo.querySelector("h1");
        const isCompleted = h1.style.textDecoration === 'line-through';
        tasks.push({ text: h1.innerHTML, isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedCount', x);
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    x = parseInt(localStorage.getItem('completedCount')) || x;
    tasks.forEach(task => {
        const newTaskElement = createTaskElement(task.text, task.isCompleted);
        listContainer.appendChild(newTaskElement);
    });
    updateCount();
    comp.textContent = x;
}

window.addEventListener('load', function () {
    showTask();
});

