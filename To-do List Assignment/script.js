// 1. SELECTING ELEMENTS: We tell JS which HTML parts to watch
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

// 2. THE DATA: Check if there's a list in memory; if not, start empty
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

// 3. THE DISPLAY: A function to show the tasks on the screen
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">&times;</button>
        `;
    taskList.appendChild(li);
  });

  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// 4. THE ACTIONS: Functions to Add, Delete, and Clear
function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push(text);
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function clearTasks() {
  tasks = [];
  renderTasks();
}

// 5. EVENT LISTENERS: Connect the buttons to the functions
addBtn.addEventListener("click", addTask);

renderTasks();
