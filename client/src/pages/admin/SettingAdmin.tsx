import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "apis/axios";
import Action from "components/admin/action/Action";
import RoleAction from "components/admin/action/RoleAction";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { User } from "models/user";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { getToken } from "utils/auth";
const { default: jwt_decode } = require("jwt-decode");

/**
 * SettingAdmin: A component for managing user settings, including
 * listing, updating, and deleting users. Displays user information
 * in a DataGrid with actions for role updates and user management.
 *
 * This component handles fetching user data, rendering it in a
 * DataGrid, and providing functionality for role updates and user
 * deletions. It uses authentication tokens and private axios instance
 * for secure API interactions.
 *
 * @component
 * @returns {JSX.Element} The rendered component for user management
 */
const SettingAdmin = (): JSX.Element => {
  // Column definitions for the DataGrid
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
        // Format creation date
        return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      valueFormatter: (params) => {
        // Format update date, if available
        if (params.value)
          return moment(params?.value).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "verified",
      headerName: "Verified",
      width: 80,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      renderCell: (params: any) => {
        // Render role cell with RoleAction component for role updates
        return (
          <RoleAction params={params} handleUpdate={updateUser}></RoleAction>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params: any) => {
        // Render action buttons for user management
        return (
          <Action
            params={params}
            type={params.row._id !== decode.userId ? ["delete"] : []}
            name="user"
            handleEditClick={() => {}}
            handleReviewClick={() => {}}
            handleUpdateClick={() => {}}
            handleDeleteClick={() => deleteUser(params.row._id)}
          ></Action>
        );
      },
    },
  ];

  // State for storing user data
  const [users, setUsers] = useState<User[]>([]);

  // Retrieve access token from authentication utility
  const { access_token } = getToken();

  // Decode JWT token to get user ID
  const decode = jwt_decode(access_token);

  // Axios instance for authenticated API calls
  const axiosPrivate = useAxiosPrivate();

  /**
   * Fetches the list of users from the API.
   */
  const getUserList = async () => {
    try {
      const response = await axios.get("/auth", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status === 200) setUsers(response.data.users);
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Updates a user's data by ID.
   *
   * @param {string} id - The ID of the user to update
   * @param {Object} data - The data to update
   */
  const updateUser = async (id: string, data: any) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await axiosPrivate.post(
        "/auth/update/" + id,
        {
          ...data,
        },
        config
      );

      if (response.status === 200) {
        toast.success("Update successful");
        getUserList(); // Refresh user list
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Deletes a user by ID.
   *
   * @param {string} id - The ID of the user to delete
   */
  const deleteUser = async (id: string) => {
    try {
      const response = await axiosPrivate.delete("/auth/delete/" + id);

      if (response.status === 204) {
        toast.success("Delete successful");
        getUserList(); // Refresh user list
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Fetch user list on component mount
  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Setting | Admin</title>
      </Helmet>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => navigate("/admin/personnel/create")}
            variant="contained"
            sx={{ padding: 1.5 }}
          >
            Create User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid> */}
        {/* Grid item for DataGrid display */}
        <Grid item xs={12}>
          {/* DataGrid to display list of users */}
          <DataGrid
            rows={users || []}
            columns={columns}
            rowHeight={100}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowClassName={(row: any) =>
              row.row.verified ? "active" : "unactive"
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

export default SettingAdmin;
