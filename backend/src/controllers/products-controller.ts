import { Request, Response } from "express";
import { Preparacion } from "../entities/Preparacion";
import { Producto } from "../entities/Producto";

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parseId = {
    id: Number(id),
  };
  const product = await Producto.findOne({
    where: parseId
  });
  return res.json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Producto.find();  
    return res.json(products);
  } catch (error) {
    return res.json({
      message : "Ha ocurrido algo inesperado"
    }) 
  }
}

export const createProduct = async (req: Request, res: Response) => {
  let { nombre, precio, presentaciones } = req.body;
  const producto = new Producto();
  producto.init(nombre, precio, "proof image");
  const saved = await producto.save();         // Producto guardado y ya tengo el ID
  createPreparation(saved.id, presentaciones); // Depronto aqui se podria poner await
  return res.json('Producto creado');
};

function createPreparation(idProducto: number, presentaciones: any) {
  let data : Preparacion[] = [];
  presentaciones.forEach((presentacion: any) => {
    const size = presentacion["tamaño"];
    presentacion["ingredientes"].forEach((ingrediente: any) => {
      const idMateria = ingrediente["id"];
      const cantidad = ingrediente["cantidad"];
      const preparacion = new Preparacion();
      preparacion.init(idProducto, idMateria, size, cantidad);
      data.push(preparacion);
    });
  });
  console.log(data);
  Preparacion.save(data);
}

export const deleteProduct = async( req: Request , res: Response) => {
  try {

    const id = Number.parseInt(req.params['id'])
    console.log('Encontrado' , id, typeof id)
    
    await Preparacion.delete({
      id_producto : id
    })

    const result = await Producto.delete({id : id})
    
    if(result.affected === 0) {
      return res.status(404).json({
        message : "Producto no encontrado"
      })
    }

    return res.status(200).json( { 
      message : 'Producto eliminado'
    })

  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}