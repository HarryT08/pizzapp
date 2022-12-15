import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Producto } from './Producto';
import { Comanda } from './Comanda';

@Entity('detalleComanda')
export class DetalleComanda extends BaseEntity{
        
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Comanda, (comanda) => comanda.detalleComanda)
    @JoinColumn({name: "idComanda"})
    comanda: Comanda;

    @Column()
    totalComanda: number;

    @Column()
    cantidad: number;

    @OneToOne(() => Producto)
    @JoinColumn({name: 'idProducto'})
    producto: Producto;

    constructor(){
        super();
    }

    init(id:number, cantidad:number){
        this.id = id;
        this.cantidad = cantidad;
    }
}