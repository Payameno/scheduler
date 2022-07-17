export function getAppointmentsForDay(state, day) {
  let appointments = [];
  const dayappointments = [];

  for (let dayitem of state.days) {
    if (dayitem.name === day) {
      appointments = dayitem.appointments; //id of apppointments
    }
  }

  for (let appointmnetId of appointments) { //appointmets has id of interviewer and name of student
    if (state.appointments[appointmnetId]) {
      dayappointments.push(state.appointments[appointmnetId]) //object: id, interview(student name+interviwerid), time
    }
  }
  return dayappointments;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewerId = interview.interviewer;
  return {
    student: interview.student,
    interviewer: state.interviewers[interviewerId]
  }
}