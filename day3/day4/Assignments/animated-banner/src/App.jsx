import React from "react";
import AnimatedBanner from "./components/AnimatedBanner";

const App = () => {
  return (
    <div>
      <AnimatedBanner
        texts={["Create.", "Learn.", "Grow."]}
        typingSpeed={150}
        erasingSpeed={80}
        delayBeforeErase={1000}
        delayBeforeNext={600}
        loop={true}
      />
    </div>
  );
};

export default App;
