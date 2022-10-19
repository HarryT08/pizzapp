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

@Entity('Comanda')
export class Comanda extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number;

    @OneToOne('Mesa')
    @JoinColumn({name: 'idMesa'})
    mesa: Mesa;

    @Column()
    fecha: Date;

    @Column()
    observacion: String;

    @Column()
    estado: String;

    @OneToMany(() => DetalleComanda, (detalleComanda) => detalleComanda.comanda)
    detalleComandas: DetalleComanda[];

    constructor(){
        super();
    }

    init(id:number, total:number, mesa:Mesa, fecha:Date, observacion:String, estado:String){
        this.id = id;
        this.total = total;
        this.mesa = mesa;
        this.fecha = fecha;
        this.observacion = observacion;
        this.estado = estado;
    }
}