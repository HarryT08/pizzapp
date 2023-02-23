import { Request, Response } from 'express';
import { MoreThanOrEqual, QueryRunner } from 'typeorm';
import { Comanda } from '../entities/Comanda';
import { DetalleComanda } from '../entities/DetalleComanda';
import { MateriaPrima } from '../entities/MateriaPrima';
import { setState } from './mesas-controller';

/*
Metodo para buscar las comandas de una mesa, usando el ORM de typeorm
*/
export const getComandaByMesa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.query;
    const comanda = await Comanda.findOne({
      where: { idMesa: parseInt(id), estado: String(estado) },
      relations: [
        'detalleComanda',
        'mesa',
        'detalleComanda.producto',
        'detalleComanda.producto.preparaciones',
        'detalleComanda.producto.preparaciones.materiaPrima'
      ]
    });
    res.json(comanda);
  } catch (error) {
    console.error(error);

    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/*
Metodo para actualizar el estado de la comanda, usando el ORM de typeorm
*/
export const updateStateComanda = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const comanda = await Comanda.findOne({ where: { idMesa: parseInt(id), estado: "Abierta" } });
    if (comanda) {
      comanda.estado = estado;
      await comanda.save();
      res.json({ message: 'Comanda actualizada' });
    } else {
      res.status(404).json({ message: 'Comanda no encontrada' });
    }
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/*
Metodo para obtener las comandas, usando el ORM de typeorm
*/
export const getComandas = async (req: Request, res: Response) => {
  try {
    const comandas = await Comanda.find({ order: { id: 'DESC' } });
    res.json(comandas);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/*

    TODO: Metodo para crear una comanda
    TODO: Crear el detalle comanda
    TODO: terminar pedido cambia el estado de la mesa a 'OCUPADO'
    TODO: cancelar pedido cambia el estado de la mesa a 'DISPONIBLE'

*/

const calculateTotal = (data: any) => {
  let total = 0;
  for (const product of data) {
    const { cantidad, costo } = product;
    total += cantidad * costo;
  }
  return total;
};

export const crearComanda = async (req: Request, res: Response) => {
  const queryRunner =
    MateriaPrima.getRepository().manager.connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const { data, observacion, id_mesa } = req.body;
    const total = calculateTotal(data);

    const comanda = new Comanda();
    comanda.init(total, id_mesa, new Date(), observacion, 'Abierta');
    setState(id_mesa, 'Ocupado');

    const saved = await queryRunner.manager.save(comanda);
    const errors = await crearDetalles(saved, data, queryRunner);

    if (errors.length > 0) {
      await queryRunner.rollbackTransaction();
      return res
        .status(400)
        .json({ message: 'No hay inventario suficiente', errors });
    }

    await queryRunner.commitTransaction();
    return res.json({ message: 'Comanda creada' });
  } catch (error) {
    console.error(error);

    await queryRunner.rollbackTransaction();

    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  } finally {
    await queryRunner.release();
  }
};

const crearDetalles = async (
  comanda: Comanda,
  productos: any,
  queryRunner: QueryRunner
) => {
  for (const product of productos) {
    const subtotal = product.costo * product.cantidad;
    const detalleComanda = new DetalleComanda();

    detalleComanda.init(
      comanda.id,
      subtotal,
      product.cantidad,
      product.id,
      product.tamanio
    );

    await queryRunner.manager.save(detalleComanda);
  }

  let preparaciones: any = [];

  for (const prod of productos) {
    const preparacion = {
      nombre: prod.nombre,
      cantidad: prod.cantidad,
      tamanio: prod.tamanio,
      ingredientes: prod.preparaciones.filter(
        (preparacion: any) => preparacion.tamanio === prod.tamanio
      )
    };

    preparaciones.push(preparacion);
  }

  return await descontarMaterial(preparaciones, queryRunner);
};

//¿Copilot que le falta a mi codigo para funcionar?

const descontarMaterial = async (
  preparaciones: any,
  queryRunner: QueryRunner
) => {
  let notPossible: any = [];

  for (const preparacion of preparaciones) {
    const ingredientes = preparacion['ingredientes'];

    for (const ingrediente of ingredientes) {
      const gasto = ingrediente.cantidad * preparacion.cantidad;

      const materiaPrima = await queryRunner.manager.findOne(MateriaPrima, {
        where: {
          id: ingrediente.id_materia,
          existencia: MoreThanOrEqual(gasto),
          deleted: false
        }
      });

      if (!materiaPrima) {
        let existe = notPossible.find(
          (item: any) =>
            item.nombre === preparacion.nombre &&
            item.tamanio === preparacion.tamanio
        );

        if (!existe) {
          notPossible.push({
            nombre: preparacion.nombre,
            tamanio: preparacion.tamanio
          });
        }

        break;
      }

      materiaPrima.existencia -= gasto;
      await queryRunner.manager.save(materiaPrima);
    }
  }

  return notPossible;
};

/*
Metodo para obtener las ultimas cinco comandas, usando el ORM de typeorm
*/
export const getLastComandas = async (req: Request, res: Response) => {
  try {
    const date = new Date();
    const comandas = await Comanda.find({ order: { id: 'DESC' }, take: 5 });
    res.json(comandas);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};
