import Dashboard from "./components/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import "./App.css";
import { DASHBOARD, HOME, LOGIN } from "./routes/paths";
import RutasPrivadas from "./components/RutasPrivadas";

function App() {

  return (
    <>
      <Routes>
        <Route path={HOME} exact element={<Login />} />
        <Route path={LOGIN} element={<Login />} />
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
