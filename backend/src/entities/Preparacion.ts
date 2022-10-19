import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Producto } from './Producto';
import { MateriaPrima } from './MateriaPrima';

@Entity('preparacion')
export class Preparacion extends BaseEntity{
        
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    cantidad: number;

    @ManyToOne(() => Producto)
    @JoinColumn({name: "idProducto"})
    producto: Producto;

    @ManyToOne(() => MateriaPrima)
    @JoinColumn({name: "idMateria"})
    materiaPrima: MateriaPrima;

    constructor(){
        super();
    }

    init(id:number, nombre:string, cantidad:number, producto:Producto, materiaPrima:MateriaPrima){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.producto = producto;
        this.materiaPrima = materiaPrima;
    }
}