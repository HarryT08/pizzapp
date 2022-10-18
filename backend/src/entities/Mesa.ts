import {
    PrimaryColumn,
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('mesa')
export class Mesa extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    estado: string;

    constructor(){
        super();
    }

    init(id:number, estado:string){
        this.id = id;
        this.estado = estado;
    }
}