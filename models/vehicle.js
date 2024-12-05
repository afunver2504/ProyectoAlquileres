const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  category: { type: String, required: true }, 
  tariff: [
      {
          type: { type: String, required: true }, 
          mileage: { type: String, required: true }, 
          deposit: { type: Number, required: true }, 
          prices: {
              "1-3_days": { type: Number, required: true }, 
              "4-6_days": { type: Number, required: true }, 
              "7_days": { type: Number, required: true }, 
              "1_month": { type: Number, required: true }  
          }
      }
  ]
});


module.exports = mongoose.model("Vehicle", vehicleSchema, "cars");

