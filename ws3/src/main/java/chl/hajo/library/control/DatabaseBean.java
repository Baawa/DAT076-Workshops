package chl.hajo.library.control;

import chl.hajo.library.core.Author;
import chl.hajo.library.core.Book;
import chl.hajo.library.dao.AuthorRegistry;
import chl.hajo.library.dao.BookCatalogue;
import chl.hajo.library.service.DataSupplier;
import static java.lang.System.out;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.inject.Named;
import net.bootsfaces.component.commandButton.CommandButton;

/**
 *
 * @author hajo
 */
@Named("db")
@RequestScoped
public class DatabaseBean {

    @EJB
    private AuthorRegistry areg;
    
    @EJB
    private BookCatalogue bcat;

    @PostConstruct
    void post() {
        out.println( this + "Alive");
        togglePopulateClear(false);
    }

    public void populate(ActionEvent e) {
        togglePopulateClear(true);
        for (Author a : DataSupplier.getAuthors()) {
            areg.create(a);
        }
        
        for (Book b : DataSupplier.getBooks()){
            bcat.create(b);
        }
    }
    
    public void clear(ActionEvent e) {
        togglePopulateClear(false);
        areg.clear();
        bcat.clear();
    }

    private void togglePopulateClear(boolean toggle) {
        CommandButton btn1 = (CommandButton) getComponent("populateBtn");
        CommandButton btn2 = (CommandButton) getComponent("clearBtn");
        if (toggle) {
            btn1.setDisabled(true);
            btn2.setDisabled(false);
        } else {
            btn1.setDisabled(false);
            btn2.setDisabled(true);
        }
    }

    // NOTE: This assume beans are @RequestScope!
    private Object getComponent(String bindingName) {
        return FacesContext.getCurrentInstance().
                getExternalContext().getRequestMap().get(bindingName);
    }
 
}
