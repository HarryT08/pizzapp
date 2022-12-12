import {
    Column,
    Entity,
    BaseEntity,
    PrimaryColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { Producto } from './Producto';
@Entity('preparacion')
export class Preparacion extends BaseEntity{

    @Column()
    id_producto: number;

    @PrimaryColumn()
    id_materia: number;

    @PrimaryColumn()
    tamanio : string;

    @Column()
    cantidad : number;

    @PrimaryColumn({name : 'id_producto', type : 'int' , insert : false})
    @ManyToOne(() => Producto, (producto) => producto.preparaciones)
    @JoinColumn({name : 'id_producto'})
    producto : Producto;

    init(id_producto: number, id_materia:number, tamanio:string, cantidad:number) : void {
        this.id_producto = id_producto;
        this.id_materia = id_materia;
        this.tamanio = tamanio;
        this.cantidad = cantidad;
    }

    constructor(){
        super();
    }
}