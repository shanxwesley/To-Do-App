// Get DOM elements
const inputField = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterAllButton = document.getElementById('filter-all');
const filterActiveButton = document.getElementById('filter-active');
const filterCompletedButton = document.getElementById('filter-completed');
const sortAlphabeticallyButton = document.getElementById('sort-alphabetically');
const clearAllButton = document.getElementById('clear-all');
const taskCountDisplay = document.getElementById('task-count');

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });
    updateTaskCount();
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        const taskText = item.querySelector('.task-text').textContent;
        const completed = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskCount();
}

// Update task count
function updateTaskCount() {
    const totalTasks = document.querySelectorAll('.todo-item').length;
    const completedTasks = document.querySelectorAll('.todo-item input[type="checkbox"]:checked').length;
    const activeTasks = totalTasks - completedTasks;
    taskCountDisplay.textContent = `${activeTasks} tasks left`;
}

// Add a new task to the list
function addTaskToList(taskText, completed = false) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    // Create task checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    // Create task text
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    // Task deletion functionality
    deleteButton.addEventListener('click', function () {
        todoList.removeChild(listItem);
        saveTasks();
    });

    // Toggle completion status
    checkbox.addEventListener('change', function () {
        saveTasks();
    });

    // Append elements to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    // Add list item to the todo list
    todoList.appendChild(listItem);

    // Save tasks to local storage
    saveTasks();
}

// Add task on button click
addButton.addEventListener('click', function () {
    const task = inputField.value.trim();
    if (task !== '') {
        addTaskToList(task);
        inputField.value = '';
    }
});

// Add task on Enter key press
inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const task = inputField.value.trim();
        if (task !== '') {
            addTaskToList(task);
            inputField.value = '';
        }
    }
});

// Filter tasks: All
filterAllButton.addEventListener('click', function () {
    document.querySelectorAll('.todo-item').forEach(item => {
        item.style.display = 'flex';
    });
});

// Filter tasks: Active
filterActiveButton.addEventListener('click', function () {
    document.querySelectorAll('.todo-item').forEach(item => {
        const isChecked = item.querySelector('input[type="checkbox"]').checked;
        item.style.display = isChecked ? 'none' : 'flex';
    });
});

// Filter tasks: Completed
filterCompletedButton.addEventListener('click', function () {
    document.querySelectorAll('.todo-item').forEach(item => {
        const isChecked = item.querySelector('input[type="checkbox"]').checked;
        item.style.display = isChecked ? 'flex' : 'none';
    });
});

// Sort tasks alphabetically
sortAlphabeticallyButton.addEventListener('click', function () {
    const tasks = Array.from(todoList.children);
    tasks.sort((a, b) => {
        const textA = a.querySelector('.task-text').textContent.toLowerCase();
        const textB = b.querySelector('.task-text').textContent.toLowerCase();
        return textA.localeCompare(textB);
    });

    // Append sorted tasks to the list
    tasks.forEach(task => todoList.appendChild(task));
    saveTasks();
});

// Clear all tasks
clearAllButton.addEventListener('click', function () {
    todoList.innerHTML = '';
    saveTasks();
});

// Load tasks on page load
loadTasks();
