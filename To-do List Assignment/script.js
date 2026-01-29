const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

// Load tasks or start with empty array
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((taskObj, index) => {
    const li = document.createElement("li");

    // If status is 'completed', we add a CSS class called 'checked'
    if (taskObj.status === "completed") {
      li.classList.add("checked");
    }

    li.innerHTML = `
            <div class="task-info" onclick="toggleStatus(${index})">
                <span class="task-text">${taskObj.task}</span>
                <small class="task-time">${taskObj.timeCreated}</small>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">&times;</button>
        `;
    taskList.appendChild(li);
  });

  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    // Creating the Object
    const newTask = {
      task: text,
      status: "pending",
      timeCreated: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }
}

// New function to flip status back and forth
function toggleStatus(index) {
  tasks[index].status =
    tasks[index].status === "pending" ? "completed" : "pending";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function clearTasks() {
  tasks = [];
  renderTasks();
}

addBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearTasks);

renderTasks();
