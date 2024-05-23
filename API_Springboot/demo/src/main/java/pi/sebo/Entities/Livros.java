package pi.sebo.Entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity(name = "Livro")
public class Livros implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_livro")
    int id_livro;

    @Column(name = "titulo")
    String titulo;

    @ManyToOne
    @JoinColumn(name ="genero")
    Genero genero;

    @Column(name = "qtd")
    int qtd;

    @Column(name = "valor")
    double valor;

    public Livros(){
        
    }

    public Livros(String titulo, Genero genero, int qtd, double valor) {
        this.titulo = titulo;
        this.genero = genero;
        this.qtd = qtd;
        this.valor = valor;
    }

    public int getId_livro() {
        return id_livro;
    }

    public void setId_livro(int id_livro) {
        this.id_livro = id_livro;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public int getQtd() {
        return qtd;
    }

    public void setQtd(int qtd) {
        this.qtd = qtd;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    @Override
    public String toString() {
        return "Livros [id_livro=" + id_livro + ", titulo=" + titulo + ", genero=" + genero + ", qtd=" + qtd
                + ", valor=" + valor + "]";
    }

    
}
