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
 * AgricultureAdmin: A component for managing agricultural data within the admin interface.
 *
 * This component provides a data grid for displaying and managing a list of agricultural records. It includes functionality for fetching, updating, and deleting records, as well as navigation for managing tags and creating new entries. The component uses `axiosPrivate` for making authenticated API requests and integrates with `DataGrid` from `@mui/x-data-grid` for rendering the data table.
 *
 * @component
 * @returns {JSX.Element} The rendered AgricultureAdmin component with a data grid, action buttons, and data management functionality.
 */
const AgricultureAdmin = (): JSX.Element => {
  // State to hold the list of agricultural records
  const [agricultures, setAgricultures] = useState<any[]>([]);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Custom hook for making authenticated API requests
  const axiosPrivate = useAxiosPrivate();

  // Columns definition for the DataGrid component
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 170,
      valueFormatter: (params) => {
        // Formats the creation date
        return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 170,
      valueFormatter: (params) => {
        // Formats the update date, if available
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
      field: "day",
      headerName: "Day",
      width: 110,
      valueFormatter: (params) => {
        // Formats the day of the record
        if (params.value) return moment(params?.value).format("DD/MM/YYYY");
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      valueGetter: ({ id }) => {
        // Retrieves the title from the agricultures state
        const item = agricultures.find((item) => item._id === id);
        return item.vi.title;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      valueGetter: ({ id }) => {
        // Retrieves the description from the agricultures state
        const item = agricultures.find((item) => item._id === id);
        return item.vi.description;
      },
    },
    {
      field: "poster",
      headerName: "Poster",
      width: 200,
      renderCell: (params) => {
        // Renders the poster image for each record
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
              src={
                process.env.REACT_APP_URL_API + "/" + params?.row?.vi?.poster
              }
            />
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params: any) => {
        // Renders action buttons for each record
        return (
          <Action
            params={params}
            type={["update", "delete", "edit", "review"]}
            name="news"
            handleEditClick={() =>
              navigate(`/admin/agriculture/edit/${params.row._id}`)
            }
            handleReviewClick={() =>
              navigate(`/admin/agriculture/review/${params.row._id}`)
            }
            handleUpdateClick={() =>
              updateAgriculture(params.row._id, {
                visible: !params.row.visible,
              })
            }
            handleDeleteClick={() => deleteAgriculture(params.row._id)}
          />
        );
      },
    },
  ];

  /**
   * Fetches the list of agricultural records and updates the state.
   *
   * @param {number | null} page - The page number for pagination.
   * @param {number | null} limit - The number of records to fetch per page.
   * @param {boolean | null} visible - Flag indicating whether to fetch only visible records.
   * @param {string | ""} tag - Tag filter to apply to the search query.
   * @param {string | ""} lang - Language filter to apply to the search query.
   */
  const getAgricultureList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    tag: string | "",
    lang: string | ""
  ) => {
    try {
      const response = await api.getAgricultureList(
        page,
        limit,
        visible,
        tag,
        lang
      );
      if (response.status === 200) {
        setAgricultures(response.data.agricultures);
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Updates an existing agricultural record.
   *
   * @param {string} id - The ID of the agricultural record to update.
   * @param {any} data - The updated data for the agricultural record.
   */
  const updateAgriculture = async (id: string, data: any) => {
    try {
      const response = await axiosPrivate.post(
        `/agriculture/admin/agriculture/update/${id}`,
        { ...data }
      );
      if (response.status === 200) {
        toast.success("Update successful");
        // Refresh the list of agricultural records after update
        getAgricultureList(null, null, null, "", "");
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Deletes an agricultural record.
   *
   * @param {string} id - The ID of the agricultural record to delete.
   */
  const deleteAgriculture = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(
        `/agriculture/admin/agriculture/delete/${id}`
      );
      if (response.status === 204) {
        toast.success("Delete successful");
        // Refresh the list of agricultural records after deletion
        getAgricultureList(null, null, null, "", "");
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Fetch the list of agricultural records when the component mounts
  useEffect(() => {
    getAgricultureList(null, null, null, "", "");
  }, []);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Agriculture | Admin</title>
      </Helmet>
      <Grid container spacing={2}>
        {/* Action buttons for managing tags and creating new agriculture records */}
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Box display="flex" gap={5}>
            <Button
              onClick={() => navigate("/admin/agriculture/tag")}
              variant="contained"
              sx={{ padding: 1.5 }}
            >
              Tag Management
            </Button>
            <Button
              onClick={() => navigate("/admin/agriculture/create")}
              variant="contained"
              sx={{ padding: 1.5 }}
            >
              Create Agriculture
            </Button>
          </Box>
        </Grid>
        {/* Divider line */}
        <Grid item xs={12}>
          <hr />
        </Grid>
        {/* Data grid for displaying agricultural records */}
        <Grid item xs={12}>
          <DataGrid
            rows={agricultures || []}
            columns={columns}
            rowHeight={150}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowClassName={(row: any) =>
              row.row.visible ? "active" : "unactive"
            }
            getRowId={(row: any) => row._id}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AgricultureAdmin;
