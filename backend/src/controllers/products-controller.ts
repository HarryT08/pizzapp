import { Request, Response } from "express";
import { Preparacion } from "../entities/Preparacion";
import { Producto } from "../entities/Producto";
import { cleanProductName } from "../libs/cleanFunctions";

/*
Metodo para obtener un producto por su id, usando el ORM de typeorm
*/
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parseId = {
    id: Number(id),
  };
  const product = await Producto.findOne({
    where: parseId,
  });
  return res.json(product);
};

/*
Metodo para buscar todos los productos, usando el ORM de typeorm
*/
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Producto.find();
    return res.json(products);
  } catch (error) {
    return res.json({
      message: "Ha ocurrido algo inesperado",
    });
  }
};
/*
Metodo para crear un producto, usando el ORM de typeorm
*/
export const createProduct = async (req: Request, res: Response) => {
  let { nombre, precio, presentaciones } = req.body;
  const producto = new Producto();
  nombre = cleanProductName(nombre);
  producto.init(nombre, precio);
  const saved = await producto.save();
  createPreparation(saved, presentaciones);
  return res.json("Producto creado");
};

/*
Metodo para crear la preparacion de un producto, usando el ORM de typeorm
*/
function createPreparation(producto: Producto, presentaciones: any) {
  let data: Preparacion[] = [];
  presentaciones.forEach((presentacion: any) => {
    const size = presentacion["tamaño"];
    presentacion["ingredientes"].forEach((ingrediente: any) => {
      const idMateria = ingrediente["id"];
      const cantidad = ingrediente["cantidad"];
      const preparacion = new Preparacion();
      preparacion.init(producto.id, idMateria, size, cantidad);
      data.push(preparacion);
    });
  });
  Preparacion.save(data);
}

/*
Metodo para eliminar un producto, usando el ORM de typeorm
*/
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params["id"]);
    console.log("Encontrado", id, typeof id);

    await Preparacion.delete({
      id_producto: id,
    });

    const result = await Producto.delete({ id: id });

    if (result.affected === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "Producto eliminado",
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/*
Metodo para actualizar un producto, usando el ORM de typeorm
*/
export const updateProduct = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params["id"]);
  //chosen --> Las presentaciones que selecciono el usuario
  let { nombre, costo, chosen } = req.body;
  const producto = await Producto.findOneBy({ id: id });
  if (producto) {
    producto.nombre = nombre;
    producto.costo = costo;
    await updatePreparations(producto, chosen);
    producto.save()
  }
  //Producto Actualizado con exito
  res.sendStatus(204)
};

async function updatePreparations(product: Producto, chosen: any) {
  chosen.forEach(  ( presentacion : any ) => {
    const id = product.id;
    presentacion.ingredientes.forEach( async ( ingrediente : any ) => {
      const idMateria = ingrediente.id;
      const cantidad = ingrediente.cantidad;
        let query = 'UPDATE preparacion SET cantidad = ?  WHERE id_producto = ? AND id_materia = ? AND tamanio = ?';
        await Preparacion.query(query, [cantidad, id, idMateria, presentacion.tamaño]);
    })
  })
}

export const getProductsAndPreparations = async (req: Request, res: Response) => {
  const productos = await Producto.find({relations: ["preparaciones", "preparaciones.materiaPrima"]});
  for (const producto of productos) {
    let records : Record<string, number> = { }
    for (const preparacion of producto.preparaciones) {
      let tamanio = preparacion.tamanio;
      let maxToPrepare = Math.floor(preparacion.materiaPrima.existencia / preparacion.cantidad);

      if(records[tamanio] === undefined){
        records[tamanio] = maxToPrepare
      }
      records[tamanio] = Math.min(records[tamanio] , maxToPrepare)
    }
    producto.preparar = records;
  }
  return res.json(productos);
}


export const getProductAndPreparations =async (req : Request, res : Response) => {
  const { id } = req.params;
  const producto = await Producto.find({where: {id: parseInt(id)}, relations: ["preparaciones", "preparaciones.materiaPrima"]})
  if(!producto) return res.status(404).json({message: "Producto no encontrado"})
  return res.status(200).json(producto);
}