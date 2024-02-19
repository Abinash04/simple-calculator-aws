import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const buttonNames = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "*",
    "/",
    ".",
    "C",
    "=",
  ];
  const AwsApiUrl =
    "https://3peca6a39g.execute-api.us-east-1.amazonaws.com/dev";

  const handleButtonPress = (val) => {
    if (val === "=") {
      try {
        // setResult(eval(input).toString());
        // call an api using fetch  or axios to calculate the result here
        fetch(AwsApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: input }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("API returned:", data);
            setResult(data.body);
          });
      } catch (error) {
        setResult("Error");
      }
    } else if (val === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prevInput) => prevInput + val);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Simple Calculator</h1>
        <input
          type="text"
          className="calculator-screen"
          value={input}
          placeholder={"Input"}
          readOnly
        />
        <input
          type="text"
          className="calculator-screen"
          value={result}
          placeholder={"Result"}
          readOnly
        />
        {/* <hr /> */}
        <div className="calculator-keys">
          {buttonNames.map((buttoName) => (
            <button
              key={buttoName}
              onClick={() => handleButtonPress(buttoName)}
            >
              {buttoName}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
