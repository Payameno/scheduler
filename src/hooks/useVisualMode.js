import { useState } from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === true) {
      setMode(mode);
      setHistory(prev => prev.filter(item => {
        return item === (history[0]);
      }));
    }
    setMode(mode);
    setHistory(prev => [...prev, mode]);
  };
  
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => prev.filter(item => {
        return item !== (history[history.length - 2]);
      }));
    }
    
      if (history.length === 1)
      return;
    }
  return { mode, transition, back };
};

