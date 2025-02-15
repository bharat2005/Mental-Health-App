import React, {useState} from 'react';
import {Box} from '@mui/material';
import axios from 'axios';
import StepForm from './StepForm';
import Login from './Login';
import Register from './Register';

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
    console.log(registerData)
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/register', registerData)
    .then(responce =>{
      console.log("Server Message:", responce.data.message)
      if (responce.data.message == "success"){
        alert("Registration Successful!")
        setTab(0)
      } else{
        alert("Registration No. already exist!")
      }
    })
    .catch(error => {
      console.error("Error: ", error)
    })
  }


    
  function handleLoginSubmit(e){
    console.log(loginData)
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/login',loginData)
    .then(responce =>{
      console.log("Server Message:", responce.data.message)
      if (responce.data.message == "success"){
        alert("Login Successful!")
        setNext(true)
        setTab(0)
      } else{
        alert('Invalid Credentials!')
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
    <>
    
    <Box sx={{
      width: "100vw",
      height: "100vh", 
      flexDirection:'column',
      backgroundImage: "url(/background.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display:'flex',
      justifyContent: "center",
      alignItems: "left",
       }}>

      <Box sx={{width:"400px",backgroundColor:'white',padding:3, borderRadius:3, boxShadow:3, marginLeft:'8%'}}>
    
         {tab === 0?(
          <Register handleRegisterSubmit={handleRegisterSubmit} handleRegisterChange={handleRegisterChange} setTab={setTab}/>
         ):(
          <Login  handleLoginSubmit={handleLoginSubmit} handleLoginChange={handleLoginChange} setTab={setTab}/>
         )}
      </Box> 
    </Box>
    </>
  )
}