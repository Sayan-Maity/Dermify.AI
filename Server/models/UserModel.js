const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    magicId: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    diseaseHistory: [String]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
