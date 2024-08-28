import { useFileHandler, useInputValidation } from '6pp';
import { CameraAlt as CameraIcon } from '@mui/icons-material';
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { VisuallyHiddenInput } from '../components/styles/StyledComponent';
import { server } from '../constant/config';
import { userExists } from '../redux/reducers/auth';
import { usernameValidator } from '../utils/validators';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const toastId = toast.loading("Logging in...");

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(`${server}/api/v1/users/signin`, {
        username: username.value,
        password: password.value,
      }, config);
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message, "Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }

  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const toastId = toast.loading("Signing up...");


    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("name", name.value);
    formData.append("bio", bio.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    try {
      const { data } = await axios.post(`${server}/api/v1/users/signup`,
        formData, config);
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message, "Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Container component={"main"} maxWidth="xs" sx={
      {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }
    }>
      <Typography sx={{
        fontWeight: "bold",
        fontSize: "2rem",
        fontStyle: "italic",
        fontFamily: "cursive"
      }}>Welcome To Chat App</Typography>
      <Paper
        elevation={3}
        sx={
          {
             padding:2 ,
             width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }
        }
      >
        {
          isLogin ? (
            <>
              <Typography varient="hs" sx={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                fontStyle: "oblique",
                fontFamily: "cursive"
              }}>Users Login Here</Typography>
              <form style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center"
              }} onSubmit={handleLogin}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  type='text'
                  margin='normal'
                  variant='outlined'
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type='password'
                  margin='normal'
                  variant='outlined'
                  value={password.value}
                  onChange={password.changeHandler} />
                <Button sx={{
                  marginTop: "1rem",
                }} disabled={isLoading} variant='contained' color='primary' type='submit'>
                  Login
                </Button>
                <Typography textAlign={'center'} m={'0.3rem'}>OR</Typography>
                <Button
                  disabled={isLoading}
                  onClick={toggleLogin}
                >
                  SignUp instead
                </Button>
                <Typography textAlign={'center'} m={'0.3rem'}>OR</Typography>
                <Button
                  disabled={isLoading}
                  onClick={() => navigate('/admin')}
                >
                  Admin Login
                </Button>
              </form>
            </>
          ) : (<>
            <>
              
              <Typography varient="hs" sx={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                fontStyle: "oblique",
                fontFamily: "cursive"
              }}>Users SignUp Here</Typography>
              <form style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center"
              }} onSubmit={handleSignUp}>
                <Stack
                  position={"relative"}
                  width={"10rem"}
                  margin={'auto'}>
                  <Avatar sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                    src={avatar.preview} />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)"
                      }
                    }} component="label">
                    <>
                    <Tooltip title="Upload Avatar">
                    <CameraIcon />
                    </Tooltip>
                      
                      <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                    </>
                  </IconButton>
                </Stack>
                {
                  avatar.error && (
                    <Typography m={'1rem'} color="error" variant='caption'>{avatar.error}</Typography>
                  )
                }
                <TextField
                  required
                  fullWidth
                  label="Name"
                  type='text'
                  margin='normal'
                  variant='outlined'
                  value={name.value}
                  onChange={name.changeHandler} />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  type='text'
                  margin='normal'
                  variant='outlined'
                  value={bio.value}
                  onChange={bio.changeHandler} />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  type='text'
                  margin='normal'
                  variant='outlined'
                  value={username.value}
                  onChange={username.changeHandler} />
                {
                  username.error && (
                    <Typography color="error" variant='caption'>{username.error}</Typography>
                  )
                }
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type='password'
                  margin='normal'
                  variant='outlined'
                  value={password.value}
                  onChange={password.changeHandler} />
                {
                  password.error && (
                    <Typography color="error" variant='caption'>{password.error}</Typography>
                  )
                }
                <Button sx={{
                  marginTop: "1rem",
                }} variant='contained' color='primary' type='submit' disabled={isLoading}>
                  SignUp
                </Button>
                <Typography textAlign={'center'} m={'0.1rem'}>OR</Typography>
                <Button sx={{
                  marginTop: "0.1rem",
                }}
                  disabled={isLoading}
                  onClick={toggleLogin}
                >
                  Login instead
                </Button>
              </form>
            </>
          </>)
        }
      </Paper>
    </Container>
  )
}

export default Login