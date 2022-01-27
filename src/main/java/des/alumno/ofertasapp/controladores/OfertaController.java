package des.alumno.ofertasapp.controladores;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.modelo.OfertaDao;

@Controller
public class OfertaController {
	@Autowired
	private OfertaDao OfertaDao;
	
	// CONTROLADOR CREAR
//	@GetMapping("/crear")
//	public String crear(Model model, HttpSession session) {
//
//		return "/html/crear";
//	}

//	@PostMapping("/crear")
//	public String formulario(Model model, HttpServletRequest request,
//
//			@RequestParam("nombre_oferta") String nombre_oferta,
//			@RequestParam("fecha_publicacion") String fecha_publicacion, @RequestParam("prioridad") String prioridad,
//			@RequestParam("hiperenlace") String hiperenlace, @RequestParam("descripcion") String descripcion,
//			@RequestParam("precio") Double precio) {
//
//	
//
//		Oferta oferta1 = new Oferta(0, nombre_oferta, fecha_publicacion, prioridad, hiperenlace, descripcion, precio);
//		OfertaDao.crear(oferta1);
////		List<Oferta> ofertas = OfertaDao.findAll();
////		model.addAttribute("ofertas", ofertas);
//
//		return "index";
//	}

	// CONTROLADOR BUSCAR

//	@GetMapping("/buscar")
//	public String listaOferta(Model modelo, @RequestParam String nombre_oferta) {
//
//		List<Oferta> ofertas = OfertaDao.findByName(nombre_oferta);
//		//Si la busqueda ofertas no existe 
//		try {
//			if(ofertas==null) {
//			return "index";
//			}
//		}catch (EmptyResultDataAccessException e) {
//			ofertas = new ArrayList<Oferta>();
//		}
//		modelo.addAttribute("ofertas", ofertas);
//		return "/index";
//	}

	// CONTROLADOR FILTRAR

	@GetMapping("/filtrar{prioridad}")
	public String listaFiltrar(Model modelo, @RequestParam String prioridad) {

		List<Oferta> ofertas = OfertaDao.findByPrioridad(prioridad);
		modelo.addAttribute("ofertas", ofertas);
		return "/index";
	}

	// CONTROLADOR BORRAR
//	@ResponseBody
//	@GetMapping("/borrar/{id_oferta}")
//	public String borrar(Model model, HttpSession session, @PathVariable(value = "id_oferta") Integer id_oferta) {
//		OfertaDao.borrar(id_oferta);
//		return "redirect:/";
//
//	}

	// CONTROLADOR PERFIL OFERTA

	@GetMapping("/prefil/{id_oferta}")
	public String oferta(Model model, @PathVariable Integer id_oferta) {

		List<Oferta> ofertas;
		try {
			ofertas = OfertaDao.findById(id_oferta);
		} catch (EmptyResultDataAccessException e) {
			ofertas = new ArrayList<Oferta>();

		}

		model.addAttribute("ofertas", ofertas);

		return "perfil";
	}

	// SESSION NAVBAR

	@GetMapping("/index")
	public String process(Model model, HttpSession session) {
	@SuppressWarnings("unchecked")
	List<String> messages = (List<String>) session.getAttribute("Nombre_usuario");
	if (messages == null) {
	messages = new ArrayList<>();
	}
	model.addAttribute("sessionMessages", messages);
	return "index";
	}


	@PostMapping("/persistMessage")
	public String persistMessage(@RequestParam("msg") String msg, HttpServletRequest request) {
	@SuppressWarnings("unchecked")
	List<String> messages = (List<String>) request.getSession().getAttribute("Nombre_usuario");
	if (messages == null) {
	messages = new ArrayList<>();
	request.getSession().setAttribute("Nombre_usuario", messages);
	}
	messages.add(msg);
	request.getSession().setAttribute("Nombre_usuario", messages);
	return "redirect:/index";
	}

	// CERRAR SESION
	@GetMapping("/Csesion")
	public String destroySession(HttpServletRequest request) {
		request.getSession().invalidate();
		return "redirect:/index";
	}

}