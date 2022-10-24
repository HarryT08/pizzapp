import Dashboard from "./components/Dashboard";
import { Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Login';
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/dashboard/*" exact element={<Dashboard />} />
      </Routes>
    </>
    );
}

export default App;
