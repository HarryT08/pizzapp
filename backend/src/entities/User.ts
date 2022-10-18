import {
  PrimaryColumn,
  Column,
  Entity,
  BaseEntity,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { Persona } from './Persona';
import { Rol } from "./Rol";

@Entity('usuario')
export class User extends BaseEntity{   

  @PrimaryColumn()
  cedula : number;

  @Column()
  username : string;

  @Column()
  password : string;

  @OneToOne(() => Persona, {cascade: ["insert", "update"]})
  @JoinColumn({name: 'cedula'})
  persona: Persona;

  @OneToOne(() => Rol)
  @JoinColumn({name: "idRol"})
  rol: Rol;

  constructor() {
    super();
  }
  
  init(cedula : number , rol: Rol, username : string, password : string, persona: Persona){
    this.cedula = cedula;
    this.username = username;
    this.password = password;
    this.rol = rol;
    this.persona = persona;
  }
}