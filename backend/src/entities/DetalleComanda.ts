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
    
    @Column()
    idComanda: number;

    @Column()
    idProducto: number;

    @ManyToOne(() => Comanda, (comanda) => comanda.detalleComanda)
    @JoinColumn({name: "idComanda"})
    comanda: Comanda;

    @Column()
    totalComanda: number;

    @Column()
    cantidad: number;

    @Column()
    tamanio : string

    @OneToOne(() => Producto)
    @JoinColumn({name: 'idProducto'})
    producto: Producto;

    constructor(){
        super();
    }

    init(idComanda : number , totalComanda : number, cantidad : number, idProducto : number, tamanio : string){
        this.idComanda = idComanda;
        this.totalComanda = totalComanda;
        this.cantidad = cantidad;
        this.idProducto = idProducto;
        this.tamanio = tamanio;
    }
}