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

    init(cedula: number, nombre: string, apellido: string, celular: string){
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
    }
}