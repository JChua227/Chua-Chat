import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import SearchRoom from "./components/SearchRoom";
import ChuaChatting from "./components/ChuaChatting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Room } from "./contexts/Room";
import { useState } from "react";

function App() {
  const [room, setRoom] = useState({});

  const updateRoom = (jwt, username, roomName) => {
    setRoom({ jwt, username, roomName });
  };
  return (
    <div>
      <Room.Provider value={{ room, updateRoom }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="" element={<Home />} />
            <Route exact path="/login" element={<Login></Login>} />
            <Route exact path="/register" element={<Register></Register>} />
            <Route exact path="/search-room" element={<SearchRoom />} />
            <Route
              exact
              path="/chuachatting"
              element={<ChuaChatting></ChuaChatting>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Room.Provider>
    </div>
  );
}

export default App;
