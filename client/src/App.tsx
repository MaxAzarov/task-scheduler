import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./components/contexts/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import useAuth from "./customHooks/useAuth";

function App() {
  const { isAuthenticated, token } = useAuth();
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isAuthenticated,
          logout: () => {},
          token,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
