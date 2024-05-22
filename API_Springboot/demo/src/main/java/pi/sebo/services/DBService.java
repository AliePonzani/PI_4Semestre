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
    Genero genero4 = new Genero("biografia");
    Genero genero5 = new Genero("ação");
    Genero genero6 = new Genero("romance");
    Genero genero7 = new Genero("aventura");
    Genero genero8 = new Genero("autoajuda");
    generoRepository.saveAll(Arrays.asList(genero1, genero2, genero3, genero4, genero5, genero6, genero7, genero8));

    Livros livro1 = new Livros("Piquenique na Estrada", genero2, 4, 59.99);
    Livros livro2 = new Livros("Nárnia", genero7, 2, 89.90);
    Livros livro3 = new Livros("Organize Sua mente", genero8, 3, 34.99);
    livrosRepository.saveAll(Arrays.asList(livro1, livro2, livro3));
    }
    
}
