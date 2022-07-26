import React from "react";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Error from "./Error";
import Status from "./Status";
import Header from "./Header";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EDIT = "EDIT";
const SHOW = "SHOW";
const EMPTY = "EMPTY";
const SAVING = "SAVING";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

//shows an interview appointment if exists, otherwise shows an empty slot
export default function Apppointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
//function to save an appointment which a user has entered and selected
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
  }
//function to delete and existing appointment
  function deleteAppointment() {
    transition(DELETING); //before removing, "deleting" is displayed
    props.cancelInterview(props.id) //removes the interview from database
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true)); //goes back to the show page
  }
//rendering the right side of page with appointnemnts
  return (
    <article className="appointment"  data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          delete={deleteAppointment}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={edit}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Unable Saving"} onClose={back} /> //error display on saving
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Unable Deleting"} onClose={() => transition(SHOW)} />
      )}
    </article>
  );
}
