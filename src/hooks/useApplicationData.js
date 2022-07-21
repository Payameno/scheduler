import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    },
    []
  );

  const setDay = (day) => {
    return setState({ ...state, day });
  };

  const updateSpots = function (state, appointments) {
    const foundDay = state.days.find(day => day.name === state.day)
  
    let spots = 0;
    for (let id of foundDay.appointments) {
      const appointment = appointments[id]
      if (!appointment.interview) {
        spots++
      }
    }
    
    const day = { ...foundDay, spots }
    const days = [...state.days]
    const dayIndex = days.findIndex(obj => obj.id === day.id);
    days[dayIndex] = day;
  
    return days;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments);
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state, appointments);
    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState({
        ...state,
        appointments,
        days
      })
    );
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState({
        ...state,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
