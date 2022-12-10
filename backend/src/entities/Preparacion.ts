import {
    Column,
    Entity,
    BaseEntity,
    PrimaryColumn
} from 'typeorm';
@Entity('preparacion')
export class Preparacion extends BaseEntity{
    
    @PrimaryColumn()
    id_producto: number;

    @PrimaryColumn()
    id_materia: number;

    @Column()
    tamanio : string;

    @Column()
    cantidad : number;


    init(id_producto:number, id_materia:number, tamanio:string, cantidad:number) : void{
        this.id_producto = id_producto;
        this.id_materia = id_materia;
        this.tamanio = tamanio;
        this.cantidad = cantidad;
    }

    constructor(){
        super();
    }
}