import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('materiaPrima')
export class MateriaPrima extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    existencia: number;

    constructor(){
        super();
    }

    init(nombre:string, cantidad:number){
        this.nombre = nombre;
        this.existencia = cantidad;
    }
}