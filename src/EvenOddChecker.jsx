import { useState } from "react";

export default function EvenOddChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  function check() {
    const num = Number(input);
    if (input === "" || isNaN(num)) {
      setResult("error");
    } else {
      setResult(num % 2 === 0 ? "even" : "odd");
    }
  }

  return (
    <div>
      <input
        placeholder="Enter a number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={check}>Check</button>

      {result === "even" && <p>Even number</p>}
      {result === "odd" && <p>Odd number</p>}
      {result === "error" && <p>Please enter a valid number</p>}
    </div>
  );
}
