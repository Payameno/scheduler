import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  //function to render message for spots left
  const formatSpots = function () {
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
    if (props.spots === 1) {
      return '1 spot remaining';
    }
    if (props.spots === 0) {
      return 'no spots remaining';
    }
  };
//set class for a day appointment slot by selected and full
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.full
  })
//render each day items on the sidebar
  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}