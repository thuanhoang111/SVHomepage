import CollectionsIcon from "@mui/icons-material/Collections";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ImageIcon from "@mui/icons-material/Image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MovieIcon from "@mui/icons-material/Movie";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button, Checkbox, Grid, IconButton, Typography } from "@mui/material";
import api from "apis/api";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useToggleValue from "hooks/useToggleValue";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DropZoneField from "../input/DropZoneField";
// import ImageGroupField from "../input/ImageGroupField";
import LinkGroupField from "../input/LinkGroupField";
import PdfField from "../input/PdfField";
import SimpleTextField from "../input/SimpleTextField";
import TableGroupField from "../input/TableGroupField";
import YoutubeField from "../input/YoutubeField";

// Accessibility label for checkboxes
const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * The NewsItemForm component is used for creating and editing news items.
 * 
 * This component displays a form that allows users to input and manage various types of content, including images, videos, PDFs, and other media. 
 * The form dynamically adjusts based on whether it is in "create" or "edit" mode.
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
const NewsItemForm = ({ mode, itemId = null, language, setRefresh }) => {
  // Extracting ID from URL parameters
  const { id } = useParams<{ id?: string }>();

  // Initialize react-hook-form
  const formHandler = useForm();

  // Destructure useful methods and state from react-hook-form
  const { resetField, setValue, handleSubmit, control, getValues, reset } = formHandler;

  // State management for expanded view and form data
  const [more, setMore] = useState<boolean>(mode === "edit" ? true : false);

  // Use custom hook for private Axios instance
  const axiosPrivate = useAxiosPrivate();

  // State to force reload of component data
  const [reload, setReload] = useState<boolean>(false);

  // State to store news item data
  const [newsItem, setNewsItem] = useState<any>({});

  // State to manage link group
  const [link, setLink] = useState<any>({});

  // State to manage table
  const [table, setTable] = useState<any>({});

  // Manage toggle states for different fields
  const { value: imageCenter, handleToggleValue: handleToggleImageCenter } = useToggleValue();
  const { value: imageLeftRight, handleToggleValue: handleToggleImageLeftRight } = useToggleValue();
  const { value: contentCenter, handleToggleValue: handleToggleContentCenter } = useToggleValue();
  const { value: content, handleToggleValue: handleToggleContent } = useToggleValue();
  const { value: youtube, handleToggleValue: handleToggleYoutube } = useToggleValue();
  const { value: video, handleToggleValue: handleToggleVideo } = useToggleValue();
  const { value: pdf, handleToggleValue: handleTogglePdf } = useToggleValue();
  // const { value: imageGroup, handleToggleValue: handleToggleImageGroup } = useToggleValue();
  const { value: linkGroup, handleToggleValue: handleToggleLinkGroup } = useToggleValue();
  const { value: tableGroup, handleToggleValue: handleToggleTableGroup } = useToggleValue();

  /**
   * Fetches details of a news item from the API.
   * 
   * @async
   * @param {string} id - The ID of the news item.
   */
  const getNewsItemDetail = async (id: string) => {
    try {
      const response = await api.getNewsItemDetail(id);
      setNewsItem(response.data.newsItem);
      setReload(prev => !prev);
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Handles the creation or updating of a news item.
   * 
   * @async
   * @param {Object} values - The form values.
   */
  const createOrEditNewsItem = async (values: any) => {
    try {
      let response: any;
      if (mode === "create") {
        if (values.imageGroup && values.imageGroup.length > 0) {
          const group: any[] = [];
          for (const item of values.imageGroup) {
            group.push(item.url);
          }
          values.imageGroup = group;
        }
        response = await axiosPrivate.post(
          `/news/admin/news-item/create/${language}/${id}`,
          { ...values }
        );
      } else {
        if (values.imageGroup && values.imageGroup.length > 0) {
          const group: any[] = [];
          for (const [index, value] of values.imageGroup.entries()) {
            if (value.url !== newsItem.imageGroup[index]?.url)
              group.push(value.url);
          }
          values.imageGroup = group;
        }
        response = await axiosPrivate.post(
          `/news/admin/news-item/update/${id}/${itemId}`,
          { ...values }
        );
      }
      if (response.status === 200) {
        toast.success(
          `${mode === "create" ? "Create" : "Update"} item news successful`
        );
        setRefresh((prev: boolean) => !prev);
        if (mode === "create") reset();
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error.message || "Some thing went wrong"
      );
    }
  };

  /**
   * Deletes a news item from the API.
   * 
   * @async
   * @param {string} newsId - The ID of the news.
   * @param {string} newsItemId - The ID of the news item.
   */
  const deleteNewsItem = async (newsId: string, newsItemId: string) => {
    try {
      const response = await axiosPrivate.delete(
        `/news/admin/news-item/delete/${newsId}/${newsItemId}`
      );

      if (response.status === 204) {
        toast.success("Delete item news successful");
        setRefresh(prev => !prev);
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // Fetch news item details if in edit mode
  useEffect(() => {
    if (mode === "edit" && itemId) getNewsItemDetail(itemId);
  }, [mode, itemId]);

  // Update form fields and toggle states based on news item data
  useEffect(() => {
    setValue("imageCenter", newsItem?.imageCenter);
    setValue("imageLeft", newsItem?.imageLeft);
    setValue("imageRight", newsItem?.imageRight);
    setValue("video", newsItem?.video);
    setValue("pdf", newsItem?.pdf);
    setValue("imageGroup", newsItem?.imageGroup);
    setValue("linkGroup", newsItem?.linkGroup);
    setValue("table", newsItem?.table);
    
    // Toggle visibility based on the presence of values
    if (newsItem.content) handleToggleContent();
    if (newsItem.contentCenter) handleToggleContentCenter();
    if (newsItem.imageLeft || newsItem.imageRight) handleToggleImageLeftRight();
    if (newsItem.imageCenter) handleToggleImageCenter();
    if (newsItem.youtube) handleToggleYoutube();
    if (newsItem.video) handleToggleVideo();
    if (newsItem.pdf) handleTogglePdf();
    // if (newsItem.imageGroup?.length > 0) handleToggleImageGroup();
    if (newsItem.linkGroup?.length > 0) handleToggleLinkGroup();
    if (newsItem.table?.length > 0) handleToggleTableGroup();
    
    setLink(newsItem?.linkGroup);
    setTable(newsItem?.table);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <Grid sx={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }} padding={3}>
      <FormProvider {...formHandler}>
        <form onSubmit={handleSubmit(createOrEditNewsItem)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography textAlign="center" variant="h4">
                {mode === "edit" ? "Edit" : "Create"} The News Item
              </Typography>
            </Grid>
            {/* Image Center Upload */}
            <Grid item xs={12} container>
              <Grid item xs={2}>
                <Checkbox
                  {...label}
                  onClick={() => {
                    handleToggleImageCenter();
                    if (imageCenter) resetField("imageCenter");
                  }}
                  checked={imageCenter}
                  icon={<ImageIcon />}
                  checkedIcon={<ImageIcon />}
                />
              </Grid>
              <Grid item xs={10}>
                {imageCenter && (
                  <DropZoneField
                    accept={{
                      "image/*": [".jpeg", ".jpg", ".png"],
                    }}
                    name="imageCenter"
                    mode={mode}
                    label="Image Center"
                  ></DropZoneField>
                )}
              </Grid>
            </Grid>
            {/* Conditional Fields */}
            {more ? (
              <>
                {/* Image Right Upload */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={handleToggleImageLeftRight}
                      icon={<CollectionsIcon />}
                      checked={imageLeftRight}
                      checkedIcon={<CollectionsIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {imageLeftRight && (
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <DropZoneField
                            accept={{
                              "image/*": [".jpeg", ".jpg", ".png"],
                            }}
                            name="imageLeft"
                            mode={mode}
                            label="Image Left"
                          ></DropZoneField>
                        </Grid>
                        <Grid item xs={6}>
                          <DropZoneField
                            accept={{
                              "image/*": [".jpeg", ".jpg", ".png"],
                            }}
                            name="imageRight"
                            mode={mode}
                            label="Image Right"
                          ></DropZoneField>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {/* <ImageGroupField
                  imageGroup={imageGroup}
                  handleToggleImageGroup={handleToggleImageGroup}
                  name="imageGroup"
                  control={control}
                  mode={mode}
                ></ImageGroupField> */}
                {/* Content Center Input */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={() => {
                        handleToggleContentCenter();
                        if (contentCenter) resetField("contentCenter");
                      }}
                      checked={contentCenter}
                      icon={<FormatAlignCenterIcon />}
                      checkedIcon={<FormatAlignCenterIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {contentCenter && (
                      <SimpleTextField
                        title="ContentCenter"
                        name="contentCenter"
                        mode={mode}
                        line={3}
                        defaultValue={newsItem?.contentCenter}
                        control={control}
                        {...{ setValue }}
                      ></SimpleTextField>
                    )}
                  </Grid>
                </Grid>
                {/* Content Input */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={() => {
                        handleToggleContent();
                        if (content) resetField("content");
                      }}
                      checked={content}
                      icon={<FormatAlignJustifyIcon />}
                      checkedIcon={<FormatAlignJustifyIcon />}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {content && (
                      <SimpleTextField
                        title="Content"
                        name="content"
                        mode={mode}
                        line={5}
                        defaultValue={newsItem?.content}
                        control={control}
                        {...{ setValue }}
                      ></SimpleTextField>
                    )}
                  </Grid>
                </Grid>
                {/* YouTube Video */}
                <Grid item xs={12} container>
                  <Grid item xs={2}>
                    <Checkbox
                      {...label}
                      onClick={() => {
                        handleToggleYoutube();
                        if (youtube) resetField("youtube");
                      }}
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
                        defaultValue={newsItem?.youtube}
                        control={control}
                        {...{ setValue, getValues }}
                      ></YoutubeField>
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
                {/* Table */}
                <TableGroupField
                  name="table"
                  mode={mode}
                  table={table}
                  tableGroup={tableGroup}
                  control={control}
                  handleToggleTableGroup={handleToggleTableGroup}
                ></TableGroupField>
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
                {mode === "edit" ? "Update" : "Create"} form news
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                color="error"
                variant="contained"
                fullWidth
                onClick={() => {
                  if (mode === "edit" && id && itemId)
                    deleteNewsItem(id, itemId);
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

export default NewsItemForm;
