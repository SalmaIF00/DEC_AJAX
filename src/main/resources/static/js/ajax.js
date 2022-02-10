
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
	var td1_id = document.createElement("th");
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
	//	boton1.addEventListener("click",mostrarModal)
	boton1.setAttribute("onclick", "mostrarModal(this)");
	boton1.textContent = "Info";
	td4_info.appendChild(boton1);
	tr.appendChild(td4_info);

	//crear boton borrar
	var boton = document.createElement("button");
	boton.setAttribute("id", "borrar");

	boton.setAttribute("class", "btn btn-danger");
	boton.setAttribute("onclick", "deleteRow(this)");
	boton.textContent = "Borrar";
	td5_borrar.appendChild(boton);
	tr.appendChild(td5_borrar);


	//añado columnas a fila
	tr.appendChild(td1_id);
	tr.appendChild(td2_nombre);
	tr.appendChild(td3_precio);
	tr.appendChild(td4_info);
	tr.appendChild(td5_borrar);
	return tr;

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
		.then(data => {


			var tr = crearFila(data);
			var tbody = document.getElementById("ofertas");
			tbody.appendChild(tr);
		})



}


//ELIMINAR OFERTA
function deleteRow(borrar) {

	var oferta = borrar.parentNode.parentNode;
	var id_producto = oferta.querySelector("th").innerText;
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

//FILTRAR POR PRIORIDAD
function filtrarPrioridad(e) {
	e.preventDefault();
	var tbody = document.getElementById("ofertas");

	var prioridad = document.getElementsByName('prioridad');
	var check;
	for (i = 0; i < prioridad.length; i++) {
		if (prioridad[i].checked) {
			check = prioridad[i].value;
		}
	}

	fetch('/buscar/' + check, {
		headers: {
			'content-type': 'application/json'
		},
		method: 'GET'
	})
		.then(res => res.json())
		.then(response => {
			limpiarTabla();

			for (let oferta of response) {

				var tr = crearFila(oferta);
				var tbody = document.getElementById("ofertas");
				tbody.appendChild(tr);

			}
		})
}


//LIMPIAR TABLA (NO DE LA BBDD)
function limpiarTabla() {
	let resultados = document.getElementById("ofertas");
	resultados.replaceChildren();
}

//MOSTRAR MODAL CON INFO DE OFERTA
function mostrarModal(mostrar) {
	//mostrar.preventDefault();
	$("#modal").modal("show");
	var oferta1 = mostrar.parentNode.parentNode;
	var id_oferta = oferta1.firstElementChild.innerText;
	fetch('/mostrarModal/' + id_oferta, {
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(res => res.json())
		.then(data => {
			let modal = document.getElementById("modal-body");
			modal.replaceChildren();
			//ID
			let p1 = document.createElement('p');
			p1.innerText = data.id_oferta;
			//NOMBRE OFERTA
			let input = document.createElement('p');
			input.innerText = data.nombre_oferta;
			//FECHA
			let date = document.createElement('p');
			//				date.setAttribute("type","date");
			date.innerText = data.fecha_publicacion;
			//PRIORIDAD
			let select = document.createElement('p');
			select.innerText = data.prioridad;
			//PRECIO
			let number = document.createElement('p');
			//				number.setAttribute("type","number");
			number.innerText = data.precio;
			//HIPERVINCULO
			let https = document.createElement('p');
			https.innerText = data.hiperenlace;
			//DESCRIPCION
			let description = document.createElement('p');
			description.innerText = data.descripcion;
			//AÑADIRLOS AL MODAL
			modal.appendChild(p1);
			modal.appendChild(input);
			modal.appendChild(date);
			modal.appendChild(select);
			modal.appendChild(number);
			modal.appendChild(https);
			modal.appendChild(description);
		})
}

//CERRAR MODAL
function cerrarModal() {
	$("#modal").modal("hide");
}
//EDITAR OFERTA
function editarOferta() {
$("#modal").modal("show");
modal = document.getElementById("modal-body");
var oferta2 = modal.childNode;
var id_oferta = oferta2.firstElementChild.textContent;

modal.replaceChildren();


let input_id = document.createElement("input");
input_id.setAttribute("type","hiden");
input_id.setAttribute("value",id_oferta);
input_id.setAttribute("name","id_oferta");


}


document.addEventListener("DOMContentLoaded", function() {

	$("#crear").click(crearOfertas);
	$("#filtrarPorPrioridad").click(filtrarPrioridad);
	$("#info").click(mostrarModal);
	$("#cerrar-modal").click(cerrarModal);
	$("#quitar").click(cerrarModal);
//	$("#editar-modal").click(formEditarOferta);
	$("#editar-modal").click(editarOferta);

});



