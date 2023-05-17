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

/* creamos una función que crea el contenedor de cada tarea, con su variable tarea */
/* esta función se crea para poder utilizarla en la función renderList */
function buildTask(task) {
  /* declaramos el contenedor que contenga la tarea */
  /* createElement nos ha creado un div dentro del html */
  const taskContainer = document.createElement("div");
  /* creamos una clase para la constate creada anteriormente */
  taskContainer.className = "task__task";
  /* dentro del div metemos el checkbox de la tarea con su descripción */
  /* lo que tenemos a partir del dollar se lee de la siguiente manera: si la variable task está completada tendrá el valor checked, sino no tendrá ningún valor */
  /* lo que está dentro de las llaves del dolar se interpreta como variable */
  taskContainer.innerHTML = `<input type="checkbox" ${
    task.isCompleted ? "checked" : ""
  } />${task.description}`;
  return taskContainer;
}

/* creamos una función que pinta en pantalla lo creado en la función anterior */
function renderList() {
  /* crea una constante que selecciona el id del contenedor de tareas */
  const taskNode = document.querySelector("#task-list");
  /* por cada elemento del array se ejecuta una función con el parámetro tarea, que su valor es el de los objetos del array, un id, una descripcion y un booleano */
  testData.forEach(function (task) {
    /* se declara una constante cuyo valor es la función anterior (la estructura del checkbox) para poder pintar en pantalla */
    const taskHtml = buildTask(task);
    /* pinta en el contenedor de tareas del html la tarea (taskHtml) */
    taskNode.append(taskHtml);
  });
}

/* declaramos constante cuyo valor es el todo lo que está dentro de la etiqueta "form" de html */
const formNode = document.querySelector("#add-task");
/* añadimos un evento que escucha al botón submit del formulario y ejecuta una función */
/* a la función del event listener se le llama por defecto event */
formNode.addEventListener("submit", function (event) {
  /* se pone preventDefault para que al rellenar el formulario no me refresque la página porque por defecto se refresca */
  event.preventDefault();
  /* para acceder al valor del input */ /* duda: no entiendo el add-task ni el description, si add-task es un id porque no se pone un # */ const description =
    document.forms["add-task"]["description"].value;
  /* creamos constante que lleve el id, description y isCompleted de cada tarea nueva que escribamos */
  const newTask = {
    /* utilizamos Date.getTime para crear id únicos */
    id: new Date().getTime(),
    description,
    /* para que por defecto salga como sin completar */
    isCompleted: false,
  };

  /* hacemos esto al igual que antes para pintar en pantalla la nueva tarea */
  const taskHtml = buildTask(newTask);
  /* volvemos a definir la constante taskNode para que funcione dentro de esta funcion */
  const taskNode = document.querySelector("#task-list");
  taskNode.append(taskHtml);
  formNode.reset();
});
/* llama a la función renderList */
renderList();
