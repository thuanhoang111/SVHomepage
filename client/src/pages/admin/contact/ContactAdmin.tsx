import { Button, Grid } from "@mui/material";
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
 * ContactAdmin: A component for managing contacts in the admin interface.
 *
 * This component displays a list of contacts in a DataGrid, provides functionality to
 * update or delete contacts, and allows for editing contact details. It includes methods
 * to fetch contact data from the server and handle various actions.
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing contacts
 */
const ContactAdmin = (): JSX.Element => {
  /**
   * Columns configuration for the DataGrid.
   *
   * This configuration defines the columns displayed in the DataGrid, including their
   * headers, widths, and formatting.
   */
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      valueFormatter: (params) => {
        // Format the creation date for display
        return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      valueFormatter: (params) => {
        // Format the last updated date for display, if available
        if (params.value)
          return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    { field: "default", headerName: "Default", width: 80 },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      valueGetter: ({ id }) => {
        // Retrieve the address from contacts based on the ID
        const item = contacts.find((item) => item._id === id);
        return item.vi.address;
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
      valueGetter: ({ id }) => {
        // Retrieve the phone number from contacts based on the ID
        const item = contacts.find((item) => item._id === id);
        return item.vi.phone;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: ({ id }) => {
        // Retrieve the email from contacts based on the ID
        const item = contacts.find((item) => item._id === id);
        return item.vi.email;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params: any) => {
        // Render action buttons for each row
        return (
          <Action
            params={params}
            type={[params.row.default ? "" : "update", "delete", "edit"]}
            name="contact"
            handleEditClick={() =>
              navigate(`/admin/contact/edit/${params.row._id}`)
            }
            handleReviewClick={() => {}}
            handleUpdateClick={() =>
              updateContact(params.row._id, { default: true })
            }
            handleDeleteClick={() => deleteContact(params.row._id)}
          ></Action>
        );
      },
    },
  ];

  // State to store the list of contacts
  const [contacts, setContacts] = useState<any[]>([]);

  // Hook for navigation
  const navigate = useNavigate();

  // Custom hook for making authenticated requests
  const axiosPrivate = useAxiosPrivate();

  /**
   * Fetches the list of contacts from the server based on provided parameters.
   *
   * @param {number | null} page - The page number for pagination
   * @param {number | null} limit - The number of items per page
   * @param {boolean | null} defaultContact - Filter by default contact status
   */
  const getContactList = async (
    page: number | null,
    limit: number | null,
    defaultContact: boolean | null
  ) => {
    try {
      const response = await api.getContactList(page, limit, defaultContact);
      if (response.status === 200) setContacts(response.data.contacts);
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Updates a contact's details on the server.
   *
   * @param {string} id - The ID of the contact to update
   * @param {Object} data - The data to update the contact with
   */
  const updateContact = async (id: string, data: any) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axiosPrivate.post(
        `/contact/admin/update/${id}`,
        { ...data },
        config
      );
      if (response.status === 200) {
        toast.success("Update successful");
        getContactList(null, null, null); // Refresh contact list after update
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Deletes a contact from the server.
   *
   * @param {string} id - The ID of the contact to delete
   */
  const deleteContact = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(`/contact/admin/delete/${id}`);
      if (response.status === 204) {
        toast.success("Delete successful");
        getContactList(null, null, null); // Refresh contact list after delete
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Effect to fetch the contact list when the component mounts
  useEffect(() => {
    getContactList(null, null, null);
  }, []);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Contact | Admin</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          {/* Button to navigate to the contact creation page */}
          <Button
            onClick={() => navigate("/admin/contact/create")}
            variant="contained"
            sx={{ padding: 1.5 }}
          >
            Create Contact
          </Button>
        </Grid>
        <Grid item xs={12}>
          <hr /> {/* Separator line */}
        </Grid>
        <Grid item xs={12}>
          {/* Data grid to display contacts */}
          <DataGrid
            rows={contacts || []}
            columns={columns}
            rowHeight={100}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5, // Number of rows per page
                },
              },
            }}
            getRowClassName={
              (row: any) => (row.row.default ? "active" : "unactive") // Apply CSS class based on default status
            }
            getRowId={(row: any) => row._id} // Unique identifier for each row
            pageSizeOptions={[5]} // Pagination options
            checkboxSelection // Enable row selection checkboxes
            disableRowSelectionOnClick // Disable row selection on row click
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ContactAdmin;
