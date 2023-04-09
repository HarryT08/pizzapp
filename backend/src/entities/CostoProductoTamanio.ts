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

    @Column()
    idProducto: number;

    @JoinColumn({name : 'idProducto', referencedColumnName : 'id'})
    @ManyToOne(() => Producto,(producto) => producto.costoProductoTamanio, {onUpdate : 'CASCADE'})
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

}