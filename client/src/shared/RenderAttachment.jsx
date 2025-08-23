import React from "react";
import { transformImage } from "../lib/features";
import { 
  FileOpen as FileOpenIcon,
  Videocam as VideoIcon,
  Audiotrack as AudioIcon
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

const RenderAttachments = ({ url, file }) => {
  const handleOpenInNewTab = (e) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderPreview = () => {
    switch (file) {
      case "video":
        return (
          <IconButton onClick={handleOpenInNewTab} style={{ padding: 0 }}>
            <VideoIcon style={{ fontSize: 40 }} />
          </IconButton>
        );
      case "image":
        return (
          <img
            src={transformImage(url, 200)}
            alt="attachment"
            width="200px"
            height="120x"
            style={{ 
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: "4px"
            }}
            onClick={handleOpenInNewTab}
          />
        );
      case "audio":
        return (
          <IconButton onClick={handleOpenInNewTab} style={{ padding: 0 }}>
            <AudioIcon style={{ fontSize: 40 }} />
          </IconButton>
        );
      default:
        return (
          <IconButton onClick={handleOpenInNewTab} style={{ padding: 0 }}>
            <FileOpenIcon style={{ fontSize: 40 }} />
          </IconButton>
        );
    }
  };

  return (
    <div style={{ margin: "4px" }}>
      {renderPreview()}
    </div>
  );
};

export default RenderAttachments;