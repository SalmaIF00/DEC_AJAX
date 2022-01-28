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
		List <Oferta> listaNombre = ofertaDao.findByName(nombre_oferta);
		return listaNombre;
	}
	@Override
	public Oferta crearOferta(Oferta oferta) {
		
		return ofertaDao.crear(oferta);
	}

	@Override
	public Oferta buscarOferta(Oferta id) {
		
		return ofertaDao.buscar(id);
	}
	@Override
	public Oferta actualizarOferta(Oferta oferta) {
		
		return ofertaDao.actualizar(oferta);
	}
	@Override
	public List<Oferta> findByid(Integer id_oferta) {
		List <Oferta> listaid = ofertaDao.findById(id_oferta);
		return listaid;
		
	}
	@Override
	public Oferta buscaOfertar(Oferta id) {
		// TODO Auto-generated method stub
		return null;
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


	
}
