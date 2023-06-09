/* array de tareas que aparecen por defecto */
const testData = [
  {
    id: 10 /* duda */,
    description: "Hacer la compra",
    isCompleted: false,
  },
  {
    id: 2,
    description: "Hacer la cama",
    isCompleted: false,
  },
  {
    id: 28,
    description: "Hacer el proyecto about me",
    isCompleted: true,
  },
];

function buildTask(task) {
  const taskContainer = document.createElement("div");
  taskContainer.className = "task__task";
  taskContainer.innerHTML = `<input type="checkbox" ${
    task.isCompleted ? "checked" : ""
  } />${task.description}`;
  return taskContainer;
}

function renderList(filterToApply) {
  const tasksNode = document.querySelector("#task-list");
  tasksNode.innerHTML = "";

  let tasksToShow = testData;

  if (filterToApply === "active") {
    tasksToShow = testData.filter(function (task) {
      return !task.isCompleted;
    });
  }

  if (filterToApply === "completed") {
    tasksToShow = testData.filter(function (task) {
      return task.isCompleted;
    });
  }

  tasksToShow.forEach(function (task) {
    const taskHtml = buildTask(task);
    tasksNode.append(taskHtml);
  });
}

const formNode = document.querySelector("#add-task");
formNode.addEventListener("submit", function (event) {
  event.preventDefault();
  const description = document.forms["add-task"]["description"].value;
  const newTask = {
    id: new Date().getTime(),
    description,
    isCompleted: false,
  };

  const taskHtml = buildTask(newTask);
  const tasksNode = document.querySelector("#task-list");
  tasksNode.append(taskHtml);
  formNode.reset();
});

// Filters
const filterButtons = document.querySelectorAll(".filter__option");
const filterActiveClass = "filter__option--selected";
filterButtons.forEach(function (filterButton) {
  filterButton.addEventListener("click", function () {
    if (this.classList.contains(filterActiveClass)) {
      return;
    }

    const filterToApply = this.getAttribute("data-filter");
    renderList(filterToApply);

    // remove class
    document
      .querySelector(`.${filterActiveClass}`)
      .classList.remove(filterActiveClass);
    this.classList.add(filterActiveClass);

    if (filterToApply === "completed") {
      document.querySelector("#add-task").classList.add("hidden");
    } else {
      document.querySelector("#add-task").classList.remove("hidden");
    }
  });
});

renderList();
