import React, { useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, RadioGroup, FormControlLabel, Radio, InputLabel } from "@mui/material";
import axios from 'axios';
import Dashboard from './Dashboard';


const array = ["Mood", "Diagnosed", "Past", "Concern", "Swings"]

export default function StepForm(){
  const [next,setNext] = useState(false)
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ photo: "", relationship: "", bio: "", personality: ""});



  function handleChange(e){
    setFormData(prev => {
        return { ...prev, [e.target.name]: e.target.value }})
  }

  function handleFinishClick(){
    axios.post("https://mental-health-app-ax5a.onrender.com/mood", formData)
      .then((response) => {
        console.log("Server Message: ", response.data.message)
        setNext(true)
      })
      .catch((error) => console.error("Error", error));
  }

if (next){
  return <Dashboard />
}

  return (

    <Box sx={{ width: "50vw", margin: "auto", textAlign: "center", marginTop:'30px' }}>

      <Stepper activeStep={step} alternativeLabel>
        {array.map((item) => (
          <Step key={item}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{height:'180px', marginTop:'56px'}}>      
        {step === 0 && (
          <RadioGroup name="mood" onChange={handleChange} required>
            <InputLabel sx={{fontSize:'20px', color:'black'}}>How are you feeling today?</InputLabel>
            <FormControlLabel label="Happy" value="happy" control={<Radio />} />
            <FormControlLabel label="Neutral" value="neutral" control={<Radio />} />
            <FormControlLabel label="Sad" value="sad" control={<Radio />} />
          </RadioGroup>
        )}

        {step === 1 && (
          <RadioGroup name="diagnosed" onChange={handleChange} required>
            <InputLabel sx={{fontSize:'20px', color:'black'}}>Have you been diagnosed with any mental health conditions?</InputLabel>
            <FormControlLabel label="Yes" value="yes" control={<Radio />} />
            <FormControlLabel label="No" value="no" control={<Radio />} />
          </RadioGroup>
        )}

        {step === 2 && (
            <>
            <InputLabel sx={{fontSize:'20px', color:'black'}}>How would you describe your emotional state over the past few weeks?</InputLabel>
            <textarea placeholder="Emotional state from past few weeks!" name="past" onChange={handleChange} style={{ width: "70%", height:'80px', padding: "8px" }} required/>
          </>
        )}

        {step === 3 && (
          <RadioGroup name="concern" onChange={handleChange} required>
            <InputLabel sx={{fontSize:'20px', color:'black'}}>What are your current mental health concerns?</InputLabel>
            <FormControlLabel label="Stress" value="stress" control={<Radio />} />
            <FormControlLabel label="Anxity" value="anxity" control={<Radio />} />
            <FormControlLabel label="Overthinking" value="overthinking" control={<Radio />} />
          </RadioGroup>
        )}            

        {step ===4 && (
        <RadioGroup name="swings" onChange={handleChange} required>
        <InputLabel sx={{fontSize:'20px', color:'black'}}>Do you experience frequent mood swings or sudden emotional changes?</InputLabel>
        <FormControlLabel label="Yes" value="yes" control={<Radio />} />
        <FormControlLabel label="No" value="no" control={<Radio />} />
      </RadioGroup>
      )}
      </Box>


      <Box sx={{display:'flex', justifyContent:'space-between'}}>

        <Button disabled={step === 0} onClick={()=>setStep(prev=>prev-1)} variant="contained">
          Back
        </Button>     
        {step <= 3 ? (
        <Button type="submit" onClick={()=>setStep(prev=>prev+1)} variant="contained" color="primary">Next</Button>
        ):(
        <Button type="submit" onClick={handleFinishClick} variant="contained" color="primary">Finish</Button>
         )}
               
      </Box>



    </Box>
  )
}
