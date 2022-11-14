import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany
} from 'typeorm';
import { Producto } from './Producto';

@Entity('materiaPrima')
export class MateriaPrima extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    existencia: number;

    @ManyToMany(() => Producto, producto => producto.ingredientes)
    productos : Producto[];

    constructor(){
        super();
    }

    init(nombre:string, cantidad:number){
        this.nombre = nombre;
        this.existencia = cantidad;
    }
}