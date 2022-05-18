import "./App.css";
import { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import chuckGif from "./chuck-norris.gif";

function App() {
  const [status, setStatus] = useState("idle");
  const [joke, setJoke] = useState("");

  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "j") {
        speak({ text: joke });
      }
    });
  }, [joke, speak]);

  const requestJoke = () => {
    setStatus("pending");
    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((json) => {
        setJoke(json.value);
        setStatus("resolved");
        // console.log(json);
      })
      .catch((err) => {
        setStatus("error");
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Chuck Norris Jokes</h1>
      </div>
      <div>
        <img className="chuck" src={chuckGif} alt="chuck" />
      </div>
      <div className="buttons">
        <button className="request-btn" onClick={requestJoke}>
          Tell me a joke
        </button>
        <button
          className={`read-btn ${status === "resolved" ? "active" : ""}`}
          onClick={() => speak({ text: joke })}
          disabled={status !== "resolved"}
        >
          Click here to read the joke or press 'j'
        </button>
      </div>
      <div className="joke-container">
        {status === "resolved" ? (
          <p>"{joke}"</p>
        ) : status === "pending" ? (
          <p className="loading">Loading...</p>
        ) : status === "error" ? (
          <p>Error Fetching Joke</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
