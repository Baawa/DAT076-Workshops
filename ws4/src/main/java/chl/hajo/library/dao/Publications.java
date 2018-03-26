package chl.hajo.library.dao;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


/**
 * All products
 * Responsible for putting new Product objects
 * into the model
 * @author hajo
 */
@Stateless
public class Publications {

    @PersistenceContext(unitName = "library_pu")
    private EntityManager em;

    
    
  
}
