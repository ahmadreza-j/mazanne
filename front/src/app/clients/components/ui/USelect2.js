import React from "react";
import { v4 as uuidv4 } from "uuid";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { availIdentifire } from "../../../../util/availIdentifire";

export default function USelect({
  inputLabel,
  selectiveData,
  selectedItem,
  onSelect,
  ...restProps
}) {
  const selectedItemId = availIdentifire(selectedItem);

  const handleChange = (event, child) => {
    const selected = event.target.value;
    const _selected = selectiveData.find(
      (item) => availIdentifire(item) === selected
    );
    onSelect(_selected);
    // onSelect(selected);
  };

  return (
    <TextField
      id={uuidv4()}
      select
      label={inputLabel || "انتخاب کنید"}
      // value={selectedItem}
      value={selectedItemId}
      onChange={handleChange}
      disabled={selectiveData.length === 0}
      variant="outlined"
      size="small"
      fullWidth
      {...restProps}
    >
      {selectiveData.map((item) => (
        <MenuItem key={availIdentifire(item)} value={availIdentifire(item)}>
          {item.label || "?"}
        </MenuItem>
      ))}
    </TextField>
  );
}
