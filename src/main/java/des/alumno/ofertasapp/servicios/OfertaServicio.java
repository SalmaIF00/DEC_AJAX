package des.alumno.ofertasapp.servicios;

import java.util.List;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.modelo.DaoGenerico;

public interface OfertaServicio  {

	
	List<Oferta> obtenerOfertas();
	
	Oferta crearOferta(Oferta oferta);

	void borrarOferta(Integer id_oferta);

	Oferta actualizarOferta(Oferta oferta);

	List<Oferta> BuscarPrioridad(String prioridad);



}
