// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
/*import SetPassword from './pages/SetPassword'*/
import Home from "./pages/Home.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/auth/set-password" element={<SetPassword />} />*/}
        </Routes>
      </BrowserRouter>
  )
}

export default App