package chl.hajo.library.rest;

import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 *
 * @author hajo
 */
@ApplicationPath("rest")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(chl.hajo.library.rest.AuthorResource.class);
        resources.add(chl.hajo.library.rest.BookResource.class);
        resources.add(chl.hajo.library.rest.CORSFilter.class);
        resources.add(chl.hajo.library.rest.DatabaseResource.class);
    }
    
}
