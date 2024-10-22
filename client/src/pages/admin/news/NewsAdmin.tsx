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
 * NewsAdmin: Manages the news list with functionalities for displaying, updating, and deleting news.
 *
 * This component uses Material-UI's DataGrid for displaying news items and includes functionalities
 * for updating and deleting news entries. It utilizes hooks for state management, side effects, and API calls.
 *
 * @component
 * @returns {JSX.Element} The news management interface
 */
const NewsAdmin = (): JSX.Element => {
  // Define columns for DataGrid
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
        return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 170,
      valueFormatter: (params) => {
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
        if (params.value) return moment(params?.value).format("DD/MM/YYYY");
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      valueGetter: ({ id }) => {
        const item = newss.find((item) => item._id === id);
        return item.vi.title;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      valueGetter: ({ id }) => {
        const item = newss.find((item) => item._id === id);
        return item.vi.description;
      },
    },
    {
      field: "poster",
      headerName: "Poster",
      width: 200,
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
              src={
                process.env.REACT_APP_URL_API + "/" + params?.row?.vi?.poster
              }
            ></Box>
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
        return (
          <Action
            params={params}
            type={["update", "delete", "edit", "review"]}
            name="news"
            handleEditClick={() =>
              navigate(`/admin/news/edit/${params.row._id}`)
            }
            handleReviewClick={() =>
              navigate(`/admin/news/review/${params.row._id}`)
            }
            handleUpdateClick={() =>
              updateNews(params.row._id, { visible: !params.row.visible })
            }
            handleDeleteClick={() => deleteNews(params.row._id)}
          ></Action>
        );
      },
    },
  ];

  const [newss, setNewss] = useState<any[]>([]);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  /**
   * Fetches the list of news items from the API.
   *
   * @param {number | null} page - The page number for pagination, or null for no pagination.
   * @param {number | null} limit - The number of items per page, or null for no limit.
   * @param {boolean | null} visible - Filter by visibility status.
   * @param {string | null} year - Filter by year.
   */
  const getNewsList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    year: string | null
  ) => {
    await api
      .getNewsList(page, limit, visible, year)
      .then((response) => {
        if (response.status === 200) setNewss(response.data.newss);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  /**
   * Updates a news item.
   *
   * @param {string} id - The ID of the news item to update.
   * @param {any} data - The data to update the news item with.
   */
  const updateNews = async (id: string, data: any) => {
    try {
      const response = await axiosPrivate.post(
        `/news/admin/news/update/${id}`,
        {
          ...data,
        }
      );
      if (response.status === 200) {
        toast.success("Update successful");
        getNewsList(null, null, null, "");
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Deletes a news item.
   *
   * @param {string} id - The ID of the news item to delete.
   */
  const deleteNews = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(
        `/news/admin/news/delete/${id}`
      );
      if (response.status === 204) {
        toast.success("Delete successful");
        getNewsList(null, null, null, "");
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Fetch news list on component mount
  useEffect(() => {
    getNewsList(null, null, null, "");
  }, []);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>News | Admin</title>
      </Helmet>
      <Grid container spacing={2}>
        {/* Button for creating new news */}
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => navigate("/admin/news/create")}
            variant="contained"
            sx={{ padding: 1.5 }}
          >
            Create News
          </Button>
        </Grid>

        {/* Separator line */}
        <Grid item xs={12}>
          <hr />
        </Grid>

        {/* DataGrid to display the list of news */}
        <Grid item xs={12}>
          <DataGrid
            rows={newss || []} // Data to be displayed in the grid
            columns={columns} // Column definitions for the grid
            rowHeight={150} // Height of each row in the grid
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5, // Default number of rows per page
                },
              },
            }}
            getRowClassName={
              (row: any) => (row.row.visible ? "active" : "unactive") // Apply CSS class based on visibility
            }
            getRowId={(row: any) => row._id} // Unique identifier for each row
            pageSizeOptions={[5]} // Options for pagination page sizes
            checkboxSelection // Enable checkbox selection
            disableRowSelectionOnClick // Prevent row selection on cell click
          />
        </Grid>
      </Grid>
    </>
  );
};

export default NewsAdmin;
