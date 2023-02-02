import { useState } from "react";
import { Header, TableBebidas } from "@/components";
import { IoIosSearch } from "react-icons/io";
import { AddedButton } from "@/components/mui/Buttons";
import { Link } from "react-router-dom";

const Bebidas = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header
        title="Bebidas"
        subtitle="Encontraras y administraras todas las bebidas del local"
      />
      <div className="flex justify-between my-5">
        <Link to="/admin/bebidas/agregar">
          <AddedButton variant="outlined">Agregar bebida</AddedButton>
        </Link>

        <div className="bg-white border-2 border-azul-marino/20 focus-within:border-azul-marino flex items-center rounded-md">
          <div className="px-3">
            <IoIosSearch size={20} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Buscar..."
            className="w-full py-2 focus:outline-none sm:text-sm rounded-md"
          />
        </div>
      </div>

      <TableBebidas search={search} />
    </div>
  );
};

export default Bebidas;
