import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { InputBox } from "../styledComponent/styld";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [passkey, setPassKey] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Group Name:", groupName);
    console.log("Passkey:", passkey);

    const config = {
      withCredentials: true, // Ensure cookies are sent for authentication/session
      headers: { "Content-Type": "application/json" }, // Define content type
    };

    const data = {
      name: groupName,
      passKey: passkey,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/createGroup",
        data,
        config
      );
      console.log(response);
      if(response?.data?.success){
        const chatId = response?.data?.chatId;
        navigate(`/chatterPage/${chatId}`);
      }
      setGroupName("");
      setPassKey("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 3 }}>
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 3,
          borderRadius: 3,
          gap: 3,
          flexDirection: { xs: "column", md: "column" },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
        >
          Create Room
        </Typography>
        <form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InputBox
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter the Group's Name"
          />
          <InputBox
            type="password"
            value={passkey}
            onChange={(e) => setPassKey(e.target.value)}
            placeholder="Enter the passkey"
          />
          <Button sx={{ mt: 2,color:'black', fontWeight: 'bold' }} type="submit">Submit</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateRoom;
