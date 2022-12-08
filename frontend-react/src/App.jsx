import { Route, Routes } from 'react-router-dom';
import { Login } from './pages';
import {DashboardAdmin} from "./pages/admin";
import {DashboardMesero} from "./pages/mesero";
import { DASHBOARD_ADMIN, DASHBOARD_MESERO, HOME, LOGIN } from "./routes/paths";
import { RutasPrivadas, RutasPublicas } from "./routes";

function App() {

  return (
    <>
      <Routes>
        <Route path={HOME} exact element={<RutasPublicas><Login/></RutasPublicas>} />
        <Route path={LOGIN} element={ <RutasPublicas><Login/></RutasPublicas>} />
        <Route path={DASHBOARD_ADMIN} element={
          <RutasPrivadas>
            <DashboardAdmin />
          </RutasPrivadas>
        }/>
        <Route path={DASHBOARD_MESERO} element={
          <RutasPrivadas>
            <DashboardMesero/>
          </RutasPrivadas>
        }/>
      </Routes>
    </>
    );
}

export default App;
