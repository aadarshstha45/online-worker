import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectInput = ({ name, control, label, helperText, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel id={name}>{label}</InputLabel>
          <Select {...field} error={!!error} label={label} fullWidth {...rest}>
            {rest.options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <p className="text-gray-500 text-sm">{helperText}</p>}
        </FormControl>
      )}
    />
  );
};

export default SelectInput;
