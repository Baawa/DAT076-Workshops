package chl.hajo.library.dao;

import chl.hajo.library.core.Address;
import chl.hajo.library.core.Author;
import chl.hajo.library.service.DataSupplier;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import org.junit.AfterClass;
import static org.junit.Assert.assertTrue;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *  This uses RESOURCE_LOCAL testing i.e NO container involved
 *  this is like Java SE (for simplicity)
 *  - Must create instances manually
 *  - Must handle transactions manually
 * 
 *
 * @author hajo
 */
public class AuthorRegistryIT {

    static AuthorRegistry areg;
    static EntityManager em;

    @BeforeClass
    public static void setUpClass() throws NamingException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("library_pu_test");
        em = emf.createEntityManager();
        areg = new AuthorRegistry();
        areg.setEntityManager(em);
    }

    @AfterClass
    public static void tearDownClass() {
        em.close();
    }

    @Test
    public void testCreateCountDelete() throws Exception {
        em.getTransaction().begin();    // Handle transaction

        int count = areg.count();
        Address a = DataSupplier.getRandomAddress();
        // NOTE: Possible exception if DONTUSE exists, CHECK!
        Author a1 = new Author("DONTUSE", "xxx", "xxx", "xxx@xxx", a);
        areg.create(a1);

        Author a2 = areg.find("DONTUSE");
        assertTrue(a2 != null);
        assertTrue(count + 1 == areg.count());

        Author a3 = areg.find("DONTUSE");
        assertTrue(a2.equals(a3));
        //assertTrue(a2 == a3);   // Hmm should work?!

        areg.delete("DONTUSE");
        Author a4 = areg.find("DONTUSE");
        assertTrue(a4 == null);
        assertTrue(count == areg.count());
        
        em.getTransaction().commit();
    }

    public void testSelectFromTo() throws Exception {

    }

    //@Test
    public void testUpdate() throws Exception {

    }

    //@Test
    public void testFindByName() throws Exception {

    }

}
