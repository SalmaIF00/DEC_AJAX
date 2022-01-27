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
	public List<Oferta> findByName(String nombre_oferta) {
		
		return ofertaDao.findByName(nombre_oferta);
	}
	@Override
	public Oferta crearOferta(Oferta oferta) {
		
		return ofertaDao.crear(oferta);
	}
	
}
