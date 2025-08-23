import { Typography } from "@mui/material";
import React from "react";
import { fileFormet } from "../lib/features";
import { Box } from "@mui/material";
import RenderAttachments from "../shared/RenderAttachment";

function MessageComponent({ message, user }) {
  const { sender, content, attachment = [], createdAt } = message;
  const sameSender = sender._id === user;
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
      }}
    >
      {!sameSender && (
        <Typography fontWeight={600} variant="caption">
          {sender._id}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}

      {attachment.length > 0 &&
        attachment.map((attach, index) => {
          const url = attach.url;
          const file = fileFormet(url);

          return (
            <Box key={index}>
                <RenderAttachments file={file} url={url} />
            </Box>
          );
        })}
      <div style={{ fontSize: "0.8em", color: "gray" }}>
        {new Date(message.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}

export default MessageComponent;
