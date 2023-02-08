import { Request, Response } from 'express';
import { MateriaPrima } from '../entities/MateriaPrima';
import { cleanProductName } from '../libs/cleanFunctions';

export const createIngredient = async (req: Request, res: Response) => {
  const { nombre, existencia, pesaje } = req.body;
  const nameClean = cleanProductName(nombre);
  const ingrediente = await searchIngredient(nameClean);

  if (ingrediente) {
    return res.status(400).json({
      message: 'El ingrediente ya existe'
    });
  }

  try {
    const materiaPrima = new MateriaPrima();
    materiaPrima.init(nombre, existencia, pesaje);
    const saved = await materiaPrima.save();
    return res.status(201).json({
      message: 'Ingrediente creado con exito',
      ...saved
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const searchIngredient = async (nombre: string) => {
  const ingrediente = await MateriaPrima.findOneBy({
    nombre: nombre
  });
  return ingrediente;
};

export const updateIngredient = async (req: Request, res: Response) => {
  const id = parseInt(req.params['id']);
  let { nombre, existencia, pesaje } = req.body;
  const materiaPrima = await MateriaPrima.findOneBy({ id: id, deleted: false });
  if (materiaPrima) {
    materiaPrima.nombre = nombre;
    materiaPrima.existencia = parseInt(existencia);
    materiaPrima.pesaje = pesaje;
    await materiaPrima.save();
    return res.send('Ingrediente actualizado');
  }
  return res.status(404).json({ message: 'Ingrediente no encontrado' });
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id']);
    const result = await MateriaPrima.update(id, { deleted: true });

    if (result.affected === 0)
      return res.status(404).json({ message: 'Ingrediente no encontrado' });

    return res.status(202).json({ message: 'Ingrediente eliminado' });
  } catch (error) {
    console.error(error);

    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export const getIngredients = async (req: Request, res: Response) => {
  try {
    const ingredientes = await MateriaPrima.findBy({ deleted: false });
    return res.json(ingredientes);
  } catch (error) {
    console.error(error);

    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};
