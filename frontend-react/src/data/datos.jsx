import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill, BsFillPersonCheckFill, BsFillPersonDashFill } from "react-icons/bs";
import { GiPaperBagFolded } from "react-icons/gi";
import { IoMdPizza } from "react-icons/io";
import { ImSpoonKnife } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import { GiTabletopPlayers } from "react-icons/gi";

import hamburguesa from "../assets/img/hamburguesa.jpg";
import hamburguesa2 from "../assets/img/hamburguesa2.jpg";
import pizza1 from '../assets/img/pizza1.jpg';
import pizza2 from '../assets/img/pizza2.jpg';
import pizza3 from '../assets/img/pizza3.jpg';
import pizza4 from '../assets/img/pizza4.jpg';
import pizza5 from '../assets/img/pizza5.jpg';
import pizza6 from '../assets/img/pizza6.jpg';
import pizza7 from '../assets/img/pizza7.jpg';
import pizza8 from '../assets/img/pizza8.jpg';

export const dataSidebar = [
  {
    path: "inicio",
    titulo: "Inicio",
    icon: <AiFillHome />,
  },
  {
    path: "productos",
    titulo: "Productos",
    icon: <IoMdPizza />,
  },
  {
    path: "ingredientes",
    titulo: "Ingredientes",
    icon: <ImSpoonKnife />,
  },
  {
    path: "ordenes",
    titulo: "Ordenes",
    icon: <FaClipboardList />,
  },
  {
    path: "cuentas",
    titulo: "Cuentas",
    icon: <BsPeopleFill />,
  },
  {
    path: "mesas",
    titulo: "Mesas",
    icon: <GiTabletopPlayers />,
  },
  {
    path: "facturar",
    titulo: "Facturar",
    icon: <GiPaperBagFolded />,
  },
];

export const dataSidebarMesero = [
  {
    path: 'realizar-pedido',
    titulo: 'Realizar pedido',
    icon: <BsFillPersonCheckFill/>
  },
  {
    path: 'editar-pedido',
    titulo: 'Editar pedido',
    icon: <BsFillPersonDashFill/>
  }
]

export const productos = [
  {
    id: 1,
    nombre: 'Hamburguesa especial',
  },
  {
    id: 2,
    nombre: 'Pizza',
  },
  {
    id: 3,
    nombre: 'Hamburguesa mini',
  },
  {
    id: 4,
    nombre: 'Pizza BBQ',
  },
  {
    id: 5,
    nombre: 'Salchipapa',
  },
  {
    id: 6,
    nombre: 'Limonada',
  },
]

export const mesas = [
  {
    id: 1,
    valor: '$50.000'
  },
  {
    id: 2,
    valor: '$50.000'
  },
  {
    id: 3,
    valor: '$50.000'
  },
  {
    id: 4,
    valor: '$50.000'
  },
  {
    id: 5,
    valor: '$50.000'
  },
  {
    id: 6,
    valor: '$50.000'
  },
  {
    id: 7,
    valor: '$50.000'
  },
  {
    id: 8,
    valor: '$50.000'
  },
  {
    id: 9,
    valor: '$50.000'
  },
  {
    id: 10,
    valor: '$50.000'
  },
]

export const dataProductos = [
  {
    id:1,
    img: hamburguesa,
    nombre: 'Hamburguesa especial',
    precio: '$10.000'
  },
  {
    id:2,
    img: hamburguesa2,
    nombre: 'Hamburguesa sencilla',
    precio: '$10.000'
  },
  {
    id:3,
    img: pizza1,
    nombre: 'Pizza mexicana',
    precio: '$10.000'
  },
  {
    id:4,
    img: pizza2,
    nombre: 'Pizza burguer',
    precio: '$10.000'
  },
  {
    id:5,
    img: pizza3,
    nombre: 'Pizza miel mostaza',
    precio: '$10.000'
  },
  {
    id:6,
    img: pizza4,
    nombre: 'Pizza Peperoni',
    precio: '$10.000'
  },
  {
    id:7,
    img: pizza5,
    nombre: 'Pizza Bbq',
    precio: '$10.000'
  },
  {
    id:8,
    img: pizza6,
    nombre: 'Pizza aguacate',
    precio: '$10.000'
  },
  {
    id:9,
    img: pizza7,
    nombre: 'Pizza picante',
    precio: '$10.000'
  },
  {
    id:10,
    img: pizza8,
    nombre: 'Pizza 4 quesos',
    precio: '$10.000'
  }
]

export const dataOrdenes = [
  {
    id: 1,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 2,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Pendiente'
  },
  {
    id: 3,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 4,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 5,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Cancelado'
  },
  {
    id: 6,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 7,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Pendiente'
  },
  {
    id: 8,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 9,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Cancelado'
  },
  {
    id: 10,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Pendiente'
  },
  {
    id: 11,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 12,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Pendiente'
  },
  {
    id: 13,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 14,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 15,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Cancelado'
  },
  {
    id: 16,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 17,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Pendiente'
  },
  {
    id: 18,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Terminado'
  },
  {
    id: 19,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Cancelado'
  },
  {
    id: 20,
    fecha: '30-09-2022',
    total: '$150000',
    estado: 'Pendiente'
  }
]

export const dataFactura = [
  {
    id: 1,
    nombreProducto: 'Hamburguesa especial',
    precioUnitario: '$10.000',
    cantidad: 2,
    precioTotal: '$20.000'
  },
  {
    id: 2,
    nombreProducto: 'Hamburguesa especial',
    precioUnitario: '$10.000',
    cantidad: 2,
    precioTotal: '$20.000'
  },
  {
    id: 3,
    nombreProducto: 'Hamburguesa especial',
    precioUnitario: '$10.000',
    cantidad: 2,
    precioTotal: '$20.000'
  }
]
