import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { GiPaperBagFolded, GiNotebook } from "react-icons/gi";
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

import ajo from '../assets/img/ingredientes/ajo.jpg';
import carne from '../assets/img/ingredientes/carne.jpg';
import cebolla from '../assets/img/ingredientes/cebolla.jpg';
import harina from '../assets/img/ingredientes/harina.jpg';
import lechuga from '../assets/img/ingredientes/lechuga.jpg';
import limones from '../assets/img/ingredientes/limones.jpg';
import pan from '../assets/img/ingredientes/pan.jpg';
import papas from '../assets/img/ingredientes/papas.jpg';
import queso from '../assets/img/ingredientes/queso.jpg';
import tomates from '../assets/img/ingredientes/tomates.jpg';

export const dataSidebar = [
  {
    path: "/inicio",
    titulo: "Inicio",
    icon: <AiFillHome />,
  },
  {
    path: "/productos",
    titulo: "Productos",
    icon: <IoMdPizza />,
  },
  {
    path: "/ingredientes",
    titulo: "Ingredientes",
    icon: <ImSpoonKnife />,
  },
  {
    path: "/ordenes",
    titulo: "Ordenes",
    icon: <FaClipboardList />,
  },
  {
    path: "/cuentas",
    titulo: "Cuentas",
    icon: <BsPeopleFill />,
  },
  {
    path: "/mesas",
    titulo: "Mesas",
    icon: <GiTabletopPlayers />,
  },
  {
    path: "/reservas",
    titulo: "Reservas",
    icon: <GiNotebook />,
  },
  {
    path: "/facturar",
    titulo: "Facturar",
    icon: <GiPaperBagFolded />,
  },
];

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

export const dataCuentas = [
  {
    id: 1,
    nombre: 'Harold Rueda',
    cargo: 'Administrador',
  },
  {
    id: 2,
    nombre: 'Edwin Torrado',
    cargo: 'Mesero',
  },
  {
    id: 3,
    nombre: 'Felipe Alferez',
    cargo: 'Mesero',
  },
  {
    id: 4,
    nombre: 'Antonio Acevedo',
    cargo: 'Mesero',
  },
  {
    id: 5,
    nombre: 'Cristian Torres',
    cargo: 'Cocinero',
  },
]

export const dataIngredientes = [
  {
    id:1,
    img: ajo,
    nombre: 'Ajo',
    precio: '$10.000'
  },
  {
    id:2,
    img: carne,
    nombre: 'Carne',
    precio: '$10.000'
  },
  {
    id:3,
    img: cebolla,
    nombre: 'Cebolla',
    precio: '$10.000'
  },
  {
    id:4,
    img: harina,
    nombre: 'Harina',
    precio: '$10.000'
  },
  {
    id:5,
    img: lechuga,
    nombre: 'Lechuga',
    precio: '$10.000'
  },
  {
    id:6,
    img: limones,
    nombre: 'Limones',
    precio: '$10.000'
  },
  {
    id:7,
    img: pan,
    nombre: 'Pan',
    precio: '$10.000'
  },
  {
    id:8,
    img: papas,
    nombre: 'Papas',
    precio: '$10.000'
  },
  {
    id:9,
    img: queso,
    nombre: 'Queso',
    precio: '$10.000'
  },
  {
    id:10,
    img: tomates,
    nombre: 'Tomates',
    precio: '$10.000'
  }
]

export const dataLineChart = [
  {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: "Ventas 2022",
        responsive: true,
        data: [100, 200, 300, 1000, 500, 600, 700, 800, 750, 1000, 200, 100],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.2,
        pointStyle: 'rect',
        pointBackgroundColor: 'white',
        pointBorderColor:"rgb(53, 162, 235)",
      }
    ]
  }
]

export const dataLinePopular = [
  {
    labels: ['Hamburguesa especial', 'Hamburguesa sencilla', 'Pizza mexicana', 'Pizza burguer', 'Pizza miel mostaza', 'Pizza Peperoni', 'Pizza Bbq', 'Pizza aguacate', 'Pizza picante', 'Pizza 4 quesos'],
    datasets: [
      {
        label: "Agosto",
        data: [100, 200, 300, 1000, 500, 600, 700, 800, 750, 1000],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.2,
        pointStyle: 'rect',
        pointBackgroundColor: 'white',
        pointBorderColor:"rgb(53, 162, 235)",
      },
      {
        label: "Septiembre",
        data: [210, 220, 230, 2100, 250, 260, 270, 280, 275, 2200],
        borderColor: "#D00000",
        backgroundColor: "rgba(208, 0, 0, 0.5)",
        tension: 0.2,
        pointStyle: 'rect',
        pointBackgroundColor: 'white',
        pointBorderColor:"#D00000",
      }
    ]
  }
]