import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setHistory((prev) => {
      const newHistory = [...prev];
      
      if (replace === true) {
        newHistory.pop();
      }

      newHistory.push(mode);
      return newHistory;
    });
  }

  function back() {
    if (history.length < 2) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  }

  const mode = history[history.length - 1];

  return { mode, transition, back };
}
