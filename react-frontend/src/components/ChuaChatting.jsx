import { useContext } from "react";
import { Room } from "../contexts/Room";
const { connect } = require("twilio-video");

const ChuaChatting = () => {
  const { room } = useContext(Room);

  const joinRoom = () => {
    connect(room.jwt, {
      audio: true,
      name: room.roomName,
      video: { width: 640 },
    }).then((room) => {
      console.log(`Connected to Room: ${room.name}`);
      room.participants.forEach(participantConnected);
      
      console.log("this is room: " + JSON.stringify(room.participants));
      room.on("participantConnected", participantConnected);

      room.on("participantDisconnected", participantDisconnected);
      room.once("disconnected", (error) =>
        room.participants.forEach(participantDisconnected)
      );
    });
  };

  const participantConnected = (participant) => {

    const div = document.createElement("div");
    
    div.id = participant.sid;
    div.innerText = participant.identity;

    participant.on("trackSubscribed", (track) => trackSubscribed(div, track));
    participant.on("trackUnsubscribed", trackUnsubscribed);

    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        trackSubscribed(div, publication.track);
      }
    });

    document.getElementById("myList").appendChild(div);
  };

  const participantDisconnected = (participant) => {
    console.log('Participant "%s" disconnected', participant.identity);
    document.getElementById(participant.sid).remove();
  };

  const trackSubscribed = (div, track) => {
    div.appendChild(track.attach());
  };

  const trackUnsubscribed = (track) => {
    track.detach().forEach((element) => element.remove());
  };

  joinRoom();

  return (
    <div>
      <div className="videos">
        <div id="myList">
          
        </div>
      </div>
    </div>
  );
};

export default ChuaChatting;
