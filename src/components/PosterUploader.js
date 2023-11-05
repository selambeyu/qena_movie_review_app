import PropTypes from "prop-types";
import { useState } from "react"; // Import useState
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Duplicate as DuplicateIcon } from "../icons/duplicate";
import { X as XIcon } from "../icons/x";
import { bytesToSize } from "../utils/bytes-to-size";

export const PosterUploader = (props) => {
  const {
    accept,
    disabled,
    files = [],
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    // onUpload,
    preventDropOnDocument,
    imagePreview,
    isLoading,
    ...other
  } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop, // Use the custom drop handler
  });

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: "center",
          border: 1,
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          outline: "none",
          p: 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5,
          }),
          "&:hover": {
            backgroundColor: "action.hover",
            cursor: "pointer",
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            "& img": {
              width: 100,
            },
          }}
        >
          {/* Show image preview if available */}
          {imagePreview ? (
            <img alt="Select file" src={imagePreview} />
          ) : (
            <img alt="Select file" src="/undraw_add_file2_gvbb.svg" />
          )}
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">{`Upload Poster Image`}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              {`Drop image${maxFiles && maxFiles === 1 ? "" : "s"}`}{" "}
              <Link underline="always">browse</Link> thorough your machine
            </Typography>
          </Box>
        </Box>
      </Box>
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file) => (
              <ListItem
                key={file.path}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  "& + &": {
                    mt: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <DuplicateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{
                    color: "textPrimary",
                    variant: "subtitle2",
                  }}
                  secondary={bytesToSize(file.size)}
                />
                <Tooltip title="Remove">
                  <IconButton edge="end" onClick={() => onRemove?.(file)}>
                    <XIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button onClick={onRemoveAll} size="small" type="button">
              Remove All
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: "#1C3879" }}
              disabled={isLoading}
              onClick={onUpload}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "secondary" }} size={24} />
              ) : (
                "Upload"
              )}
            </Button>
          </Box> */}
        </Box>
      )}
    </div>
  );
};

PosterUploader.propTypes = {
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  disabled: PropTypes.bool,
  files: PropTypes.array,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  //   onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
  isLoading: PropTypes.bool,
};
