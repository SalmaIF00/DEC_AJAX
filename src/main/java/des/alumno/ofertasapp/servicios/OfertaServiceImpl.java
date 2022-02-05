package des.alumno.ofertasapp.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.modelo.DaoGenericoImpl;
import des.alumno.ofertasapp.modelo.OfertaDao;



@Transactional
@Component("OfertaServicio")
public class OfertaServiceImpl implements OfertaServicio{

	@Autowired
	private OfertaDao ofertaDao;
	@Override
	public List<Oferta> obtenerOfertas() {
		return ofertaDao.findAll();
	}

	@Override
	public Oferta crearOferta(Oferta oferta) {
		
		return ofertaDao.crear(oferta);
	}

	@Override
	public Oferta actualizarOferta(Oferta oferta) {
		
		return ofertaDao.actualizar(oferta);
	}


	@Override
	public void borrarOferta(Integer id_oferta) {
		ofertaDao.borrar(id_oferta);
		
	}
	
	@Override
	public List<Oferta> BuscarPrioridad(String prioridad) {
		List <Oferta> lPrioridad = ofertaDao.findByPrioridad(prioridad);
		return lPrioridad;
	}

	@Override
	public Oferta obtenerOfertas(String prioridad) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Oferta obtenerOfertasid(Integer id_oferta) {
		
		return (Oferta) ofertaDao.findById(id_oferta);
		
	}
	
	

	
}
