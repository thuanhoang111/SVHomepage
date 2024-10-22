import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ImageIcon from "@mui/icons-material/Image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MovieIcon from "@mui/icons-material/Movie";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TitleIcon from "@mui/icons-material/Title";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import { Button, Checkbox, Grid, IconButton, Typography } from "@mui/material";
import api from "apis/api";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useToggleValue from "hooks/useToggleValue";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DropZoneField from "../input/DropZoneField";
import LinkGroupField from "../input/LinkGroupField";
import PdfField from "../input/PdfField";
import SimpleTextField from "../input/SimpleTextField";
import YoutubeField from "../input/YoutubeField";

// Define accessibility label for checkboxes
const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * The AgricultureItemForm component is a form for creating or editing agriculture items.
 * It conditionally renders different fields based on the mode (create/edit) and user input.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.mode - Mode of the form ('create' or 'edit').
 * @param {string|null} props.itemId - The ID of the item to be edited (if applicable).
 * @param {string} props.language - The language context for the form.
 * @param {Function} props.setRefresh - Callback function to refresh the parent component.
 *
 * @returns {JSX.Element} The rendered form component with dynamic fields and action buttons.
 */
const AgricultureItemForm = ({ mode, itemId = null, language, setRefresh }) => {
  // Extract 'id' from URL parameters
  const { id } = useParams<{ id?: string }>();

  // Initialize react-hook-form
  const formHandler = useForm();

  // Destructure useful methods and state from react-hook-form
  const { resetField, setValue, handleSubmit, control, getValues, reset } =
    formHandler;

  // Manage expanded view state
  const [more, setMore] = useState<boolean>(mode === "edit" ? true : false);

  // Use custom hook for private Axios instance
  const axiosPrivate = useAxiosPrivate();

  // State to force reload of component data
  const [reload, setReload] = useState<boolean>(false);

  // State to store agriculture item data
  const [agricultureItem, setAgricultureItem] = useState<any>({});

  // State to manage link group
  const [link, setLink] = useState<any>({});

  // Manage toggle states for different fields
  const { value: title, handleToggleValue: handleToggleTitle } =
    useToggleValue();
  const { value: topContent, handleToggleValue: handleToggleTopContent } =
    useToggleValue();
  const { value: italicContent, handleToggleValue: handleToggleItalicContent } =
    useToggleValue();
  const { value: image, handleToggleValue: handleToggleImage } =
    useToggleValue();
  const { value: video, handleToggleValue: handleToggleVideo } =
    useToggleValue();
  const { value: pdf, handleToggleValue: handleTogglePdf } = useToggleValue();
  const { value: youtube, handleToggleValue: handleToggleYoutube } =
    useToggleValue();
  const { value: bottomContent, handleToggleValue: handleToggleBottomContent } =
    useToggleValue();
  const { value: linkGroup, handleToggleValue: handleToggleLinkGroup } =
    useToggleValue();

  /**
   * Fetch details of an agriculture item for editing.
   * 
   * @async
   * @param {string} id - The ID of the agriculture item to fetch.
   */
  const getAgricultureItemDetail = async (id: string) => {
    try {
      const response = await api.getAgricultureItemDetail(id);
      setAgricultureItem(response.data.agricultureItem);
      setReload((prev) => !prev);
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Create or update an agriculture item based on the form data.
   * 
   * @async
   * @param {Object} values - Form values to be submitted.
   */
  const createOrEditAgricultureItem = async (values: any) => {
    try {
      let response: any;
      if (mode === "create") {
        response = await axiosPrivate.post(
          `/agriculture/admin/agriculture-item/create/${language}/${id}`,
          { ...values }
        );
      } else {
        response = await axiosPrivate.post(
          `/agriculture/admin/agriculture-item/update/${id}/${itemId}`,
          { ...values }
        );
      }
      if (response.status === 200) {
        toast.success(
          `${
            mode === "create" ? "Create" : "Update"
          } item agriculture successful`
        );
        setRefresh((prev) => !prev);
        if (mode === "create") reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Delete an agriculture item.
   * 
   * @async
   * @param {string} agricultureId - The ID of the agriculture item to delete.
   * @param {string} agricultureItemId - The ID of the specific agriculture item to delete.
   */
  const deleteAgricultureItem = async (
    agricultureId: string,
    agricultureItemId: string
  ) => {
    try {
      const response = await axiosPrivate.delete(
        `/agriculture/admin/agriculture-item/delete/${agricultureId}/${agricultureItemId}`
      );
      if (response.status === 204) {
        toast.success("Delete item agriculture successful");
        setRefresh((prev) => !prev);
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Fetch agriculture item details on component mount or when itemId changes
  useEffect(() => {
    if (mode === "edit" && itemId) getAgricultureItemDetail(itemId);
  }, [mode, itemId]);

  // Update form values and toggle states when agricultureItem or reload state changes
  useEffect(() => {
    setValue("title", agricultureItem?.title);
    setValue("topContent", agricultureItem?.topContent);
    setValue("italicContent", agricultureItem?.italicContent);
    setValue("image", agricultureItem?.image);
    setValue("video", agricultureItem?.video);
    setValue("pdf", agricultureItem?.pdf);
    setValue("bottomContent", agricultureItem?.bottomContent);
    setValue("linkGroup", agricultureItem?.linkGroup);

    // Toggle visibility based on the presence of values
    if (agricultureItem.title) handleToggleTitle();
    if (agricultureItem.topContent) handleToggleTopContent();
    if (agricultureItem.italicContent) handleToggleItalicContent();
    if (agricultureItem.image) handleToggleImage();
    if (agricultureItem.video) handleToggleVideo();
    if (agricultureItem.pdf) handleTogglePdf();
    if (agricultureItem.bottomContent) handleToggleBottomContent();
    if (agricultureItem.linkGroup) handleToggleLinkGroup();

    setLink(agricultureItem?.linkGroup);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <Grid sx={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }} padding={3}>
      <FormProvider {...formHandler}>
        <form onSubmit={handleSubmit(createOrEditAgricultureItem)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography textAlign="center" variant="h4">
                {mode === "edit" ? "Edit" : "Create"} The Agriculture Item
              </Typography>
            </Grid>
            {/* Title Input */}
            <Grid item xs={12} container>
              <Grid item xs={2}>
                <Checkbox
                  {...label}
                  onClick={handleToggleTitle}
                  checked={title}
                  icon={<TitleIcon />}
                  checkedIcon={<TitleIcon />}
                />
              </Grid>
              <Grid item xs={10}>
                {title && (
                  <SimpleTextField
                    title="Title"
                    name="title"
                    mode={mode}
                    line={2}
                    defaultValue={agricultureItem?.title}
                    control={control}
                    {...{ setValue }}
                  />
                )}
              </Grid>
            </Grid>
            {/* Conditional Fields */}
            {more ? (
              <>
                {/* Top Content Input */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={handleToggleTopContent}
                      icon={<FormatAlignJustifyIcon />}
                      checked={topContent}
                      checkedIcon={<FormatAlignJustifyIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {topContent && (
                      <SimpleTextField
                        title="Top Content"
                        name="topContent"
                        mode={mode}
                        line={5}
                        defaultValue={agricultureItem?.topContent}
                        control={control}
                        {...{ setValue }}
                      />
                    )}
                  </Grid>
                </Grid>
                {/* Italic Content Input */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={handleToggleItalicContent}
                      icon={<FormatItalicIcon />}
                      checked={italicContent}
                      checkedIcon={<FormatItalicIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {italicContent && (
                      <SimpleTextField
                        title="Italic Content"
                        name="italicContent"
                        mode={mode}
                        fontStyle="italic"
                        line={5}
                        defaultValue={agricultureItem?.italicContent}
                        control={control}
                        {...{ setValue }}
                      />
                    )}
                  </Grid>
                </Grid>
                {/* Image Upload */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={() => {
                        handleToggleImage();
                        if (!image) resetField("image");
                      }}
                      checked={image}
                      icon={<ImageIcon />}
                      checkedIcon={<ImageIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {image && (
                      <DropZoneField
                        accept={{
                          "image/*": [".jpeg", ".jpg", ".png"],
                        }}
                        name="image"
                        mode={mode}
                        label="Image"
                      ></DropZoneField>
                    )}
                  </Grid>
                </Grid>
                {/* Video Input */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={() => {
                        handleToggleVideo();
                        if (video) resetField("video");
                      }}
                      icon={<MovieIcon />}
                      checked={video}
                      checkedIcon={<MovieIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {video && (
                      <DropZoneField
                        accept={{
                          "video/*": [".mp4"],
                        }}
                        name="video"
                        type="video"
                        mode={mode}
                        label="Video"
                      ></DropZoneField>
                    )}
                  </Grid>
                </Grid>
                {/* PDF Upload */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={() => {
                        handleTogglePdf();
                        if (pdf) resetField("pdf");
                      }}
                      checked={pdf}
                      icon={<PictureAsPdfIcon />}
                      checkedIcon={<PictureAsPdfIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {pdf && (
                      <PdfField name="pdf" mode={mode} label="Pdf"></PdfField>
                    )}
                  </Grid>
                </Grid>
                {/* YouTube Video */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={handleToggleYoutube}
                      icon={<YouTubeIcon />}
                      checked={youtube}
                      checkedIcon={<YouTubeIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {youtube && (
                      <YoutubeField
                        title="Youtube"
                        name="youtube"
                        mode={mode}
                        defaultValue={agricultureItem?.youtube}
                        control={control}
                        {...{ setValue, getValues }}
                      ></YoutubeField>
                    )}
                  </Grid>
                </Grid>
                {/* Bottom Content Input */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={handleToggleBottomContent}
                      icon={<FormatAlignJustifyIcon />}
                      checked={bottomContent}
                      checkedIcon={<FormatAlignJustifyIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {bottomContent && (
                      <SimpleTextField
                        title="Bottom Content"
                        name="bottomContent"
                        mode={mode}
                        line={5}
                        defaultValue={agricultureItem?.bottomContent}
                        control={control}
                        {...{ setValue }}
                      />
                    )}
                  </Grid>
                </Grid>
                {/* Link Group */}
                <LinkGroupField
                  link={link}
                  linkGroup={linkGroup}
                  handleToggleLinkGroup={handleToggleLinkGroup}
                  name="linkGroup"
                  control={control}
                  mode={mode}
                ></LinkGroupField>
              </>
            ) : (
              <Grid item xs={12}>
                <IconButton onClick={() => setMore(true)}>
                  <MoreHorizIcon />
                </IconButton>
              </Grid>
            )}
            {/* Submit Button */}
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth>
                {mode === "edit" ? "Update" : "Create"} form agriculture
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                color="error"
                variant="contained"
                fullWidth
                onClick={() => {
                  if (mode === "edit" && id && itemId)
                    deleteAgricultureItem(id, itemId);
                  else reset();
                }}
              >
                {mode === "edit" ? "Delete" : "Reset"} form news
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};

export default AgricultureItemForm;
