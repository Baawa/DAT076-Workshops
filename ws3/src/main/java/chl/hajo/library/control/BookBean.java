/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package chl.hajo.library.control;

import chl.hajo.library.core.Book;
import chl.hajo.library.dao.BookCatalogue;
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
import net.bootsfaces.component.form.Form;

/**
 *
 * @author albinbaaw
 */
@Named("book")
//@RequestScoped
@SessionScoped
public class BookBean implements Serializable {
    
    private static final Logger LOG = Logger.getLogger(BookBean.class.getName());
    
    @EJB
    private BookCatalogue bCat;
    
    @Getter
    @Setter
    private Book tmp = new Book();
    
    private final int start = 0;
    private int nRecords = 50;
    
    @Getter
    @Setter
    private Form form;
    
    @PostConstruct
    void post(){
        out.println(this + "Alive");
    }
    
    public void page(){
        DataTable dt = (DataTable) FacesContext.getCurrentInstance().getViewRoot().findComponent("bookForm:bookTable");
       
       LOG.log(Level.INFO, "Test {0}", dt.getJQueryEvents());
    }
    
    public void cancel(){
        tmp = new Book();
    }
    
    public void setBook(){
        tmp = bCat.find(tmp.getIsbn());
    }
    
    public List<Book> findAll(){
        return bCat.findAll();
    }
    
    public void add(){
        try {
            bCat.create(tmp);
            FacesMessages.info("Success");
        } catch (RuntimeException sql) {
            String message = ExceptionHandler.getMessage(sql);
            FacesMessages.info("Fail " + message);
        }
        tmp = new Book();
    }
    
    public void update(){
        bCat.update(tmp);
        tmp = new Book();
    }
    
    public void delete(){
        bCat.delete(tmp.getIsbn());
        tmp = new Book();
    }
}
