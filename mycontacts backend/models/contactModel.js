const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter the Contact name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the Contact email"],
    },
    phNumber: {
      type: String,
      required: [true, "Please enter the Contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
