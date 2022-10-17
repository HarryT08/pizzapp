import {
  PrimaryColumn,
  Column,
  Entity,
  BaseEntity
} from 'typeorm';

@Entity('usuario')
export class User extends BaseEntity{   
 
  @PrimaryColumn()
  cedula : number

  @Column()
  idRol : number

  @Column()
  username : string

  @Column()
  password : string

  constructor() {
    super();
  }
}