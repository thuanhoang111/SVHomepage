import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useParams } from "react-router-dom";

/**
 * Pdf: A component for rendering a PDF document with a viewer.
 *
 * This component utilizes `pdfjs-dist` and `@react-pdf-viewer` to display a PDF document within a viewer. The PDF file is fetched based on the URL parameter `file` and is rendered with a dark theme.
 *
 * @component
 * @returns {JSX.Element} The rendered Pdf component with a PDF viewer.
 */
const Pdf = (): JSX.Element => {
  // Extracts the 'file' parameter from the URL
  const { file } = useParams<{ file?: string }>();

  // Creates an instance of the default layout plugin with specific configurations
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    setInitialTab: (doc) => Promise.resolve(0), // Sets the initial tab to the first tab
    thumbnailPlugin: {
      thumbnailWidth: 150, // Sets the width for the thumbnail images
    },
  });

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
      <div
        style={{
          height: "100%", // Full height of the container
          width: "100%", // Full width of the container
          marginLeft: "auto", // Center the container horizontally
          marginRight: "auto", // Center the container horizontally
        }}
      >
        <Viewer
          theme="dark" // Applies a dark theme to the PDF viewer
          fileUrl={`${process.env.REACT_APP_URL_ASSET}/pdfs/${file}`} // URL of the PDF file to be displayed
          plugins={[defaultLayoutPluginInstance]} // Applies the default layout plugin to the viewer
          defaultScale={1.5} // Sets the default zoom scale for the PDF
        />
      </div>
    </Worker>
  );
};

export default Pdf;
