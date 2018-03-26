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
 * An author for some book(s)
 * This is an JPA Entity class, see annotation
 *
 * @author hajo
 */
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "author")
public class Author implements Serializable {

    @Id
    @Getter
    @Setter
    @Column(nullable=false)
    private String id;
    @Getter
    @Setter
    @Size(min = 2, max = 20, message = "First name must be between 2 and 20 characters")
    private String firstName;
    @Setter
    @Getter
    @Size(min = 2, max = 20, message = "Last name must be between 2 and 20 characters")
    private String lastName;
    @Getter
    @Setter
    private String email;   // Should be verified with external service
    @Getter
    @Setter
    @Embedded
    private Address address;

    public Author(String id, String firstName, String lastName, String email, Address address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
    }

    @Override
    public String toString() {
        return "Author{" + "id=" + id + ", firstName="
                + firstName + ", lastName=" + lastName
                + ", email=" + email + ", address="
                + address + '}';
    }

}
