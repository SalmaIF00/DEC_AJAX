package des.alumno.ofertasapp.controladores;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.modelo.OfertaDao;
import des.alumno.ofertasapp.servicios.OfertaServicio;

@Controller
public class IndexController {

	@Autowired
	private OfertaDao OfertaDao;

	@Autowired
	private OfertaServicio ofertaServicio;

	@GetMapping("/")
	public String getIndex() {
		List<Oferta> ofertas = OfertaDao.findAll();
		return "index";
	}

	@GetMapping("/perfil")
	public String getPerfil() {
		return "perfil";
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "mostrar")
	public List<Oferta> obtenerTodos() {
		List<Oferta> lista = ofertaServicio.obtenerOfertas();
		return lista;
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "eliminar/{id_oferta}")
	public ResponseEntity<Object> eliminarOferta(@PathVariable(value = "id_oferta") Integer id_oferta) {
		ofertaServicio.borrarOferta(id_oferta);
		return new ResponseEntity<Object>("Elemento Borrado", HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "crear")
	public Oferta guardarOferta(@RequestBody Map<String, String> json) {
		return ofertaServicio.crearOferta(
				new Oferta(null, json.get("nombre_oferta"), json.get("fecha_publicacion"), json.get("prioridad"),
						json.get("hiperenlace"), json.get("descripcion"), Double.valueOf(json.get("precio"))));
	}

	@ResponseBody
	@GetMapping(value = "/buscar/{prioridad}")
	public ArrayList<Oferta> buscarPorPatronPrioridad(@PathVariable(value = "prioridad") String prioridad) {

		return (ArrayList<Oferta>) ofertaServicio.BuscarPrioridad(prioridad);

	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "mostrarModal/{id_oferta}")
	public Oferta obtenerTodos(@PathVariable Integer id_oferta) {

		return ofertaServicio.obtenerOfertasid(id_oferta);
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.PUT, value = "editarOferta/{id_oferta}")
	public ResponseEntity<Object> editarOferta(@PathVariable(value = "id_oferta") Integer id_oferta,  @RequestBody Oferta oferta) {
		Oferta nuevaOferta  = ofertaServicio.obtenerOfertasid(id_oferta);
		nuevaOferta.getId_oferta();
		nuevaOferta.setNombre_oferta(oferta.getNombre_oferta());
		nuevaOferta.setFecha_publicacion(oferta.getFecha_publicacion());
		nuevaOferta.setPrioridad(oferta.getPrioridad());
		nuevaOferta.setPrecio(oferta.getPrecio());
		nuevaOferta.setHiperenlace(oferta.getHiperenlace());
		nuevaOferta.setDescripcion(oferta.getDescripcion());
		ofertaServicio.actualizarOferta(nuevaOferta);
	    return new ResponseEntity<Object>(nuevaOferta,HttpStatus.CREATED);
	}
}
