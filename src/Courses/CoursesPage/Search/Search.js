import React from "react";

export default function Search(props) {
  let searchValue = "";

  const onChangeHandler = (event) => {
    searchValue = event.target.value;

    props.search.bind(this, searchValue)();
  };

  return (
    <div className="search mt-5">
      <input
        className="form-control grid-item"
        onChange={onChangeHandler}
        placeholder="Search"
      />
    </div>
  );
}
