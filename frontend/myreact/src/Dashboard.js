import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Modal, Box } from "@mui/material";

export default function Dashboard() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const cards = [
    { title: "Sleepless", video: "/video1.mp4", image:'/image1.jpeg' },
    { title: "Distracted", video: "/video2.mp4", image:"/image2.jpeg"},
    { title: "Negative", video: "/video3.mp4", image:"/image3.jpeg"  },
  ];

  let card=cards[index]

  return (
    <Box sx={{width: "100vw",height: "100vh",backgroundImage: "url(/image0.jpg)",backgroundSize: "cover",backgroundRepeat: "no-repeat",display:'flex',justifyContent: "center",alignItems: "center", }}>
    
      <Card sx={{width:'400px', height:"400px", backgroundColor: "white",padding: 3,borderRadius: 3,boxShadow: 3}} onDoubleClick={()=>setIndex(Math.floor(Math.random() * cards.length))} >
        <Typography sx={{textAlign:'center'}}>{card.title}</Typography>
        <CardContent>
        <img src={card.image} style={{width:'369px', height:'350px'}} onClick={()=>setOpen(true)}/>
        </CardContent>
      </Card>
   
      <Modal open={open} onClose={()=>setOpen(false)}>
        <Box sx={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",width: 600,height:600,bgcolor: "background.paper",padding:'2px',boxShadow: 24,}}>
          <video controls style={{ width: "100%", height:'100%' }}>
            <source src={card.video} type="video/mp4" />
          </video>
        </Box>
      </Modal>
      <Typography sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',padding: '10px',backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius:'5px'}}>
        Tap on image to play video. Double-tap on card for next.
        </Typography>
      </Box>
  );
}
