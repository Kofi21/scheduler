import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const { time, interview } = props;
  // const appointmentText = !time ? "No Appointments" : `Appointment at ${time}`;
  return (
    <Fragment>
      <Header time={time} />
      <article className="appointment">
        {interview ? <Show interview={interview} time={time} /> : <Empty />}
      </article>
    </Fragment>
  );
}
