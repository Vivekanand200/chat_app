import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'

const AvatarCard = ({ avatar = [], max = 4 }) => {
    return (
        <Stack direction={"row"} spacing={0.5}>
            <AvatarGroup max={max} 
            sx={{
                position: "relative",
            }}>
                <Box width={"5rem"} height={"3rem"}>
                    {
                        avatar.map((i, index) => (
                            <Avatar sx={{
                                width: "3rem", height: "3rem",
                                position:"absolute",
                                left: {
                                    xs:`${0.5 + index}rem`,
                                    sm:`${index}rem`
                                }
                            }} src={i} key={index} alt={`Avatar${index}`} />
                        ))
                    }
                </Box>
            </AvatarGroup>
        </Stack>
    )
}

export default AvatarCard