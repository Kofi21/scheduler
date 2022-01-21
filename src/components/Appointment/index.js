import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { time } = props;
  const appointmentText = !time ? "No Appointments" : `Appointment at ${time}`;
  return <article className="appointment">{appointmentText}</article>;
}
