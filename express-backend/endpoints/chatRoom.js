const { response } = require("express");
const express = require("express");
const twilio = require("twilio");
const router = express.Router();

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = twilio(accountSid, authToken);

router.post("/createRoom", (req, res) => {
  const { roomName } = req.body;
  if (roomName.length > 20 || roomName < 1) return res.sendStatus(404);
  client.video.rooms
    .create({ type: "go", uniqueName: roomName })
    .then((room) => {});
  res.sendStatus(200);
});

router.get("/existingRooms", async (req, res) => {
  const roomList = [];
  await client.video.rooms
    .list({ status: "in-progress", limit: 20 })
    .then((rooms) =>
      rooms.forEach((r) =>
        roomList.push({ roomName: r.uniqueName, sid: r.sid })
      )
    );
  res.send(roomList);
});

router.get("/enterRoom/:roomName", (req, res) => {
  const roomName = req.params.roomName;
  client.video.rooms(roomName).fetch().then();

  const jwt = createAccessToken(req.session.user.username, roomName);
  res.send({ jwt, username: req.session.user.username, roomName });
});

const createAccessToken = (user, roomName) => {
  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;

  const identity = user;

  const videoGrant = new VideoGrant({
    room: roomName,
  });

  const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret, {
    identity: identity,
  });
  token.addGrant(videoGrant);

  return token.toJwt();
};

module.exports = router;
