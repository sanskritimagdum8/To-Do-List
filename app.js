// Selectors
const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const pendingTasks = document.getElementById("pending-tasks");
const completedTasks = document.getElementById("completed-tasks");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");

// Event Listeners
addButton.addEventListener("click", addTask);
taskList.addEventListener("click", completeTask);
completedList.addEventListener("click", deleteTask);

// Functions
function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }
  const newTask = document.createElement("li");
  newTask.innerText = taskText;
  taskList.appendChild(newTask);
  taskInput.value = "";
}

function completeTask(event) {
  const target = event.target;
  if (target.tagName === "LI") {
    target.classList.toggle("completed");
    if (target.classList.contains("completed")) {
      completedList.appendChild(target);
      pendingTasks
