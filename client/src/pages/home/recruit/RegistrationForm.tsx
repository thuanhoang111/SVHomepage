import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import TitleIcon from "components/home/title/TitleIcon";
import moment from "moment";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as yup from "yup";

/**
 * RegistrationForm component for user registration.
 * Provides a form for users to submit their registration details including personal information and file attachments.
 *
 * @component
 * @returns {JSX.Element} The rendered component for password reset
 */
const RegistrationForm = () => {
  const { t } = useTranslation("recruit");

  // Define the types for gender options
  interface IndexProps {
    id: number;
    title: string;
  }

  // State for storing the name of the uploaded file
  const [nameFile, setNameFile] = useState<string>(
    ".doc , .docx , .xls , .xlsx , .pdf , .jpg , .png , .gif"
  );

  // State to handle the visibility of the message regarding file upload
  const [message, setMessage] = useState<boolean>(true);

  // State to manage the birthday value
  const [birthday, setBirthday] = useState<string>("");

  // Validation schema using Yup for form validation
  const schema = yup.object().shape({
    name: yup.string().required(t("registrationForm.register.name.error")),
    address: yup
      .string()
      .required(t("registrationForm.register.address.error")),
    gender: yup.string().required(t("registrationForm.register.gender.error")),
    birthday: yup
      .string()
      .nullable()
      .required(t("registrationForm.register.birthday.error.required"))
      .matches(
        /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/,
        t("registrationForm.register.birthday.error.matches")
      )
      .test(
        "birthday",
        t("registrationForm.register.birthday.error.test"),
        function (value) {
          return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
        }
      ),
    university: yup.string(),
    major: yup.string().required(t("registrationForm.register.major.error")),
    phone: yup
      .string()
      .required(t("registrationForm.register.phone.error.required"))
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        t("registrationForm.register.phone.error.matches")
      ),
    email: yup
      .string()
      .email(t("registrationForm.register.email.error.email"))
      .required(t("registrationForm.register.email.error.required")),
    content: yup
      .string()
      .required(t("registrationForm.register.contentFrom.error")),
    file: yup.string(),
  });

  /**
   * Handles the file input change event. Updates the file name state and form data.
   * @param e - The file input change event
   */
  const handleClickShowName = (e: any) => {
    setNameFile(e.target.files[0].name);
    if (nameFile !== "") {
      setMessage(false);
    }
    setFormRegister({ ...formRegister, [e.target.name]: e.target.files[0] });
  };

  // State for managing form registration data
  const [formRegister, setFormRegister] = useState({
    name: "",
    address: "",
    gender: "",
    birthday: "",
    university: "",
    major: "",
    phone: "",
    email: "",
    content: "",
    file: null,
  });

  // Form handling using react-hook-form
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setFormRegister({ ...formRegister, birthday: birthday });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthday]);

  /**
   * Handles input change events and updates the form data state.
   * @param e - The input change event
   */
  const handleChange = (e: any) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission. Sends form data to the server and shows success or error notifications.
   */
  const handle = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-cache",
        },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/email/recruit`,
        { ...formRegister },
        config
      );
      if (response.status === 200) {
        reset();
        setNameFile(".doc , .docx , .xls , .xlsx , .pdf , .jpg , .png , .gif");
        toast.success("Đã gửi thành công");
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  return (
    <>
      <Grid mx={{ xl: 20, lg: 15 }}>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit(handle)}
          autoComplete="off"
        >
          <Grid
            display="flex"
            sx={{
              background: "#ffffff",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            }}
            flexDirection="column"
            gap={3}
            p={3}
          >
            <Grid>
              <TitleIcon
                title={t("registrationForm.register.title")}
                fontSize="30px"
                fontWeight="600"
                lineHeight="36px"
              ></TitleIcon>
              <Typography variant="subtitle1" mt={2}>
                {t("registrationForm.register.content")}
              </Typography>
            </Grid>
            <Grid
              container
              columns={{ xs: 1, sm: 1, md: 2, lg: 1, xl: 2 }}
              spacing={2}
            >
              {/* Name Input Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.name.title")}
                  <span style={{ color: "#FF7612" }}>*</span>
                </Typography>
                <TextField
                  {...register("name")}
                  hiddenLabel
                  name="name"
                  onChange={handleChange}
                  placeholder={t("registrationForm.register.name.placeholder")}
                  size="small"
                  sx={{ width: "100%" }}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <Typography width={1} mt={0.5} variant="body1" color="red">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>

              {/* Address Input Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.address.title")}
                  <span style={{ color: "#FF7612" }}>*</span>
                </Typography>
                <TextField
                  {...register("address")}
                  hiddenLabel
                  onChange={handleChange}
                  name="address"
                  placeholder={t(
                    "registrationForm.register.address.placeholder"
                  )}
                  size="small"
                  sx={{ width: "100%" }}
                />
                <ErrorMessage
                  errors={errors}
                  name="address"
                  render={({ message }) => (
                    <Typography width={1} mt={0.5} variant="body1" color="red">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>

              {/* Gender Select Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.gender.title")}
                  <span style={{ color: "#FF7612" }}>*</span>
                </Typography>
                <TextField
                  {...register("gender")}
                  select
                  hiddenLabel
                  onChange={handleChange}
                  name="gender"
                  SelectProps={{
                    native: true,
                  }}
                  size="small"
                  value={formRegister.gender}
                  sx={{ width: "100%" }}
                >
                  {t<string, IndexProps[]>(
                    "registrationForm.register.gender.options",
                    { returnObjects: true }
                  ).map((item, index) => (
                    <option key={item.id} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </TextField>
                <ErrorMessage
                  errors={errors}
                  name="gender"
                  render={({ message }) => (
                    <Typography width={1} mt={0.5} variant="body1" color="red">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>

              {/* Birthday Date Picker */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.birthday.title")}
                  <span style={{ color: "#FF7612" }}>*</span>
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="birthday"
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        inputFormat="DD/MM/YYYY"
                        value={value}
                        onChange={(value) => {
                          onChange(value?.format("YYYY-MM-DD"));
                          setBirthday(value?.format("YYYY-MM-DD"));
                        }}
                        renderInput={(params) => (
                          <>
                            <TextField
                              id="birthday"
                              value={birthday}
                              onChange={(e) => setBirthday(e.target.value)}
                              size="small"
                              sx={{ width: "100%" }}
                              {...params}
                            />
                          </>
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
                <ErrorMessage
                  errors={errors}
                  name="birthday"
                  render={({ message }) => (
                    <Typography width={1} mt={0.5} variant="body1" color="red">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>
              {/* University Input Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.university.title")}
                </Typography>
                <TextField
                  {...register("university")}
                  hiddenLabel
                  name="university"
                  onChange={handleChange}
                  placeholder={t(
                    "registrationForm.register.university.placeholder"
                  )}
                  size="small"
                  sx={{ width: "100%" }}
                />
              </Grid>
              {/* Major Input Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.major.title")}
                  <span style={{ color: "#FF7612" }}>*</span>
                </Typography>
                <TextField
                  {...register("major")}
                  hiddenLabel
                  name="major"
                  onChange={handleChange}
                  placeholder={t("registrationForm.register.major.placeholder")}
                  size="small"
                  sx={{ width: "100%" }}
                />
                <ErrorMessage
                  errors={errors}
                  name="major"
                  render={({ message }) => (
                    <Typography width={1} mt={0.5} variant="body1" color="red">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>
              {/* Phone Input Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.phone.title")}
                  <span style={{ color: "#FF7612" }}>*</span>
                </Typography>
                <TextField
                  {...register("phone")}
                  hiddenLabel
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                  placeholder={t("registrationForm.register.phone.placeholder")}
                  size="small"
                  sx={{ width: "100%" }}
                />
                <ErrorMessage
                  errors={errors}
                  name="phone"
                  render={({ message }) => (
                    <Typography width={1} mt={0.5} variant="body1" color="red">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>
              {/* Email Input Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.email.title")}
                  <span style={{ color: "#FF7612" }}>*</span>
                </Typography>
                <TextField
                  {...register("email")}
                  hiddenLabel
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder={t("registrationForm.register.email.placeholder")}
                  size="small"
                  sx={{ width: "100%" }}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <Typography width={1} mt={0.5} variant="body1" color="red">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>
              {/* Content Text Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.contentFrom.title")}
                  <span style={{ color: "#FF7612" }}>*</span>
                </Typography>
                <TextField
                  {...register("content")}
                  hiddenLabel
                  name="content"
                  onChange={handleChange}
                  placeholder={t(
                    "registrationForm.register.contentFrom.placeholder"
                  )}
                  multiline
                  rows={4}
                  size="small"
                  sx={{ width: "100%" }}
                />
                <ErrorMessage
                  errors={errors}
                  name="content"
                  render={({ message }) => (
                    <Typography width={1} mt={0.5} variant="body1" color="red">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>
              {/* File Input Field */}
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Typography width={1} variant="subtitle1" color="#0C5ADB">
                  {t("registrationForm.register.document.title")}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    color: "#adb5bd",
                    textIndent: "10px",
                    alignItems: "center",
                    width: "100%",
                    height: 40,
                    border: "1px solid #adb5bd",
                    borderRadius: 1,
                  }}
                >
                  {nameFile}
                </Typography>
                <Grid display="flex" flexDirection="row" mt={2.8} gap={2}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      height: 40,
                      width: 140,
                      background:
                        "linear-gradient(94.43deg, #04690E 0%, #0BA31A 96.94%)",
                    }}
                  >
                    {t("registrationForm.register.document.button")}
                    <input
                      {...register("file")}
                      type="file"
                      name="file"
                      accept=".doc , .docx , .xls , .xlsx , .pdf , .jpg , .png , .gif"
                      onChange={handleClickShowName}
                      hidden
                    />
                  </Button>
                  {message && (
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      fontStyle="italic"
                    >
                      {t("registrationForm.register.document.message")}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* <Grid
                item
                width={1}
                display="flex"
                flexDirection="column"
                gap={1}
              >
                <Typography variant="h6">
                  {t("registrationForm.security.title")}
                </Typography>
                <Typography sx={{ color: "gray", textAlign: "justify" }}>
                  {t("registrationForm.security.content")}
                </Typography>
                <FormControlLabel
                  control={<Checkbox />}
                  label={t("registrationForm.security.confirm")}
                />
              </Grid> */}
              {/* Submit Button */}
              <Grid
                item
                width={1}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    height: 60,
                    width: 200,
                    background:
                      "linear-gradient(94.43deg, #1A6BF0 0%, #0742A5 96.94%)",
                  }}
                  variant="contained"
                >
                  {isSubmitting ? (
                    <CircularProgress size={30} color="primary" />
                  ) : (
                    t("registrationForm.register.buttonSend")
                  )}
                </Button>
                <Tooltip title={t("registrationForm.register.tooltipDelete")}>
                  <IconButton onClick={() => reset()}>
                    <CachedIcon
                      sx={{ width: 30, height: 30, cursor: "pointer" }}
                    ></CachedIcon>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default RegistrationForm;
