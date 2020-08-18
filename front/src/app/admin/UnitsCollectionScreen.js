import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  httpCreateNewUnit,
  httpEditUnit,
  httpDeleteUnit,
} from "../../store/actions/adminAction";

import { httpGetUnits } from "../../store/actions/publicAction";
import { Unit } from "./models/unitModel";

import ScreenContainer from "../shared/ScreenContainer";

const UnitsCollectionScreen = () => {
  const dispatch = useDispatch();

  const units = useSelector((state) => state.admin.units);

  const [labelValue, setLabelValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [editedId, setEditedId] = useState("");
  const [editedLabelValue, setEditedLabelValue] = useState("");
  const [editedCodeValue, setEditedCodeValue] = useState("");

  const unitInput = useRef();

  const p = {
    padding: 7,
  };

  const m = {
    margin: 7,
  };

  const setLabelValueHandler = (event) => {
    setLabelValue(event.target.value);
  };

  const setCodeValueHandler = (event) => {
    setCodeValue(event.target.value);
  };

  const formResetHandler = () => {
    setLabelValue("");
    setCodeValue("");
  };

  const createNewUnit = async (event) => {
    event.preventDefault();
    if (labelValue.trim() !== "" && codeValue.trim() !== "") {
      if (window.confirm("are u sure?")) {
        const newUnit = new Unit(labelValue.trim(), codeValue.trim());
        await dispatch(httpCreateNewUnit(newUnit));
        await fetchUnits();
        formResetHandler();
        unitInput.current.focus();
      }
    } else alert("input is empty!");
  };

  const fetchUnits = async () => {
    await dispatch(httpGetUnits());
  };

  const editHandler = (id, labelValue, codeValue = "") => {
    setEditedId(id);
    setEditedLabelValue(labelValue);
    setEditedCodeValue(codeValue);
  };

  const editLabelValueHandler = (event) => {
    setEditedLabelValue(event.target.value);
  };

  const editCodeValueHandler = (event) => {
    setEditedCodeValue(event.target.value);
  };

  const cancelEditHandler = () => {
    setEditedId("");
  };

  const submitEditHandler = async () => {
    if (editedId !== "" && editedLabelValue !== "" && editedCodeValue !== "") {
      if (window.confirm("are u sure?")) {
        const newUnit = new Unit(
          editedLabelValue.trim(),
          editedCodeValue.trim()
        );
        await dispatch(httpEditUnit(editedId, newUnit));
        await fetchUnits();
        cancelEditHandler();
      }
    } else alert("input is empty!");
  };

  const deleteHandler = async (id) => {
    if (window.confirm(`deleted id: ${id}\nare u sure?`)) {
      await dispatch(httpDeleteUnit(id));
      await fetchUnits();
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [dispatch]);

  return (
    <ScreenContainer>
      <div>
        <h4>ایجاد</h4>
        <form onSubmit={(e) => createNewUnit(e)}>
          <input
            style={m}
            type="text"
            value={labelValue}
            placeholder="نام واحد اندازه گیری"
            onChange={(e) => setLabelValueHandler(e)}
            ref={unitInput}
          />
          <input
            style={m}
            type="number"
            value={codeValue}
            placeholder="کد واحد اندازه گیری"
            onChange={(e) => setCodeValueHandler(e)}
          />
          <input style={m} type="submit" value="ایجاد در دیتابیس" />
        </form>
      </div>
      <hr />
      <h4>ویرایش / حذف</h4>
      <div>
        <h5>
          <span>{units.length} </span>
          <span>مورد یافت شد</span>
        </h5>
        <table>
          <tbody>
            {units.map((unit, index) => (
              <tr key={unit._id}>
                <td style={p}>{index + 1}</td>
                <td style={p}>{unit._id}</td>
                <td style={p}>
                  {unit._id === editedId ? (
                    <input
                      type="text"
                      value={editedLabelValue}
                      onChange={(e) => editLabelValueHandler(e)}
                      // onBlur={cancelEditHandler}
                    />
                  ) : (
                    <label
                    // onClick={() =>
                    //   editHandler(unit._id, unit.label, unit.code)
                    // }
                    >
                      {unit.label}
                    </label>
                  )}
                </td>
                <td style={p}>
                  {unit._id === editedId ? (
                    <input
                      type="number"
                      value={editedCodeValue}
                      onChange={(e) => editCodeValueHandler(e)}
                      // onBlur={cancelEditHandler}
                    />
                  ) : (
                    <label
                    // onClick={() =>
                    //   editHandler(unit._id, unit.label, unit.code)
                    // }
                    >
                      {unit.code}
                    </label>
                  )}
                </td>
                <td style={p}>
                  <button
                    onClick={() => editHandler(unit._id, unit.label, unit.code)}
                  >
                    ویرایش
                  </button>
                </td>
                <td style={p}>
                  <button onClick={cancelEditHandler}>انصراف از ویرایش</button>
                </td>
                <td style={p}>
                  <button onClick={submitEditHandler}>اعمال ویرایش</button>
                </td>
                <td style={p}>
                  <button onClick={() => deleteHandler(unit._id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScreenContainer>
  );
};

export default UnitsCollectionScreen;
