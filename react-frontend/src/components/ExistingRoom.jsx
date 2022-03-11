import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Room } from "../contexts/Room";
import "../styles/ExistingRoom.css";
const axios = require("axios");

const ExistingRoom = (props) => {
  const { updateRoom } = useContext(Room);
  const navigate = useNavigate();

  const joinRoom = async () => {
    const result = await axios
      .get(`http://localhost:3001/chatRoom/enterRoom/${props.roomName}`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
      });
      
    updateRoom(result.data.jwt,result.data.username,result.data.roomName);
    navigate("/chuachatting");
  };

  return (
    <div className="room">
      <div className="open-room">
        <div className="room-name">
          <h3>{props.roomName}</h3>
        </div>

        <div className="join-room">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={joinRoom}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingRoom;
