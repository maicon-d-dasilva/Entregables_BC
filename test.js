const fecha = document.querySelector("#fecha");
const marca = document.querySelector("#marca");
const proj = document.querySelector("#proj");
const piezas = document.querySelector("#piezas");
const link = document.querySelector("#link");
const lista = document.querySelector("#taskSecc");
const ButtonSend = document.querySelector("#icon");

//inicio el array con lo que ya exista en el storage o vacio si no hay nada
let listArr = JSON.parse(localStorage.getItem("todo")) || [];

const fechaNav = new Date();
fecha.innerHTML = fechaNav.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

function guardoListaEnLocalstorage() {
  localStorage.setItem("todo", JSON.stringify(listArr));
}

function cargoListaDesdeLocalstorage() {
  const data = localStorage.getItem("todo");
  if (data) {
    listArr = JSON.parse(data);
    cargarLista();
  }
}

function AddTask(task) {
  const elemento = `<div class=" row align-items-center justify-content-evenly" id="row3">
    <div class="" id="marcaExp">${task.Marca}</div>
    <div class="text-wrap" id="projExp">${task.Proj}</div>
    <div class="" id="piezasExp">${task.Piezas} pzas</div>
    <a class="" id="linkBC" href="${task.link}">
      <img class="" id="iconBC" src="./icon/basecamp_3.png" alt="">
    </a>
    <div class="" id="cambiosExp">Cambios</div>
    <img class="" id="edit" src="./icon/pen.svg"></img>
    <img class="" data="eliminado" id="delete" src="./icon/circle-minus-solid.svg"></img>
  </div>`;

  lista.insertAdjacentHTML("afterbegin", elemento);
  linkUrl = document.querySelector("#linkBC");
  linkUrl.href = link.value;
}

function cargarLista() {
  // limpio lista antes de cargar
  lista.innerHTML = "";
  listArr.forEach(function (task) {
    if (!task.eliminado) {
      AddTask(task);
    }
  });
}

function tareaElim(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  listArr[element.id].eliminado = true;
  // acá faltaría eliminar del local storage.
}

ButtonSend.addEventListener("click", () => {
  const marcaVal = marca.value;
  const projVal = proj.value;
  const piezasVal = piezas.value;
  const linkVal = link.value;

  if (marcaVal && projVal && piezasVal && linkVal) {
    //guardo la tarea en un obj
    const task = {
      Marca: marcaVal,
      Proj: projVal,
      Piezas: piezasVal,
      link: linkVal,
      eliminado: false,
    };

    // le hago el push del objeto en si. Mas que nada para que me quede mas claro
    listArr.push(task);
    AddTask(task);
    //guardo la lista en el storage
    guardoListaEnLocalstorage();

    //dejo
    marca.value = "";
    proj.value = "";
    piezas.value = "";
    link.value = "";
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const marcaVal = marca.value;
    const projVal = proj.value;
    const piezasVal = piezas.value;
    const linkVal = link.value;

    if (marcaVal && projVal && piezasVal) {
      AddTask(marcaVal && projVal && piezasVal && linkVal);
      listArr.push({
        Marca: marcaVal,
        Proj: projVal,
        Piezas: piezasVal,
        link: linkVal,
        eliminado: false,
      });
    }
    localStorage.setItem("todo", JSON.stringify(listArr));
    marca.value = "";
    proj.value = "";
    piezas.value = "";
    link.value = "";
  }
});

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData === "eliminado") {
    tareaElim(element);
  }
  guardoListaEnLocalstorage();
});

/*
recargo desde el localstorage en el reaload de la pagina
*/
cargoListaDesdeLocalstorage();
