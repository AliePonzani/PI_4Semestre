package pi.sebo.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pi.sebo.Entities.Genero;
import pi.sebo.services.GeneroService;

@CrossOrigin(origins = "*", maxAge = 33600)
@RestController
@RequestMapping("/generos")
public class GeneroResource {

    @Autowired
    private GeneroService generoService;

    @GetMapping // vai listar todos os generos
    public List<Genero> getAllGeneros() {
        return generoService.getAllGeneros();
    }

}
