import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Apppointment(props) {
  return (
    <article className="appointment">
    <Header time={props.time}/>
    {props.interview? <Show student={props.student} interviewer={props.interviewer}/> : <Empty />}
    </article>
  );
}