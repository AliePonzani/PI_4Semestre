package pi.sebo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pi.sebo.Entities.Genero;
import pi.sebo.Repository.GeneroRepository;

@Service
public class GeneroService {

    @Autowired
    private GeneroRepository generoRepository;

    public List<Genero> getAllGeneros() {
        return generoRepository.findAll();
    }

}
