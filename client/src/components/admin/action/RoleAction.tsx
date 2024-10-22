import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

/**
 * RoleAction component allows users to select and update a role for an item.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Object} props.params - Parameters containing item details, including the current role.
 * @param {Function} props.handleUpdate - Callback function triggered when the role is updated.
 *
 * @returns {JSX.Element} The rendered component with a role selection dropdown.
 */
const RoleAction = ({
  params,
  handleUpdate,
}: {
  params: any;
  handleUpdate: Function;
}): JSX.Element => {
  // State to manage the current selected role
  const [role, setRole] = useState<string>(params.row.role);

  /**
   * Handles the change event of the select dropdown.
   * Updates the role state with the new selected value.
   *
   * @param {SelectChangeEvent} event - The event object containing the new role value.
   */
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  // Define available roles for selection
  const roles = [
    {
      value: "admin",
    },
    {
      value: "user",
    },
  ];

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Role</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={role}
        label="Role"
        onChange={handleChange}
      >
        {roles.map((item, index) => (
          <MenuItem
            onClick={() => handleUpdate(params.row._id, { role: item.value })}
            key={item.value + index}
            value={item.value}
          >
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RoleAction;
