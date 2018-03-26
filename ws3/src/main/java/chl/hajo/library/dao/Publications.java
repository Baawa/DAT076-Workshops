package chl.hajo.library.dao;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


/**
 * DAO for publications, an stateless EJB session bean
 * 
 * @author hajo
 */
@Stateless
public class Publications {

    @PersistenceContext(unitName = "library_pu")
    private EntityManager em;

    
    
  
}
