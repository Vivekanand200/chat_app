import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constant/sampleData'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { setIsNewGroup } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'
const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc)
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery("");

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const groupName = useInputValidation();
  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    }
  ]
  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => prev.includes(id)
      ? prev.filter((currElement) => currElement !== id)
      : [...prev, id]);

  }
  useEffect(() => {
    console.log(selectedMembers.length);
  }, [selectedMembers]);


  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 3)
      return toast.error("Please select At least 3 member");
    //Creating a new group
    newGroup("Creating New Group...", { name: groupName.value, members: selectedMembers })
    closeHandler();
  }


  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"} >
        <DialogTitle textAlign={"center"} sx={{
                fontWeight: "bold",
                fontSize: "2rem",
                fontStyle: "oblique",
                fontFamily: "cursive"
              }} variant='h4'>New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
        <Typography sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1.3rem",
                fontStyle: "oblique",
                fontFamily: "cursive"
              }} variant="body1">Members</Typography>
        <Stack>
          {
            isLoading ? <Skeleton /> :
              (data?.friends?.map((i) => (
                <UserItem user={i} key={i._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)} />
              )))
          }
          <Stack sx={{
            display: 'flex',
            justifyContent: "space-around"
          }} direction={"row"} spacing={"2rem"} >
            <Button sx={{
              "&:hover": {
                bgcolor: "red",
                color: "inherit"
              }
            }} variant='outlined' color='error' onClick={closeHandler}>Cancel</Button>
            <Button onClick={submitHandler} variant='contained' disabled={isLoadingNewGroup}>Create</Button>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup