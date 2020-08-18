const Unit = require("../models/unit-model");
const HttpResponse = require("../models/http-response");

const createNewUnit = async (req, res, next) => {
  const { label, code } = req.body;
  const newUnit = new Unit({
    label: label,
    code: code,
  });

  try {
    const result = await newUnit.save();
    const response = new HttpResponse(
      result,
      200,
      `unit "${label}" with code "${code}" successfully created!`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getUnits = async (req, res, next) => {
  try {
    const result = await Unit.find();
    const response = new HttpResponse(
      result,
      200,
      `all units successfully fetched!`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const editUnit = async (req, res, next) => {
  const id = req.params.id;
  const { label, code } = req.body;

  try {
    const editedUnit = await Unit.findById(id);
    editedUnit.label = label;
    editedUnit.code = code;
    const result = await editedUnit.save();
    const response = new HttpResponse(result, 200, `edited seccessfully!`);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const deleteUnit = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedUnit = await Unit.findByIdAndDelete(id);
    const response = new HttpResponse(
      deletedUnit,
      200,
      `deleted successfully!`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { createNewUnit, getUnits, editUnit, deleteUnit };
