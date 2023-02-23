import {
    Column,
    Entity,
    BaseEntity,
    ManyToOne,
    PrimaryColumn,
    JoinColumn
} from 'typeorm';
import { Producto } from './Producto';

@Entity('costoProductoTamanio')
export class CostoProductoTamanio extends BaseEntity{

    @Column({select: false})
    idProducto: number;

    @PrimaryColumn({name : 'idProducto', type : 'int' , insert : false, update : true})
    @JoinColumn({name : 'idProducto'})
    @ManyToOne(() => Producto,(producto) => producto.costoProductoTamanio)
    producto : Producto;

    @Column()
    tamanio : String;
    
    @Column()
    costo : number;

    init(idProducto:number, tamanio:string, costo:number) : void {
        this.idProducto = idProducto;
        this.tamanio = tamanio;
        this.costo = costo;
    }

    constructor(){
        super();
    }
}