/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package chl.hajo.library.control;

import chl.hajo.library.core.Book;
import chl.hajo.library.dao.BookCatalogue;
import chl.hajo.library.service.DataSupplier;
import java.io.Serializable;
import static java.lang.System.out;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.inject.Named;
import lombok.Getter;
import lombok.Setter;
import net.bootsfaces.utils.FacesMessages;
import chl.hajo.library.util.ExceptionHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.SessionScoped;
import javax.faces.context.FacesContext;
import net.bootsfaces.component.dataTable.DataTable;

/**
 *
 * @author albinbaaw
 */
@Named("book")
//@RequestScoped
@SessionScoped
public class BookBean implements Serializable {
    
    private static final Logger LOG = Logger.getLogger(BookBean.class.getName());
    @EJB        // Injecting an Enterprise bean
    private BookCatalogue bCat;
    @Getter     // Lombok
    @Setter
    private Book tmp = new Book();
   

    @PostConstruct // CDI life cycle callbacks
    void post() {
        out.println(this + "Alive");
    }

    public void page() {
       // Faces context hold all data relevant for this request
       DataTable dt = (DataTable) FacesContext.getCurrentInstance().getViewRoot().findComponent("authorForm:authorTable");
       LOG.log(Level.INFO, "Test {0}", dt.getJQueryEvents()); 
    }
    // ------------ Navigation -------------------

    public void cancel() {
        tmp = new Book();
    }

    // --------- Call backend -------------------------
    public void setBook() {
        tmp = bCat.find(tmp.getIsbn());
    }

    public List<Book> findAll() {
        return bCat.findAll();
    }

    public void add() {
        //tmp.setAddress(DataSupplier.getRandomAddress());
        try {
            bCat.create(tmp);
            FacesMessages.info("Success");
        } catch (RuntimeException sql) {
            String message = ExceptionHandler.getMessage(sql);
            FacesMessages.info("Fail " + message);
        }
        tmp = new Book();
    }

    public void update() {
        bCat.update(tmp);
        tmp = new Book();
    }

    public void delete() {
        bCat.delete(tmp.getIsbn());
        tmp = new Book();
    }
    
}
