import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

/**
 * DialogAdvanced is a reusable confirmation dialog component that displays a warning icon and provides "Agree" and "Disagree" buttons.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.handleClick - Callback function triggered when the "Agree" button is clicked.
 * @param {string} props.title - Title text to display in the dialog content area.
 * @param {boolean} props.show - Boolean flag to control the visibility of the dialog.
 * @param {Function} props.handleClose - Callback function triggered when the dialog is closed.
 *
 * @returns {JSX.Element} The rendered dialog component with action buttons.
 */
const DialogAdvanced = ({
  handleClick,
  title,
  show,
  handleClose,
}: {
  handleClick: Function;
  title: string;
  show: boolean;
  handleClose: Function;
}): JSX.Element => {
  return (
    <Dialog open={show} onClose={() => handleClose()}>
      <DialogTitle display="flex" justifyContent="center">
        {/* Warning icon with customized color and size */}
        <WarningAmberIcon
          sx={{
            color: "#FFC24E", // Icon color
            fontSize: "40px", // Icon size
          }}
        />
      </DialogTitle>
      <DialogContent>
        {/* Title text for the dialog */}
        <DialogContentText textAlign="center">{title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* Button to close the dialog without any action */}
        <Button onClick={() => handleClose()}>Disagree</Button>
        {/* Button to trigger the action and then close the dialog */}
        <Button
          onClick={() => {
            handleClick(); // Trigger action
            handleClose(); // Close the dialog
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAdvanced;
