import React from "react";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    width: "100%",
    // minWidth: 120,
  },
}));

export default function USelect({
  inputLabel,
  selectiveData,
  selectedItem,
  onSelect,
}) {
  //hint: data = [{value:"", label:""}]
  const classes = useStyles();
  // const [selectedValue, setSelectedValue] = React.useState(initialValue);

  const handleChange = (event, child) => {
    let selected = {
      value: event.target.value,
      label: child.props.children,
    };
    onSelect(selected);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          {inputLabel}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id={uuidv4()}
          value={selectedItem.value}
          onChange={handleChange}
          label={inputLabel}
          size="small"
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {selectiveData.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
