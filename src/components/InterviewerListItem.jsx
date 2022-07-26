import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
//Selects scss style in case the item is chosen
  const interviewersItemClass = classNames(('interviewers__item'), {
    'interviewers__item--selected' : props.selected
  });
//returns an interview item
  return (
    <li className={interviewersItemClass} onClick={props.setInterviewer}>
      <img className="interviewers__item-image"  
        src={props.avatar} 
        alt={props.name}
      />
        {props.selected && props.name}
    </li>
  );
}