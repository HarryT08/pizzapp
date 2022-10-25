import Dashboard from "./components/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import "./App.css";
import { DASHBOARD, HOME, LOGIN } from "./routes/paths";
import RutasPrivadas from "./components/RutasPrivadas";
import RutasPublicas from "./components/RutasPublicas";

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
