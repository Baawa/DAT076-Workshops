package chl.hajo.library.core;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A book written by some author(s)
 * This is an JPA Entity class, see annotation
 * @author hajo
 */
@NoArgsConstructor
@EqualsAndHashCode(of = {"isbn"})
@Entity
@Table(name = "book")
public class Book implements Serializable {
    @Id
    @Getter
    @Setter
    @Column(nullable=false)
    private String isbn;
    
    @Getter
    @Setter
    private String genre;
    
    @Getter
    @Setter
    private int price;
    
    @Getter
    @Setter
    private String title;
    
    public Book(String isbn, String genre, int price, String title){
        this.isbn = isbn;
        this.genre = genre;
        this.price = price;
        this.title = title;
    }
    
    @Override
    public String toString() {
        return "Book{" + "isbn=" + isbn + ", genre="
                + genre + ", price=" + price
                + ", title=" + title + '}';
    }
}