import React, { useState, useEffect, useRef } from "react";

const RandomJokeFetcher = () => {
  const [currentJoke, setCurrentJoke] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [multipleCount, setMultipleCount] = useState(1);
  const fetchIdRef = useRef(0); 

  // Fetch a single joke
  const fetchJoke = async (count = 1) => {
    const currentFetchId = ++fetchIdRef.current; // Track latest fetch
    setLoading(true);
    setError("");
    try {
      let jokes = [];

      // Fetch multiple jokes if requested
      for (let i = 0; i < count; i++) {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        jokes.push(data);
      }

      // Only process if this is the latest fetch
      if (currentFetchId === fetchIdRef.current) {
        const latestJoke = jokes[jokes.length - 1];
        setCurrentJoke(latestJoke);

        // Keep the latest 5 jokes in history
        setHistory((prev) => {
          const updated = [...jokes.reverse(), ...prev].slice(0, 5);
          return updated;
        });
      }
    } catch (err) {
      if (currentFetchId === fetchIdRef.current) setError("Failed to fetch joke.");
    } finally {
      if (currentFetchId === fetchIdRef.current) setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentJoke(null);
  };

  const longestSetupLength = history.reduce(
    (max, j) => Math.max(max, j.setup.length),
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: "1rem" }}>🎭 Random Joke Fetcher</h1>

      {/* Input for multiple jokes */}
      <div style={styles.row}>
        <input
          type="number"
          min="1"
          max="5"
          value={multipleCount}
          onChange={(e) => setMultipleCount(Number(e.target.value))}
          style={styles.input}
        />
        <button onClick={() => fetchJoke(multipleCount)} style={styles.button}>
          {multipleCount === 1 ? "Get Random Joke" : `Load ${multipleCount} Jokes`}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display current joke */}
      {currentJoke && !loading && !error && (
        <div style={styles.jokeBox}>
          <p style={styles.setup}><strong>{currentJoke.setup}</strong></p>
          <p style={styles.punchline}>{currentJoke.punchline}</p>
        </div>
      )}

      {/* Clear History */}
      {history.length > 0 && (
        <button onClick={clearHistory} style={{ ...styles.button, marginTop: "1rem" }}>
          Clear History
        </button>
      )}

      {/* Joke History */}
      <h3 style={{ marginTop: "2rem" }}>🕒 Joke History (Last 5)</h3>
      <ul style={styles.list}>
        {history.map((joke, index) => (
          <li
            key={index}
            style={{
              ...styles.listItem,
              backgroundColor:
                joke.setup.length === longestSetupLength ? "#ca83ecff" : "#f9f9f9ff",
            }}
          >
            <strong>{joke.setup}</strong> — {joke.punchline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomJokeFetcher;

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  input: {
    width: "60px",
    padding: "0.5rem",
    fontSize: "1rem",
    textAlign: "center",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#b872e7ff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  jokeBox: {
    background: "#f1f1f1",
    padding: "1rem",
    borderRadius: "10px",
    marginTop: "1rem",
  },
  setup: {
    fontSize: "1.1rem",
  },
  punchline: {
    color: "#444",
    marginTop: "0.5rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    margin: "0.5rem 0",
    padding: "0.5rem",
    borderRadius: "6px",
    transition: "background 0.3s ease",
  },
};
