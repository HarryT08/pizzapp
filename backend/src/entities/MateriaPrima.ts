import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Producto } from './Producto';
import { Preparacion } from './Preparacion';

@Entity('materiaPrima')
export class MateriaPrima extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  existencia: number;

  @ManyToMany(() => Producto, (producto) => producto.ingredientes)
  productos: Producto[];

  @OneToMany(() => Preparacion, (preparacion) => preparacion.materiaPrima)
  @JoinColumn({ name: 'id_materia' })
  preparaciones: Preparacion[];

  @Column()
  pesaje: string;

  @Column({ default: false, type: 'boolean' })
  deleted: boolean;

  constructor() {
    super();
  }

  init(nombre: string, cantidad: number, pesaje: string) {
    this.nombre = nombre;
    this.existencia = cantidad;
    this.pesaje = pesaje;
  }
}
