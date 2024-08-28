import React, { useEffect, useState } from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin, getAdmin } from '../../redux/thunks/admin';


const AdminLogin = () => {

    const dispatch = useDispatch();
    const {isAdmin} = useSelector((state) => state.auth)

    const secretKey = useInputValidation("");
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value));
    };

    useEffect(()=>{
        dispatch(getAdmin());
    }, [dispatch]);
    
        if (isAdmin) {
            return <Navigate to="/admin/dashboard" />
        }
    
    
    return (
        <Container component={"main"} maxWidth="xs" sx={
            {
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap:"20px",
            }
        }>
            <Typography sx={{
        fontWeight: "bold",
        fontSize: "1.7rem",
        fontStyle: "italic",
        fontFamily: "cursive",
      
      }}>Welcome To Chat App BOSS</Typography>
            <Paper
                elevation={3}
                sx={
                    {
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }
                }
            >
                <Typography varient="hs" sx={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                fontStyle: "oblique",
                fontFamily: "cursive"
              }}>Sir please Login Here</Typography>
                <form style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignContent: "center"
                }} onSubmit={submitHandler}>
                    <TextField
                        required
                        fullWidth
                        label="Secret Key janemann"
                        type='password'
                        margin='normal'
                        variant='outlined'
                        value={secretKey.value}
                        onChange={secretKey.changeHandler} />
                    <Button sx={{
                        marginTop: "1rem",
                    }} variant='contained' color='primary' type='submit'>
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default AdminLogin;