import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import TableChartIcon from "@mui/icons-material/TableChart";
import { Box, Checkbox, Grid, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import AdvanceTextField from "./AdvanceTextField";
import { Table } from "models/news";

// Accessibility label for the Checkbox component to improve screen reader support
const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * TableGroupField is a component for managing a list of table items with dynamic add/remove functionality.
 * It allows users to toggle the visibility of the table group and manage table items within the group.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.name - The name attribute for the form field array.
 * @param {Object} props.control - The control object from react-hook-form for managing form state.
 * @param {string} [props.mode] - The mode of the field (e.g., "create" or "edit").
 * @param {boolean} props.tableGroup - Boolean indicating if the table group is active or not.
 * @param {Function} props.handleToggleTableGroup - Function to toggle the visibility of the table group.
 * @param {Table} props.table - Optional table object to populate default values.
 *
 * @returns {JSX.Element} The rendered table group component with dynamic table items.
 */
const TableGroupField = ({
  name,
  control,
  mode,
  tableGroup,
  handleToggleTableGroup,
  table,
}: {
  name: string;
  control: any;
  mode?: string;
  tableGroup: boolean;
  handleToggleTableGroup: Function;
  table: Table;
}): JSX.Element => {
  // Use react-hook-form's useFieldArray hook to manage the dynamic list of table items
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  // Use react-hook-form's useFormContext hook to manage form values
  const { register, resetField } = useFormContext();

  return (
    <Grid item xs={12} container>
      <Grid item xs={2}>
        {/* Checkbox to toggle the visibility of the table group */}
        <Checkbox
          {...label}
          checked={tableGroup}
          onClick={() => {
            handleToggleTableGroup();
            if (tableGroup) {
              resetField("table");
              remove();
            }
          }}
          icon={<TableChartIcon />}
          checkedIcon={<TableChartIcon />}
        />
        {/* Button to add a new table item */}
        {tableGroup && (
          <IconButton
            aria-label="add"
            onClick={() => {
              append({
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
        {/* Render the list of table items if the table group is active */}
        {tableGroup && (
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Grid key={item.id} item xs={12} position="relative">
                  {/* Button to remove a specific table item */}
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
                  <Box
                    sx={{
                      border: "gray solid 1px",
                      borderRadius: "5px",
                    }}
                    padding={1}
                  >
                    {/* Render text fields for table item title and content */}
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <AdvanceTextField
                          name={`${name}[${index}].title`}
                          label="Title Table"
                          defaultValue={table?.title}
                          {...{ register }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <AdvanceTextField
                          name={`${name}[${index}].content`}
                          label="Content Table"
                          defaultValue={table?.content}
                          {...{ register }}
                        />
                      </Grid>
                    </Grid>
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

export default TableGroupField;
