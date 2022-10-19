import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Comanda } from './Comanda';
import { Persona } from './Persona';

@Entity('Domicilio')
export class Domicilio extends BaseEntity {

    @PrimaryGeneratedColumn()
    idDomicilio: number;

    @ManyToOne(() => Persona)
    @JoinColumn({name: 'cedula'})
    persona: Persona;

    @Column()
    direccion: string;

    @OneToOne(() => Comanda)
    @JoinColumn({name: 'idComanda'})
    comanda: Comanda;

    constructor() {
        super();
    }
    
    init(idDomicilio: number, direccion: string){
        this.idDomicilio = idDomicilio;
        this.direccion = direccion;
    }
}