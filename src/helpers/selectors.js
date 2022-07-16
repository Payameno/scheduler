export default function getAppointmentsForDay(state, day) {
  let appointments = [];
  const dayappointments = [];
  for (let dayitem of state.days) {
    if (dayitem.name === day) {
      appointments = dayitem.appointments;
    }
  }

  for (let appointmnetId of appointments) {
    if (state.appointments[appointmnetId]) {
      dayappointments.push(state.appointments[appointmnetId])
    }
  }
  return dayappointments;
}

// export default function getInterview(state, interview) {
//   return state.interviewer;
// }