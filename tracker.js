const STORAGE_KEY = "prepwise_tasks";
const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskCategoryInput = document.getElementById("task-category");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");

function getTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  const tasks = getTasks();
  taskList.replaceChildren();
  emptyState.hidden = tasks.length > 0;

  tasks.forEach(task => {
    const row = document.createElement("div");
    row.className = `task-item${task.completed ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.name} completed`);
    checkbox.addEventListener("change", () => {
      const latestTasks = getTasks();
      const target = latestTasks.find(item => item.id === task.id);
      if (target) {
        target.completed = checkbox.checked;
        saveTasks(latestTasks);
        renderTasks();
      }
    });

    const content = document.createElement("div");
    content.className = "task-content";

    const name = document.createElement("span");
    name.className = "task-name";
    name.textContent = task.name;

    const category = document.createElement("span");
    category.className = "task-category";
    category.textContent = task.category;

    content.append(name, category);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      saveTasks(getTasks().filter(item => item.id !== task.id));
      renderTasks();
    });

    row.append(checkbox, content, deleteButton);
    taskList.appendChild(row);
  });
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = taskNameInput.value.trim();
  if (!name) return;

  const tasks = getTasks();
  tasks.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    category: taskCategoryInput.value,
    completed: false
  });

  saveTasks(tasks);
  taskForm.reset();
  taskNameInput.focus();
  renderTasks();
});

document.getElementById("clear-completed").addEventListener("click", () => {
  saveTasks(getTasks().filter(task => !task.completed));
  renderTasks();
});

renderTasks();
