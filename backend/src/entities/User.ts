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

  constructor(cedula : number, idRol: number, username : string, password : string) {
    super();
    this.cedula = cedula;
    this.idRol = idRol;
    this.username = username;
    this.password = password;
  }
}