import React, { memo } from 'react'
import { Link } from '../styles/StyledComponent'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'
import { motion } from 'framer-motion'

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {


    return (
        <Link sx={{
            padding: 1,
        }} to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}

                
                style={{
                    boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    backgroundColor: sameSender ? "black" : "bisque",
                    color: sameSender ? "white" : "unset",
                    position: 'relative',
                }}>
                <AvatarCard avatar={avatar} />
                <Stack>
                    <Typography>
                        {name}
                    </Typography>
                    {
                        newMessageAlert && (
                            <Typography>{newMessageAlert.count}New Message</Typography>

                        )
                    }
                </Stack>
                {
                    isOnline && (
                        <Box sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            transform: "translateY(-50%)",

                        }} />
                    )
                }
            </motion.div>
        </Link>
    )
}

export default memo(ChatItem)