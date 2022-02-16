import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login></Login>} />
          <Route exact path="/register" element={<Register></Register>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
