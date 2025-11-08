import React, { useState, useEffect, useRef } from "react";
import "./AnimatedBanner.css";

const AnimatedBanner = ({
  texts = ["Learn React", "Build Projects", "Get Hired"],
  typingSpeed = 120,
  erasingSpeed = 60,
  delayBeforeErase = 1000,
  delayBeforeNext = 500,
  loop = true,
}) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fade, setFade] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentText = texts[index % texts.length];

    const handleTyping = () => {
      if (!isDeleting) {
        if (text.length < currentText.length) {
          setText((prev) => currentText.substring(0, prev.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), delayBeforeErase);
        }
      } else {
        if (text.length > 0) {
          setText((prev) => currentText.substring(0, prev.length - 1));
          timeoutRef.current = setTimeout(handleTyping, erasingSpeed);
        } else {
          setFade(true);
          timeoutRef.current = setTimeout(() => {
            setFade(false);
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % texts.length);
          }, delayBeforeNext);
        }
      }
    };

    if (texts.length > 0) {
      timeoutRef.current = setTimeout(handleTyping, typingSpeed);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, index, texts]);

  return (
    <div className="banner-container" aria-live="polite">
      <h1 className={`banner-text ${fade ? "fade-out" : "fade-in"}`}>
        {text}
        <span className="cursor">|</span>
      </h1>
    </div>
  );
};

export default AnimatedBanner;
