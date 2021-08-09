const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    strategy: {
      type: [
        {
          chunk: String,
          edge: String,
        },
      ],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const FileModel = mongoose.model("file", fileSchema);

module.exports = FileModel;
