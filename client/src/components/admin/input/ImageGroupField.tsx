import AddIcon from "@mui/icons-material/Add";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import ClearIcon from "@mui/icons-material/Clear";
import { Checkbox, Grid, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import DropZoneField from "./DropZoneField";

// Accessibility label for the Checkbox component to improve screen reader support
const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * ImageGroupField is a component for managing a dynamic group of image uploads.
 * It allows users to toggle the image group, add new image upload areas, and remove existing ones.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.name - The name of the field in the form state.
 * @param {Object} props.control - Control object from react-hook-form for managing form state.
 * @param {string} props.mode - The mode of the component, determines how the images are handled (e.g., "create" or "edit").
 * @param {boolean} props.imageGroup - Boolean flag indicating if the image group is active.
 * @param {Function} props.handleToggleImageGroup - Callback function to toggle the image group state.
 *
 * @returns {JSX.Element} The rendered image group component with dynamic image upload areas.
 */
const ImageGroupField = ({
  name,
  control,
  mode,
  imageGroup,
  handleToggleImageGroup,
}: {
  name: string;
  control: any;
  mode: string;
  imageGroup: boolean;
  handleToggleImageGroup: Function;
}): JSX.Element => {
  // Access the field array methods from react-hook-form
  const { fields, remove, append } = useFieldArray({
    control,
    name: name,
  });

  // Access form methods from react-hook-form
  const { resetField } = useFormContext();

  return (
    <Grid item xs={12} container>
      {/* Checkbox to toggle the image group */}
      <Grid item xs={2}>
        <Checkbox
          {...label}
          onClick={() => {
            // Toggle image group state and reset/remove fields if the group is active
            handleToggleImageGroup();
            if (imageGroup) {
              resetField(name);
              remove();
            }
          }}
          checked={imageGroup}
          icon={<BurstModeIcon />} // Icon when checkbox is unchecked
          checkedIcon={<BurstModeIcon />} // Icon when checkbox is checked
        />
        {/* Button to add new image upload areas when the image group is active */}
        {imageGroup && (
          <IconButton
            aria-label="add"
            onClick={() => {
              append({ url: null }); // Add a new field to the image group
            }}
          >
            <AddIcon /> {/* Icon for adding a new image */}
          </IconButton>
        )}
      </Grid>
      {/* Render image upload areas if the image group is active */}
      <Grid item xs={10}>
        {imageGroup && (
          <Grid container spacing={2}>
            {fields.map((item, index) => (
              <Grid key={index} item xs={4} position="relative">
                {/* Button to remove an image upload area */}
                <IconButton
                  sx={{ position: "absolute", top: 40, left: 5 }}
                  aria-label="remove"
                  color="error"
                  onClick={() => remove(index)} // Remove the specific image field
                >
                  <ClearIcon /> {/* Icon for removing an image */}
                </IconButton>
                {/* DropZoneField for uploading images */}
                <DropZoneField
                  accept={{
                    "image/*": [".jpeg", ".jpg", ".png"], // Accept only image files
                  }}
                  name={`${name}[${index}].url`} // Field name for react-hook-form
                  mode={mode} // Mode of the component
                  label="Image Group" // Label for the dropzone field
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ImageGroupField;
