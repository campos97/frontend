import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import "./App.css";
import NavBar from "./Components/Dumb/NavBar";
import UserBar from "./Components/Dumb/UserBar";
import DashboardView from "./views/DashboardView";
import HourGridView from "./views/HourGridView";
import ConfigView from "./views/ConfigView";
import PrivateRoute from "./Auth/PrivateRoute";
import { AuthProvider } from "./Auth/AuthProvider";
import ThemeContextProvider from "./Contexts/ThemeContext";
import RegistryView from "./views/RegistryView";
import RequestView from "./views/RequestView";
import AdviseView from "./views/AdviseView";
import EmployeeView from "./views/EmployeeView";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeContextProvider>
          <div id="part1">
            <UserBar />
          </div>
          <div id="part2">
            <NavBar />
            <div className="route">
              <Routes>
                <Route path="/login" element={<LoginView />} />
                <Route path="/" element={<LoginView />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<DashboardView />} />
                  <Route path="/login" element={<DashboardView />} />
                  <Route path="/employee" element={<EmployeeView/>} />
                  <Route path="/dashboard" element={<DashboardView />} />
                  <Route path="/registry" element={<RegistryView />} />
                  <Route path="/requests" element={<RequestView />} />
                  <Route path="/advise" element={<AdviseView />} />
                  <Route path="/employeeList" element={<HourGridView />} />
                  <Route
                    path="/employeeList/:departmentId"
                    element={<HourGridView />}
                  />
                  <Route
                    path="/employeeList/:departmentId/:employeeId"
                    element={<HourGridView />}
                  />
                  <Route path="/config" element={<ConfigView />} />
                </Route>
              </Routes>
            </div>
          </div>
        </ThemeContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
