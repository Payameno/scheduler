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

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  // const day = {
  //   ...state.days[id],
  //   spots: state.days[id].spots + 1
  // }
  // const days = {
  //   ...state.days,
  //   [id]: day
  // }
  return axios.put(`/api/appointments/${id}`, { interview }).then( () => {
      const days = updateSpots(state, appointments, id);
      setState({ ...state, appointments, days})
  })
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
    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState({
        ...state,
        appointments,
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
    cancelInterview
  }
}