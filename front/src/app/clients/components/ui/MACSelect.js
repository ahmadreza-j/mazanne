import React from "react";
// import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { v4 as uuidv4 } from "uuid";
import { availIdentifire } from "../../../../util/availIdentifire";

const useStyles = makeStyles((theme) => ({}));

export default function MACSelect({
  inputLabel,
  selectiveData,
  selectedItem,
  onSelect,
  placeholder,
}) {
  const classes = useStyles();
  const id = uuidv4();

  return (
    <Autocomplete
      multiple
      id={id}
      value={selectedItem}
      onChange={(event, newValue) => {
        onSelect([...newValue]);
      }}
      options={selectiveData}
      getOptionSelected={(option, value) =>
        availIdentifire(option) === availIdentifire(value)
      }
      getOptionLabel={(option) => option.label}
      //   defaultValue={[top100Films[13]]}
      filterSelectedOptions
      noOptionsText="انتخابی وجود نداره"
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={inputLabel || "انتخاب کنید"}
          placeholder={
            selectedItem.length === selectiveData.length
              ? "همه موارد انتخاب شده"
              : placeholder
          }
        />
      )}
    />
  );
}
