package des.alumno.ofertasapp.modelo;

import java.util.List;

import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import des.alumno.ofertasapp.entidades.Oferta;

@Repository
public class OfertaDaoImpl extends DaoGenericoImpl<Oferta> implements OfertaDao {
	

	@Override
	public List<Oferta> findAll() {
			Query query = this.em.createQuery("from Oferta");
			List<Oferta> loferta = query.getResultList();
			return loferta;

	}

	@Override
	public List<Oferta> findByName(String nombre_oferta) throws EmptyResultDataAccessException {
		Query query = this.em.createQuery("FROM Oferta WHERE nombre_oferta = :nombreoferta");
		query.setParameter("nombreoferta", nombre_oferta);
		List<Oferta> nombreoferta = query.getResultList();
		return nombreoferta;
	}
	
	@Override
	public List<Oferta> findById(Integer id_oferta){
		Query query = this.em.createQuery("FROM Oferta WHERE id_oferta = :idoferta");
		query.setParameter("idoferta", id_oferta);
		List<Oferta> idoferta = query.getResultList();
		return idoferta;
	}
	
	
	@Override
	public List<Oferta> findByPrioridad(String prioridad) {
		Query query = this.em.createQuery("FROM Oferta WHERE prioridad = :prioferta");
		query.setParameter("prioferta", prioridad);
		List<Oferta> poferta = query.getResultList();
		return poferta;
	}

	
	
}
