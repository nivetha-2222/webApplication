import React, { useState, useEffect } from "react";
import { TextField, Button, Paper } from "@mui/material";
import Header from "./header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import "../components/auth.css"


const UserDataForm = () => {
  const initialFormData = {
    name: "",
    address: "",
    email: "",
    phone: "",
    userId: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate(); // Use navigate hook

  // Generate numeric user ID with persistent counter
  const generateUserId = () => {
    const currentId = parseInt(localStorage.getItem("userIdCounter") || "0", 10) + 1;
    localStorage.setItem("userIdCounter", currentId.toString());
    return currentId;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setIsDirty(true);
      return updatedData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = generateUserId();
    const newUserData = { ...formData, userId };

    const storedData = JSON.parse(localStorage.getItem("userDataArray") || "[]");
    const updatedDataArray = [...storedData, newUserData];

    localStorage.setItem("userDataArray", JSON.stringify(updatedDataArray));

    setFormData(initialFormData);
    setIsDirty(false);

    alert("User data saved successfully!");

    // Navigate to the user list page
    navigate("/UserList");
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <div className="page-container">
      <Header />
      <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", }}>
        <Paper
          elevation={4} // Controls the shadow depth (can be adjusted from 0 to 24)
          style={{
            padding: "20px",
            borderRadius: "15px", // Rounded corners for the card
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Custom shadow
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Data Form</h2>
          <form onSubmit={handleSubmit} >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className="input"
              autoFocus
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className="input"
             autoFocus
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className="input"
              autoFocus
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className="input"
              autoFocus
            />
            <Button
            className="send-otp-button"
              type="submit"
              variant="contained"
            //   color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default UserDataForm;
