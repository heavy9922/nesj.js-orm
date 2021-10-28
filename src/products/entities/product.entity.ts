import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'character varying', length: 255, nullable:false, unique:true})
  name: string;
  @Column({type: 'text'})
  description: string;
  @Column({type: 'double precision'})
  price: number;
  @Column({type: 'integer'})
  stock: number;
  @Column({type: 'text'})
  image: string;
}
