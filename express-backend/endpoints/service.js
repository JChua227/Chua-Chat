const express = require('express');
const twilio = require("twilio");
const router = express.Router();

router.get("/testConnection", (req, res) => {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
  const client = new twilio(accountSid, authToken);

  let response = "";
  client.conversations.conversations
    .create({
      messagingServiceSid: createServiceSid,
      friendlyName: "Friendly Conversation",
    })
    .then((conversation) => (response = conversation.sid));

  res.send(response);
});

const createServiceSid = () => {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
  const client = new twilio(accountSid, authToken);

  const result = client.messaging.services
    .create({ friendlyName: "friendly_name" })
    .then((service) => {
      return service.sid;
    });

  return result;
};

const deleteServiceSid = () => {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
  const client = new twilio(accountSid, authToken);

  client.messaging.services("MG79a7e4469877241b60bd61072ea3685a").remove();
};

module.exports = router;