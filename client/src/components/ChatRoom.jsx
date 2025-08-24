import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Box, IconButton, Stack, Button, CircularProgress } from "@mui/material";
import { InputBox } from "../styledComponent/styld";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import MessageComponent from "./MessageComponent";
import { AttachFile as AttachFileIcon, Attachment } from "@mui/icons-material";
import RenderAttachments from "../shared/RenderAttachment";

const API_URL =  "https://chillzone-tif5.onrender.com";

const ChatRoom = ({ chatId,user }) => {
  const room = chatId;
  // console.log(user);
  // console.log(user._id);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingOldMessages, setLoadingOldMessages] = useState(false);
  const [atttachMent,setAttachment] = useState(null);
  const [loading,setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  }
  const handleFileChange = () => {
    const file = fileInputRef.current.files [0];
    setAttachment(file);
  }
  // console.log(atttachMent);

  // Scroll to bottom when new message comes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/getChatdetails/${room}`,
          { withCredentials: true }
        );
        setMembers(response.data.chat.members);
      } catch (err) {
        console.error("Error fetching chat details:", err);
      }
    };

    fetchMembers();
  }, [room]);

  // Fetch messages
  const fetchMessages = async (pageNumber = 1) => {
    try {
      setLoadingOldMessages(true);
      const response = await axios.get(
        `${API_URL}/user/getMessages/${room}?page=${pageNumber}`,
        { withCredentials: true }
      );
      const newMessages = response.data.message;

      setMessages((prev) => {
        // Remove duplicates based on _id
        const allMessages = [...newMessages, ...prev];
        const uniqueMessages = Array.from(
          new Map(allMessages.map((msg) => [msg._id, msg])).values()
        );
        return uniqueMessages;
      });

      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoadingOldMessages(false);
    }
  };

  // Automatically load older messages on scroll to top
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container.scrollTop === 0 && page < totalPages && !loadingOldMessages) {
      loadOlderMessages();
    }
  };

  const loadOlderMessages = async () => {
    if (page < totalPages && !loadingOldMessages) {
      const container = messagesContainerRef.current;
      const previousScrollHeight = container.scrollHeight;

      const nextPage = page + 1;
      await fetchMessages(nextPage);
      setPage(nextPage);

      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - previousScrollHeight;
      }, 100);
    }
  };

  useEffect(() => {
    const newSocket = io(API_URL, { withCredentials: true });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join", { room });
    });

    newSocket.on("NEW_MESSAGE", ({ chatId, message }) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === message._id);
        if (!exists) {
          return [...prev, message];
        }
        return prev;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  // Initial message fetch when room changes
  useEffect(() => {
    setMessages([]);
    setPage(1);
    setTotalPages(1);
    fetchMessages(1);
  }, [room]);

  // Scroll to bottom after new messages
  useEffect(() => {
    if (!loadingOldMessages) {
      scrollToBottom();
    }
  }, [messages]);

  // Send new message
  const sendAttachment = async() => {
    const formData = new FormData();
      formData.append("chatId", room);
      formData.append("files", atttachMent);
      setLoading(true);
      const response = await axios.post(`${API_URL}/user/sendfiles`, formData, { withCredentials: true });
       setAttachment(null);
      setLoading(false);
      console.log(response);
  }
  const sendMessage = () => {
    if(atttachMent){
      sendAttachment();
    }
    
    if (socket && input.trim()) {
      const messagePayload = {
        chatId: room,
        members,
        message: input,
      };

      socket.emit("NEW_MESSAGE", messagePayload, (ack) => {
        if (ack?.status !== "ok") {
          alert("Message delivery failed!");
        }
      });

      setInput("");
    }
  };

  return (
    <Box 
      sx={{ height: "calc(100vh - 54px)" }}
      display="flex" 
      flexDirection="column"
      bgcolor="#f5f5f5"
    >
      {/* Messages area */}
      <Box 
        ref={messagesContainerRef}
        flexGrow={1}
        overflow="auto"
        padding="10px"
        sx={{ "&::-webkit-scrollbar": { display: "none" }}}
        onScroll={handleScroll}
      >
        {/* Show spinner when loading old messages */}
        {loadingOldMessages && page < totalPages && (
          <Box 
            display="flex" 
            justifyContent="center" 
            marginBottom="10px"
          >
            <CircularProgress size={30} />
          </Box>
        )}
        {messages.map((msg, index) => (
          <MessageComponent
            key={msg._id || index}
            message={msg}
            user={user._id}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area */}
      <Box 
        display="flex" 
        alignItems="center" 
        padding="10px" 
        bgcolor="white"
        borderTop="1px solid #ccc"
      >
        <IconButton onClick={handleClick}>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} className="file-input" onChange={handleFileChange} />
          {
            atttachMent && (
              <div className="attachment" style={{position: "absolute",left: "4px",bottom: "40px"}}>
                <RenderAttachments  url={URL.createObjectURL(atttachMent)} file={atttachMent.type.split("/")[0]} />
              </div>
            ) 
          }
          {
            loading && (
              <div className="attachment" style={{position: "absolute",left: "25px",bottom: "40px",zIndex: "1"}}>
                <CircularProgress sx={{ color: "white" }} size={30} />
                <p>Sending....</p>
              </div>
            )
          }
          <AttachFileIcon/>
        </IconButton>
        <InputBox
          placeholder="Type a message...."
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
          sx={{ flexGrow: 1, marginRight: "10px" }}
        />
        <IconButton onClick={sendMessage} disabled={!input.trim() && !atttachMent}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatRoom;
