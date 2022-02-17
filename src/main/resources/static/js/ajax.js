
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
			let h3 = document.createElement('h3');
			h3.innerText = data.id_oferta;
			h3.setAttribute("id", "id_oferta");
			//NOMBRE OFERTA
			let input = document.createElement('input');
			input.setAttribute("value", data.nombre_oferta);
			input.setAttribute("id", "input_nombre");
			//FECHA
			let date = document.createElement('input');
			date.setAttribute("type", "date");
			date.setAttribute("id", "input_fecha");
			date.setAttribute = ("value", data.fecha_publicacion);

			//PRIORIDAD
			let prioridad = document.createElement('select');
			prioridad.setAttribute("name", "prioridad");
			prioridad.setAttribute("id", "select_prioridad");

			let prioridad1 = document.createElement('option');
			prioridad1.setAttribute("value", "Baja");
			prioridad1.innerText = "Baja";

			let prioridad2 = document.createElement('option');
			prioridad2.setAttribute("value", "Media");
			prioridad2.innerText = "Media";

			let prioridad3 = document.createElement('option');
			prioridad3.setAttribute("value", "Alta")
			prioridad3.innerText = "Alta";



			if (prioridad1.value == data.prioridad) {
				prioridad1.setAttribute("selected", "selected");
			} else if (prioridad2.value == data.prioridad) {
				prioridad2.setAttribute("selected", "selected");
			} else if (prioridad3.value == data.prioridad) {
				prioridad3.setAttribute("selected", "selected");
			}

			prioridad.appendChild(prioridad1);
			prioridad.appendChild(prioridad2);
			prioridad.appendChild(prioridad3);
			//PRECIO
			let precio = document.createElement('input');
			precio.setAttribute("type", "number");
			precio.setAttribute("id", "input_precio");
			precio.setAttribute("value", data.precio);

			//HIPERVINCULO
			let hiperenlace = document.createElement('input');
			hiperenlace.setAttribute("type", "text");
			hiperenlace.setAttribute("id", "input_hipervinculo");
			hiperenlace.setAttribute("value", data.hiperenlace);

			//DESCRIPCION
			let descripcion = document.createElement('input');
			descripcion.setAttribute("type","text");
			descripcion.setAttribute("id", "input_descripcion");
			descripcion.setAttribute("value", data.descripcion);

			//AÑADIRLOS AL MODAL
			modal.appendChild(h3);
			modal.appendChild(input);
			modal.appendChild(date);
			modal.appendChild(prioridad);
			modal.appendChild(precio);
			modal.appendChild(hiperenlace);
			modal.appendChild(descripcion);
		})
}

//CERRAR MODAL
function cerrarModal() {
	$("#modal").modal("hide");
}
//EDITAR OFERTA
function editarOferta() {
	modal1 = document.getElementById("modal-body");
	var id_oferta = modal1.querySelector("h3").innerText;
	var nombre = document.getElementById("input_nombre").value;
	var fecha = document.getElementById("input_fecha").value;
	var prioridad = document.getElementById("select_prioridad").value;
//	var precio = document.getElementById("input_precio").value;
	var hipervinculo = document.getElementById("input_hipervinculo").value;
	var descripcion = document.getElementById("input_descripcion").value;

		fetch('/editarOferta'+id_oferta, {
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

document.addEventListener("DOMContentLoaded", function() {

	$("#crear").click(crearOfertas);
	$("#filtrarPorPrioridad").click(filtrarPrioridad);
	$("#info").click(mostrarModal);
	$("#cerrar-modal").click(cerrarModal);
	$("#quitar").click(cerrarModal);
	$("#editar").click(editarOferta);

});



