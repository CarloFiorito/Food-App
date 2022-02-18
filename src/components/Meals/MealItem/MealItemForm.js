import React, { useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [value, setValue] = useState("");

  const inputHandler = (event) => {
    setValue(event.target.value);
  };

  const clickHandler = (event) => {
    event.preventDefault();

    const ordered = { ...props.mappedList, quantity: +value };

    props.onInputValue(ordered);
    setValue("");
  };

  return (
    <form onSubmit={clickHandler} className={classes.form}>
      <Input
        label={"Amount:"}
        onChange={inputHandler}
        type="number"
        value={value}
        min="0"
        max="10"
      />

      <button type="submit">+ Add</button>
      {/* {<p>Please enter a valid amount (1-5).</p>} */}
    </form>
  );
};

export default MealItemForm;
