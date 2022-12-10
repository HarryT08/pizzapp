import { Navigate } from "react-router-dom";
import { LOGIN } from "./paths";

const RutaMesero = ({children}) => {
    if (localStorage.getItem("cargo") !== "mesero") {
        return <Navigate to={LOGIN} />;
    }
  return (
    <>{children}</>
  )
}

export default RutaMesero