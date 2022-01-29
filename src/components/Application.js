import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("daily appointment", dailyAppointments);
  // const filteredDailyAppointments = dailyAppointments.filter(
  //   (appointment) => appointment.interview
  // );

  const parsedAppointment = dailyAppointments.map((appointment) => {
    if (appointment.interview) {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    } else {
      return (
        <Appointment
          key={appointment.id}
          time={appointment.time}
          interviewers={interviewers}
          bookInterview={bookInterview}
        />
      );
    }

    // console.log("interview object", interview);
  });
  console.log("parsed appointments: ", parsedAppointment);
  return (
    <main className="layout" data-testid="appointment">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointment}
        <Appointment key={"last"} time={"5pm"} />
      </section>
    </main>
  );
}
