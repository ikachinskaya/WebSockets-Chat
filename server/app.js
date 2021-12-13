const express = require("express");
const cors = require("cors");

const { Message } = require("./models");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    const messages = Message.find()
      .populate("user")
      .exec((err, message) => {
        if (err) {
          throw new Error("bad populate");
        }
      });
    res.send(message);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err); //очень плохо
});
//========================================
/*
Cross-Origin Resource Sharing (CORS) — механизм, использующий дополнительные HTTP-заголовки, 
чтобы дать возможность агенту пользователя получать 
разрешения на доступ к выбранным ресурсам с сервера на источнике (домене), 
отличном от того, что сайт использует в данный момент. 
Говорят, что агент пользователя делает запрос с другого источника (cross-origin HTTP request), 
если источник текущего документа отличается от запрашиваемого ресурса доменом, протоколом или портом.
*/
