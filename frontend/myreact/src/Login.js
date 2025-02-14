import React, {useState} from 'react';
import { TextField, Button, Typography} from '@mui/material';


export default function Login({handleLoginSubmit, handleLoginChange, loading, setTab}) {

return (
<>
<form onSubmit={handleLoginSubmit}>
<Typography variant="h5" sx={{textAlign:'center'}}>Login</Typography>
<TextField type="number" label="Regisitration No." name="regNo" margin="normal" onChange={handleLoginChange} required fullWidth/>
<TextField type="password" label="Password" name="password" margin="normal" onChange={handleLoginChange} required fullWidth/>
<Typography sx={{textAlign:'center'}}>Don't have an account?<Button onClick={()=>setTab(0)} sx={{border:'0px solid black'}}>Register</Button> </Typography><br/>
<Button type="submit" variant="contained" loading={loading} fullWidth>Login</Button>

</form>
</>
)}