const { Schema, model } = require("mongoose");

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

const Message = model("Message", messageSchema);

module.exports = Message;
