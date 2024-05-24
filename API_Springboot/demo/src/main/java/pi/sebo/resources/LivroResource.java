package pi.sebo.resources;

import java.util.List;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pi.sebo.Entities.Livros;
import pi.sebo.services.LivroService;

//Os comentarios são para manutenção e leitura do código

@CrossOrigin(origins = "*", maxAge = 33600)
@RestController
@RequestMapping("/livros")
public class LivroResource {

    @Autowired
    private LivroService livroService;

    @GetMapping //listar os livros
    public List<Livros> getAllLivros() {
        return livroService.getAllLivros();
    }

    @GetMapping("/all") //listar todos os itens livro/genero
    public List<Livros> getAllItens() {
        return livroService.getAllItens();
    }

    @GetMapping("/{id}") //listar livro por id
    public ResponseEntity<Livros> getLivroById(@PathVariable Integer id) {
        Livros livros = livroService.getLivroById(id);
        return ResponseEntity.ok().body(livros);
    }

    @GetMapping("/genero/{generoId}") // listar por genero os livros
    public ResponseEntity<List<Livros>> getLivrosByGeneroId(@PathVariable Integer generoId) {
        List<Livros> livros = livroService.findLivrosByGeneroId(generoId);
        if (!livros.isEmpty()) {
            return ResponseEntity.ok().body(livros);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping // criar livro
    public Livros createLivro(@RequestBody Livros livro) {
        return livroService.saveLivro(livro);
    }

    @PutMapping("/{id}") //atualizar um livro por id
    public ResponseEntity<Livros> updateLivro(@PathVariable Integer id, @RequestBody Livros livro) {
        if (livroService.getLivroById(id) != null) {
            livro.setId_livro(id);
            return ResponseEntity.ok(livroService.saveLivro(livro));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}") // deletar um livro por id
    public ResponseEntity<Void> deleteLivro(@PathVariable Integer id) {
        if (livroService.getLivroById(id) != null) {
            livroService.deleteLivro(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/{qtd}") //logica da venda
    public ResponseEntity<Void> decreaseQuantity(@PathVariable Integer id , @PathVariable Integer qtd) {
        Livros livro = livroService.getLivroById(id);
        if (livro != null) {
            if (livro.getQtd() >= qtd) {
                int novaQtd = livro.getQtd() - qtd;
                livro.setQtd(novaQtd);
                livroService.saveLivro(livro);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(400).build();// se estiver 0 no estoque 
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
