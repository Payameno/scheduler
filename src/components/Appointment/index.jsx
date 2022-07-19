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

export default function Apppointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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

  function deleteAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          delete={deleteAppointment}
          message={"Are you sure?"}
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
        <Error message={"Unable Saving"} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Unable Deleting"} onClose={back} />
      )}
    </article>
  );
}
