package pi.sebo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pi.sebo.Entities.Genero;

@Repository
public interface GeneroRepository extends JpaRepository <Genero , Integer>{
    
}
