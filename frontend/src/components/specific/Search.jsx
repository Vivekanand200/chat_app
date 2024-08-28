import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material'
import { useInputValidation } from '6pp'
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constant/sampleData';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import toast from 'react-hot-toast';
import { useAsyncMutation } from '../../hooks/hook';
const Search = () => {

  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const search = useInputValidation("");

  const [users, setUsers] = useState([])

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });

  }

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err))
    }, 500)
    return () => {
      clearTimeout(timeOutId);
    }
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={'25rem'} >
        <DialogTitle sx={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                fontStyle: "oblique",
                fontFamily: "cursive"
              }} textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label="Search people..."
          value={search.value}
          onChange={search.changeHandler}
          varient="outlined"
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <List>
          {
            users.map((i) => (
              <UserItem user={i} key={i._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
            ))
          }
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search;