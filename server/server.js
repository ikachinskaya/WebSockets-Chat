const http = require("http");
const app = require("./app");
const Server = require("socket.io");

const { Message, User } = require("./models");
const { PORT, SOCKET_EVENTS } = require("./config");
const server = http.createServer(app);

const io = Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async (messageWithUserName) => {
    try {
      console.log(messageWithUserName);

      const { text, name } = messageWithUserName;

      const user = await User.findOneAndUpdate(
        { name },
        { name },
        { upsert: true, returnDocument: "after" }
      );
      const savedMessage = await Message.create({ text, user: user._id });

      Message.findOne({ _id: savedMessage._id })
        .populate("user")
        .exec((err, message) => {
          if (err) {
            throw new Error("Bad populate on insert");
          }
          io.emit(SOCKET_EVENTS.NEW_MESSAGE, { data: message });
        });
    } catch (error) {
      io.emit(SOCKET_EVENTS.NEW_MESSAGE_ERROR, error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

server.listen(PORT, () => console.log(`Server is active ${PORT}`));
