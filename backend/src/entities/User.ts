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
  
  init(cedula : number , idRol : number, username : string, password : string){
    this.cedula = cedula;
    this.idRol = idRol;
    this.username = username;
    this.password = password;
  }
}