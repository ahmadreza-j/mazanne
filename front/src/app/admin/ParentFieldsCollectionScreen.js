import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  httpCreateNewParentField,
  httpEditParentField,
  httpDeleteParentField,
} from "../../store/actions/adminAction";

import {  httpGetAllParentFields} from "../../store/actions/publicAction"

import { ParentField } from "./models/FieldModel";

import ScreenContainer from "../shared/ScreenContainer";

const ParentFieldsCollectionScreen = () => {
  const dispatch = useDispatch();

  const parentFields = useSelector((state) => state.admin.parentFields);

  const [labelValue, setLabelValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [editedId, setEditedId] = useState("");
  const [editedLabelValue, setEditedLabelValue] = useState("");
  const [editedCodeValue, setEditedCodeValue] = useState("");

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

  const createNewParentField = async (event) => {
    event.preventDefault();
    if (labelValue.trim() !== "" && codeValue !== "") {
      if (window.confirm("are u sure?")) {
        const newParentField = new ParentField(labelValue.trim(), codeValue);
        await dispatch(httpCreateNewParentField(newParentField));
        await fetchParentFields();
        formResetHandler();
      }
    } else alert("input is empty!");
  };

  const fetchParentFields = async () => {
    await dispatch(httpGetAllParentFields());
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
        const newParentField = new ParentField(
          editedLabelValue.trim(),
          editedCodeValue
        );
        await dispatch(httpEditParentField(editedId, newParentField));
        await fetchParentFields();
        cancelEditHandler();
      }
    } else alert("input is empty!");
  };

  const deleteHandler = async (id) => {
    if (window.confirm(`deleted id: ${id}\nare u sure?`)) {
      await dispatch(httpDeleteParentField(id));
      await fetchParentFields();
    }
  };

  useEffect(() => {
    fetchParentFields();
  }, [dispatch]);

  return (
    <ScreenContainer>
      <div>
        <h4>ایجاد</h4>
        <form onSubmit={(e) => createNewParentField(e)}>
          <input
            style={m}
            type="text"
            value={labelValue}
            placeholder="نام دسته بندی پدر"
            onChange={(e) => setLabelValueHandler(e)}
          />
          <input
            style={m}
            type="number"
            value={codeValue}
            placeholder="کد دسته بندی پدر"
            onChange={(e) => setCodeValueHandler(e)}
          />
          <input style={m} type="submit" value="ایجاد در دیتابیس" />
        </form>
      </div>
      <hr />
      <h4>ویرایش / حذف</h4>
      <div>
        <h5>
          <span>{parentFields.length} </span>
          <span>مورد یافت شد</span>
        </h5>
        <table>
          <tbody>
            {parentFields.map((item, index) => (
              <tr key={item._id}>
                <td style={p}>{index + 1}</td>
                <td style={p}>{item._id}</td>
                <td style={p}>
                  {item._id === editedId ? (
                    <input
                      type="text"
                      value={editedLabelValue}
                      onChange={(e) => editLabelValueHandler(e)}
                    />
                  ) : (
                    <label>{item.label}</label>
                  )}
                </td>
                <td style={p}>
                  {item._id === editedId ? (
                    <input
                      type="number"
                      value={editedCodeValue}
                      onChange={(e) => editCodeValueHandler(e)}
                    />
                  ) : (
                    <label>{item.code}</label>
                  )}
                </td>
                <td style={p}>
                  <button
                    onClick={() => editHandler(item._id, item.label, item.code)}
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
                  <button onClick={() => deleteHandler(item._id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScreenContainer>
  );
};

export default ParentFieldsCollectionScreen;
