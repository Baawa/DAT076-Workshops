package chl.hajo.library.dao;

import chl.hajo.library.core.Author;
import static java.lang.System.out;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import chl.hajo.library.core.QAuthor;
import com.querydsl.jpa.impl.JPAQueryFactory;

/**
 *
 * @author hajo
 */
@Stateless
public class AuthorRegistry extends AbstractQuery<Author, String> {

    @PersistenceContext(unitName = "library_pu")
    private EntityManager em;
      

    public AuthorRegistry() {
        // author is default object created by QueryDSL, see Generated Sources
        super(Author.class, QAuthor.author);
    }

    @Override
    public EntityManager getEntityManager() {
        return em;
    }
    @Override
    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    public List<Author> findByName(String name) {
        QAuthor author = QAuthor.author;
        JPAQueryFactory qf = new JPAQueryFactory(em);
        List<Author> found = qf.select(author)
                .from(author)
                .where(author.firstName.eq(name))
                .fetch();
        out.println(found);
        return found;
    }
}
