import React, {useState} from 'react';
import {Box, Tabs, Tab, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';
import axios from 'axios';
import StepForm from './StepForm';

export default function App() {
  const [tab, setTab] = useState(0)
  const [registerData, setRegisterData] = useState({name:'', gender:'', marital_status:'',age:'',regNo:'',password:''})
  const [loginData, setLoginData] = useState({regNo:'',password:''})
  const [next, setNext] = useState(false)


  function handleRegisterChange(e){
  setRegisterData(prev => {
    return {...prev, [e.target.name]:e.target.value}
  })
  }

  function handleLoginChange(e){
    setLoginData(prev =>{
      return {...prev,[e.target.name]:e.target.value }
    })



  }
  function handleRegisterSubmit(e){
    e.preventDefault();
    axios.post('https://mental-health-app-ax5a.onrender.com/register', registerData)
    .then(responce =>{
      console.log("Server Message:", responce.data.message)
      if (responce.data.message == "success"){
        alert("Registration Successful!")
        setTab(0)
      } else{
        alert("Registration No Already Exist!")
      }
    })
    .catch(error => {
      console.error("Error: ", error)
    })
  }


    
  function handleLoginSubmit(e){
    e.preventDefault();
    axios.post('https://mental-health-app-ax5a.onrender.com/login',loginData)
    .then(responce =>{
      console.log("Server Message:", responce.data.message)
      if (responce.data.message === "success"){
          alert("Login Successful!")
          setNext(true)
      } else{
        alert("Invalid Details!")
      }
    })
    .catch(error => {
      console.error("Error: ", error)
    })
  }

  if(next){
    return <StepForm/>
  }


  return (
    <Box sx={{width: "100vw",height: "100vh",backgroundImage: "url(/image0.jpg)",backgroundSize: "cover",backgroundRepeat: "no-repeat",display:'flex',justifyContent: "center",alignItems: "center", }}>

      <Box sx={{width:"400px",backgroundColor:'white',padding:3, borderRadius:3, boxShadow:3}}>
        
        <Tabs value={tab} onChange={(e,i)=> setTab(i)} mb={4}>
          <Tab label="Login"/>
          <Tab label="Register" />
        </Tabs>

        {tab === 1? (
          <>
        <form onSubmit={handleRegisterSubmit}>
          
          <TextField key="bharat" type="text" label="Name" name="name" margin="normal" onChange={handleRegisterChange} required fullWidth/>

          <Box sx={{display:'flex', margin:'8px', gap:"16px"}}>
            <FormControl fullWidth>
              <InputLabel>I'm</InputLabel>
              <Select name="gender" label="I'm" onChange={handleRegisterChange} required>
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
          <Button type="submit" variant="contained" fullWidth>Register</Button>

        </form>
        </>
        ):(
          <>
          <form onSubmit={handleLoginSubmit}>

          <TextField type="number" label="Regisitration No." name="regNo" margin="normal" onChange={handleLoginChange} required fullWidth/>
          <TextField type="password" label="Password" name="password" margin="normal" onChange={handleLoginChange} required fullWidth/>
          <Button type="submit" variant="contained" fullWidth>Login</Button>

          </form>
          </>
        )
      }
      </Box>
    </Box>
  )
}