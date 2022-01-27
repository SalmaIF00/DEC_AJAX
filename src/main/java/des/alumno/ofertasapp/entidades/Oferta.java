package des.alumno.ofertasapp.entidades;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name= "oferta")
public class Oferta implements Serializable {
	
//	private static final long serialVersionUID = 1L;
	private static final long serialVersionUID = -8668594760203621162L;
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "id_oferta")
	private Integer id_oferta;
	private String nombre_oferta;
	private String fecha_publicacion;
	private String prioridad;
	private String hiperenlace;
	private String descripcion;
	private Double precio;
	
	
	
	public Oferta() {
		super();
	}

	//CONSTRUCTOR
	public Oferta(Integer id_oferta, String nombre_oferta, String fecha_publicacion, String prioridad, String hiperenlace,
			String descripcion, Double precio) {
		super();
		this.id_oferta = id_oferta;
		this.nombre_oferta = nombre_oferta;
		this.fecha_publicacion = fecha_publicacion;
		this.prioridad = prioridad;
		this.hiperenlace = hiperenlace;
		this.descripcion = descripcion;
		this.precio = precio;
	}

	public Integer getId_oferta() {
		return id_oferta;
	}

	public void setId_oferta(Integer id_oferta) {
		this.id_oferta = id_oferta;
	}

	public String getNombre_oferta() {
		return nombre_oferta;
	}

	public void setNombre_oferta(String nombre_oferta) {
		this.nombre_oferta = nombre_oferta;
	}

	public String getFecha_publicacion() {
		return fecha_publicacion;
	}

	public void setFecha_publicacion(String fecha_publicacion) {
		this.fecha_publicacion = fecha_publicacion;
	}

	public String getPrioridad() {
		return prioridad;
	}

	public void setPrioridad(String prioridad) {
		this.prioridad = prioridad;
	}

	public String getHiperenlace() {
		return hiperenlace;
	}

	public void setHiperenlace(String hiperenlace) {
		this.hiperenlace = hiperenlace;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
