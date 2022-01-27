const Legion = require("./legions.model");

const postNewLegion = async (req, res, next) => {
  try {
    const newLegion = new Legion();
    newLegion.name = req.body.name;
    newLegion.description = req.body.description;
    newLegion.number = req.body.number;
    newLegion.primarch = req.body.primarch;
    if (req.file) {
      newLegion.img = req.file.path;
    }
    const legionsDB = await newLegion.save();
    return res.status(201).json(legionsDB);
  } catch (error) {
    return next(setError(500, "Legion not saved"));
  }
};

const getAllLegions = async (req, res, next) => {
  try {
    const legionsDB = await Legion.find()
    res.status(200).json(legionsDB);
  } catch (error) {
    return next(setError(500, "Legion failed server"));
  }
};

const getLegion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const legionsDB = await Legion.findById(id)
    if (!legionsDB) {
      return next(setError(404, "Legion not found"));
    }
    return res.status(200).json(legionsDB);
  } catch (error) {
    return next(setError(500, "Legion server error"));
  }
};

const patchLegion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchLegion = new Legion(req.body);
    patchLegion._id = id;
    if (req.file) {
      patchLegion.img = req.file.path;
    }
    const legionsDB = await Legion.findByIdAndUpdate(id, patchLegion);
    if (!legionsDB) {
      return next(setError(404, "Legion not found"));
    }
    if (legionsDB.img) deleteFile(legionsDB.img);
    return res.status(200).json({ new: patchLegion, old: legionsDB });
  } catch (error) {
    return next(setError(500, "Legion Patch server error"));
  }
};

const deleteLegion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const legionsDB = await Legion.findByIdAndDelete(id);
    if (!legionsDB) {
      return next(setError(404, "Legion not found"));
    }
    if (legionsDB.img) deleteFile(legionsDB.img);
    return res.status(200).json(legionsDB);
  } catch (error) {
    return next(setError(500, "Legion removed server error"));
  }
};

module.exports = {
  postNewLegion,
  getAllLegions,
  getLegion,
  patchLegion,
  deleteLegion,
};