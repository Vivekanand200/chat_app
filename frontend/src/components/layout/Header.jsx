import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography, dividerClasses } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import { orange } from '../../constant/color'
import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import { server } from '../../constant/config'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
import { resetNotificationCount } from '../../redux/reducers/chat'
const SearchDialog = lazy(() => import('../specific/Search'))
const NotificationDialog = lazy(() => import('../specific/Notifications'))
const NewGroupDialog = lazy(() => import('../specific/NewGroup'))
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isNewGroup, isSearch, isNotification } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);


  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => dispatch(setIsNewGroup(true));

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  }

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/users/logout`, { withCredentials: true });
      dispatch(userNotExists())
      toast.success(data.message);

    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
  const navigateToGroup = () =>
    navigate('/groups')

  return (
    <>
      <Box sx={{
        flexGrow: 1,

      }}
        height={'4rem'}
      >
        <AppBar position='static'
          sx={{
            bgcolor: "rgba(255, 140, 0, 1) ",
          }}>
          <Toolbar>
            <Typography varient='h6' sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
              fontSize: "2.5rem",
              fontStyle: "oblique",
              fontFamily: "cursive"
            }}>
              chatApp
            </Typography>
            <Box sx={{
              display: { xs: "block", sm: "none" }
            }}>
              <IconButton  color='inherit' onClick={handleMobile}>
                <MenuIcon sx={{
                fontWeight: "bold",
                fontSize: "2rem",
                
              }} />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn  title='Search' Icon={<SearchIcon sx={{
                fontWeight: "bold",
                fontSize: "2rem",
               
              }} />} onClick={openSearch} />
              <IconBtn title='New Group' Icon={<AddIcon sx={{
                fontWeight: "bold",
                fontSize: "2rem",
               
              }}/>} onClick={openNewGroup} />
              <IconBtn title='Manage Groups' Icon={<GroupIcon sx={{
                fontWeight: "bold",
                fontSize: "2rem",
               
              }} />} onClick={navigateToGroup} />
              <IconBtn title='Notifications' Icon={<NotificationsIcon sx={{
                fontWeight: "bold",
                fontSize: "2rem",
               
              }}/>} onClick={openNotification} value={notificationCount} />
              <IconBtn title='Logout' Icon={<LogoutIcon sx={{
                fontWeight: "bold",
                fontSize: "2rem",
               
              }} />} onClick={logoutHandler} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {
        isSearch && <Suspense fallback={<Backdrop open />}><SearchDialog /></Suspense>
      }
      {
        isNotification && <Suspense fallback={<Backdrop open />}><NotificationDialog /></Suspense>
      }
      {
        isNewGroup && <Suspense fallback={<Backdrop open />}><NewGroupDialog /></Suspense>
      }
    </>
  )
}

export default Header

const IconBtn = ({ title, Icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton  color='inherit' size='large' onClick={onClick}>
        {
          value ?
            (<Badge badgeContent={value} color='error'>{Icon}</Badge>)
            : Icon
        }

      </IconButton>
    </Tooltip>
  )
}