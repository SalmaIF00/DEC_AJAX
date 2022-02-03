
window.onload = obtenerOfertas;


function crearFila(oferta) {

	var tr = document.createElement("tr");

	if (oferta.prioridad == "Baja") {
		tr.setAttribute("class", "table-active");
	} else if (oferta.prioridad == "Media") {
		tr.setAttribute("class", "table-warning");

	} else if (oferta.prioridad == "Alta") {
		tr.setAttribute("class", "table-danger");
	}
	tr.setAttribute("id", "tr");


	//Creo las columnas
	var td1_id = document.createElement("td");
	var td2_nombre = document.createElement("td");
	var td3_precio = document.createElement("td");
	var td4_info = document.createElement("td");
	var td5_borrar = document.createElement("td");

	//Añado conteido a las columnas
	td1_id.textContent = oferta.id_oferta;
	td1_id.setAttribute('id', 'id_producto');
	td2_nombre.textContent = oferta.nombre_oferta;
	td2_nombre.setAttribute('id', 'nombre');
	td3_precio.textContent = oferta.precio;
	td3_precio.setAttribute('id', 'precio');

	//crear boton info
	var boton1 = document.createElement("button");
	boton1.setAttribute("id", "info");
	boton1.setAttribute("class", "btn btn-info");
	boton1.textContent = "Info";
	td4_info.appendChild(boton1);
	tr.appendChild(td4_info);

	//crear boton borrar
	var boton = document.createElement("button");
	boton.setAttribute("id", "borrar");

	boton.setAttribute("class", "btn btn-danger");
	boton.setAttribute("onclick", "deleteRow(this)");
	//boton.addEventListener("click", deleteRow);
	boton.textContent = "Borrar";
	td5_borrar.appendChild(boton);
	tr.appendChild(td5_borrar);


	//añado columnas a fila
	tr.appendChild(td1_id);
	tr.appendChild(td2_nombre);
	tr.appendChild(td3_precio);
	tr.appendChild(td4_info);
	tr.appendChild(td5_borrar);
	return tr

}



function obtenerOfertas() {
	var tbody = document.getElementById("ofertas");
//	var prioridad = document.getElementById("selectProducto");

	tbody.replaceChildren();
	fetch('/mostrar', { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {

			for (let oferta of response) {
				var tr = crearFila(oferta);
				//añado fila
				tbody.appendChild(tr);
			}
		})
}

//CREAR OFERTA
function crearOfertas(e) {
	e.preventDefault();
	var nombre = document.getElementById("inputNombre").value;
	var fecha = document.getElementById("inputFecha").value;
	var prioridad = document.getElementById("selectProducto").value;
	var precio = document.getElementById("inputPrecio").value;
	var hipervinculo = document.getElementById("inputEnlace").value;
	var descripcion = document.getElementById("inputDescripcion").value;


	fetch('/crear', {
		headers: {
			'content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			nombre_oferta: nombre,
			fecha_publicacion: fecha,
			prioridad: prioridad,
			precio: precio,
			hiperenlace: hipervinculo,
			descripcion: descripcion
		})
	})
		.then(res => res.json())
		.then(data =>{
				

			var tr = crearFila(data);
			var tbody = document.getElementById("ofertas");
			tbody.appendChild(tr);
		})



}


//ELIMINAR OFERTA
function deleteRow(borrar) {

	var oferta = borrar.parentNode.parentNode;
	var id_producto = oferta.querySelector("td").innerText;
	fetch('/eliminar/' + id_producto, {
		headers: {
			'content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			id_oferta: id_producto
		})
	})
		.then(response => {

			console.log(response);
			oferta.parentNode.removeChild(oferta);


		})
}

//
//function filtrarPrioridad(prioridad) {
//	var oferta = prioridad.parentNode.parentNode;
//	var prioridad = document.getElementById("selectProducto").value;
//	fetch('/buscar/' + prioridad, {
//		headers: {
//			'content-type': 'application/json'
//		},
//		method: 'GET',
//		body: JSON.stringify({
//			prioridad: prioridad
//		})
//	})
//		.then(response => {
//			console.log(response);
//			var tr = obtenerOfertas(response);
//			var tbody = document.getElementById("ofertas");
//			tbody.appendChild(tr);
//			
//		})
//}

function filtrarPrioridad(e) {
	e.preventDefault();
	var tbody = document.getElementById("ofertas");
	
	var prioridad = document.getElementsByName('prioridad');
	var check;
		for (i = 0; i<prioridad.length;i++){
			 if(prioridad[i].checked){
                check=  prioridad[i].value;
                  }
            }
//	var prioridad = document.getElementById("selectProducto");
	ActualizarTabla()
		fetch('/buscar/' + check, {
		headers: {
			'content-type': 'application/json'
		},
		method: 'GET',
		body: JSON.stringify({
			prioridad: prioridad
		})
	})
		.then(res => res.json())
		.then(response => {

			
			for (let oferta of response) {
			 crearFila(oferta);

			}
		})
}

function ActualizarTabla(){
    var tabla= document.getElementById("oferta");
    var tablaActualizada=document.createElement("tbody");
    var id=document.createAttribute("id");
    id.value="oferta";
    nuevatabla.setAttributeNode(id);
    tabla.parentNode.replaceChild(nuevatabla,tabla);
}



document.addEventListener("DOMContentLoaded", function() {
//	$("#refrescar").click(obtenerOfertas);
	$("#crear").click(crearOfertas);
	$("#borrar").click(deleteRow);
	$("#filtrarPorPrioridad").click(filtrarPrioridad);
	


});

