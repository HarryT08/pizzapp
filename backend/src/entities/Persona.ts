import {
    PrimaryColumn,
    Column,
    Entity,
    BaseEntity,
    OneToMany,
    OneToOne
} from 'typeorm';
import { Domicilio } from './Domicilio';
import { User } from './User';

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

    @OneToMany(() => Domicilio, (domicilio) => domicilio.persona)
    domicilios: Domicilio[];

    @OneToOne(() => User, (user) => user.cedula, {onUpdate: 'CASCADE'})
    user: User;

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