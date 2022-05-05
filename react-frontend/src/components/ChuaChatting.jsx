import "../styles/ChuaChatting.css";
import { useContext } from "react";
import { Room } from "../contexts/Room";
const { connect, isSupported, createLocalTracks } = require("twilio-video");

const ChuaChatting = () => {
  const { room } = useContext(Room);

  const joinRoom = () => {
    connect(room.jwt, {
      audio: true,
      name: room.roomName,
      video: { width: 640, height: 400 },
    }).then((room) => {
      console.log(`Connected to Room: ${room.name}`);

      room.participants.forEach(participantConnected);
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
    /* div.innerHTML = participant.identity; */
    console.log("participant is trying to connect");
    participant.on("trackSubscribed", (track) => trackSubscribed(div, track));
    participant.on("trackUnsubscribed", trackUnsubscribed);

    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        trackSubscribed(div, publication.track);
      }
    });

    document.getElementById("participant-list").appendChild(div);
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

  const userJoin = async () => {
    const tracks = await createLocalTracks();
    const localVideoTrack = tracks.find((track) => track.kind === "video");
    const divContainer = document.getElementById("local-media");
    if (!divContainer.firstChild) {
      divContainer.appendChild(localVideoTrack.attach());
    }
  };

  if (isSupported) {
    userJoin();
    joinRoom();
  } else {
    console.error("This browser is not supported by twilio-video.js");
  }

  return (
    <div>
      <div className="videos">
        <div className="user-video" id="local-media"></div>
        <div className="remote-video-user" id="participant-list"></div>
      </div>
    </div>
  );
};

export default ChuaChatting;
