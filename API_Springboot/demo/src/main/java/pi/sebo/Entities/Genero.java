package pi.sebo.Entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "Genero")
public class Genero  implements Serializable{
    private static final long serialVersionUID= 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_genero")
    int id_genero;

    @Column(name = "nome")
    String nome;

    public Genero(){
        
    }

    public Genero(String nome) {
        this.nome = nome;
    }

    public Genero(int id_genero, String nome) {
        this.id_genero = id_genero;
        this.nome = nome;
    }

    public int getId_genero() {
        return id_genero;
    }

    public void setId_genero(int id_genero) {
        this.id_genero = id_genero;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String toString() {
        return "Genero [id_genero=" + id_genero + ", nome=" + nome + "]";
    }

    
 
}
