import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Switch } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import api from "apis/api";
import Action from "components/admin/action/Action";
import DropZoneField from "components/admin/input/DropZoneField";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

// Validation schema for partner form using yup
const schema = yup.object().shape({
  // Indicates whether the partner is visible
  visible: yup.bool().required(),
  // File attachment for the partner (e.g., image)
  file: yup.mixed().required(),
});

/**
 * PartnerAdmin: A component for managing partners, including
 * listing, creating, updating, and deleting partners.
 *
 * This component handles form submission, fetches partner data for
 * displaying in a DataGrid, and includes functionality for creating,
 * updating, and deleting partners. It also manages form visibility
 * and displays validation errors.
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing partners
 */
const PartnerAdmin = (): JSX.Element => {
  // Form handler setup using react-hook-form and yup for validation
  const formHandler = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  // Column definitions for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      valueFormatter: (params) => {
        // Format creation date
        return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
      valueFormatter: (params) => {
        // Format update date, if available
        if (params.value)
          return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "visible",
      headerName: "Visible",
      width: 100,
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        // Render image cell with centered image
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
        // Render action buttons for update and delete
        return (
          <Action
            params={params}
            type={["update", "delete"]}
            name="partner"
            handleEditClick={() => {}}
            handleReviewClick={() => {}}
            handleUpdateClick={() =>
              updatePartner(params.row._id, { visible: !params.row.visible })
            }
            handleDeleteClick={() => detelePartner(params.row._id)}
          ></Action>
        );
      },
    },
  ];

  // State for storing partners data
  const [partners, setPartners] = useState<any[]>([]);

  // Axios instance for authenticated API calls
  const axiosPrivate = useAxiosPrivate();

  // State to manage form visibility
  const [show, setShow] = useState<boolean>(false);

  /**
   * Fetches the list of partners with optional pagination and visibility filter.
   *
   * @param {number | null} page - Page number for pagination
   * @param {number | null} limit - Number of items per page
   * @param {boolean | null} visible - Filter by visibility status
   */
  const getPartnerList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ) => {
    await api
      .getPartnerList(page, limit, visible)
      .then((response) => {
        if (response.status === 200) setPartners(response.data.partners);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  /**
   * Updates a partner's data by ID.
   *
   * @param {string} id - The ID of the partner
   * @param {Object} data - The data to update
   */
  const updatePartner = async (id: string, data: any) => {
    try {
      const response = await axiosPrivate.post(`/partner/admin/update/${id}`, {
        ...data,
      });
      if (response.status === 200) {
        toast.success("Update successful");
        getPartnerList(null, null, null); // Refresh partner list
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Deletes a partner by ID.
   *
   * @param {string} id - The ID of the partner to delete
   */
  const detelePartner = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(`/partner/admin/delete/${id}`);
      if (response.status === 204) {
        toast.success("Delete successful");
        getPartnerList(null, null, null); // Refresh partner list
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Fetch the partner list on component mount
  useEffect(() => {
    getPartnerList(null, null, null);
  }, []);

  /**
   * Creates a new partner.
   *
   * @param {Object} values - The form values for the new partner
   */
  const createPartner = async (values: any) => {
    try {
      const response = await axiosPrivate.post("/partner/admin/create", {
        ...values,
      });
      if (response.status === 201) {
        toast.success("Create successful");
        getPartnerList(null, null, null); // Refresh partner list
        formHandler.reset(); // Reset form
        setShow(false); // Hide form
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Display form errors using toast notifications
  useEffect(() => {
    const arrErroes = Object.values(formHandler.formState.errors);
    if (arrErroes.length > 0) {
      toast.error(String(arrErroes[0]?.message), {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [formHandler.formState.errors]);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Partner | Admin</title>
      </Helmet>
      <Grid
        container
        columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        spacing={2}
      >
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          display="flex"
          justifyContent={show ? "space-between" : "flex-end"}
        >
          {/* Button to toggle form visibility */}
          {show && (
            <FormProvider {...formHandler}>
              <form
                onSubmit={formHandler.handleSubmit(createPartner)}
                style={{}}
              >
                <Box
                  p={3}
                  sx={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
                >
                  <Grid container minHeight={300} minWidth={600} spacing={10}>
                    <Grid item xs={6}>
                      {/* DropZoneField for file upload (e.g., partner image) */}
                      <DropZoneField
                        accept={{
                          "image/*": [".jpeg", ".jpg", ".png"],
                        }}
                        name="file"
                        label="Partner image"
                      ></DropZoneField>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height={1}
                        gap={1}
                      >
                        {/* Visibility switch for partner */}
                        <Box>
                          <label>Partner visible</label>
                          <Controller
                            name="visible"
                            defaultValue={false}
                            control={formHandler.control}
                            render={({ field: { value, onChange } }) => (
                              <Switch
                                onChange={(e) => onChange(e.target.checked)}
                                checked={value}
                              />
                            )}
                          />
                        </Box>
                        <Button
                          sx={{ padding: 1.5 }}
                          variant="contained"
                          type="submit"
                        >
                          Create Partner
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </FormProvider>
          )}
          {/* Button to show/hide create form */}
          <Box>
            <Button
              onClick={() => setShow((prev) => !prev)}
              variant="contained"
              sx={{ padding: 1.5, width: 160 }}
            >
              {show ? "Hide Create" : "Create Partner"}
            </Button>
          </Box>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <hr />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          {/* DataGrid to display list of partners */}
          <DataGrid
            rows={partners || []}
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

export default PartnerAdmin;
