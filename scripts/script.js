let textoTarea, color,fechaComparar,fecha
window.onload=()=>{
    document.getElementById("nuevoToDo").onclick= comprobarCampos
    llenarDatos()
}
function comprobarCampos(){
    //Recogemos los datos
    textoTarea= document.getElementById("textoTarea").value
    color= document.querySelector(".color:checked").value
    fechaLimite= document.getElementById("fechaLimite").value
    horaLimite= document.getElementById("horaLimite").value
    // Comprobamos el nombre de la tarea
    if(textoTarea.trim()==""){
        alert("El campo de texto no puede estar vacio")
        resetCampos()
        return
    }
    // Guradamos fecha y comprobamos
    fechaComparar= new Date(fechaLimite +" "+ horaLimite)
    fecha= new Date()
    if(fecha>=fechaComparar|| fechaComparar== undefined){
        alert("La fecha tiene que ser posterior a hoy o vacia")
        resetCampos()
        return
    }
    anadirToDo() 
    resetCampos()
}
function resetCampos(){
    document.getElementById("textoTarea").value=""
    document.getElementById("fechaLimite").value="" 
    document.getElementById("horaLimite").value=""
    document.getElementById("colorVerde").checked
}
function anadirToDo(){
    id= Date.parse(fecha) + Math.random()
    localStorage.id=  localStorage.id == undefined || localStorage.id==""?localStorage.id=id:localStorage.id+=";"+id
    localStorage.setItem(id,textoTarea+";"+color+";"+fechaComparar)
    crearDiv(id)
}
function crearDiv(idmostrar){
    arrayDatos = localStorage.getItem(idmostrar).split(";")
    div= document.createElement("div")
    div.id=idmostrar
    div.className="toDo"
    div.style.backgroundColor = arrayDatos[1]
    document.getElementById("listaToDo").appendChild(div)
    div= document.getElementById(idmostrar)
    span = document.createElement("span")
    span.textContent = arrayDatos[0]
    span.className = "nombreToDo"
    div.appendChild(span)
    if (arrayDatos[2]!="Invalid Date"){
        span = document.createElement("span")
        fechaMostrar= new Date(arrayDatos[2])
        span.textContent = fechaMostrar.getDate()+"/"+(fechaMostrar.getMonth()+1)+"/"+fechaMostrar.getFullYear()
        span.className = "fechaLimite"
        div.appendChild(span)
    }else{
        span = document.createElement("span")
        span.textContent = "Sin fecha limite"
        span.className = "fechaLimite"
        div.appendChild(span)
    }
    span= document.createElement("span")
    span.textContent= "X"
    span.onclick= borrarElemento
    span.className= "eliminar"
    div.appendChild(span)
    resetCampos()

}
function llenarDatos(){
    document.getElementById("listaToDo").textContent=""
    if(localStorage.id!= undefined){
        arrayId = localStorage.getItem("id").split(";") 
        for(i=0;i<arrayId.length;i++){
            id= arrayId[i]
            crearDiv(id)
        }
    }
    
}
function borrarElemento(){
    textoBuscar=this.parentNode.id
    if(localStorage.id.search(textoBuscar+";")!=-1){
    localStorage.id= localStorage.id.replace(textoBuscar+";","")
    }
    else{
    localStorage.id= localStorage.id.replace(textoBuscar,"")
    }
    localStorage.removeItem(textoBuscar)
    this.parentNode.remove()
}