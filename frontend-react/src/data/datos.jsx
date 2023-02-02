import {
  BsFillPersonCheckFill,
  BsFillPersonDashFill,
} from "react-icons/bs";
import {
  IoMdPizza,
  IoMdHome,
  IoMdRestaurant,
  IoIosCafe,
  IoMdListBox,
  IoMdPersonAdd,
  IoIosPaper,
} from "react-icons/io";
import { GiTabletopPlayers } from "react-icons/gi";

export const dataSidebar = [
  {
    path: "inicio",
    titulo: "Inicio",
    icon: <IoMdHome />,
  },
  {
    path: "productos",
    titulo: "Productos",
    icon: <IoMdPizza />,
  },
  {
    path: "ingredientes",
    titulo: "Ingredientes",
    icon: <IoMdRestaurant />,
  },
  {
    path: "bebidas",
    titulo: "Bebidas",
    icon: <IoIosCafe />,
  },
  {
    path: "ordenes",
    titulo: "Ordenes",
    icon: <IoMdListBox />,
  },
  {
    path: "cuentas",
    titulo: "Cuentas",
    icon: <IoMdPersonAdd />,
  },
  {
    path: "mesas",
    titulo: "Mesas",
    icon: <GiTabletopPlayers />,
  },
  {
    path: "facturar",
    titulo: "Facturar",
    icon: <IoIosPaper />,
  },
];

export const dataSidebarMesero = [
  {
    path: "realizar-pedido",
    titulo: "Realizar pedido",
    icon: <BsFillPersonCheckFill />,
  },
  {
    path: "editar-pedido",
    titulo: "Editar pedido",
    icon: <BsFillPersonDashFill />,
  },
];

export const dataDrinks = [
  {
    id: 1,
    nombre: "Coca-Cola",
    precio: 10,
  },
  {
    id: 2,
    nombre: "Jugo de manzana",
    precio: 10,
  },
  {
    id: 3,
    nombre: "Frape de limon",
    precio: 10,
  },
  {
    id: 4,
    nombre: "Frape de mandarina",
    precio: 10,
  },
  {
    id: 5,
    nombre: "Frape de maracuya",
    precio: 10,
  },
  {
    id: 6,
    nombre: "Jugo de naranja",
    precio: 10,
  },
  {
    id: 7,
    nombre: "Te helado",
    precio: 10,
  },
  {
    id: 8,
    nombre: "Gaseosa manzana",
    precio: 10,
  },
  {
    id: 9,
    nombre: "Gaseosa colombiana",
    precio: 10,
  },
  {
    id: 10,
    nombre: "Sprite",
    precio: 10,
  },
]
