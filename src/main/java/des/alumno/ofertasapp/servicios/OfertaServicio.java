package des.alumno.ofertasapp.servicios;

import java.util.List;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.modelo.DaoGenerico;

public interface OfertaServicio  {

	
	List<Oferta> obtenerOfertas();
	
	Oferta crearOferta(Oferta oferta);

	
	List<Oferta> findByName(String nombre_oferta);
}