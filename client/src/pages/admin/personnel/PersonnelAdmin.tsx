import { Box, Button, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import api from "apis/api";
import Action from "components/admin/action/Action";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Personal } from "models/personal";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * PersonnelAdmin: A component for managing personnel records.
 *
 * This component displays a DataGrid of personnel data with options to view, update,
 * and delete records. It includes columns for ID, timestamps, visibility status, name,
 * position, and avatar. It also provides action buttons for editing, reviewing, updating,
 * and deleting personnel entries. Fetches personnel data and updates state accordingly.
 *
 * @component
 * @returns {JSX.Element} The rendered DataGrid for managing personnel records.
 */
const PersonnelAdmin = (): JSX.Element => {
  // Column definitions for the personnel data grid
  const columns: GridColDef[] = [
    {
      field: "_id", // Field for the unique identifier
      headerName: "ID", // Header name displayed in the grid
      width: 150, // Column width
    },
    {
      field: "createdAt", // Field for creation date
      headerName: "Created At", // Header name displayed in the grid
      width: 180, // Column width
      // Format the creation date
      valueFormatter: (params) => {
        return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "updatedAt", // Field for last update date
      headerName: "Updated At", // Header name displayed in the grid
      width: 180, // Column width
      // Format the update date
      valueFormatter: (params) => {
        if (params.value)
          return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "visible", // Field indicating visibility status
      headerName: "Visible", // Header name displayed in the grid
      width: 80, // Column width
    },
    {
      field: "name", // Field for personnel name
      headerName: "Name", // Header name displayed in the grid
      width: 150, // Column width
      // Retrieve the name from the personnels array based on ID
      valueGetter: ({ id }) => {
        const item = personnels.find((item) => item._id === id);
        return item?.vi.name;
      },
    },
    {
      field: "possition", // Field for personnel position
      headerName: "Position", // Header name displayed in the grid
      width: 200, // Column width
      // Retrieve the position from the personnels array based on ID
      valueGetter: ({ id }) => {
        const item = personnels.find((item) => item._id === id);
        return item?.vi.possition;
      },
    },
    {
      field: "avatar", // Field for avatar image
      headerName: "Avatar", // Header name displayed in the grid
      width: 200, // Column width
      // Render the avatar image in the cell
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={1}
            padding={3}
          >
            <Box
              component="img"
              width={1}
              src={process.env.REACT_APP_URL_API + "/" + params?.value}
            ></Box>
          </Box>
        );
      },
    },
    {
      field: "action", // Field for action buttons
      headerName: "Action", // Header name displayed in the grid
      sortable: false, // Disable sorting for this column
      width: 100, // Column width
      // Render action buttons in the cell
      renderCell: (params: any) => {
        return (
          <Action
            params={params}
            type={["update", "delete", "edit"]}
            name="personnel"
            handleEditClick={() =>
              navigate(`/admin/personnel/edit/${params.row._id}`)
            }
            handleReviewClick={() => {}}
            handleUpdateClick={() =>
              updatePersonnel(params.row._id, { visible: !params.row.visible })
            }
            handleDeleteClick={() => deletePersonnel(params.row._id)}
          ></Action>
        );
      },
    },
  ];

  // State to hold the list of personnels
  const [personnels, setPersonnels] = useState<Personal[]>([]);

  // Hook for navigation
  const navigate = useNavigate();

  // Custom hook for Axios with authentication
  const axiosPrivate = useAxiosPrivate();

  /**
   * Fetches and updates the personnel list with optional filters.
   *
   * @param {number | null} page - Page number for pagination.
   * @param {number | null} limit - Number of items per page.
   * @param {boolean | null} visible - Filter by visibility.
   * @returns {Promise<void>}
   */
  const getPersonnelList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ): Promise<void> => {
    await api
      .getPersonnelList(page, limit, visible)
      .then((response) => {
        if (response.status === 200) setPersonnels(response.data.personnels);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  /**
   * Updates a personnel's data by ID.
   *
   * @param {string} id - Personnel ID to update.
   * @param {any} data - Data to update the personnel with.
   * @returns {Promise<void>}
   */
  const updatePersonnel = async (id: string, data: any): Promise<void> => {
    try {
      const response = await axiosPrivate.post(
        `/personnel/admin/update/${id}`,
        { ...data }
      );
      if (response.status === 200) {
        toast.success("Update successful");
        getPersonnelList(null, null, null); // Refresh list
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Deletes a personnel item by ID.
   *
   * @param {string} id - Personnel ID to delete.
   * @returns {Promise<void>}
   */
  const deletePersonnel = async (id: string): Promise<void> => {
    try {
      const response = await axiosPrivate.delete(
        `/personnel/admin/delete/${id}`
      );
      if (response.status === 204) {
        toast.success("Delete successful");
        getPersonnelList(null, null, null); // Refresh list
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Fetch personnel list on component mount
  useEffect(() => {
    getPersonnelList(null, null, null);
  }, []);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Personnel | Admin</title>
      </Helmet>
      {/* Container for the main content with spacing between elements */}
      <Grid container spacing={2}>
        {/* Grid item for the button to create new personnel */}
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            // Navigate to the personnel creation page on click
            onClick={() => navigate("/admin/personnel/create")}
            variant="contained"
            sx={{ padding: 1.5 }}
          >
            Create Personnel
          </Button>
        </Grid>
        {/* Separator line */}
        <Grid item xs={12}>
          <hr />
        </Grid>
        {/* Grid item for displaying the personnel data grid */}
        <Grid item xs={12}>
          <DataGrid
            // Pass personnel data as rows to the DataGrid
            rows={personnels || []}
            columns={columns}
            rowHeight={150}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5, // Set initial page size for pagination
                },
              },
            }}
            // Apply custom row class based on visibility
            getRowClassName={(row: any) =>
              row.row.visible ? "active" : "unactive"
            }
            // Define unique row ID from data
            getRowId={(row: any) => row._id}
            pageSizeOptions={[5]} // Page size options for pagination
            checkboxSelection // Enable checkbox selection for rows
            disableRowSelectionOnClick // Prevent row selection on click
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PersonnelAdmin;
