package pi.sebo.services;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import pi.sebo.Entities.Genero;
import pi.sebo.Entities.Livros;
import pi.sebo.Repository.GeneroRepository;
import pi.sebo.Repository.LivrosRepository;

@Service
public class DBService {

    @Autowired
    private LivrosRepository livrosRepository;

    @Autowired
    private GeneroRepository generoRepository;

    @Bean
    public void instanciarBD(){
        Genero genero1 = new Genero("terror");
		Genero genero2 = new Genero("ficção");
		Genero genero3 = new Genero("drama");
		generoRepository.saveAll(Arrays.asList(genero1,genero2,genero3));
    }
    
}
