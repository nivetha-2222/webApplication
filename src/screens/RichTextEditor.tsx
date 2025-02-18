import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import to receive location state
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Paper } from "@mui/material";
import Header from "./header";
import Footer from "./footer";

type User = {
  name: string;
  address: string;
  email: string;
  phone: string;
  userId: number;
};

const RichTextEditor = () => {
  const [content, setContent] = useState<string>("");
  const location = useLocation(); // Access location state passed by navigate
  const navigate = useNavigate(); // To navigate after saving content
 
  // Receive user data from navigation state
  const { userData } = location.state as { userData: User };

  useEffect(() => {
    if (userData) {
      // Load the user data into the editor (example: load address or email)
      setContent(`Name: ${userData.name}\nAddress: ${userData.address}\nEmail: ${userData.email}\nPhone: ${userData.phone}`);
    }
  }, [userData]);

  const handleSave = () => {
    if (userData) {
      // Update the content in the user data
      const updatedUserData = { ...userData, content };

      // Retrieve current data from localStorage
      const storedUserData = localStorage.getItem("userDataArray");
      if (storedUserData) {
        const parsedData: User[] = JSON.parse(storedUserData);
        
        // Update the user data in the array based on userId
        const updatedData = parsedData.map((user) =>
          user.userId === userData.userId ? updatedUserData : user
        );

        // Save the updated user data back to localStorage
        localStorage.setItem("userDataArray", JSON.stringify(updatedData));

        // Optionally, also save the content in a separate key if you want
        localStorage.setItem("userContent", content);

        alert("Content saved successfully!");

        // Navigate back to the user list or another page
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="page-container">
      <Header />
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px",height:'590px' }}>
      <h2>Edit User Data</h2>
      <Paper style={{ padding: "50px" }}>
        <ReactQuill value={content} onChange={setContent} theme="snow" />
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: "20px" }}>
          Save
        </Button>
      </Paper>
    </div>
    <Footer />
    </div>
  );
};

export default RichTextEditor;
