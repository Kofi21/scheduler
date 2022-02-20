import React, { useState, useEffect, Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function destroy() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }
  function edit() {
    transition(EDIT);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // const appointmentText = !time ? "No Appointments" : `Appointment at ${time}`;

  return (
    <Fragment>
      <article className="appointment" data-testid="appointments">
        <Header time={props.time} />
        {mode === EMPTY && props.time !== "5pm" && (
          <Empty onAdd={() => transition(CREATE)} />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="DELETING" />}
        {mode === CONFIRM && (
          <Confirm
            message="Delete the appointment?"
            onCancel={() => back()}
            onConfirm={() => destroy()}
          />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={confirm}
            onEdit={edit}
          />
        )}
      </article>
      <article>
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Could not save appointment" onClose={() => back()} />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="Could not delete appointment"
            onClose={() => back()}
          />
        )}
      </article>
    </Fragment>
  );
}
