import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<div>dashboard</div>}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
