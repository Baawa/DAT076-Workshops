package chl.hajo.library.rest;

import chl.hajo.library.core.Author;
import chl.hajo.library.dao.AuthorRegistry;
import chl.hajo.library.service.DataSupplier;
import com.google.gson.Gson;
import static java.lang.System.out;
import java.net.URI;
import java.util.List;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author hajo
 */
@Path("author")
public class AuthorResource {

    private static final Logger LOG = Logger.getLogger(AuthorResource.class.getName());

    @Context
    private UriInfo uriInfo;

    @EJB
    private AuthorRegistry areg;
    private final Gson gson = new Gson();

    // Provides access to application and request URI information. 
    // Relative URIs are relative to the base URI of the application
    @GET
    @Path("{id : [A-Z][A-Z]}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response find(@PathParam("id") String id) {
        Author p = areg.find(id);
        if (p != null) {
            return Response.ok(gson.toJson(p)).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build(); 
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response findAll() {
        out.println("*** findAll");
        List<Author> authors = areg.findAll();
        out.println(authors);
        return Response.ok(gson.toJson(authors)).build();
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON + ";charset=utf-8"})
    @Path("count")
    public Response count() {
        int count = areg.count();
        return Response.ok(gson.toJson(count)).build();
    }

    /* TODO @GET
    @Path("range")
    @Produces({MediaType.APPLICATION_JSON})
    public Response findRange(@QueryParam("fst") int firstResult,
            @QueryParam("max") int n) {
        List<TodoNote> notes = list.getNotes();
       
        return Response.ok(gson.toJson(notes)).build();
    }*/
    @POST
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED})
    public Response create(@FormParam("id") String id, @FormParam("firstName") String firstName,
            @FormParam("lastName") String lastName, @FormParam("email") String email) {
        Author author = new Author(id, firstName, lastName, email, DataSupplier.getRandomAddress());
        areg.create(author);
        URI authorUri = uriInfo
                .getAbsolutePathBuilder()
                .path(String.valueOf(author.getId()))
                .build(author);
        // Set it to 201 (created) and setting response header 'Location'
        // Inspect with cURL
        return Response.created(authorUri).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response create(Author author) {
        areg.create(author);
        URI authorUri = uriInfo
                .getAbsolutePathBuilder()
                .path(String.valueOf(author.getId()))
                .build(author);
        // Set it to 201 (created) and setting response header 'Location'
        // Inspect with cURL
        return Response.created(authorUri).build();
    }

    @DELETE
    @Path("{id: [A-Z][A-Z]}")
    public Response delete(@PathParam("id") String id) {
        // A successful response SHOULD be 200 (OK) if the response 
        // includes an entity describing the status, 202 (Accepted) if 
        // the action has not yet been enacted, or 204 (No Content) if 
        // the action has been enacted but the response does not 
        // include an entity.
        areg.delete(id);
        return Response.noContent().build();
    }

    @PUT
    @Path("{id: [A-Z][A-Z]}")
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED})
    public Response update(@FormParam("id") String id, @FormParam("firstName") String firstName,
            @FormParam("lastName") String lastName, @FormParam("email") String email) {
        Author author = areg.find(id);
        if (author != null) {
            author.setFirstName(firstName);
            author.setLastName(lastName);
            author.setEmail(email);
            areg.update(author);
            //If an existing resource is modified, either the 200 (OK) or 204 
            //(No Content) response codes SHOULD be sent to indicate 
            //successful completion of the request.
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @PUT
    @Path("{id: [A-Z][A-Z]}")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response update(Author author) {
        Author a = areg.find(author.getId());
        if (a != null) {
            a.setFirstName(author.getFirstName());
            a.setLastName(author.getLastName());
            a.setEmail(author.getEmail());
            areg.update(author);
            //If an existing resource is modified, either the 200 (OK) or 204 
            //(No Content) response codes SHOULD be sent to indicate 
            //successful completion of the request.
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}
