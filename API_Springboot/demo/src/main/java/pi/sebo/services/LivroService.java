package pi.sebo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pi.sebo.Entities.Livros;
import pi.sebo.Repository.LivrosRepository;

@Service
public class LivroService {

    @Autowired
    private LivrosRepository livrosRepository;

    public List<Livros> getAllLivros(){
        return livrosRepository.findAll();
    }

    public List<Livros> getAllItens() {
        return livrosRepository.getAll_Itens();
    }

    public Livros getLivroById(Integer id){
        Optional<Livros> livros = livrosRepository.findById(id);
        return livros.orElse(null);
    }

    public Livros saveLivro(Livros livro) {
        return livrosRepository.save(livro);
    }

    public Livros updateLivro(Livros livro){
        if (livrosRepository.existsById(livro.getId_livro())) {
            return livrosRepository.save(livro);
        }else{
            return null;
        }
    }

    public void deleteLivro(Integer id) {
        livrosRepository.deleteById(id);
    }

    public List<Livros> findLivrosByGeneroId(Integer generoId) {
        return livrosRepository.findLivrosByGeneroId(generoId);
    }

}
