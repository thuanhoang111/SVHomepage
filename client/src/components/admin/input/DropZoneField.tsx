import { Box } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

/**
 * DropZoneField is a reusable component that provides a drag-and-drop file upload area with support for previewing images and videos.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.name - The name attribute for the input field, used for form handling.
 * @param {string} [props.label=name] - The label text to display above the upload area.
 * @param {string} [props.mode="create"] - The mode of the component, determines how the file is handled (e.g., "create" or "edit").
 * @param {string} [props.type="image"] - The type of file to preview, either "image" or "video".
 * @param {Object} [props.accept] - The MIME types of files accepted by the dropzone.
 *
 * @returns {JSX.Element} The rendered dropzone field component with file preview support.
 */
const DropZoneField = (props: {
  name: string;
  label?: string;
  mode?: string;
  type?: string;
  accept: any;
}): JSX.Element => {
  // Destructure properties from props with default values
  const { name, label = name, mode = "create", type = "image" } = props;

  // Access form methods from react-hook-form
  const { register, unregister, setValue, watch, getValues } = useFormContext();

  // Watch the form value for the field to display the current file
  const files = watch(name);

  // Callback function to handle file drops
  const onDrop = useCallback(
    (droppedFiles: any) => {
      // Set the dropped file to the form field with validation
      setValue(name, droppedFiles[0], { shouldValidate: true });
    },
    [setValue, name]
  );

  // Initialize the dropzone with the onDrop callback and accepted file types
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  });

  useEffect(() => {
    // Register the input field with react-hook-form when the component mounts
    register(name);

    // Unregister the input field when the component unmounts
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        height: "100%",
      }}
    >
      {/* Label for the dropzone field */}
      <label htmlFor={name}>{label}</label>
      <div
        {...getRootProps()} // Apply dropzone props to the container
        role="button"
        aria-label="File Upload"
        id={name}
        style={{ height: "100%" }}
      >
        {/* Hidden file input field */}
        <input {...props} {...getInputProps()} />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            minHeight: "150px",
            border: "gray solid 1px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={" " + (isDragActive ? " " : " ")}
        >
          {/* Display the uploaded file or a message if no file is selected */}
          {!!files ? (
            type === "image" ? (
              <Box
                component="img"
                src={
                  mode === "create"
                    ? URL.createObjectURL(files) // Create object URL for the uploaded image
                    : typeof files !== "string"
                    ? URL.createObjectURL(files) // Create object URL if the file is not a string
                    : process.env.REACT_APP_URL_API + "/" + getValues(name) // Use the file URL from the API in edit mode
                }
                alt={files.name}
                width={1}
                height={1}
                p={1}
              />
            ) : (
              <video controls width="100%">
                {/* autoPlay */}
                <source
                  src={
                    mode === "create"
                      ? URL.createObjectURL(files) // Create object URL for the uploaded video
                      : typeof files !== "string"
                      ? URL.createObjectURL(files) // Create object URL if the file is not a string
                      : process.env.REACT_APP_URL_API + "/" + getValues(name) // Use the video URL from the API in edit mode
                  }
                  type="video/mp4"
                />
              </video>
            )
          ) : (
            <p style={{ padding: "3px", textAlign: "center" }}>
              Drop the files here ...
            </p>
          )}
        </Box>
      </div>
    </div>
  );
};

export default DropZoneField;
