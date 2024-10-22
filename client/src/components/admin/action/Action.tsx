import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import DialogAdvanced from "../dialog/DialogAdvanced";

/**
 * Action component provides a set of action buttons for managing items with visibility toggles and editing options.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string[]} props.type - Array of action types to display specific buttons (e.g., 'update', 'edit', 'review', 'delete').
 * @param {Object} props.params - Parameters passed to determine the state and behavior of the actions.
 * @param {string} props.name - The name of the item being managed, used in dialog titles.
 * @param {Function} props.handleUpdateClick - Callback function triggered when the update action is selected.
 * @param {Function} props.handleDeleteClick - Callback function triggered when the delete action is selected.
 * @param {Function} props.handleEditClick - Callback function triggered when the edit action is selected.
 * @param {Function} props.handleReviewClick - Callback function triggered when the review action is selected.
 *
 * @returns {JSX.Element} The rendered component with action buttons and dialogs.
 */
const Action = ({
  params,
  name,
  handleUpdateClick,
  handleDeleteClick,
  type = [],
  handleEditClick,
  handleReviewClick,
}: {
  type: string[];
  params: any;
  name: string;
  handleUpdateClick: Function;
  handleDeleteClick: Function;
  handleEditClick: Function;
  handleReviewClick: Function;
}): JSX.Element => {
  // State to manage the visibility of the update dialog
  const [showVisible, setShowVisible] = useState<boolean>(false);
  // State to manage the visibility of the delete dialog
  const [showDelete, setShowDelete] = useState<boolean>(false);

  return (
    <>
      <Box width={1} display="flex" justifyContent="space-around">
        {/* Conditional rendering for the visibility toggle button */}
        {type.find((p: string) => p.includes("update")) && (
          <IconButton color="warning" onClick={() => setShowVisible(true)}>
            {/* Display different icons based on the visibility state */}
            {!params?.row?.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        )}
        {/* Conditional rendering for the edit button */}
        {type.find((p: string) => p.includes("edit")) && (
          <IconButton color="info" onClick={() => handleEditClick()}>
            <EditIcon />
          </IconButton>
        )}
        {/* Conditional rendering for the review button */}
        {type.find((p: string) => p.includes("review")) && (
          <IconButton color="success" onClick={() => handleReviewClick()}>
            <PreviewIcon />
          </IconButton>
        )}
        {/* Conditional rendering for the delete button */}
        {type.find((p: string) => p.includes("delete")) && (
          <IconButton color="error" onClick={() => setShowDelete(true)}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      {/* Dialog for updating item visibility */}
      <DialogAdvanced
        show={showVisible}
        handleClick={handleUpdateClick}
        handleClose={() => setShowVisible(false)}
        title={`Do you want to ${
          name !== "contact"
            ? params.row.visible
              ? "hide"
              : "show"
            : "set default"
        } the ${name}?`}
      />

      {/* Dialog for deleting the item */}
      <DialogAdvanced
        show={showDelete}
        handleClick={handleDeleteClick}
        handleClose={() => setShowDelete(false)}
        title={`Do you want to delete the ${name}?`}
      />
    </>
  );
};

export default Action;
