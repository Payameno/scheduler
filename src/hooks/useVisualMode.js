import { useState } from "react";
//hook to change visual mode for appointment items
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
// replace will move two modes back from where it was started
  function transition(mode, replace = false) {
    setHistory((prev) => {
      const newHistory = [...prev];
      //if replace is true we need to go 2 items back,thus first item on stack is removed
      if (replace === true) {
        newHistory.pop();
      }

      newHistory.push(mode);
      return newHistory;
    });
  }

  function back() {
    //for first and second items in list,should keep them and not going further back
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
