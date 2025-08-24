import { Typography } from "@mui/material";
import React from "react";
import { fileFormet } from "../lib/features";
import { Box } from "@mui/material";
import RenderAttachments from "../shared/RenderAttachment";

function MessageComponent({ message, user }) {
  const { sender, content, attachment = [], createdAt,senderName } = message;
  // console.log(sender)
  

  const sameSender = sender._id.toString() === user;

  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          alignSelf: sameSender ? "flex-end" : "flex-start", 
          backgroundColor: sameSender ? "lightblue" : "lightgray",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "40%",
          marginTop: "5px",
        }}
      >
        {!sameSender && (
          <Typography fontWeight={600} variant="caption">
            {senderName}
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
          {new Date(createdAt).toLocaleTimeString()}
        </div>
      </div>
    </Box>
  );
}

export default MessageComponent;