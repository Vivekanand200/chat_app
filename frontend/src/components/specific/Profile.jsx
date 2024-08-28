import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import moment from 'moment';
import { transformImage } from '../../lib/feature';
const Profile = ({ user }) => {

    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar
                src={transformImage(user?.avatar?.url)}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white",
                    boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
                    
                    
                }} />
            <ProfileCard heading={"Bio"} text={user?.bio} />
            <ProfileCard heading={"Username"} text={user?.username} icon={<UserNameIcon />} />
            <ProfileCard heading={"Name"} text={user?.name} icon={<FaceIcon />} />
            <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} icon={<CalendarIcon />} />
        </Stack>
    )
}

export default Profile

const ProfileCard = ({ text, heading, icon }) => {

    return (
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
            {icon && icon}
            <Stack>
                <Typography sx={{
                    fontWeight: "bold",
                    fontFamily:"cursive"
                }} variant='body1'>
                    {
                        text
                    }
                </Typography>
                <Typography sx={{
                    fontWeight: "bold",
                    fontFamily:"cursive",
                    fontStyle:"oblique",
                    fontSize:"15px"
                }} color={"gray"} variant='caption'>
                    {
                        heading
                    }
                </Typography>
            </Stack>
        </Stack>
    )
}