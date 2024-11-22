const { Schema, model } = require("mongoose");

const ReservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  carId: { type: String, required: true },
  tariffType: { type: String, required: true },
  selectedDates: { type: [Date], required: true },
  totalPrice: { type: Number, required: true },
  contractPDF: { type: String, required: true },
  fianza: { type: Number, required: true }, 
  reservationDate: { type: Date, default: Date.now },
});

module.exports = model("Reservation", ReservationSchema, "reservas");
