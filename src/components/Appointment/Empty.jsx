import React from "react";
//an empty display with the button to add a new one
export default function Empty(props) {
  return(
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}