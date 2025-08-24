import { Avatar, Box, Icon, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const API_URL = "https://chillzone-tif5.onrender.com";
function Users({chatId}) {
    const [users,setUsers] = useState([]);

    useEffect(() => {
      const getMembers = async() => {
        try{
          const config = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          };
          const response = await axios.get(`${API_URL}/user/getmembers/${chatId}`,config)
          // console.log(response?.data?.members);
          if(response?.data?.success){
            setUsers(response?.data?.members)
          }
        }catch(error){

        }
      }

      getMembers();
    },[])
    // const users = [
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=1",
    //       name: "Alice Johnson",
    //       username: "alicej",
    //       email: "alice.johnson@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=2",
    //       name: "Bob Smith",
    //       username: "bobsmith",
    //       email: "bob.smith@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=3",
    //       name: "Charlie Rose",
    //       username: "charlier",
    //       email: "charlie.rose@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=4",
    //       name: "Diana Prince",
    //       username: "dianap",
    //       email: "diana.prince@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=5",
    //       name: "Ethan Hunt",
    //       username: "ethanh",
    //       email: "ethan.hunt@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=6",
    //       name: "Fiona Gallagher",
    //       username: "fionag",
    //       email: "fiona.g@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=7",
    //       name: "George King",
    //       username: "gking",
    //       email: "george.king@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=8",
    //       name: "Hannah Wells",
    //       username: "hannaw",
    //       email: "hannah.wells@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=9",
    //       name: "Ian Curtis",
    //       username: "icurtis",
    //       email: "ian.curtis@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=10",
    //       name: "Jenna Lee",
    //       username: "jlee",
    //       email: "jenna.lee@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=11",
    //       name: "Kevin Malone",
    //       username: "kevinm",
    //       email: "kevin.malone@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=12",
    //       name: "Laura Palmer",
    //       username: "laurap",
    //       email: "laura.palmer@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=13",
    //       name: "Michael Scott",
    //       username: "mscott",
    //       email: "michael.scott@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=14",
    //       name: "Nina Dobrev",
    //       username: "ninad",
    //       email: "nina.dobrev@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=15",
    //       name: "Oscar Wilde",
    //       username: "oscarw",
    //       email: "oscar.wilde@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=16",
    //       name: "Paula Abdul",
    //       username: "paulaa",
    //       email: "paula.abdul@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=17",
    //       name: "Quinn Fabray",
    //       username: "quinnf",
    //       email: "quinn.fabray@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=18",
    //       name: "Ryan Gosling",
    //       username: "ryang",
    //       email: "ryan.gosling@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=19",
    //       name: "Sara Lance",
    //       username: "saral",
    //       email: "sara.lance@example.com"
    //     },
    //     {
    //       avatar: "https://i.pravatar.cc/150?img=20",
    //       name: "Tom Holland",
    //       username: "tomh",
    //       email: "tom.holland@example.com"
    //     }
    //   ];  
      const Room = {
        name:"Roomers",
      }    
      return (
        <Box sx={{ padding: 4, height: {
            xs: "calc(100vh - 115px)", 
            md: "calc(100vh - 115px)", 
          }, overflow: 'auto','&::-webkit-scrollbar': {
      display: 'none',
    },}}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            {Room.name}
          </Typography>
    
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {users.map((user) => (
              <Paper
                key={user.username}
                elevation={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  gap: 2,
                  borderRadius: 2,
                }}
              >
                <Avatar src={user.avatar?.url} alt={user.name} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                  @{user.username} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      );
}

export default Users