package pi.sebo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pi.sebo.Entities.Livros;

@Repository
public interface LivrosRepository extends JpaRepository <Livros, Integer>{
    
}
