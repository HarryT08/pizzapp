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
import { CostoProductoTamanio } from './CostoProductoTamanio';

@Entity('producto')
export class Producto extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    costo : number;

    @OneToMany(() => Preparacion,(preparacion) => preparacion.producto)
    preparaciones : Preparacion[];

    @Column( {default : false} )
    deleted: boolean;

    @OneToMany(() => CostoProductoTamanio,(costoProductoTamanio) => costoProductoTamanio.producto)
    costoProductoTamanio : CostoProductoTamanio[];

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