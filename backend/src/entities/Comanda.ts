import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';

import { Mesa } from './Mesa';
import { DetalleComanda } from './DetalleComanda';

@Entity('comanda')
export class Comanda extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number;

    @OneToOne(() => Mesa, (mesa) => mesa.id)
    @JoinColumn({name: 'idMesa'})
    mesa: Mesa;

    @Column()
    fecha: Date;

    @Column()
    observacion: string;

    @Column()
    estado: string;

    @OneToMany(() => DetalleComanda, (detalleComanda) => detalleComanda.comanda)
    detalleComanda: DetalleComanda[];

    @Column()
    idMesa: number;

    constructor(){
        super();
    }

    init(id:number, total:number, mesa:Mesa, fecha:Date, observacion:string, estado:string){
        this.id = id;
        this.total = total;
        this.mesa = mesa;
        this.fecha = fecha;
        this.observacion = observacion;
        this.estado = estado;
    }
}