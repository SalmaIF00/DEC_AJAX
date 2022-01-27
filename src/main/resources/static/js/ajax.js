
window.onload = obtenerOfertas;


function crearFila (oferta){
	
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
				td1_id.setAttribute('id','id_producto');
				td2_nombre.textContent = oferta.nombre_oferta;
				td3_precio.textContent = oferta.precio;


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
				boton.addEventListener("click", deleteRow);
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
	var prioridad = document.getElementById("selectProducto");


	tbody.replaceChildren();
	fetch('/mostrar', { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {

			for (let oferta of response) {

//				var tr = document.createElement("tr");
//
//				if (oferta.prioridad == "Baja") {
//					tr.setAttribute("class", "table-active");
//				} else if (oferta.prioridad == "Media") {
//					tr.setAttribute("class", "table-warning");
//
//				} else if (oferta.prioridad == "Alta") {
//					tr.setAttribute("class", "table-danger");
//				}
//				tr.setAttribute("id", "tr");
//
//
//				//Creo las columnas
//				var td1_id = document.createElement("td");
//				var td2_nombre = document.createElement("td");
//				var td3_precio = document.createElement("td");
//				var td4_info = document.createElement("td");
//				var td5_borrar = document.createElement("td");
//
//				//Añado conteido a las columnas
//				td1_id.textContent = oferta.id_oferta;
//				td1_id.setAttribute('id','id_producto');
//				td2_nombre.textContent = oferta.nombre_oferta;
//				td3_precio.textContent = oferta.precio;
//
//
//				//crear boton info
//				var boton1 = document.createElement("button");
//				boton1.setAttribute("id", "info");
//				boton1.setAttribute("class", "btn btn-info");
//				boton1.textContent = "Info";
//				td4_info.appendChild(boton1);
//				tr.appendChild(td4_info);
//
//				//crear boton borrar
//				var boton = document.createElement("button");
//				boton.setAttribute("id", "borrar");
//
//				boton.setAttribute("class", "btn btn-danger");
//				boton.setAttribute("onclick", "deleteRow(this)");
//				boton.addEventListener("click", deleteRow);
//				boton.textContent = "Borrar";
//				td5_borrar.appendChild(boton);
//				tr.appendChild(td5_borrar);
//
//
//				//añado columnas a fila
//				tr.appendChild(td1_id);
//				tr.appendChild(td2_nombre);
//				tr.appendChild(td3_precio);
//				tr.appendChild(td4_info);
//				tr.appendChild(td5_borrar);
				var tr= crearFila(oferta);

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
             nombre_oferta: nombre ,
             fecha_publicacion:fecha,
             prioridad:prioridad,
             precio:precio,
             hiperenlace:hipervinculo,
             descripcion:descripcion})
           })
           .then(res => res.json())
           .then(data =>  {
                
                var tr= crearFila(data);
                var tbody = document.getElementById("ofertas");
      			tbody.appendChild(tr);
               // obtenerOfertas(data.nombre,data.precio);
            })
 			


	}



//ELIMINAR OFERTA
function deleteRow(eliminar) {
	
	}
//function eliminarOferta(eliminar){
//		var oferta = eliminar.parentNode.parentNode;
//		var id = oferta.querySelector("td1_id").innerText;
//		fetch('/borrar/+id+', {headers: {"Content-Type": "application/json; charset=utf-8"}})
//		 .then(res => res.json())
//		 oferta.parentNode.remplaceChild(oferta)
//		}

function deleteRow(eliminar) {
	var oferta = eliminar.parentNode.parentNode;
	var id = oferta.firstChild.innerText;
	fetch('/borrar/'+id, { headers: { "Content-Type": "application/json; charset=utf-8" }, type:PUT })
		.then(res => res.json())
		.then(response=> {
			oferta.parentNode.remplaceChild(oferta)
			event.preventDefault();
			$(this).closest('tr').remove();
			
		})
	


}



document.addEventListener("DOMContentLoaded", function() {
	$("#refrescar").click(obtenerOfertas);
	$("#crear").click(crearOfertas)


});

