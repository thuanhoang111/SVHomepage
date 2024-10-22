import { yupResolver } from "@hookform/resolvers/yup";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Pagination,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import TitleIcon from "components/home/title/TitleIcon";
import usePagination from "hooks/usePagination";
import { useEffect, useLayoutEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as yup from "yup";

const schemaCreate = yup.object().shape({
  nameViCreate: yup.string().required("Please enter the linkEc name vi !!!"),
  addressViCreate: yup
    .string()
    .required("Please enter the linkEc address vi !!!"),
  phoneViCreate: yup.string().required("Please enter the linkEc phone vi !!!"),
  emailViCreate: yup.string().required("Please enter the linkEc email vi !!!"),
  urlViCreate: yup.string().required("Please enter the linkEc url vi !!!"),
  nameJpCreate: yup.string().required("Please enter the linkEc name jp !!!"),
  addressJpCreate: yup
    .string()
    .required("Please enter the linkEc address jp !!!"),
  phoneJpCreate: yup.string().required("Please enter the linkEc phone jp !!!"),
  emailJpCreate: yup.string().required("Please enter the linkEc email jp !!!"),
  urlJpCreate: yup.string().required("Please enter the linkEc url jp !!!"),
  visible: yup.bool(),
});

const schemaEdit = yup.object().shape({
  nameViEdit: yup.string().required("Please enter the linkEc name vi !!!"),
  addressViEdit: yup
    .string()
    .required("Please enter the linkEc address vi !!!"),
  phoneViEdit: yup.string().required("Please enter the linkEc phone vi !!!"),
  emailViEdit: yup.string().required("Please enter the linkEc email vi !!!"),
  urlViEdit: yup.string().required("Please enter the linkEc url vi !!!"),
  nameJpEdit: yup.string().required("Please enter the linkEc name jp !!!"),
  addressJpEdit: yup
    .string()
    .required("Please enter the linkEc address jp !!!"),
  phoneJpEdit: yup.string().required("Please enter the linkEc phone jp !!!"),
  emailJpEdit: yup.string().required("Please enter the linkEc email jp !!!"),
  urlJpEdit: yup.string().required("Please enter the linkEc url jp !!!"),
});

const fileTypes = ["JPG", "PNG"];

const LinkEcAdmin = () => {
  const { i18n } = useTranslation();

  const [linkEcs, setLinkEcs] = useState<any[]>([]);

  const [reload, setReload] = useState(false);
  const [openDialogVisible, setOpenDialogVisible] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  const [idVisible, setIdVisible] = useState(null);
  const [visible, setVisible] = useState(null);
  const [idRemove, setIdRemove] = useState(null);
  const [idEdit, setIdEdit] = useState(null);
  const [visibleEdit, setVisibleEdit] = useState(null);
  const [nameViEdit, setNameViEdit] = useState(null);
  const [addressViEdit, setAddressViEdit] = useState(null);
  const [phoneViEdit, setPhoneViEdit] = useState(null);
  const [emailViEdit, setEmailViEdit] = useState(null);
  const [urlViEdit, setUrlViEdit] = useState(null);
  const [nameJpEdit, setNameJpEdit] = useState(null);
  const [addressJpEdit, setAddressJpEdit] = useState(null);
  const [phoneJpEdit, setPhoneJpEdit] = useState(null);
  const [emailJpEdit, setEmailJpEdit] = useState(null);
  const [urlJpEdit, setUrlJpEdit] = useState(null);

  const handleClickOpenDialogEdit = (
    id,
    image,
    nameVi,
    addressVi,
    phoneVi,
    emailVi,
    urlVi,
    nameJp,
    addressJp,
    phoneJp,
    emailJp,
    urlJp,
    visibleEdit
  ) => {
    setOpenDialogEdit(true);
    resetEdit();
    setIdEdit(id);
    setImageEdit(image);
    setNameViEdit(nameVi);
    setAddressViEdit(addressVi);
    setPhoneViEdit(phoneVi);
    setEmailViEdit(emailVi);
    setUrlViEdit(urlVi);
    setNameJpEdit(nameJp);
    setAddressJpEdit(addressJp);
    setPhoneJpEdit(phoneJp);
    setEmailJpEdit(emailJp);
    setUrlJpEdit(urlJp);
    setVisibleEdit(visibleEdit);
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
    resetEdit();
    setImageEdit("");
    setIdEdit(null);
    setNameViEdit(null);
    setAddressViEdit(null);
    setPhoneViEdit(null);
    setEmailViEdit(null);
    setUrlViEdit(null);
    setNameJpEdit(null);
    setAddressJpEdit(null);
    setPhoneJpEdit(null);
    setEmailJpEdit(null);
    setUrlJpEdit(null);
    setVisibleEdit(null);
  };

  const handleClickOpenDialogVisible = (id, visible) => {
    setOpenDialogVisible(true);
    setIdVisible(id);
    setVisible(visible);
  };

  const handleCloseDialogVisible = () => {
    setOpenDialogVisible(false);
    setIdVisible(null);
    setVisible(null);
  };

  const handleClickOpenDialogRemove = (id) => {
    setOpenDialogRemove(true);
    setIdRemove(id);
  };

  const handleCloseDialogRemove = () => {
    setOpenDialogRemove(false);
    setIdRemove(null);
  };

  const updateVisibleLinkEc = async (id, visible) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL_API}/linkEcs/${id}/${visible}`
      );
      toast.success(`${visible ? "Show" : "Hide"} the linkEc successfully !!!`);
      setReload((prev) => !prev);
      setOpenDialogVisible(false);
      setIdVisible(null);
      setVisible(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLinkEc = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL_API}/linkEcs/${id}`);
      toast.success("Delete the linkEc successfully !!!");
      setReload((prev) => !prev);
      setOpenDialogRemove(false);
      setIdRemove(null);
      if (_DATA.currentData().length === 1) {
        setPage(page - 1);
        _DATA.jump(page - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Declare function fetchLinkEc to use call api get all document from cooperative collection of database
  const fetchLinkEc = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/linkEcs`
      );
      setLinkEcs(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Declare page to use set current page display
  const [page, setPage] = useState(1);

  // Declare PER_PAGE to use set amount item display every page
  const PER_PAGE = 4;

  // Declare count to use calculate total page
  const count = Math.ceil(linkEcs.length / PER_PAGE);

  // Declare _DATA to use set item for current page
  const _DATA = usePagination(linkEcs, PER_PAGE);

  // Call function fetchLinkEc when component active
  useEffect(() => {
    fetchLinkEc();
  }, [reload]);

  // Set display top page when change page
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [page]);

  // Declare function handleChange to use hanlde when click change page display
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
    reset: resetCreate,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaCreate),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaEdit),
  });

  useEffect(() => {
    const arrErrorsCreate = Object.values(errorsCreate);
    if (arrErrorsCreate.length > 0) {
      toast.error(String(arrErrorsCreate[0]?.message), {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errorsCreate]);

  useEffect(() => {
    const arrErrorsEdit = Object.values(errorsEdit);
    if (arrErrorsEdit.length > 0) {
      toast.error(String(arrErrorsEdit[0]?.message), {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errorsEdit]);

  const [imageCreate, setImageCreate] = useState("");

  const createLinkEc = async (data) => {
    try {
      if (imageCreate === "") {
        toast.error("Please select a file !!!");
      } else {
        await axios.post(`${process.env.REACT_APP_URL_API}/linkEcs`, {
          image: imageCreate,
          vi: {
            name: data.nameViCreate,
            address: data.addressViCreate,
            phone: data.phoneViCreate,
            email: data.emailViCreate,
            url: data.urlViCreate,
          },
          jp: {
            name: data.nameJpCreate,
            address: data.addressJpCreate,
            phone: data.phoneJpCreate,
            email: data.emailJpCreate,
            url: data.urlJpCreate,
          },
          visible: data.visible,
        });
        toast.success("Create the linkEc successfully !!!");
        resetCreate();
        setImageCreate("");
        setReload((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [imageEdit, setImageEdit] = useState("");

  const convert2base64Create = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageCreate(reader.result?.toString() || "");
    };
    reader.readAsDataURL(file);
  };

  const handleChangeFileCreate = (file) => {
    convert2base64Create(file);
  };

  const convert2base64Edit = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageEdit(reader.result?.toString() || "");
    };
    reader.readAsDataURL(file);
  };

  const handleChangeFileEdit = (file) => {
    convert2base64Edit(file);
  };

  const editLinkEc = async (data) => {
    try {
      if (imageEdit === "") {
        toast.error("Please select a file !!!");
      } else {
        await axios.put(`${process.env.REACT_APP_URL_API}/linkEcs/${idEdit}`, {
          image: imageEdit,
          vi: {
            name: data.nameViEdit,
            address: data.addressViEdit,
            phone: data.phoneViEdit,
            email: data.emailViEdit,
            url: data.urlViEdit,
          },
          jp: {
            name: data.nameJpEdit,
            address: data.addressJpEdit,
            phone: data.phoneJpEdit,
            email: data.emailJpEdit,
            url: data.urlJpEdit,
          },
          visible: visibleEdit,
        });
        toast.success("Update the linkEc successfully !!!");
        setOpenDialogEdit(false);
        resetEdit();
        setImageEdit("");
        setReload((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid
        container
        columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
        spacing={4}
      >
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <form
            onSubmit={handleSubmitCreate(createLinkEc)}
            autoComplete="off"
            style={{
              background: "#F9FAFC",
              padding: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              gap: 30,
            }}
          >
            <Grid>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={394}
                height={394}
              >
                {imageCreate ? (
                  <Box position="relative">
                    <img
                      src={imageCreate}
                      style={{ padding: 3.5, maxHeight: 380, maxWidth: 380 }}
                      alt="LinkEc"
                    />
                    <Tooltip title="Remove Image">
                      <IconButton
                        size="small"
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        onClick={() => setImageCreate("")}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <FileUploader
                    style={{ width: 380, height: 380 }}
                    handleChange={handleChangeFileCreate}
                    name="file"
                    types={fileTypes}
                  />
                )}
              </Box>
              <Box width={1} display="flex" justifyContent="space-around">
                <FormControlLabel
                  {...registerCreate("visible")}
                  control={<Switch color="secondary" />}
                  label="Visible"
                  labelPlacement="start"
                />
                <Button
                  variant="contained"
                  sx={{ padding: "10px", width: 100 }}
                  type="submit"
                >
                  Create
                </Button>
              </Box>
            </Grid>
            <Grid>
              <TextField
                {...registerCreate("nameViCreate")}
                autoFocus
                margin="dense"
                id="nameViCreate"
                name="nameViCreate"
                label="Name vi"
                type="text"
                fullWidth
              />
              <TextField
                {...registerCreate("addressViCreate")}
                margin="dense"
                id="addressViCreate"
                name="addressViCreate"
                label="Address vi"
                type="text"
                fullWidth
              />
              <TextField
                {...registerCreate("phoneViCreate")}
                margin="dense"
                id="phoneViCreate"
                name="phoneViCreate"
                label="Phone vi"
                type="text"
                fullWidth
              />
              <TextField
                {...registerCreate("emailViCreate")}
                margin="dense"
                id="emailViCreate"
                name="emailViCreate"
                label="Email vi"
                type="text"
                fullWidth
              />
              <TextField
                {...registerCreate("urlViCreate")}
                margin="dense"
                id="urlViCreate"
                name="urlViCreate"
                label="Url vi"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid>
              <TextField
                {...registerCreate("nameJpCreate")}
                margin="dense"
                id="nameJpCreate"
                name="nameJpCreate"
                label="Name jp"
                type="text"
                fullWidth
              />
              <TextField
                {...registerCreate("addressJpCreate")}
                margin="dense"
                id="addressJpCreate"
                name="addressJpCreate"
                label="Address jp"
                type="text"
                fullWidth
              />
              <TextField
                {...registerCreate("phoneJpCreate")}
                margin="dense"
                id="phoneJpCreate"
                name="phoneJpCreate"
                label="Phone jp"
                type="text"
                fullWidth
              />
              <TextField
                {...registerCreate("emailJpCreate")}
                margin="dense"
                id="emailJpCreate"
                name="emailJpCreate"
                label="Email jp"
                type="text"
                fullWidth
              />
              <TextField
                {...registerCreate("urlJpCreate")}
                margin="dense"
                id="urlJpCreate"
                name="urlJpCreate"
                label="Url jp"
                type="text"
                fullWidth
              />
            </Grid>
          </form>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <hr />
        </Grid>
        {linkEcs.length > 0 &&
          _DATA.currentData().map((linkEc, index) => (
            <Grid key={linkEc.Id} item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid
                container
                columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                display="flex"
                height={1}
                padding={3}
                justifyContent="center"
                alignItems="center"
                bgcolor="#F9FAFC"
                style={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
                position="relative"
              >
                <Box position="absolute" right={0} top={0} zIndex={10}>
                  <Tooltip title={`${linkEc.visible ? "Hide" : "Show"} LinkEc`}>
                    <IconButton
                      aria-label="visible"
                      size="small"
                      onClick={() =>
                        handleClickOpenDialogVisible(linkEc.Id, !linkEc.visible)
                      }
                    >
                      {linkEc.visible ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit LinkEc">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        handleClickOpenDialogEdit(
                          linkEc.Id,
                          linkEc.image,
                          linkEc.vi.name,
                          linkEc.vi.address,
                          linkEc.vi.phone,
                          linkEc.vi.email,
                          linkEc.vi.url,
                          linkEc.jp.name,
                          linkEc.jp.address,
                          linkEc.jp.phone,
                          linkEc.jp.email,
                          linkEc.jp.url,
                          linkEc.visible
                        );
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete LinkEc">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleClickOpenDialogRemove(linkEc.Id)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Grid
                  item
                  container
                  columns={{ xs: 1, sm: 1, md: 1, lg: 10, xl: 10 }}
                  rowSpacing={7.5}
                  columnSpacing={6}
                  sx={{ opacity: linkEc.visible ? 1 : 0.3 }}
                >
                  <Grid item xs={1} sm={1} md={1} lg={4} xl={4}>
                    <Box
                      component="img"
                      src={linkEc.image}
                      alt={
                        i18n.resolvedLanguage === "vi"
                          ? linkEc.vi.name
                          : linkEc.jp.name
                      }
                      width={1}
                      sx={{ objectFit: "cover", userSelect: "none" }}
                    ></Box>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={6}
                    xl={6}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <TitleIcon
                      title={
                        i18n.resolvedLanguage === "vi"
                          ? linkEc.vi.name
                          : linkEc.jp.name
                      }
                      fontSize="38px"
                      fontWeight="bold"
                      lineHeight="46px"
                    ></TitleIcon>
                    <Grid
                      container
                      columns={{ xl: 10, lg: 10, md: 10, sm: 1, xs: 1 }}
                      pt={2.5}
                      rowSpacing={0.5}
                    >
                      <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Address:
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
                        <Typography
                          variant="subtitle1"
                          ml={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
                        >
                          {i18n.resolvedLanguage === "vi"
                            ? linkEc.vi.address
                            : linkEc.jp.address}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      columns={{ xl: 10, lg: 10, md: 10, sm: 1, xs: 1 }}
                      pt={2.5}
                      rowSpacing={0.5}
                    >
                      <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Phone:
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
                        <Typography
                          variant="subtitle1"
                          ml={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
                        >
                          {i18n.resolvedLanguage === "vi"
                            ? linkEc.vi.phone
                            : linkEc.jp.phone}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      columns={{ xl: 10, lg: 10, md: 10, sm: 1, xs: 1 }}
                      pt={2.5}
                      rowSpacing={0.5}
                    >
                      <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Email:
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
                        <Typography
                          variant="subtitle1"
                          ml={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
                        >
                          {i18n.resolvedLanguage === "vi"
                            ? linkEc.vi.email
                            : linkEc.jp.email}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      columns={{ xl: 10, lg: 10, md: 10, sm: 1, xs: 1 }}
                      pt={2.5}
                      rowSpacing={0.5}
                    >
                      <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Web:
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
                        <Typography
                          variant="subtitle1"
                          ml={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
                        >
                          <Link
                            href={
                              i18n.resolvedLanguage === "vi"
                                ? linkEc.vi.url
                                : linkEc.jp.url
                            }
                            sx={{ cursor: "pointer" }}
                            target="_blank"
                          >
                            {i18n.resolvedLanguage === "vi"
                              ? linkEc.vi.url
                              : linkEc.jp.url}
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        {count > 1 && (
          <Grid container mt={5} alignItems="end">
            <Pagination
              sx={{ marginX: "auto" }}
              count={count}
              size="large"
              page={page}
              variant="outlined"
              color="primary"
              onChange={handleChange}
            />
          </Grid>
        )}
      </Grid>
      <Dialog open={openDialogVisible} onClose={handleCloseDialogVisible}>
        <DialogTitle display="flex" justifyContent="center">
          <WarningAmberIcon
            sx={{
              color: "#FFC24E",
              fontSize: "40px",
            }}
          ></WarningAmberIcon>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            {`Do you want to ${visible ? "show" : "hide"} the linkEc ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVisible}>Disagree</Button>
          <Button
            onClick={() => updateVisibleLinkEc(idVisible, visible)}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogRemove} onClose={handleCloseDialogRemove}>
        <DialogTitle display="flex" justifyContent="center">
          <WarningAmberIcon
            sx={{
              color: "#FFC24E",
              fontSize: "40px",
            }}
          ></WarningAmberIcon>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            Do you want to delete the linkEc ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogRemove}>Disagree</Button>
          <Button onClick={() => deleteLinkEc(idRemove)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogEdit} onClose={handleCloseDialogEdit}>
        <form onSubmit={handleSubmitEdit(editLinkEc)} autoComplete="off">
          <DialogTitle display="flex" justifyContent="center">
            <ChangeCircleIcon
              sx={{
                color: "#4090d9",
                fontSize: "40px",
              }}
            ></ChangeCircleIcon>
          </DialogTitle>
          <DialogContent>
            <DialogContentText textAlign="center">
              Change the linkEc !
            </DialogContentText>
            <Grid display="flex" flexDirection="column" gap={3}>
              <Grid display="flex" justifyContent="center" alignItems="center">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width={394}
                  height={394}
                >
                  {imageEdit ? (
                    <Box position="relative">
                      <img
                        src={imageEdit}
                        style={{ padding: 3.5, maxHeight: 380, maxWidth: 380 }}
                        alt="LinkEc"
                      />
                      <Tooltip title="Remove Image">
                        <IconButton
                          size="small"
                          sx={{ position: "absolute", top: 0, right: 0 }}
                          onClick={() => setImageEdit("")}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <FileUploader
                      style={{ width: 380, height: 380 }}
                      handleChange={handleChangeFileEdit}
                      name="file"
                      types={fileTypes}
                    />
                  )}
                </Box>
              </Grid>
              <Grid>
                <Typography variant="h5">Vietnamese</Typography>
                <TextField
                  {...registerEdit("nameViEdit")}
                  autoFocus
                  margin="dense"
                  id="nameViEdit"
                  name="nameViEdit"
                  label="Change name vi"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={nameViEdit}
                />
                <TextField
                  {...registerEdit("addressViEdit")}
                  margin="dense"
                  id="addressViEdit"
                  name="addressViEdit"
                  label="Change address vi"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={addressViEdit}
                />
                <TextField
                  {...registerEdit("phoneViEdit")}
                  margin="dense"
                  id="phoneViEdit"
                  name="phoneViEdit"
                  label="Change phone vi"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={phoneViEdit}
                />
                <TextField
                  {...registerEdit("emailViEdit")}
                  margin="dense"
                  id="emailViEdit"
                  name="emailViEdit"
                  label="Change email vi"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={emailViEdit}
                />
                <TextField
                  {...registerEdit("urlViEdit")}
                  margin="dense"
                  id="urlViEdit"
                  name="urlViEdit"
                  label="Change url vi"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={urlViEdit}
                />
              </Grid>
              <Grid>
                <Typography variant="h5">Japanese</Typography>
                <TextField
                  {...registerEdit("nameJpEdit")}
                  margin="dense"
                  id="nameJpEdit"
                  name="nameJpEdit"
                  label="Change name jp"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={nameJpEdit}
                />
                <TextField
                  {...registerEdit("addressJpEdit")}
                  margin="dense"
                  id="addressJpEdit"
                  name="addressJpEdit"
                  label="Change address jp"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={addressJpEdit}
                />
                <TextField
                  {...registerEdit("phoneJpEdit")}
                  margin="dense"
                  id="phoneJpEdit"
                  name="phoneJpEdit"
                  label="Change phone jp"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={phoneJpEdit}
                />
                <TextField
                  {...registerEdit("emailJpEdit")}
                  margin="dense"
                  id="emailJpEdit"
                  name="emailJpEdit"
                  label="Change email jp"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={emailJpEdit}
                />
                <TextField
                  {...registerEdit("urlJpEdit")}
                  margin="dense"
                  id="urlJpEdit"
                  name="urlJpEdit"
                  label="Change url jp"
                  type="text"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  defaultValue={urlJpEdit}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseDialogEdit}>
              Cancel
            </Button>
            <Button type="submit">Change</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default LinkEcAdmin;
