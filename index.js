const STORAGE_KEY = "prepwise_tasks";

function getTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function updateDashboard() {
  const tasks = getTasks();
  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("completed-count").textContent = completed;
  document.getElementById("total-count").textContent = total;
  document.getElementById("progress-percent").textContent = `${percent}%`;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}

updateDashboard();
