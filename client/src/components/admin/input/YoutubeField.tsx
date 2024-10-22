import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { useController } from "react-hook-form";
import ReactPlayer from "react-player";

/**
 * YoutubeField is a component for inputting and displaying a YouTube video URL.
 * It provides a text field for entering a URL and displays a video player if the URL is valid.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.title - Label text for the text field.
 * @param {string} props.name - The name attribute for the form field.
 * @param {string} [props.mode] - The mode of the field (e.g., "create" or "edit").
 * @param {Object} props.control - The control object from react-hook-form for managing form state.
 * @param {Function} props.setValue - Function to set a value in the form.
 * @param {Function} props.getValues - Function to get the current value from the form.
 * @param {string} [props.defaultValue] - Default value for the text field.
 *
 * @returns {JSX.Element} The rendered input field and video player component.
 */
const YoutubeField = ({
  title,
  name,
  mode,
  control,
  setValue,
  getValues,
  defaultValue,
}: {
  title: string;
  name: string;
  mode?: string;
  control: any;
  setValue: Function;
  getValues: Function;
  defaultValue?: string;
}): JSX.Element => {
  // Use react-hook-form's useController hook to manage the input field
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  useEffect(() => {
    // Set the default value if in edit mode
    if (mode === "edit") setValue(name, defaultValue);
  }, [mode, defaultValue, name, setValue]);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <label htmlFor={name}>{title}</label>
      {/* Text field for entering the YouTube video URL */}
      <TextField
        placeholder="Type here ..."
        {...field}
        id={name}
        name={name}
        type="text"
      />
      {/* Render the video player if a valid URL is provided */}
      {getValues(name) && (
        <ReactPlayer width="100%" controls url={getValues(name)}></ReactPlayer>
      )}
    </Box>
  );
};

export default YoutubeField;
