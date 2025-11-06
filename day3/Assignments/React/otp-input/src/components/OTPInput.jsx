import React, { useState, useRef } from "react";
import "./OTPInput.css";

const OTPInput = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }}
  };
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(pasted)) {
      const digits = pasted.split("");
      setOtp(digits);
      digits.forEach((digit, i) => {
        inputRefs.current[i].value = digit;
      });
      inputRefs.current[3].focus();
    }
    e.preventDefault();
  };
  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      alert(`Entered OTP: ${otpValue}`);
    } else {
      alert("Please enter all 4 digits.");
    }
  };
  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <div className="otp-inputs" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default OTPInput;
