import React from 'react'
import AppLaout from '../components/layout/AppLaout'
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion'
import { Opacity } from '@mui/icons-material';

const Home = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }} bgcolor={"rgba(247,247,247,1)"} height={"100%"}>

      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Typography  sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap:"wrap",
          fontWeight: "bold",
          fontSize: "3rem",
          fontStyle: "italic",
          fontFamily: "cursive"
        }}>Welcome To Chat App</Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: "100%",
          boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.7)",
        }} variant='contained' bgcolor={"orange"} height={"15rem"} width={"15rem"}>
          <img style={{
            width: "10rem",
            height: "10rem",
            borderRadius: "100%",
            boxShadow: "0 0 0.5rem rgba(0, 0, 0, 1)",
          }} src='https://img.freepik.com/premium-vector/chat-app-logo-design-template-can-be-used-icon-chat-application-logo_605910-1724.jpg?w=900' alt='logo' />
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <Typography sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          fontStyle: "italic",
          fontFamily: "cursive",
          color: "tomato"
        }} p={"2rem"} variant='h5' textAlign={"center"}>
          Select a friend to chat
        </Typography>
      </motion.div>
    </Box>
  )
}

export default AppLaout()(Home);