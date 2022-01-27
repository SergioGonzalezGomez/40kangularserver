const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LegionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    number: { type: String, trim: true },
    primarch: { type: String, required: true },
    img: { type: String, trim: true },
  },
  { timestamp: true, collection: 'Legion' }
);

const Legion = mongoose.model('Legion', LegionSchema);
module.exports = Legion;