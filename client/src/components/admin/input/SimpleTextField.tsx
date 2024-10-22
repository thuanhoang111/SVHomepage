import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { useController } from "react-hook-form";

/**
 * SimpleTextField is a reusable component that renders a styled text field
 * for use in forms managed by react-hook-form.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.title - The label text for the text field.
 * @param {Object} props.control - The control object from react-hook-form for managing form state.
 * @param {string} props.name - The name attribute for the text field, used for form management.
 * @param {string} [props.mode="edit"] - The mode of the field (e.g., "create" or "edit").
 * @param {number} [props.line=1] - The number of visible text lines for the text field.
 * @param {string} [props.defaultValue] - The default value for the text field when in "edit" mode.
 * @param {Function} props.setValue - Function to set the value of the text field in the form.
 * @param {string} [props.fontStyle="normal"] - CSS font style for the text field (e.g., "normal", "italic").
 *
 * @returns {JSX.Element} The rendered text field component.
 */
const SimpleTextField = ({
  title,
  control,
  name,
  mode,
  line = 1,
  defaultValue,
  setValue,
  fontStyle = "normal",
}: {
  title: string;
  control: any;
  name: string;
  mode?: string;
  line?: number;
  defaultValue?: string;
  setValue: Function;
  fontStyle?: string;
}): JSX.Element => {
  // Use react-hook-form's useController hook to manage the text field's value and state
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  // Effect to set the default value when the mode is "edit"
  useEffect(() => {
    if (mode === "edit") setValue(name, defaultValue);
  }, [mode, defaultValue, name, setValue]);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {/* Label for the text field */}
      <label htmlFor={name}>{title}</label>
      {/* Render the text field with specified properties */}
      <TextField
        id={name}
        multiline
        rows={line}
        type="text"
        sx={{ fontStyle: fontStyle }}
        placeholder="Type here ..."
        {...field} // Spread field props from useController
      ></TextField>
    </Box>
  );
};

export default SimpleTextField;
