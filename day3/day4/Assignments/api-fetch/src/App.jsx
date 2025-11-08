import React from "react";
import RandomJokeFetcher from "./components/RandomJokeFetcher";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <RandomJokeFetcher />
    </div>
  );
}

export default App;
