import { Box, Button, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import api from "apis/api";
import Action from "components/admin/action/Action";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * FeedbackAdmin: A component for managing feedback data in admin mode.
 *
 * This component displays a list of feedbacks in a table format with various columns,
 * including options to update or delete feedback entries. It handles fetching feedbacks,
 * updating feedback data, and deleting feedback entries.
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing feedback data
 */
const FeedbackAdmin = (): JSX.Element => {
  /**
   * Columns configuration for the feedback data grid.
   * Defines the structure and behavior of each column in the grid.
   */
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      valueFormatter: (params) => {
        // Format creation date using moment.js
        return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      valueFormatter: (params) => {
        // Format update date using moment.js
        if (params.value)
          return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "visible",
      headerName: "Visible",
      width: 80,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      valueGetter: ({ id }) => {
        // Find the feedback item by ID and return its name
        const item = feedbacks.find((item) => item._id === id);
        return item.vi.name;
      },
    },
    {
      field: "content",
      headerName: "Content",
      width: 200,
      valueGetter: ({ id }) => {
        // Find the feedback item by ID and return its content
        const item = feedbacks.find((item) => item._id === id);
        return item.vi.content;
      },
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 200,
      renderCell: (params) => {
        // Render the avatar image
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
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params: any) => {
        // Render action buttons for update, delete, and edit
        return (
          <Action
            params={params}
            type={["update", "delete", "edit"]}
            name="feedback"
            handleEditClick={() =>
              navigate(`/admin/feedback/edit/${params.row._id}`)
            }
            handleReviewClick={() => {}}
            handleUpdateClick={() =>
              updateFeedback(params.row._id, { visible: !params.row.visible })
            }
            handleDeleteClick={() => deleteFeedback(params.row._id)}
          ></Action>
        );
      },
    },
  ];

  // State to manage feedback data
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Custom hook for making authenticated requests
  const axiosPrivate = useAxiosPrivate();

  /**
   * Fetches a list of feedbacks with optional pagination and visibility filter.
   *
   * @param {number | null} page - The page number for pagination
   * @param {number | null} limit - The number of items per page
   * @param {boolean | null} visible - Filter feedbacks by visibility
   */
  const getFeedbackList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ) => {
    await api
      .getFeedbackList(page, limit, visible)
      .then((response) => {
        // Update state with the fetched feedbacks
        if (response.status === 200) setFeedbacks(response.data.feedbacks);
      })
      .catch((error: any) => {
        // Handle error
        toast.error(error.response.data.error.message);
      });
  };

  /**
   * Updates feedback data by ID with new data.
   *
   * @param {string} id - The ID of the feedback to update
   * @param {Object} data - The new data for the feedback
   */
  const updateFeedback = async (id: string, data: any) => {
    try {
      const response = await axiosPrivate.post(`/feedback/admin/update/${id}`, {
        ...data,
      });
      if (response.status === 200) {
        toast.success("Update successful");
        getFeedbackList(null, null, null);
      }
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Deletes feedback data by ID.
   *
   * @param {string} id - The ID of the feedback to delete
   */
  const deleteFeedback = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(
        `/feedback/admin/delete/${id}`
      );
      if (response.status === 204) {
        toast.success("Delete successful");
        getFeedbackList(null, null, null);
      }
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  // Effect to fetch the feedback list on component mount
  useEffect(() => {
    getFeedbackList(null, null, null);
  }, []);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Feedback | Admin</title>
      </Helmet>
      {/* Container for the grid layout */}
      <Grid container spacing={2}>
        {/* Button to navigate to feedback creation page */}
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => navigate("/admin/feedback/create")}
            variant="contained"
            sx={{ padding: 1.5 }}
          >
            Create Feedback
          </Button>
        </Grid>

        {/* Separator line */}
        <Grid item xs={12}>
          <hr />
        </Grid>

        {/* Data grid for displaying feedback list */}
        <Grid item xs={12}>
          <DataGrid
            rows={feedbacks || []} // Data to populate the grid, defaulting to an empty array if feedbacks is not yet available
            columns={columns} // Columns configuration for the grid
            rowHeight={150} // Height of each row in the grid
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5, // Default number of rows per page
                },
              },
            }}
            getRowClassName={
              (row: any) => (row.row.visible ? "active" : "unactive") // Apply CSS class based on the visibility of the row
            }
            getRowId={(row: any) => row._id} // Unique identifier for each row
            pageSizeOptions={[5]} // Options for page sizes
            checkboxSelection // Enable selection checkboxes for rows
            disableRowSelectionOnClick // Disable row selection when clicking on cells
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FeedbackAdmin;
