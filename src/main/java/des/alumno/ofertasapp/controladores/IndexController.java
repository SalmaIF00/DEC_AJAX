package des.alumno.ofertasapp.controladores;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	public String getIndex () {
		List<Oferta> ofertas = OfertaDao.findAll();
		return "index";
	}
	
	@GetMapping("/perfil")
	public String getPerfil () {
		return "perfil";
	}	
	
	

	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "mostrar")
	public List<Oferta> obtenerTodos() {
		List<Oferta> lista =ofertaServicio.obtenerOfertas();
		return lista;
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "eliminar/{id_oferta}")
	public ResponseEntity<Object> eliminarOferta(@PathVariable(value="id_oferta") Integer id_oferta) {
		ofertaServicio.borrarOferta(id_oferta);
		return new ResponseEntity<Object>("Elemento Borrado",HttpStatus.OK);		 
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "crear")
	public Oferta guardarOferta(@RequestBody Map<String, String> json) {
		return ofertaServicio.crearOferta(new Oferta(null,json.get("nombre_oferta"),json.get("fecha_publicacion"),json.get("prioridad"),json.get("hiperenlace"),json.get("descripcion"),Double.valueOf(json.get("precio"))));
	}


	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "buscar/{prioridad}")
	public String buscarOferta(Model modelo,@RequestParam String prioridad) {
	List<Oferta>ofertas= ofertaServicio.BuscarPrioridad(prioridad);
	modelo.addAttribute("ofertas", ofertas);
	return "index";
	}

//	@ResponseBody
//	@RequestMapping(method = RequestMethod.GET, value = "info")
//	public List<Oferta> mostrarInfo(@PathVariable(value="info") String info) {
//		return ofertaServicio.
//	}
}
