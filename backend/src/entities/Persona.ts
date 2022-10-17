import {
    PrimaryColumn,
    Column,
    Entity,
    BaseEntity
} from 'typeorm';

@Entity('persona')
export class Persona extends BaseEntity{
    
    @PrimaryColumn()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    celular: string;

    constructor() {
        super();        
    }
}