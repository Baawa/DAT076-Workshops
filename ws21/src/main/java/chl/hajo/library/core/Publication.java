package chl.hajo.library.core;

import java.io.Serializable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A connection of a book to an author
 * Core model class
 * @author hajo
 */
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Publication implements Serializable {

    @Getter
    @Setter
    private long id;
    @Getter
    @Setter
    private Book book;
    @Getter
    @Setter
    private Author author;

    public Publication(Book book, Author author) {
        this.book = book;
        this.author = author;
    }

    @Override
    public String toString() {
        return "Publication{" + "id=" + id + ", book=" + book + ", author=" + author + '}';
    }

}
