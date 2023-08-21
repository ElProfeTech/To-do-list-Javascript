const botonagregar = document.getElementById("btn-add-task");
const listado = document.getElementById("list-task");

botonagregar.addEventListener("click", () => {
  const taskText = document.getElementById("input-write-task").value.trim();

  if (taskText === "") {
    alert("Debe escribir una tarea primero");
    const input = document.getElementById("input-write-task");
    input.focus();
    return; // Salir del evento si taskText está vacío
  }

  // Verificar si ya existe un párrafo con el mismo contenido
  const existingParagraph = [...listado.querySelectorAll(".task p")].find(p => p.textContent === taskText);
  if (existingParagraph) {
    alert("Ya existe una tarea igual");
    return; // Salir del evento si ya existe la tarea
  }

  // Crear y agregar la nueva tarea
  const newTask = `
    <li class="task">
      <div class="circle"></div>
      <p>${taskText}</p>
      <div class="imagetrash">
        <img src="cubobasura.png" alt="">
      </div>
    </li>
  `;
  listado.insertAdjacentHTML("beforeend", newTask);

  // Limpiar el input después de agregar la tarea
  document.getElementById("input-write-task").value = "";

  // Agregar eventos a los elementos de la nueva tarea
  const newTaskElement = listado.lastElementChild;
  const circle = newTaskElement.querySelector(".circle");
  const imagetrash = newTaskElement.querySelector(".imagetrash");

  circle.addEventListener("click", () => {
    circle.classList.toggle("btnTaskactive");
    guardarTareasEnLocalStorage();
  });

  imagetrash.addEventListener("click", () => {
    const confirmacion = confirm("¿Está seguro de eliminar esta tarea?");
    if (confirmacion) {
      listado.removeChild(newTaskElement);
      guardarTareasEnLocalStorage();
    }
  });

  guardarTareasEnLocalStorage();
});



// Cargar tareas desde el localStorage al cargar la página
cargarTareasDesdeLocalStorage();

function cargarTareasDesdeLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  listado.innerHTML = tasks.join("");

  // Agregar eventos a los elementos de las tareas cargadas
  const circleList = listado.querySelectorAll(".circle");
  const imagetrashList = listado.querySelectorAll(".imagetrash");

  circleList.forEach(circle => {
    circle.addEventListener("click", () => {
      circle.classList.toggle("btnTaskactive");
      guardarTareasEnLocalStorage();
    });
  });

  imagetrashList.forEach(imagetrash => {
    imagetrash.addEventListener("click", () => {
      const item = imagetrash.closest(".task");
      if (item) {
        const confirmacion = confirm("¿Está seguro de eliminar esta tarea?");
        if (confirmacion) {
          listado.removeChild(item);
          guardarTareasEnLocalStorage();
          
          
        }
        

      }
    });
   

  });
}

function guardarTareasEnLocalStorage() {
  const tasks = Array.from(listado.querySelectorAll(".task")).map(task => task.outerHTML);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

