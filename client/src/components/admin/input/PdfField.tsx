import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

/**
 * PdfField is a component that handles file input for PDF documents.
 * It displays a preview of the PDF file if one is selected or provides an interface to upload a PDF if none is selected.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.name - The name attribute for the file input, used for form handling.
 * @param {string} props.mode - The mode of the field (e.g., "create" or "edit").
 *
 * @returns {JSX.Element} The rendered PDF file input component with preview functionality.
 */
const PdfField = ({
  label,
  name,
  mode,
}: {
  label: string;
  name: string;
  mode: string;
}): JSX.Element => {
  // State to hold the base64 string of the selected PDF file
  const [fileStr, setFileStr] = useState<string>("");

  // Ref for the file input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Form methods from react-hook-form
  const { register, setValue, getValues } = useFormContext();

  // Create an instance of the default layout plugin for the PDF viewer
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Effect to set the PDF file string when the mode is "edit" and a file URL is provided
  useEffect(() => {
    if (mode === "edit" && getValues(name)) {
      setFileStr(process.env.REACT_APP_URL_API + "/" + getValues(name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, setValue]);

  /**
   * Converts a file to a base64 string and updates the fileStr state.
   *
   * @param {File} file - The file to be converted.
   */
  const convert2base64 = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileStr(reader.result?.toString() || "");
    };
    reader.readAsDataURL(file);
  };

  /**
   * Handles file input change event, converts the file to base64,
   * and sets the file value in the form context.
   *
   * @param {Event} file - The file input change event.
   */
  const handleChange = (file: any) => {
    convert2base64(file.target.files[0]);
    setValue(name, file.target.files[0]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        height: "100%",
      }}
    >
      {/* Label for the PDF file input */}
      <label className="" htmlFor={name}>
        {label}
      </label>
      {fileStr ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
          <div
            style={{
              height: "400px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* PDF viewer with default layout plugin */}
            <Viewer
              fileUrl={fileStr}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={0.5}
            />
          </div>
        </Worker>
      ) : (
        <Grid position="relative">
          <div
            style={{
              minHeight: "150px",
              border: "gray solid 1px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => inputRef?.current?.click()}
          >
            <Typography fontSize={16}>Drop the files here ...</Typography>
            {/* Hidden file input wrapped in an IconButton */}
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              size="large"
              disabled
            >
              <TextField
                {...register(name)}
                margin="dense"
                inputProps={{ accept: "application/pdf" }}
                hidden
                ref={inputRef}
                id={name}
                name={name}
                type="file"
                onChange={(e) => handleChange(e)}
                fullWidth
                variant="standard"
              />
            </IconButton>
          </div>
        </Grid>
      )}
    </div>
  );
};

export default PdfField;
