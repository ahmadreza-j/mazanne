const { ParentField, Field, ChildField } = require("../models/field-model");
const HttpResponse = require("../models/http-response");

const createNewParentField = async (req, res, next) => {
  const { label, code } = req.body;
  const newParentField = new ParentField({
    code: code,
    label: label,
  });
  try {
    const result = await newParentField.save();
    const response = new HttpResponse(
      result,
      200,
      `parentfield "${label}" with code "${code}" successfully created!`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const editParentField = async (req, res, next) => {
  const id = req.params.id;
  const { label, code } = req.body;

  try {
    const editedParentField = await ParentField.findById(id);
    editedParentField.label = label;
    editedParentField.code = code;
    const result = await editedParentField.save();
    const response = new HttpResponse(result, 200, `edited seccessfully!`);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const deleteParentField = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedParentField = await ParentField.findByIdAndDelete(id);
    const response = new HttpResponse(
      deletedParentField,
      200,
      `deleted successfully!`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const addFieldToParent = async (req, res, next) => {
  const { fields } = req.body;

  const getedFields = await Field.find();
  const getedFieldLabels = getedFields.map((field) => field.label);

  const iterator = async (_getedFieldLabels, field) => {
    if (!_getedFieldLabels.includes(field.label)) {
      let newField = new Field({
        code: field.code,
        label: field.label,
        parentFieldId: field.parentFieldId,
        unitsId: field.unitsId,
      });
      let result = await newField.save();
      return new HttpResponse(
        result,
        200,
        `field "${field.label}" with code "${field.code}" successfully added!`
      );
    } else {
      return new HttpResponse(
        [],
        200,
        `Error!, field ${field.label} is duplicate`
      );
    }
  };

  const worker = async (_fields) => {
    let x = [];
    for await (let field of _fields) {
      x.push(await iterator(getedFieldLabels, field));
    }
    return x;
  };

  const response = await worker(fields);

  try {
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const addChildToField = async (req, res, next) => {
  const { childFields } = req.body;

  const getedChildFields = await ChildField.find();
  const getedChildFieldLabels = getedChildFields.map((field) => field.label);

  const iterator = async (_getedFieldLabels, field) => {
    if (!_getedFieldLabels.includes(field.label)) {
      let newChildField = new ChildField({
        code: field.code,
        label: field.label,
        fieldId: field.fieldId,
      });
      let result = await newChildField.save();
      return new HttpResponse(
        result,
        200,
        `childField "${field.label}" with code "${field.code}" successfully added!`
      );
    } else {
      return new HttpResponse(
        [],
        200,
        `Error!, childField ${field.label} is duplicate`
      );
    }
  };

  const worker = async (_fields) => {
    let x = [];
    for await (let field of _fields) {
      x.push(await iterator(getedChildFieldLabels, field));
    }
    return x;
  };

  const response = await worker(childFields);

  try {
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const addUnitToField = async (req, res, next) => {
  const { fieldId, unitsId } = req.body;

  try {
    const field = await Field.findById(fieldId);
    field.unitsId = unitsId;
    const result = field.save();
    const response = new HttpResponse(
      result,
      200,
      `${unitsId.length} units successfully added!`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getAllParentFields = async (req, res, next) => {
  try {
    const result = await ParentField.find().select("code label");
    const response = new HttpResponse(
      result,
      200,
      `all parentFields successfully fethed!`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getAllFields = async (req, res, next) => {
  const type = req.params.type;
  if (type === "populated") {
    try {
      const result = await Field.find()
        .select("code label unitsId parentFieldId")
        .populate({
          path: "unitsId",
          model: "Unit",
          select: "code label",
        })
        .populate({
          path: "parentFieldId",
          model: "ParentField",
          select: "code label",
        });
      const response = new HttpResponse(
        result,
        200,
        `all fields successfully fethed!`
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  } else {
    try {
      const result = await Field.find().select(
        "code label unitsId parentFieldId"
      );
      const response = new HttpResponse(
        result,
        200,
        `all fields successfully fethed!`
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
};

const getAllChildFields = async (req, res, next) => {
  const type = req.params.type;
  if (type === "populated") {
    try {
      const result = await ChildField.find()
        .select("code label")
        .populate({
          path: "fieldId",
          model: "Field",
          select: "code label unitsId parentFieldId",
          populate: [
            { path: "unitsId", model: "Unit", select: "code label" },
            {
              path: "parentFieldId",
              model: "ParentField",
              select: "code label",
            },
          ],
        });
      const response = new HttpResponse(
        result,
        200,
        `all childFields successfully fethed!`
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  } else {
    try {
      const result = await ChildField.find().select("code label fieldId");
      const response = new HttpResponse(
        result,
        200,
        `all childFields successfully fethed!`
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
};

/* const deleteParentFieldCollection = async (req, res, next) => {
  const parentFields = await ParentField.find();
  if (parentFields.length > 0) {
    const result = await ParentField.collection.drop();
    const response = new HttpResponse(
      result,
      200,
      "collection droped successfully!"
    );
    res.json(response);
  } else {
    const response = new HttpResponse([], 404, "collection not found!");
    res.json(response);
  }
}; */

module.exports = {
  createNewParentField,
  editParentField,
  deleteParentField,
  addFieldToParent,
  addChildToField,
  addUnitToField,
  getAllParentFields,
  getAllFields,
  getAllChildFields,
  // deleteParentFieldCollection,
};
