import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import api from "apis/api";
import Action from "components/admin/action/Action";
import SimpleTextField from "components/admin/input/SimpleTextField";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Tag } from "models/tag";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  // Indicates whether the item is visible or not.
  // This should be a boolean value (true or false).
  visible: yup.bool().required(),
  // Represents details in Vietnamese.
  // This should be a string that holds the required Vietnamese information.
  vi: yup.string().required(),
  // Represents details in Japanese.
  // This should be a string that holds the required Japanese information.
  jp: yup.string().required(),
});

/**
 * TagAdmin: A component for managing tags in admin mode.
 *
 * This component provides functionality to create, update, and delete tags. It includes
 * a form for tag data, displays a list of tags in a grid, and handles actions such as
 * editing and deleting tags.
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing tags
 */
const TagAdmin = (): JSX.Element => {
  // Extract mode and id from URL parameters
  const { mode, id } = useParams<{ mode?: string; id?: string }>();

  // State to manage the list of tags and a single tag's details
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState<Tag>();

  // Custom hook for making authenticated requests
  const axiosPrivate = useAxiosPrivate();

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // State to manage visibility of certain UI elements
  const [show, setShow] = useState<boolean>(false);

  // Form handler setup using react-hook-form and yup for validation
  const formHandler = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  // Destructure form methods
  const { control, setValue } = formHandler;

  /**
   * Columns configuration for the tags data grid.
   *
   * This configuration defines the columns displayed in the data grid, including their
   * headers, widths, and formatting.
   */
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      valueFormatter: (params) =>
        moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      valueFormatter: (params) =>
        params.value ? moment(params?.value).format("DD/MM/YYYY hh:mm A") : "",
    },
    { field: "visible", headerName: "Visible", width: 80 },
    { field: "vi", headerName: "Vi Tag", width: 200 },
    { field: "jp", headerName: "Jp Tag", width: 200 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params: any) => (
        <Action
          params={params}
          type={["update", "delete", "edit"]}
          name="tag"
          handleEditClick={() => {
            navigate(`/admin/agriculture/tag/edit/${params.row._id}`);
            setShow(true);
          }}
          handleReviewClick={() => {}}
          handleUpdateClick={() =>
            updateTag(params.row._id, { visible: !params.row.visible })
          }
          handleDeleteClick={() => deleteTag(params.row._id)}
        />
      ),
    },
  ];

  /**
   * Handles form errors and displays error messages using toast notifications.
   */
  useEffect(() => {
    const arrErrors = Object.values(formHandler.formState.errors);
    if (arrErrors.length > 0) {
      toast.error(String(arrErrors[0]?.message), {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [formHandler.formState.errors]);

  /**
   * Creates or updates a tag based on the mode (create or edit).
   *
   * @param {Object} values - The form values for the tag
   */
  const createOrUpdateTag = async (values: any) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      };
      let response: any;
      if (mode === "edit") {
        response = await axiosPrivate.post(
          `/agriculture/admin/tag/update/${id}`,
          { ...values },
          config
        );
      } else {
        response = await axiosPrivate.post(
          "/agriculture/admin/tag/create",
          { ...values },
          config
        );
      }
      if (response.status === 201 || response.status === 200) {
        toast.success(
          response.status === 201 ? "Create successful" : "Update successful"
        );
        navigate("/admin/agriculture/tag");
        getTagList(null, null, null, null, null);
        formHandler.reset();
        setShow(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Updates a tag's visibility or other properties.
   *
   * @param {string} id - The ID of the tag to update
   * @param {Object} data - The data to update the tag with
   */
  const updateTag = async (id: string, data: any) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axiosPrivate.post(
        `/agriculture/admin/tag/update/${id}`,
        { ...data },
        config
      );
      if (response.status === 200) {
        toast.success("Update successful");
        getTagList(null, null, null, null, null);
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Deletes a tag by its ID.
   *
   * @param {string} id - The ID of the tag to delete
   */
  const deleteTag = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(
        `/agriculture/admin/tag/delete/${id}`
      );
      if (response.status === 204) {
        toast.success("Delete successful");
        getTagList(null, null, null, null, null);
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Fetches the list of tags based on provided parameters.
   *
   * @param {number | null} page - The page number for pagination
   * @param {number | null} limit - The number of items per page
   * @param {boolean | null} visible - Filter by visibility status
   * @param {string | null} vi - Filter by Vietnamese tag
   * @param {string | null} jp - Filter by Japanese tag
   */
  const getTagList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    vi: string | null,
    jp: string | null
  ) => {
    await api
      .getTagList(page, limit, visible, vi, jp)
      .then((response) => {
        if (response.status === 200) setTags(response.data.tags);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  /**
   * Fetches the details of a specific tag by ID.
   *
   * @param {string} id - The ID of the tag
   */
  const getTagDetail = async (id: string) => {
    await api
      .getTagDetail(id)
      .then((response) => {
        setTag(response.data.tag);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  // Effect to fetch tag details when in edit mode and ID is present
  useEffect(() => {
    if (mode === "edit" && id) getTagDetail(id);
  }, [mode, id]);

  // Effect to fetch the list of tags on component mount
  useEffect(() => {
    getTagList(null, null, null, null, null);
  }, []);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Tag | Admin</title>
      </Helmet>
      <Grid
        container
        columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} // Defines the grid layout for different screen sizes
        spacing={2} // Sets the spacing between grid items
      >
        <Grid item xs={12} container spacing={2}>
          {/* Container for form and button */}
          <Grid item xs={12}>
            {show && (
              <FormProvider {...formHandler}>
                {/* Form context provider to manage form state and validation */}
                <form
                  onSubmit={formHandler.handleSubmit(createOrUpdateTag)}
                  style={{}} // Inline styles for the form
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      display="flex"
                      justifyContent="space-around"
                    >
                      {/* Header and controls */}
                      <Typography textAlign="center" variant="h4">
                        {mode === "edit" ? "Edit" : "Create"} The Tag
                      </Typography>
                      <Box>
                        <label>Tag visible</label>
                        <Controller
                          name="visible"
                          defaultValue={false}
                          control={control}
                          render={({ field: { value, onChange } }) => {
                            return (
                              <Switch
                                onChange={(e) => onChange(e.target.checked)}
                                checked={value}
                              />
                            );
                          }}
                        />
                      </Box>
                      <Button
                        variant="contained"
                        sx={{ padding: 1.5 }}
                        type="submit"
                      >
                        {mode === "edit" ? "Edit" : "Create"} Tag
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        sx={{
                          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                        }}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        padding={3}
                      >
                        {/* Vietnamese language section */}
                        <Typography textAlign="center" variant="h6">
                          Vietnamese Language
                        </Typography>
                        <SimpleTextField
                          title="Vi Tag"
                          name="vi"
                          mode={mode}
                          defaultValue={tag?.vi}
                          control={control}
                          {...{ setValue }}
                        ></SimpleTextField>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        sx={{
                          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                        }}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        padding={3}
                      >
                        {/* Japanese language section */}
                        <Typography textAlign="center" variant="h6">
                          Japanese Language
                        </Typography>
                        <SimpleTextField
                          title="Jp Tag"
                          name="jp"
                          mode={mode}
                          defaultValue={tag?.jp}
                          control={control}
                          {...{ setValue }}
                        ></SimpleTextField>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </FormProvider>
            )}
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            {/* Toggle button to show or hide the form */}
            <Button
              onClick={() => {
                setShow((prev) => !prev);
                navigate(
                  !show
                    ? "/admin/agriculture/tag/create"
                    : "/admin/agriculture/tag"
                );
                if (!show) formHandler.reset();
              }}
              variant="contained"
              sx={{ padding: 1.5, width: 160 }}
            >
              {show ? "Hide Create" : "Create Tag"}
            </Button>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <hr /> {/* Separator line */}
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          {/* Data grid to display tags */}
          <DataGrid
            rows={tags || []} // Data to display in the grid
            columns={columns} // Column definitions
            rowHeight={100} // Height of each row
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5, // Number of rows per page
                },
              },
            }}
            getRowClassName={
              (row: any) => (row.row.visible ? "active" : "unactive") // Apply CSS class based on visibility
            }
            getRowId={(row: any) => row._id} // Unique row identifier
            pageSizeOptions={[5]} // Pagination options
            checkboxSelection // Enable row selection checkboxes
            disableRowSelectionOnClick // Disable row selection on row click
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TagAdmin;
