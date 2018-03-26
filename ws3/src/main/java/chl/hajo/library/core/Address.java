package chl.hajo.library.core;

import java.io.Serializable;
import javax.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * An Address (part of Author)
 * This is embeddable is an attribute of an entity class saved
 * in same table
 * 
 * @author hajo
 */
@NoArgsConstructor
@Embeddable
public class Address implements Serializable {

    @Getter
    private String street;
    @Getter
    private int nbr;
    @Getter
    private String town;

    public Address(String street, int nbr, String town) {
        this.street = street;
        this.nbr = nbr;
        this.town = town;
    }

    @Override
    public String toString() {
        return "Address{" + "street=" + street + 
                ", nbr=" + nbr + ", town=" + town + '}';
    }
    
   
    
    
}
