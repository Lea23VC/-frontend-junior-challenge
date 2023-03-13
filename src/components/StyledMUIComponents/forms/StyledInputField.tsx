import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

export const StyledInputField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});
