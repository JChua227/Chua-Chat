import { createContext } from "react";

export const Room = createContext({
  jwt: "",
  username: "",
  roomName: "",
  updateRoom:()=>{}
});

