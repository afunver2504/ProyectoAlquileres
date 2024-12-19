const express = require("express");
const Formulario = require("../models/formularios");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/submitFeedback", async (req, res) => {
  const { userId, designRating, usabilityRating, comment } = req.body;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ error: "ID de usuario no válido." });
  }

  if (
    !designRating ||
    !usabilityRating ||
    designRating < 1 ||
    designRating > 5 ||
    usabilityRating < 1 ||
    usabilityRating > 5
  ) {
    return res.status(400).json({ error: "Las calificaciones no son válidas." });
  }

  try {
    const nuevoFormulario = new Formulario({
      userId,
      designRating,
      usabilityRating,
      comment,
    });

    await nuevoFormulario.save();
    res.status(201).json({ success: true, message: "Formulario enviado correctamente." });
  } catch (err) {
    console.error("Error al guardar el formulario:", err);
    res.status(500).json({ error: "Error al guardar el formulario." });
  }
});

module.exports = router;

