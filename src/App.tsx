import "./App.css";
import robot from "./robot.gif";
import { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import chuckGif from "./chuck-norris.gif";

function App() {
  const [status, setStatus] = useState("idle");
  const [joke, setJoke] = useState("");

  const { speak } = useSpeechSynthesis();

  // useEffect(() => {
  //   document.addEventListener("keydown", function (event) {
  //     console.log(
  //       `Key: ${event.key} with keycode ${event.keyCode} has been pressed`
  //     );
  //   });
  // }, []);

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
          Read the joke for me
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
