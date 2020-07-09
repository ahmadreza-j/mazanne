import React from "react";
import { v4 as uuidv4 } from "uuid";

// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     // margin: theme.spacing(1),
//     width: "100%",
//     // minWidth: 120,
//   },
// }));

export default function USelect({
  inputLabel,
  selectiveData,
  selectedItem,
  onSelect,
}) {
  const handleChange = (event, child) => {
    // let selected = {
    //   value: event.target.value,
    //   // label: child.props.children,
    // };
    const selected = event.target.value;
    onSelect(selected);
  };

  return (
    <TextField
      id={uuidv4()}
      select
      label={inputLabel || "انتخاب کنید"}
      value={selectedItem ? selectedItem : ""}
      onChange={handleChange}
      // SelectProps={{
      //   native: true,
      // }}
      helperText=""
      variant="outlined"
      size="small"
      fullWidth
    >
      {selectiveData.map((item) => (
        <MenuItem key={item.id || uuidv4()} value={item}>
          {item.label || ""}
        </MenuItem>
      ))}
    </TextField>
  );
}
