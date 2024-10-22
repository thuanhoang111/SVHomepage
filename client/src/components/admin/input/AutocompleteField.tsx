import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

/**
 * AutocompleteField is a reusable component that renders an autocomplete input field with support for multiple selections.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Array} props.defaultValue - The default selected options for the autocomplete field.
 * @param {Array} props.data - The data options available for selection.
 * @param {string} props.name - The name attribute for the input field, used for form handling.
 * @param {string} props.title - The label text to display above the input field.
 * @param {Object} props.mode - The mode of the autocomplete (e.g., single or multiple).
 * @param {Object} props.control - Control object from react-hook-form for managing form state.
 * @param {string} props.language - The language code used to determine the display language of the options.
 *
 * @returns {JSX.Element} The rendered autocomplete field component with multiple selection support.
 */
const AutocompleteField = ({
  defaultValue,
  data,
  name,
  title,
  mode,
  control,
  language,
}: {
  defaultValue: any[];
  data: any[];
  name: string;
  mode: any;
  title: string;
  control: any;
  language: string;
}): JSX.Element => {
  // Initial fixed options
  const fixedOptions: any[] = defaultValue;

  // State to manage selected tags
  const [tags, setTags] = useState([...fixedOptions]);

  // Function to set form values
  const { setValue } = useFormContext();

  useEffect(() => {
    // Update tags state when defaultValue changes
    setTags([...fixedOptions]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {/* Label for the autocomplete field */}
      <label htmlFor={name}>{title}</label>
      <Controller
        control={control}
        name={name}
        render={() => (
          <Autocomplete
            multiple
            id="tags-outlined"
            options={data}
            onChange={(event, value) => {
              // Update tags state with selected options, ensuring no duplicates
              setTags([
                ...fixedOptions,
                ...value.filter(
                  (option) => fixedOptions.indexOf(option) === -1
                ),
              ]);
              setValue(name, value); // Update form value with selected options
            }}
            isOptionEqualToValue={
              (option, value) =>
                language === "vi"
                  ? option?.vi === value?.vi // Compare options based on Vietnamese label
                  : option?.jp === value?.jp // Compare options based on Japanese label
            }
            value={tags} // Set the current value of the autocomplete field
            getOptionLabel={
              (option) => (language === "vi" ? option?.vi : option?.jp) // Display label based on selected language
            }
            filterSelectedOptions // Filter out selected options from the dropdown
            renderInput={(params) => (
              <TextField {...params} placeholder="Select here ..." /> // Render the input field with a placeholder
            )}
          />
        )}
      />
    </Box>
  );
};

export default AutocompleteField;
