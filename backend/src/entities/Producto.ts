import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from 'typeorm';
import { MateriaPrima } from './MateriaPrima';
import { Preparacion } from './Preparacion';

@Entity('producto')
export class Producto extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    costo : number;

    @OneToMany(() => Preparacion,(preparacion) => preparacion.producto)
    // @JoinColumn({name : 'id_producto'})
    preparaciones : Preparacion[];

    @Column( {default : false} )
    deleted: boolean;

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

    preparar : Record<string, number>;
    
    init(nombre:string, costo:number): void {
        this.nombre = nombre;
        this.costo = costo;
    }
}