import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { v4 as uuidv4 } from "uuid";
import { availIdentifire } from "../../util/availIdentifire";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CheckboxSelect({
  selectedItems,
  onSelect,
  selectiveData,
  label,
  ...restProps
}) {
  const classes = useStyles();
  const id = uuidv4();

  const selectedItemsId = selectedItems.map((item) => availIdentifire(item));

  const handleChange = (event) => {
    const values = event.target.value;
    const _values = selectiveData.filter((item) =>
      values.includes(availIdentifire(item))
    );
    onSelect(_values);
  };

  const renderValueHandler = (selected) => {
    const _selectiveData = selectiveData.filter((item) =>
      selected.includes(availIdentifire(item))
    );
    return (
      <div className={classes.chips}>
        {_selectiveData.map((item) => (
          <Chip
            key={availIdentifire(item)}
            label={item.label || "?"}
            className={classes.chip}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={uuidv4()}
          multiple
          value={selectedItemsId}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => renderValueHandler(selected)}
          MenuProps={MenuProps}
          {...restProps}
        >
          {selectiveData.map((item) => (
            <MenuItem key={availIdentifire(item)} value={availIdentifire(item)}>
              <Checkbox
                checked={selectedItemsId.includes(availIdentifire(item))}
              />
              <ListItemText primary={item.label || "?"} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
