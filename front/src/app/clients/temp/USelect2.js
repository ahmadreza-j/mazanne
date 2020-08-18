import React from "react";
import { v4 as uuidv4 } from "uuid";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export default function USelect({
  inputLabel,
  selectiveData,
  selectedItem,
  onSelect,
  ...restProps
}) {
  const availIdentifire = (item) => {
    if (item._id) {
      return item._id;
    } else if (item.id) {
      return item.id;
    } else if (item.label) {
      return item.id;
    } else {
      return item;
    }
  };

  const handleChange = (event, child) => {
    const selected = event.target.value;
    const [_selected] = selectiveData.filter(
      (item) => availIdentifire(item) === selected
    );
    console.log(selected);
    onSelect(selected);
  };

  return (
    <TextField
      id={uuidv4()}
      select
      label={inputLabel || "انتخاب کنید"}
      value={selectedItem ? selectedItem : ""}
      onChange={handleChange}
      helperText=""
      variant="outlined"
      size="small"
      fullWidth
      {...restProps}
    >
      {selectiveData.map((item) => (
        <MenuItem key={item._id || item.id || uuidv4()} value={item}>
          {item.label || ""}
        </MenuItem>
      ))}
    </TextField>
  );
}
