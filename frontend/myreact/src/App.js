import React, {useState} from 'react';
import {Box, Tabs, Tab, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography} from '@mui/material';
import axios from 'axios';
import StepForm from './StepForm';
import Login from './Login';
import Register from './Register';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';

export default function App() {
  const [tab, setTab] = useState(0)
  const [registerData, setRegisterData] = useState({name:'', gender:'', marital_status:'',age:'',regNo:'',password:''})
  const [loginData, setLoginData] = useState({regNo:'',password:''})
  const [next, setNext] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [loading, setLoading] = useState(false)


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
    axios.post('http://127.0.0.1:5000/register', registerData)
    .then(responce =>{
      console.log("Server Message:", responce.data.message)
      setLoading(true)
      if (responce.data.message == "success"){
        setSuccessModal(true)
        setLoading(false)
        setTab(0)
      } else{
        setErrorModal(true)
        setLoading(false)
      }
    })
    .catch(error => {
      console.error("Error: ", error)
    })
  }


    
  function handleLoginSubmit(e){
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/login',loginData)
    .then(responce =>{
      console.log("Server Message:", responce.data.message)
      setLoading(true)
      if (responce.data.message == "success"){
        setSuccessModal(true)
        setLoading(false)
        setTab(0)
      } else{
        setErrorModal(true)
        setLoading(false)
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
    <SuccessModal successModal={successModal} setSuccessModal={setSuccessModal}/>
    <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal}/>
    <Box sx={{width: "100vw",height: "100vh", flexDirection:'column',backgroundImage: "url(/image0.jpg)",backgroundSize: "cover",backgroundRepeat: "no-repeat",display:'flex',justifyContent: "center",alignItems: "center", }}>

      <Box sx={{width:"400px",backgroundColor:'white',padding:3, borderRadius:3, boxShadow:3}}>
    
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