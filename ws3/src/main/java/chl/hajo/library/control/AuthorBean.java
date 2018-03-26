package chl.hajo.library.control;

import chl.hajo.library.core.Author;
import chl.hajo.library.dao.AuthorRegistry;
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
import net.bootsfaces.component.form.Form;

/**
 *
 * @author hajo
 */
@Named("auth")
//@RequestScoped
@SessionScoped
public class AuthorBean implements Serializable {

    private static final Logger LOG = Logger.getLogger(AuthorBean.class.getName());
    @EJB
    private AuthorRegistry areg;
    @Getter
    @Setter
    private Author tmp = new Author();
    private final int start = 0;
    private int nRecords = 50;

    @Getter
    @Setter
    private Form form;

    @PostConstruct
    void post() {
        out.println(this + "Alive");
    }

    public void page() {
        /*Map<String, String> map = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        for( Entry<String, String> e : map.entrySet()){
        LOG.log(Level.INFO, "Key " + e.getKey() + " val " + e.getValue() );
        }*/
       DataTable dt = (DataTable) FacesContext.getCurrentInstance().getViewRoot().findComponent("authorForm:authorTable");
       
       LOG.log(Level.INFO, "Test {0}", dt.getJQueryEvents()); //) +  );
    }
    // ------------ Navigation -------------------

    public void cancel() {
        tmp = new Author();
    }

    // --------- Call backend -------------------------
    public void setAuthor() {
        tmp = areg.find(tmp.getId());
    }

    public List<Author> findAll() {
        return areg.findAll();
        //List<Author> found = areg.findRange(start, nRecords);
        //start += nRecords;
        //return found;
    }

    public void add() {
        tmp.setAddress(DataSupplier.getRandomAddress());
        try {
            areg.create(tmp);
            FacesMessages.info("Success");
        } catch (RuntimeException sql) {
            String message = ExceptionHandler.getMessage(sql);
            FacesMessages.info("Fail " + message);
        }
        tmp = new Author();
    }

    public void update() {
        areg.update(tmp);
        tmp = new Author();
    }

    public void delete() {
        areg.delete(tmp.getId());
        tmp = new Author();
    }

}
