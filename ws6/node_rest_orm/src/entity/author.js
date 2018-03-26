import {
  Entity,
  PrimaryColumn,
  Column
} from "typeorm";

@Entity()
export class Author {

  @PrimaryColumn("varchar")
  id = "";

  @Column("varchar")
  firstName = "";

  @Column("varchar")
  lastName = "";

  @Column("varchar")
  email = "";

}
