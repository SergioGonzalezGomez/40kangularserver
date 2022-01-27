const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BattleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    year: { type: String, trim: true },
    place: { type: String, trim: true },
    traitorlegions: [{ type: Schema.Types.ObjectId, ref: 'Legion', required: true }],
    loyalistlegions: [{ type: Schema.Types.ObjectId, ref: 'Legion', required: true }],
    victory: { type: String, trim: true },
    img: { type: String, trim: true }
  },
  { timestamp: true, collection: 'Battle' }
);

const Battle = mongoose.model('Battle', BattleSchema);
module.exports = Battle;