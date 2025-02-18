import React, { useState, useEffect } from "react";
import { useSpring } from "react-spring";
import Header from "./header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

const Counter = () => {
  const navigate = useNavigate();

  // Get the initial count value from localStorage (or set to 0 if not available)
  const initialCount = parseInt(localStorage.getItem("count") || "0", 10);

  // State to keep track of the count
  const [count, setCount] = useState(initialCount);

  // Animation for background color change
  const springProps = useSpring({
    backgroundColor: `rgb(${Math.min(count * 10, 255)}, ${Math.min(
      count * 5 + 100,
      255
    )}, ${Math.max(255 - count * 10, 100)})`,
    config: { tension: 200, friction: 20 },
  });

  // Update the count in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  // Increment the count
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Decrement the count
  const decrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0)); // Prevent count from going below 0
  };

  // Reset the count and background color
  const reset = () => {
    setCount(0);
  };

  // Navigate to the Dashboard page
  const navigateToDashboard = () => {
    navigate("/userdata");
  };

  return (
    <div className="page-container">
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(90vh - 76px)", // Adjusting height
          padding: "20px",
          background: "linear-gradient(to right, #0f9ec0, #0fc092)",
        }}
      >
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            width: "300px",
            backgroundColor: springProps.backgroundColor.get(), // Safely resolve the animated value
          }}
        >
          <h2>Counter: {count}</h2>
          <div>
            <button onClick={increment} style={buttonStyle}>
              Increment
            </button>
            <button onClick={decrement} style={buttonStyle}>
              Decrement
            </button>
            <button onClick={reset} style={buttonStyle}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Navigate to Dashboard button */}
      <button
        onClick={navigateToDashboard}
        style={{
          position: "fixed",
          top: "100px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          transition: "background 0.3s ease",
        }}
      >
        Go to UserForm
      </button>
      <Footer />
    </div>
  );
};

// Button styles for a consistent look
const buttonStyle: React.CSSProperties = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  background: "#4caf50",
  color: "white",
  transition: "background 0.3s ease",
};

export default Counter;
