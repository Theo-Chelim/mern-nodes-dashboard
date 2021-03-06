const mongoose = require("mongoose");

const edgeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    arch: {
      type: String,
      required: true,
    },
    machine: {
      type: String,
      required: true,
    },
    cpu: {
      type: String,
      required: true,
    },
    smp: {
      type: Number,
      required: true,
    },
    memory: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const EdgeModel = mongoose.model("edge", edgeSchema);

module.exports = EdgeModel;
