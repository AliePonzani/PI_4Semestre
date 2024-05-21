package pi.sebo.configurations;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import pi.sebo.services.DBService;

@Configuration
@Profile("teste")
public class testeConfiguracao {
    
    @Autowired
    DBService dbService;

    @SuppressWarnings("unused")
    private boolean instanciar() throws ParseException{
        this.dbService.instanciarBD();
        return true;
    }
    

}
