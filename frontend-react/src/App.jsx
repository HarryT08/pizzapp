import Dashboard from "./components/Dashboard";
import { Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Login/>} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
    );
}

export default App;
