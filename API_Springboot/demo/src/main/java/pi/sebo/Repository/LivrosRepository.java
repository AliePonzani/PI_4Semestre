package pi.sebo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pi.sebo.Entities.Livros;

@Repository
public interface LivrosRepository extends JpaRepository <Livros, Integer>{

    @Query( value = "select livro.*, genero.nome AS Nome_genero from livro join genero on livro.genero = genero.id_genero where livro.genero = :generoId", nativeQuery = true)
    List<Livros> findLivrosByGeneroId(@Param("generoId") Integer generoId);

    @Query( value = "select livro.*, genero.nome AS Nome_genero from livro join genero on livro.genero = genero.id_genero", nativeQuery = true)
    List<Livros> getAll_Itens();
}
