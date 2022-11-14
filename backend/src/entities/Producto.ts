import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { MateriaPrima } from './MateriaPrima';

@Entity('producto')
export class Producto extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    costo : number;

    @Column()
    imagen : string;

    constructor(){
        super();
    }
    @ManyToMany(() => MateriaPrima, materiaPrima => materiaPrima.productos)
    @JoinTable({
        name : 'preparacion',
        joinColumn : {
            name : 'id_producto',
        },
        inverseJoinColumn : {
            name : 'id_materia',
        },
    })
    ingredientes : MateriaPrima[];

    init(nombre:string, costo:number, imagen:string): void{
        this.nombre = nombre;
        this.costo = costo;
        this.imagen = imagen;
    }
}