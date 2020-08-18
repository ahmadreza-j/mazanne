import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Field, ChildField } from "./models/FieldModel";
import {
  httpAddFieldToParent,
  httpAddChildToField,
  httpAddUnitToField,
  // httpDeleteParentFieldCollection,
} from "../../store/actions/adminAction";

import {
  httpGetUnits,
  httpGetAllChildFields,
  httpGetAllParentFields,
  httpGetAllFields,
} from "../../store/actions/publicAction";

import USelect from "../clients/components/ui/USelect2";
import CheckboxSelect from "../shared/CheckboxSelect";
import ScreenContainer from "../shared/ScreenContainer";

const FieldsCollectionScreen = () => {
  const dispatch = useDispatch();

  const parentFields = useSelector((state) => state.admin.parentFields);
  const fields = useSelector((state) => state.admin.fields);
  const childFields = useSelector((state) => state.admin.childFields);
  const units = useSelector((state) => state.admin.units);

  const p = {
    padding: 7,
  };

  const m = {
    margin: 7,
  };

  const [fieldsList, setFieldsList] = useState("");
  const [selectedParentField, setSelectedParentField] = useState("");
  const [availFields, setAvailFields] = useState([]);
  const [selectedField, setselectedField] = useState("");
  const [availChildFields, setAvailChildFields] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [childFieldsList, setChildFieldsList] = useState("");

  const setFieldsListHandler = (event) => {
    setFieldsList(event.target.value);
  };
  const setChildFieldsListHandler = (event) => {
    setChildFieldsList(event.target.value);
  };

  const createFieldsArray = (list, type, startCode) => {
    const stringListToArray = list.trim().split("\n");
    const fieldsArray = new Set();
    if (type === "field") {
      const parentFieldId = selectedParentField._id;
      stringListToArray.forEach((item, index) => {
        const newItem = new Field(
          item,
          startCode + index + 1,
          units.map((item) => item._id),
          parentFieldId
        );
        fieldsArray.add(newItem);
      });
    } else if (type === "childField") {
      const fieldId = selectedField._id;
      stringListToArray.forEach((item, index) => {
        const newItem = new ChildField(item, startCode + index + 1, fieldId);
        fieldsArray.add(newItem);
      });
    }
    // else if (type === "addFieldToParent") {
    //   stringListToArray.forEach((item, index) => {
    //     const newItem = new Field(item, startCode, [], []);
    //     fieldsArray.push(newItem);
    //   });
    // }
    return [...fieldsArray];
  };

  const addFieldToParent = async () => {
    const parentFieldCode = selectedParentField.code;
    const _fieldsList = createFieldsArray(
      fieldsList,
      "field",
      Number(parentFieldCode.toString() + "000" + availFields.length)
    );
    if (_fieldsList.length !== 0 && parentFieldCode) {
      if (window.confirm("are u sure?")) {
        await dispatch(httpAddFieldToParent(_fieldsList));
        setFieldsList([]);
        await fetchFields();
      }
    } else alert("input is empty");
  };

  const addChildFields = async () => {
    const fieldCode = selectedField.code;
    const _childFieldsList = createFieldsArray(
      childFieldsList,
      "childField",
      Number(fieldCode.toString() + "000" + availChildFields.length)
    );
    if (_childFieldsList.length !== 0 && fieldCode) {
      if (window.confirm("are u sure?")) {
        await dispatch(httpAddChildToField(_childFieldsList));
        setChildFieldsList([]);
        await fetchFields();
      }
    } else alert("input is empty");
  };

  const addUnitToField = async () => {
    const fieldId = selectedField._id;
    const unitsId = selectedUnits.map((selectedUnit) => selectedUnit._id);
    if (unitsId.length !== 0 && fieldId) {
      if (window.confirm("are u sure?")) {
        await dispatch(httpAddUnitToField(fieldId, unitsId));
        await fetchFields();
      }
    } else alert("input is empty");
  };

  const fetchFields = async () => {
    await dispatch(httpGetAllParentFields());
    await dispatch(httpGetAllFields());
    await dispatch(httpGetAllChildFields("isolated"));
  };

  const fetchUnits = async () => {
    return await dispatch(httpGetUnits());
  };

  // const deleteParentFieldCollection = async () => {
  //   if (window.confirm("are u sure?")) {
  //     await dispatch(httpDeleteParentFieldCollection());
  //     await fetchFields();
  //   }
  // };

  const parentFieldSelectHandler = async (value) => {
    setSelectedParentField(value);
    setselectedField("");
    // const _availFields = fields.filter(
    //   (item) => item.parentFieldId._id === value._id
    // );
    // setAvailFields(_availFields);
  };

  const fieldSelectHandler = async (value) => {
    setselectedField(value);
    // const _availChildFields = childFields.filter(
    //   (item) => item.fieldId._id === value._id
    // );
    // setAvailChildFields(_availChildFields);
  };

  const multipleSelectHandler = (value) => {
    setSelectedUnits(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchFields();
      await fetchUnits();
    };

    fetchData();
  }, []);

  useEffect(() => {
    // if (selectedParentField._id) {
    const _availFields = fields.filter(
      (item) => item.parentFieldId._id === selectedParentField._id
    );
    setAvailFields(_availFields);
    // }
    // if (selectedField._id) {
    const _availChildFields = childFields.filter(
      (item) => item.fieldId._id === selectedField._id
    );
    setAvailChildFields(_availChildFields);
    // }
  }, [parentFields, fields, childFields, selectedParentField, selectedField]);

  // useEffect(() => {
  //   if (selectedParentField._id) {
  //     const updatedParentField = parentFields.find(
  //       (parentField) => parentField._id === selectedParentField._id
  //     );
  //     setFields(updatedParentField.fields);
  //   }
  // }, [parentFields, selectedParentField]);

  useEffect(() => {
    if (selectedField._id) {
      setSelectedUnits(selectedField.unitsId);
    }
  }, [selectedField]);

  return (
    <ScreenContainer>
      <div>
        <h4>افزودن دسته بندی به حوزه پدر</h4>
        <div>
          <USelect
            inputLabel="حوزه پدر"
            selectiveData={parentFields}
            selectedItem={selectedParentField}
            onSelect={parentFieldSelectHandler}
          />
        </div>

        <div>
          <h4>{availFields.length > 0 && availFields.length + " " + "مورد"}</h4>
          {availFields.map((field) => (
            <label key={field._id}>{field.label} - </label>
          ))}
        </div>
        <div>
          <textarea
            cols="50"
            rows="10"
            onChange={(e) => setFieldsListHandler(e)}
            value={fieldsList}
          />
          <button style={m} type="submit" onClick={addFieldToParent}>
            افزودن دسته بندی
          </button>
        </div>
      </div>
      <hr />
      <div>
        <h4>افزودن لیست واحد های اندازه گیری و زیردسته ها به هر دسته بندی</h4>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <USelect
              inputLabel="حوزه پدر"
              selectiveData={parentFields}
              selectedItem={selectedParentField}
              onSelect={parentFieldSelectHandler}
            />
          </div>
          <div style={{ flexGrow: 1 }}>
            <USelect
              inputLabel="حوزه اصلی"
              selectiveData={availFields}
              selectedItem={selectedField}
              onSelect={fieldSelectHandler}
            />
          </div>
        </div>

        <div>
          <h4>
            {availChildFields.length > 0 &&
              availChildFields.length + " " + "مورد"}
          </h4>
          {availChildFields.map((item) => (
            <label key={item._id}>{item.label} - </label>
          ))}
        </div>
        <div>
          <textarea
            cols="50"
            rows="10"
            onChange={(e) => setChildFieldsListHandler(e)}
            value={childFieldsList}
          />
          <button style={m} type="button" onClick={addChildFields}>
            افزودن زیردسته ها
          </button>

          <CheckboxSelect
            selectedItems={selectedUnits}
            selectiveData={units}
            onSelect={multipleSelectHandler}
            label="انتخاب واحد"
          />
          <button style={m} type="button" onClick={addUnitToField}>
            افزودن واحدها
          </button>
        </div>
      </div>
    </ScreenContainer>
  );
};

export default FieldsCollectionScreen;
