package des.alumno.ofertasapp.servicios;

import java.util.List;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.modelo.DaoGenerico;

public interface OfertaServicio  {

	
	List<Oferta> obtenerOfertas();
	
	Oferta crearOferta(Oferta oferta);

	List<Oferta> findByName(String nombre_oferta);
	
	List<Oferta> findByid(Integer id_oferta);

	void borrarOferta(Integer id_oferta);

	Oferta buscaOfertar(Oferta id);

	Oferta actualizarOferta(Oferta oferta);

	Oferta buscarOferta(Oferta oferta);



}
