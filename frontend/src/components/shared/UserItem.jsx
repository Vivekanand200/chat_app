import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'
import { transformImage } from '../../lib/feature';

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false, styling }) => {
    const { name, _id, avatar } = user;
    return (
        <ListItem >
            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}
                {...styling}
                sx={{
                    backgroundColor: "bisque",
                    boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                }}
            >
                <Avatar src={transformImage(avatar)} />
                <Typography
                    variant='body1'
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                    }}
                >{name}</Typography>
                <IconButton
                    size='small'
                    sx={{
                        bgcolor: isAdded ? "error.main" : "primary.main",
                        color: "white",
                        "&:hover": {
                            bgcolor: isAdded ? "error.dark" : "primary.dark"
                        }
                    }}
                    onClick={() => handler(_id)}
                    disabled={handlerIsLoading}>
                    {isAdded ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(UserItem);