import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from '../../redux/api/api';
import { setIsNotification } from '../../redux/reducers/misc';

const Notifications = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc)
  const { isLoading, data, error, isError } = useGetNotificationQuery()
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation)

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting Friend Request...", { requestId: _id, accept });

  };

  const closeNotificationHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);
  return (
    <Dialog open={isNotification} onClose={closeNotificationHandler} >
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"} >
        <DialogTitle sx={{
          fontWeight: "bold",
          fontSize: "1.3rem",
          fontStyle: "oblique",
          fontFamily: "cursive"
        }} textAlign={"center"}>Notification</DialogTitle>
        {
          isLoading ? (<Skeleton />) : (
            data?.allRequests.length > 0 ? (
              data?.allRequests?.map((i) => (
                <NotificationItem key={i._id} sender={i.sender} _id={i._id} handler={friendRequestHandler} />

              )))
              : (<Typography textAlign={"center"}>0 notification</Typography>)
          )
        }
      </Stack>
    </Dialog>
  )
}

export default Notifications

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return <>
    <ListItem sx={{
      boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
      padding: "1rem 2rem",
      borderRadius: "1rem",
      backgroundColor: "bisque"
    }} >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant='body1'
          sx={{

            fontWeight: "bold",
            fontSize: "1rem",
            fontStyle: "oblique",
            fontFamily: "cursive",

            flexGrow: 1,
            display: 'flex',
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >{`${name} sent new friend request`}</Typography>
        <Stack sx={{
          gap: 1,
        }} direction={{
          xs: "column",
          sm: "column",

        }}>
          <Button sx={{
            boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
            borderRadius: "1rem",
          }} onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button sx={{
            boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
            borderRadius: "1rem",
          }} color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>

        </Stack>
      </Stack>
    </ListItem>
  </>
});