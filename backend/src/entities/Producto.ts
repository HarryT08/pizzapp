import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

import { Preparacion } from './Preparacion';

@Entity('producto')
export class Producto extends BaseEntity{
        
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @Column()
    imagen: string;

    @OneToMany(() => Preparacion, (preparacion) => preparacion.producto)
    preparaciones: Preparacion[];

    constructor(){
        super();
    }

    init(id:number, nombre:string, precio:number, imagen:string){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}