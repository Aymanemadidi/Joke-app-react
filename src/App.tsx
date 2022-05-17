import "./App.css";
import robot from "./robot.gif";
import { useState } from "react";

function App() {
  const [status, setStatus] = useState("idle");
  const [joke, setJoke] = useState("");

  const requestJoke = () => {
    setStatus("pending");
    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((json) => {
        setJoke(json.value);
        setStatus("resolved");
        console.log(json);
      })
      .catch((err) => {
        setStatus("error");
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>Chuck Norris Jokes</h1>
      <div>
        <img className="robot" src={robot} alt="robot" />
      </div>
      <div>
        <button onClick={requestJoke}>Tell me a joke</button>
      </div>
      <div>
        {status === "resolved" ? (
          <p>{joke}</p>
        ) : status === "pending" ? (
          <p>Loading...</p>
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
