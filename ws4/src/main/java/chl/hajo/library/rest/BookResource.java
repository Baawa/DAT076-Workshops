/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package chl.hajo.library.rest;

import chl.hajo.library.core.Book;
import chl.hajo.library.dao.AuthorRegistry;
import chl.hajo.library.dao.BookCatalogue;
import com.google.gson.Gson;
import java.net.URI;
import java.util.List;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author albinbaaw
 */
@Stateless
@Path("book")
public class BookResource {

    private static final Logger LOG = Logger.getLogger(AuthorResource.class.getName());

    @Context
    private UriInfo uriInfo;

    @EJB
    private BookCatalogue bcat;
    private final Gson gson = new Gson();

    @POST
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED})
    public Response create(@FormParam("isbn") String isbn, @FormParam("genre") String genre, @FormParam("price") int price, @FormParam("title") String title) {
        Book book = new Book(isbn, genre, price, title);
        bcat.create(book);
        URI bUri = uriInfo.getAbsolutePathBuilder()
                .path(String.valueOf(book.getIsbn()))
                .build(book);
        return Response.created(bUri).build();
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response create(Book book) {
        bcat.create(book);
        URI bUri = uriInfo.getAbsolutePathBuilder()
                .path(String.valueOf(book.getIsbn()))
                .build(book);
        return Response.created(bUri).build();
    }

    @POST
    @Path("edit")
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED})
    public Response edit(@FormParam("isbn") String isbn, @FormParam("genre") String genre, @FormParam("price") int price, @FormParam("title") String title) {
        Book b = bcat.find(isbn);
        if (b != null){
            b.setGenre(genre);
            b.setPrice(price);
            b.setTitle(title);
            bcat.update(b);
            
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    
    @POST
    @Path("edit")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response edit(Book book) {
        Book b = bcat.find(book.getIsbn());
        if (b != null){
            b.setGenre(book.getGenre());
            b.setPrice(book.getPrice());
            b.setTitle(book.getTitle());
            bcat.update(b);
            
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("{isbn}")
    public Response remove(@PathParam("isbn") String isbn) {
        bcat.delete(isbn);
        return Response.noContent().build();
    }

    @GET
    @Path("{isbn}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response find(@PathParam("isbn") String isbn) {
        Book b = bcat.find(isbn);
        if (b != null){
            return Response.ok(gson.toJson(b)).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build(); 
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response findAll() {
        List<Book> books = bcat.findAll();
        return Response.ok(gson.toJson(books)).build();
    }

    @GET
    @Path("count")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response count() {
        int count = bcat.count();
        return Response.ok(gson.toJson(count)).build();
    }
    
}
