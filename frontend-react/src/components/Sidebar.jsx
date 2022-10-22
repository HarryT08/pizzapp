import { Link, NavLink } from "react-router-dom";
import {dataSidebar} from '../data/datos'
import logoBohemia from "../assets/img/logoBohemia.png";


const Sidebar = () => {

  return (
    <nav className="nav">
      <div>
        <Link to="/dashboard" className="nav-logo">
          <img src={logoBohemia} alt="logo" className="nav-logo-icon" />
        </Link>

        <div>
          {/* Menu sidebar */}
          {dataSidebar.map((menu, index) => (
            <div key={index}>
              <NavLink to={menu.path} key={index} className={`nav-link`} >
                <i className="nav-link-icon">{menu.icon}</i>
                <span className="nav-link-name">{menu.titulo}</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
