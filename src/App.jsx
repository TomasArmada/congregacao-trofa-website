// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SetPassword from "./pages/SetPassword.jsx";
import Features from "./pages/Features.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alterar-palavra-passe" element={<SetPassword />} />
          <Route path="/funcionalidades" element={<Features />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
