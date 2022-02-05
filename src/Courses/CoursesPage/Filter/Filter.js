import React from "react";

export default function Filter(props) {
  let filterValue = "";

  const onChangeHandler = (event) => {
    filterValue = event.target.value;

    props.filter.bind(this, filterValue)();
  };

  return (
    <select
      onChange={onChangeHandler}
      defaultValue={"All"}
      className="form-control grid-item"
    >
      <option value={"All"}>All</option>
      <option value={"Project Based"}>Project Based</option>
      <option value={"Beginner"}>Beginner</option>
      <option value={"Modern"}>Modern</option>
    </select>
  );
}
