const { Schema, model } = require("mongoose");

const FormularioSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  designRating: { type: Number, required: true, min: 1, max: 5 },
  usabilityRating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Formulario", FormularioSchema, "formularios");

