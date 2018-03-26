import {
  Entity,
  PrimaryColumn,
  Column
} from "typeorm";

@Entity()
export class Book {

  @PrimaryColumn("varchar")
  isbn = "";

  @Column("varchar")
  price = "";

  @Column("varchar")
  title = "";
}
