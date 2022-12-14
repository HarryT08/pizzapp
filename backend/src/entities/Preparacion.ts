import {
    Column,
    Entity,
    BaseEntity,
    PrimaryColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { MateriaPrima } from './MateriaPrima';
import { Producto } from './Producto';
@Entity('preparacion')
export class Preparacion extends BaseEntity{

    @Column()
    id_producto: number;
    
    @Column()
    id_materia: number;

    @PrimaryColumn()
    tamanio : string;

    @Column()
    cantidad : number;

    @PrimaryColumn({name : 'id_producto', type : 'int' , insert : false, update : true})
    @ManyToOne(() => Producto, (producto) => producto.preparaciones)
    @JoinColumn({name : 'id_producto'})
    producto : Producto;

    @PrimaryColumn({name : 'id_materia', type : 'int', insert: false})
    @ManyToOne(() => MateriaPrima, (materiaPrima) => materiaPrima.preparaciones)
    @JoinColumn({name : 'id_materia'})
    materiaPrima : MateriaPrima;

    init(id_producto:number, id_materia:number, tamanio:string, cantidad:number) : void {
        this.id_producto = id_producto;
        this.id_materia = id_materia;
        this.tamanio = tamanio;
        this.cantidad = cantidad;
    }

    constructor(){
        super();
    }
}