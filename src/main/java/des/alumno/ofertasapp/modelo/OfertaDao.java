package des.alumno.ofertasapp.modelo;

import java.util.List;
import des.alumno.ofertasapp.entidades.Oferta;



public interface OfertaDao extends DaoGenerico<Oferta>{


	List<Oferta> findAll();

	List<Oferta> findByName(String nombre_oferta);

	Oferta findById(Integer id_oferta);
	
	List<Oferta> findByPrioridad(String prioridad);

	
}
