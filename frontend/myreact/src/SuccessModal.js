import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

export default function ErrorModal({ successModal, setSuccessModal }) {
  return (
    <Modal open={successModal} onClose={() => setSuccessModal(false)}>
      <Box
        sx={{
          width: { xs: 320, sm: 400 }, 
          margin: "auto",
          marginTop: '30%',
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "green",
            fontSize: { xs: "1rem", sm: "1.25rem" }, 
          }}
        >
          Successful
        </Typography>
        <Button
          variant="contained"
          onClick={() => setSuccessModal(false)}
          sx={{
            width: "100%",
            padding: { xs: "8px", sm: "10px" }, 
            backgroundColor: "black",
            color: "white",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#ffbf00" },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Okay
        </Button>
      </Box>
    </Modal>
  );
}
