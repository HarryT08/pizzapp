import { Route, Routes } from "react-router-dom";
import { HOME, LOGIN, DASHBOARD_ADMIN, DASHBOARD_MESERO } from "@/routes/paths";
import { RutasPrivadas, RutasPublicas, RutaAdmin, RutaMesero } from "@/routes";
import { Login, DashboardAdmin, DashboardMesero } from "@/pages";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/context/auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <ToastContainer hideProgressBar theme="colored" />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path={HOME}
              exact
              element={
                <RutasPublicas>
                  <Login />
                </RutasPublicas>
              }
            />
            <Route
              path={LOGIN}
              element={
                <RutasPublicas>
                  <Login />
                </RutasPublicas>
              }
            />
            <Route
              path={DASHBOARD_ADMIN}
              element={
                <RutasPrivadas>
                  <RutaAdmin>
                    <DashboardAdmin />
                  </RutaAdmin>
                </RutasPrivadas>
              }
            />
            <Route
              path={DASHBOARD_MESERO}
              element={
                <RutasPrivadas>
                  <RutaMesero>
                    <DashboardMesero />
                  </RutaMesero>
                </RutasPrivadas>
              }
            />
          </Routes>
        </ThemeProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
