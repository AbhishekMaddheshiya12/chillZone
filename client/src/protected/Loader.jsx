import { Box } from '@mui/system'
import React from 'react'
import gif from '../assets/35 (1).svg'
import { Typography } from '@mui/material'

function Loader() {
  return (
    <Box sx={{width:'100vw',height:'100vh', display:'flex',justifyContent:'center',alignItems:'center'}} >
      <img src={gif} alt="loader" style={{width:'10%',height:'10%'}} />
      <Typography variant='h4' >Loading...</Typography>
    </Box>
  )
}

export default Loader