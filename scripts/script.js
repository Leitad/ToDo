let textoTarea, color, fechaTarea, fecha
let tareas = { id: [], textoTarea: [], color: [], fecha: [] }

window.onload = () => {
    document.getElementById("nuevoToDo").onclick = comprobarCampos
    llenarDatos()
    llenarDataList()
    document.getElementById("anadirTarea").onclick = anadirTareaLista
}
Number.prototype.dosValores = function() {
        if (this < 10 && this > -1) {
            return "0" + this
        } else {
            return this
        }
    }
    // Al iniciar llena el desplegable
function llenarDataList() {
    if (localStorage.dataList == undefined) {
        localStorage.dataList = '{"campos":["Poner lavadora","Cambiar la ropa del armario","Acabar proyecto de JS","Ir al medico","Renovar DNI"]}'
    }
    dataList = JSON.parse(localStorage.dataList)
    dataList.campos.sort()
    for (i = 0; i < dataList.campos.length; i++) {
        anadirOption(dataList.campos[i])

    }
}
// Comprueba si es valido el valor
function anadirTareaLista() {
    repetido = false
    dataList = JSON.parse(localStorage.dataList)
    valorAnadir = document.getElementById("textoAnadirTarea").value.trim()
    if (valorAnadir == "") {
        repetido = true
    }
    for (x in dataList.campos) {
        if (dataList.campos[x] == valorAnadir) {
            repetido = true
        }
    }
    if (!repetido) {
        dataList.campos.push(valorAnadir)
        dataList.campos.sort()
        localStorage.dataList = JSON.stringify(dataList)
        anadirOption(valorAnadir)
    } else {
        alert("La tarea ya esta en la lista o esta vacia")
    }
}
//Recibe el texto y añade al desplegable
function anadirOption(valor) {
    aux = document.createElement("OPTION")
    aux.value = valor
    document.getElementById("textoTareas").appendChild(aux)
}

function comprobarCampos() {
    //Recogemos los datos
    textoTarea = document.getElementById("textoTarea").value
    color = document.querySelector(".color:checked").value
    fechaLimite = document.getElementById("fechaLimite").value
    horaLimite = document.getElementById("horaLimite").value
        // Comprobamos el nombre de la tarea
    if (textoTarea.trim() == "") {
        alert("El campo de texto no puede estar vacio")
        return
    }
    // Guardamos fecha y comprobamos
    fechaTarea = new Date(fechaLimite + " " + horaLimite)
    fecha = new Date()
    if (fecha >= fechaTarea || fechaTarea == undefined) {
        alert("La fecha tiene que ser posterior a hoy o vacia")
        return
    }
    anadirToDo()
    resetCampos()
}
//Devuelve los campos del formulario a 0
function resetCampos() {
    document.getElementById("textoTarea").value = ""
    document.getElementById("fechaLimite").value = ""
    document.getElementById("horaLimite").value = ""
    document.getElementById("colorVerde").checked
}
// Añade los datos al localstorage y llama a creardiv
function anadirToDo() {
    id = id = Date.parse(fecha) + Math.random()
    tareas.id.push(id)
    tareas.textoTarea.push(textoTarea)
    tareas.color.push(color)
    tareas.fecha.push(fechaTarea)
    localStorage.tareas = JSON.stringify(tareas)
    crearDiv(tareas.textoTarea.length - 1)
}
// Genera un div que contiene los datos del ToDo dentro de span
function crearDiv(posicionMostrar) {
    tareas = JSON.parse(localStorage.tareas)
    div = document.createElement("div")
    div.id = tareas.id[posicionMostrar]
    div.className = "toDo"
    div.style.backgroundColor = tareas.color[posicionMostrar]
    document.getElementById("listaToDo").appendChild(div)
    div = document.getElementById(tareas.id[posicionMostrar])
    span = document.createElement("span")
    span.textContent = tareas.textoTarea[posicionMostrar]
    span.className = "nombreToDo"
    div.appendChild(span)
    if (tareas.fecha[posicionMostrar] != null) {
        span = document.createElement("span")
        fechaMostrar = new Date(tareas.fecha[posicionMostrar])
        span.textContent = fechaMostrar.getDate() + "/" + (fechaMostrar.getMonth() + 1) + "/" + fechaMostrar.getFullYear() + " " + fechaMostrar.getHours().dosValores() + ":" + fechaMostrar.getMinutes().dosValores()
        span.className = "fechaLimite"
        div.appendChild(span)
    } else {
        span = document.createElement("span")
        span.textContent = "Sin fecha limite"
        span.className = "fechaLimite"
        div.appendChild(span)
    }
    span = document.createElement("span")
    span.textContent = "X"
    span.onclick = borrarElemento
    span.className = "eliminar"
    div.appendChild(span)

}
// Genera los div del ToDo al recargar la pagina
function llenarDatos() {
    if (localStorage.tareas != undefined) {
        tareas = JSON.parse(localStorage.tareas)
        for (i = 0; i < tareas.id.length; i++) {
            crearDiv(i)
        }
    }

}
// Elimina el elemento en el que se ha pulsado la X
function borrarElemento() {
    textoBuscar = this.parentNode.id
    tareas = JSON.parse(localStorage.tareas)
    indice = tareas.id.indexOf(textoBuscar)
    tareas.id.splice(indice, 1)
    tareas.textoTarea.splice(indice, 1)
    tareas.color.splice(indice, 1)
    tareas.fecha.splice(indice, 1)
    localStorage.tareas = JSON.stringify(tareas)
    this.parentNode.remove()

}