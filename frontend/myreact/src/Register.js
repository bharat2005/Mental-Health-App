import React, {useState} from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';


export default function Register({handleRegisterSubmit, handleRegisterChange, loading, setTab}) {

return (
    <>
    <form onSubmit={handleRegisterSubmit}>
    <Typography variant="h5" sx={{textAlign:'center'}}>Register</Typography>
      <TextField key="bharat" type="text" label="Name" name="name" margin="normal" onChange={handleRegisterChange} required fullWidth/>

      <Box sx={{display:'flex', margin:'8px', gap:"16px"}}>
        <FormControl fullWidth>
          <InputLabel>Sex</InputLabel>
          <Select name="gender" label="Sex" onChange={handleRegisterChange} required>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Marital Status</InputLabel>
          <Select name="marital_status" label="Marital Status" onChange={handleRegisterChange} required>
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married</MenuItem>
            <MenuItem value="prefer_not_so_say">Prefer not to say</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Age</InputLabel>
          <Select name="age" label="Age" onChange={handleRegisterChange} required>
            {
              [...Array(10)].map((item,index)=>{
                return <MenuItem key={index} value={index+18}>{index + 18}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Box>

      <TextField type="number" label="Regisitration No." name="regNo" margin="normal" onChange={handleRegisterChange} required fullWidth/>
      <TextField type="password" label="Password" name="password" margin="normal" onChange={handleRegisterChange} required fullWidth/>
     <Typography sx={{textAlign:'center'}}>Already have an account?<Button varient="outlined" onClick={()=>setTab(1)} sx={{border:'0px solid black'}}>Login</Button></Typography><br/>
      <Button type="submit" loading={loading} variant="contained" fullWidth>Register</Button>

    </form>
    </>
)}