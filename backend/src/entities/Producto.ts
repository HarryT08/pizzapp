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

    @OneToMany(() => Preparacion,(preparacion) => preparacion.producto, {cascade: true})
    preparaciones : Preparacion[];

    @Column( {default : false} )
    deleted: boolean;

    //category : string

    @OneToMany(() => CostoProductoTamanio,(costoProductoTamanio) => costoProductoTamanio.producto, {cascade : true})
    costoProductoTamanio : CostoProductoTamanio[];

    constructor(){
        super();
    }
    
    @ManyToMany(() => MateriaPrima, materiaPrima => materiaPrima.productos, {cascade : true})
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
    
    init(nombre:string, costo:[]): void {
        this.nombre = nombre;
        this.costoProductoTamanio = costo;
    }
}