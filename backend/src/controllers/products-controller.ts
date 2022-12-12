import { Request, Response } from "express";
import { Preparacion } from "../entities/Preparacion";
import { Producto } from "../entities/Producto";

/*
Metodo para obtener un producto por su id, usando el ORM de typeorm
*/
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

/*
Metodo para buscar todos los productos, usando el ORM de typeorm
*/
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

/*
Metodo para crear un producto, usando el ORM de typeorm
*/
export const createProduct = async (req: Request, res: Response) => {
  let { nombre, precio, presentaciones } = req.body;
  const producto = new Producto();
  producto.init(nombre, precio);
  const saved = await producto.save();         // Producto guardado y ya tengo el ID
  createPreparation(saved.id, presentaciones); // Depronto aqui se podria poner await
  return res.json('Producto creado');
};

/*
Metodo para crear la preparacion de un producto, usando el ORM de typeorm
*/
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

/*
Metodo para eliminar un producto, usando el ORM de typeorm
*/
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

/*
Metodo para actualizar un producto, usando el ORM de typeorm
*/
export const updateProduct = async (req: Request, res: Response) => {
  console.log("ENTRO")
  const id  = Number.parseInt( req.params['id'] )
  //chosen --> Las presentaciones que selecciono el usuario
  let { nombre , costo, chosen} = req.body
  const producto = await Producto.findOneBy( {id : id} )
  if(producto){
    producto.nombre = nombre
    producto.costo = costo
    await updatePreparations(id , chosen)
    //producto.save()
  }
  res.json("yes")
}

/*
Metodo para actualizar las preparaciones de un producto, usando el ORM de typeorm
*/
async function updatePreparations(id_producto : number , chosen : any) {
  console.log(id_producto)
  const preps = await Preparacion.findBy({id_producto : id_producto})
  console.log(preps)

  /*chosen.forEach( async ( presentacion : any ) => {
    const preparaciones = await Preparacion.findBy({
      id_producto : id_producto,
      id_materia : presentacion.ingredientes[0].id
    })
    console.log(preparaciones.length)
    

  })*/
}

export const getProductsAndPreparations = async (req: Request, res: Response) => {
  const products = await Producto.find({relations: ["preparaciones"]});
  return res.json(products);
}