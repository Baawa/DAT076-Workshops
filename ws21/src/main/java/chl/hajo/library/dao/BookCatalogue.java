package chl.hajo.library.dao;

import chl.hajo.library.core.Book;
import chl.hajo.library.service.DataSupplier;
import java.util.List;
import javax.ejb.Stateless;

/**
 * All orders Responsible for putting new PurchaseOrders objects into the model
 *
 * @book hajo
 */
@Stateless
public class BookCatalogue  {
    
    // Simulate database
    private final List<Book> books = DataSupplier.getBooks();
          
    public List<Book> findByName(String name) {
       
        return null;
    }

    public Book find(String isbn) {
        for( Book a : books){
            if( a.getIsbn().equals(isbn)){
                return a;
            }
        }
        return null;
    }

    public List<Book> findAll() {
        return books;
    }

    public void create(Book book) {
         books.add(book);
    }

    public void update(Book book) {
        delete(book.getIsbn());
        create(book);
    }

    public void delete(String id) {
        Book a = find(id);
        if( a != null){
            books.remove(a);
        }
    }
   
}
