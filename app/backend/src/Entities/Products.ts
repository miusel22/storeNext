  
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  stock!: string;

  @Column()
  description!: string;

  @Column()
  category!: string;

  @Column()
  price!: string;
}
