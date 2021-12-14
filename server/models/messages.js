//ФАЙЛ ДЛЯ СОЗДАНИЯ МОДЕЛИ

//импортируем схему и модель из mongoose
const { Schema, model } = require("mongoose");

//сначала создаем схему, передаем в нее объект с настройками
const messageSchema = new Schema(
  {
    text: {
      type: String,
      require: true,
      min: 1,
      max: 1024,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: Date }
);

//затем создаем модель и передаем в нее схему
const Message = model("Message", messageSchema);

//экспортируем
module.exports = Message;
