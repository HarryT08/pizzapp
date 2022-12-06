import { Route, Routes } from 'react-router-dom';
import {Dashboard, Login} from "./pages";
import { DASHBOARD_ADMIN, HOME, LOGIN } from "./routes/paths";
import { RutasPrivadas, RutasPublicas } from "./routes";

function App() {

  return (
    <>
      <Routes>
        <Route path={HOME} exact element={<RutasPublicas><Login/></RutasPublicas>} />
        <Route path={LOGIN} element={ <RutasPublicas><Login/></RutasPublicas>} />
        <Route path={DASHBOARD_ADMIN} element={
          <RutasPrivadas>
            <Dashboard />
          </RutasPrivadas>
        }/>
      </Routes>
    </>
    );
}

export default App;
