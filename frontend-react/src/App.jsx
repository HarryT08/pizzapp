import { Route, Routes } from 'react-router-dom';
import {Dashboard, Login} from "./pages";
import { DASHBOARD, HOME, LOGIN } from "./routes/paths";
import { RutasPrivadas, RutasPublicas } from "./routes";

function App() {

  return (
    <>
      <Routes>
        <Route path={HOME} exact element={<RutasPublicas><Login/></RutasPublicas>} />
        <Route path={LOGIN} element={ <RutasPublicas><Login/></RutasPublicas>} />
        <Route path={DASHBOARD} element={
          <RutasPrivadas>
            <Dashboard />
          </RutasPrivadas>
        }/>
      </Routes>
    </>
    );
}

export default App;
