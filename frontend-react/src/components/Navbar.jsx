import { useStateContext } from "../context/ContextProvider";
import { FaMoon } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Perfil from "./Perfil";

const Navbar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <header className={`header ${activeMenu ? "space-toggle" : null}`}>
      <div className="header-toggle" onClick={() => setActiveMenu(!activeMenu)}>
        <Tooltip title="Menu" arrow>
          <i
            className={`fas fa-bars ${activeMenu ? "fa-solid fa-xmark" : null}`}
          ></i>
        </Tooltip>
      </div>
      <div className="flex">
        <Tooltip title="Modo" arrow>
          <button style={{ color: "white" }}>
            <FaMoon />
          </button>
        </Tooltip>
        <Perfil />
      </div>
    </header>
  );
};

export default Navbar;
