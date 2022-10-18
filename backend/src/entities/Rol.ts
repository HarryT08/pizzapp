import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('rol')
export class Rol extends BaseEntity{   

  @PrimaryGeneratedColumn()
  id : number

  @Column()
  nombre : string

  constructor() {
    super();
  }
  
  init(id : number ,nombre : string){
    this.id = id;
    this.nombre = nombre;
  }
}