//ФАЙЛ ДЛЯ СОЗДАНИЯ http-сервера

//импортируем  http
const http = require("http");

//импортируем экспресс-приложение
const app = require("./app");

/*
импортируем socket.io-библиотека JS для веб-прил.реального времени
обеспечивает двухсторонню связь между клиентом и севрером
*/
const Server = require("socket.io");

//импортируем Message, User из моделей
const { Message, User } = require("./models");

//достаем порт и события сокета из файла конфигураций
const { PORT, SOCKET_EVENTS } = require("./config");

//создаем сервер и передаем в него экспресс-приложение
const server = http.createServer(app);

/*создаем экземпляр socket.io и передаем ему http-сервер (типа роутер) 
и объект cors, если клиент и сервер находятся на разных портах */
const io = Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/*
io - сервер со всеми соединениями
socket - отдельный клиент

- создаем соединение
- передаем событие connection-соединение
- достаем сокет (отдельный комп)
- ожидают друг друга, кто пошлет соединение


*/
io.on("connection", (socket) => {
  console.log("connected");

  //сокет отправляет соединение и передает новое сообщение
  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async (messageWithUserName) => {
    try {
      console.log(messageWithUserName);

      //достаем из сообщения текст и имя
      const { text, name } = messageWithUserName;

      /*
      достаем юзера
      - что обновить
      - как обновить
      - если юзер не будет найден, то его создаст и вернет обновленного юзера
      */
      const user = await User.findOneAndUpdate(
        { name },
        { name },
        { upsert: true, returnDocument: "after" }
      );

      //создаем сообщение и сохраняем его
      const savedMessage = await Message.create({ text, user: user._id });

      /*
      связываем сообщение с юзером
      populate - насели
      exec - выполни
      */
      Message.findOne({ _id: savedMessage._id })
        .populate("user")
        .exec((err, message) => {
          if (err) {
            throw new Error("Bad populate on insert");
          }
          /*
          сервер отправляет сообщение всем подсоединенным клиентам 
          1 параметр - событие
          2 параметр - данные
          */
          io.emit(SOCKET_EVENTS.NEW_MESSAGE, { data: message });
        });
    } catch (error) {
      io.emit(SOCKET_EVENTS.NEW_MESSAGE_ERROR, error);
    }
  });

  /*
  eсли проищошел разрыв соединения, например, юзер ушел
  reason - что произошло с этим юзером
  */
  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

//севрер слушает соединение на порте
server.listen(PORT, () => console.log(`Server is active ${PORT}`));

/*
В веб-сокетах есть комнаты (например, отдельный чат)
В веб-сокетах есть свои middlewares
*/
