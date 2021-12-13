module.exports = {
  PORT: 3000,
  db: {
    development: {
      DB_HOSTNAME: "localhost",
      DB_PORT: 27017,
      DB_NAME: "Chat",
    },
  },
  SOCKET_EVENTS: {
    NEW_MESSAGE: "newMessage",
    NEW_MESSAGE_ERROR: "newMessageError",
  },
};
