export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(selectedDayItem => selectedDayItem.name === day)
  if (!foundDay) return [];
  return foundDay.appointments.map(appointmentId => state.appointments[appointmentId]);
}

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find(selectedDayItem => selectedDayItem.name === day)
  if (!foundDay) return [];
  return foundDay.interviewers.map(interviewerId => state.interviewers[interviewerId]);
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