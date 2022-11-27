import { Navigate } from "react-router-dom";
import { LOGIN } from "./paths";

const RutasPrivadas = ({ children }) => {
    if (!localStorage.getItem("Authorization")) {
        return <Navigate to={LOGIN} />;
    }

    return <>{children}</>;
};

export default RutasPrivadas;
