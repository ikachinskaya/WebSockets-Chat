const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 1,
      max: 32,
      default: "Anon",
    },
  },
  { timestamps: Date }
);

const User = model("User", userSchema);

module.exports = User;
