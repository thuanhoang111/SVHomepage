import { Box, TextField } from "@mui/material";

/**
 * AdvanceTextField is a reusable component that renders a labeled text field with multiline support.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.name - The name attribute for the input field, used for form handling.
 * @param {string} props.defaultValue - The default value for the input field.
 * @param {Function} props.register - Function to register the input field for form handling (typically from react-hook-form).
 * @param {string} props.label - The label text to display above the input field.
 *
 * @returns {JSX.Element} The rendered text field component with a label.
 */
const AdvanceTextField = ({
  name,
  defaultValue,
  register,
  label,
}: {
  name: string;
  defaultValue: string;
  register: Function;
  label: string;
}): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {/* Label for the text field */}
      <label htmlFor={name}>{label}</label>
      <TextField
        id={name}
        type="text"
        multiline
        rows={2}
        defaultValue={defaultValue}
        placeholder="Type here ..."
        {...register(name)}
      ></TextField>
    </Box>
  );
};

export default AdvanceTextField;
