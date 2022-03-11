import { useEffect, useState } from "react";
import ExistingRoom from "./ExistingRoom";
import "../styles/SearchRoom.css";
const axios = require("axios");

const SearchRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [openRooms, setOpenRoom] = useState([]);

  const createRoom = () => {
    axios
      .post(
        "http://localhost:3001/chatRoom/createRoom",
        { roomName },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .catch((err) => {
        return alert("Room name must consist of 1-20 characters.");
      });
      window.location.reload();
  };

  const getInProgressRooms = async () => {
    const result = await axios
      .get("http://localhost:3001/chatRoom/existingRooms", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .catch((err) => console.log(err));
    setOpenRoom(result.data);
  };

  useEffect(() => {
    getInProgressRooms();
  }, []);



  return (
    <div className="search-room">
      <div className="page-name">
        <h3 className="title-page">Create A Room</h3>
      </div>
      <div className="room-search-box">
        <form>
          <label htmlFor="search-box">
            <input
              className="search-box"
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            ></input>
          </label>
          <div className="search-button">
            <label htmlFor="submit">
              <button
                type="button"
                className="btn btn-primary"
                onClick={createRoom}
              >
                Create
              </button>
            </label>
          </div>
        </form>
      </div>
      <hr className="horizontal-line"></hr>

      <div>
        {openRooms.map((room) => {
          return (
            <ExistingRoom
              key={room.roomName}
              roomName={room.roomName}
            ></ExistingRoom>
          );
        })}
      </div>
    </div>
  );
};

export default SearchRoom;
