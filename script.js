// Get references to the HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTasksList = document.getElementById("pendingTasks");
const completedTasksList = document.getElementById("completedTasks");

// Check if there are any tasks stored in local storage
let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

// Function to render the tasks
function renderTasks() {
	// Clear the lists
	pendingTasksList.innerHTML = "";
	completedTasksList.innerHTML = "";
	
	// Render the pending tasks
	tasks.filter(task => !task.completed).forEach(task => {
		const li = document.createElement("li");
		li.innerHTML = `<span>${task.text}</span><button class="deleteBtn">Delete</button><button class="completeBtn">Complete</button>`;
		li.querySelector(".deleteBtn").addEventListener("click", () => {
			deleteTask(task);
		});
		li.querySelector(".completeBtn").addEventListener("click", () => {
			completeTask(task);
		});
		pendingTasksList.appendChild(li);
	});
	
	// Render the completed tasks
	tasks.filter(task => task.completed).forEach(task => {
		const li = document.createElement("li");
		li.innerHTML = `<span>${task.text}</span><button class="deleteBtn">Delete</button>`;
		li.querySelector(".deleteBtn").addEventListener("click", () => {
			deleteTask(task);
		});
		completedTasksList.appendChild(li);
	});
	
	// Save the tasks to local storage
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
	if (taskInput.value.trim() !== "") {
		const task = {
			id: Date.now(),
			text: taskInput.value.trim(),
			completed: false,
			createdAt: new Date()
		};
		tasks.push(task);
		renderTasks();
		taskInput.value = "";
	}
}

// Function to complete a task
function completeTask(task) {
	task.completed = true;
	renderTasks();
}

// Function to delete a task
function deleteTask(task) {
	tasks = tasks.filter(t => t.id !== task.id);
	renderTasks();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => {
	if (e.keyCode === 13) {
		addTask();
	}
});

// Render the tasks when the page loads
renderTasks();
