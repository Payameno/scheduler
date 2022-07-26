import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    }
  );

  const setDay = (day) => {
    return setState({ ...state, day });
  };
//Update interview spots left to book
  const updateSpots = function (state, appointments) {

  //find the day where name is the same as the day in state
    const foundDay = state.days.find(day => day.name === state.day)
  
    let spots = 0;
    //loop through appointments of the day
    for (let id of foundDay.appointments) {
      const appointment = appointments[id]
      // add free spots if no interview booked
      if (!appointment.interview) {
        spots++
      }
    }
    
    const day = { ...foundDay, spots } //create day object
    const days = [...state.days]
    const dayIndex = days.findIndex(obj => obj.id === day.id); //find index by day Id
    days[dayIndex] = day; //find the particular day in the array of days matching the Id
  
    return days;
  };
//to book an appointment, the appointments object is reconstructed from bottom to top
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
//spots need to be updated after each booking
    const days = updateSpots(state, appointments);
    //an axios update request to the server fo the appointments with the specific id
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
    //async request to delete the item from the database
    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState({
        ...state,
        appointments,
        days
      })
    );
  }
//after updating database, state is also updated with same data
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
