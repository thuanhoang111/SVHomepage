import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import LinkIcon from "@mui/icons-material/Link";
import { Box, Checkbox, Grid, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import AdvanceTextField from "./AdvanceTextField";
import { LinkGroup } from "models/news";

// Accessibility label for the Checkbox component to improve screen reader support
const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * LinkGroupField is a component that manages a group of links with options for adding and removing individual links.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.name - The name attribute for the field array, used for form handling.
 * @param {string} props.mode - The mode of the field (e.g., "create" or "edit").
 * @param {Object} props.control - Control object from react-hook-form for managing form state.
 * @param {Function} props.handleToggleLinkGroup - Callback function to toggle the visibility of the link group.
 * @param {boolean} props.linkGroup - Boolean flag indicating if the link group is active.
 * @param {Object} props.link - Default values for links (optional).
 *
 * @returns {JSX.Element} The rendered link group field component with options to add and remove links.
 */
const LinkGroupField = ({
  name,
  mode,
  control,
  handleToggleLinkGroup,
  linkGroup,
  link,
}: {
  name: string;
  mode: string;
  control: any;
  handleToggleLinkGroup: Function;
  linkGroup: boolean;
  link: LinkGroup;
}): JSX.Element => {
  // Manage field array for dynamic link fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  // Access form context methods
  const { register, resetField } = useFormContext();

  return (
    <Grid item xs={12} container>
      <Grid item xs={2}>
        {/* Checkbox to toggle the visibility of the link group */}
        <Checkbox
          {...label}
          checked={linkGroup}
          onClick={() => {
            handleToggleLinkGroup();
            if (linkGroup) {
              resetField("linkGroup"); // Reset field value when link group is deactivated
              remove(); // Remove all links if link group is deactivated
            }
          }}
          icon={<LinkIcon />}
          checkedIcon={<LinkIcon />}
        />
        {/* Button to add a new link if the link group is active */}
        {linkGroup && (
          <IconButton
            aria-label="add"
            onClick={() => {
              append({
                url: null,
                title: null,
                content: null,
              });
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={10}>
        {/* Render fields for each link if the link group is active */}
        {linkGroup && (
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Grid key={item.id} item xs={12} position="relative">
                  {/* Button to remove an individual link */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 6,
                      left: 6,
                    }}
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <ClearIcon color="error" />
                  </IconButton>
                  {/* Box to contain link fields */}
                  <Box
                    sx={{
                      border: "gray solid 1px",
                      borderRadius: "5px",
                    }}
                    padding={1}
                    display="flex"
                    flexDirection="column"
                    gap={1}
                  >
                    <AdvanceTextField
                      name={`${name}[${index}].content`}
                      label="Content Link"
                      defaultValue={link?.content}
                      {...{ register }}
                    />
                    <AdvanceTextField
                      name={`${name}[${index}].title`}
                      label="Title Link"
                      defaultValue={link?.title}
                      {...{ register }}
                    />
                    <AdvanceTextField
                      name={`${name}[${index}].url`}
                      label="Url Link"
                      defaultValue={link?.url}
                      {...{ register }}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default LinkGroupField;
