import {
    Column,
    Entity,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Producto } from './Producto';

@Entity('costoProductoTamanio')
export class CostoProductoTamanio extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({select: false})
    idProducto: number;

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