export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((stateDay) => stateDay.name === day);
  const appointmentArray = [];
  if (filteredDay && filteredDay.length > 0) {
    for (let appointmentNumber of filteredDay[0].appointments) {
      appointmentArray.push(state.appointments[appointmentNumber]);
    }
    return appointmentArray;
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const id = interview.interviewer;
  const student = interview.student;
  const interviewer = state.interviewers[id];
  return { student, interviewer };
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find((stateDay) => stateDay.name === day);

  if (state.days.length === 0 || filteredDay === undefined) {
    return [];
  }

  console.log("filtered day: ", filteredDay);

  console.log(filteredDay.interviewers.map((id) => state.interviewers[id]));
  return filteredDay.interviewers.map((id) => {
    return state.interviewers[id];
  });
}

// export function getInterviewersForDay(state, day) {
//   const result = [];
//   const dayMatch = state.days.find((dayName) => dayName.name === day);
//   if (!dayMatch) {
//     return result;
//   }
//   for (const interviewer of dayMatch.interviewers) {
//     if (state.interviewers[interviewer]) {
//       result.push(state.interviewers[interviewer]);
//     }
//   }
//   return result;
// }
