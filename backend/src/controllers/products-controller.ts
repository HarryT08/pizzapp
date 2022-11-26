import { Request, Response } from "express";
import { MateriaPrima } from "../entities/MateriaPrima";
import { Preparacion } from "../entities/Preparacion";
import { Producto } from "../entities/Producto";

// export async function getProducts(req:Request, res:Response): Promise<Response>{
//     const conn = await connect();
//     const product = await conn.query('SELECT * FROM producto');
//     return res.send(product[0]);
// }

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

export const createProduct = async (req: Request, res: Response) => {
  let { nombre, precio, presentaciones } = req.body;
  const producto = new Producto();
  producto.init(nombre, precio, "proof image");
  const saved = await producto.save();         // Producto guardado y ya tengo el ID
  createPreparation(saved.id, presentaciones); // Depronto aqui se podria poner await
  return res.json('Producto creado');
};

const createPreparation =  (idProducto: number, presentaciones: any) => {
  let data : Preparacion[] = []
  presentaciones.forEach((presentacion: any) => {
    const size = presentacion["tamaño"]
    presentacion["ingredientes"].forEach( (ingrediente: any) => {
      const idMateria = ingrediente["id"]
      const cantidad = ingrediente["cantidad"]
      const preparacion = new Preparacion();
      preparacion.init(idProducto, idMateria, size, cantidad);
      data.push(preparacion)
    })
  })
  console.log(data);
  Preparacion.save(data);
}