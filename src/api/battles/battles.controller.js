const Battle = require("./battles.model");

const postNewBattle = async (req, res, next) => {
  try {
    const newBattle = new Battle();
    newBattle.name = req.body.name;
    newBattle.year = req.body.year;
    newBattle.place = req.body.place;
    newBattle.traitorlegions = req.body.traitorlegions;
    newBattle.loyalistlegions = req.body.loyalistlegions;
    newBattle.victory = req.body.victory;
    if (req.file) {
        newBattle.img = req.file.path;
      }
    const battlesDB = await newBattle.save();
    return res.status(201).json(battlesDB);
  } catch (error) {
    return next(setError(500, "Battle not saved"));
  }
};

const getAllBattles = async (req, res, next) => {
  try {
    const battlesDB = await Battle.find().populate('loyalistlegions').populate('traitorlegions')
    res.status(200).json(battlesDB);
  } catch (error) {
    return next(setError(500, "Battle failed server"));
  }
};

const getBattle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const battlesDB = await Battle.findById(id).populate('loyalistlegions').populate('traitorlegions')
    if (!battlesDB) {
      return next(setError(404, "Battle not found"));
    }
    return res.status(200).json(battlesDB);
  } catch (error) {
    return next(setError(500, "Battle server error"));
  }
};

const patchBattle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchBattle = new Battle(req.body);
    patchBattle._id = id;

    const battlesDB = await Battle.findByIdAndUpdate(id, patchBattle);
    if (!battlesDB) {
      return next(setError(404, "Battle not found"));
    }

    return res.status(200).json({ new: patchBattle, old: battlesDB });
  } catch (error) {
    return next(setError(500, "Battle Patch server error"));
  }
};

const deleteBattle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const battlesDB = await Battle.findByIdAndDelete(id);
    if (!battlesDB) {
      return next(setError(404, "Battle not found"));
    }

    return res.status(200).json(battlesDB);
  } catch (error) {
    return next(setError(500, "Battle removed server error"));
  }
};

module.exports = {
  postNewBattle,
  getAllBattles,
  getBattle,
  patchBattle,
  deleteBattle,
};