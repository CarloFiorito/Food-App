import React, { useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [isHighLighted, setisHighLighted] = useState(false);

  useEffect(() => {
    if (props.orderValue.length === 0) {
      return;
    }
    setisHighLighted(true);
    const timer = setTimeout(() => {
      setisHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [props.orderValue]);

  const valueList = props.orderValue.reduce((curItem, item) => {
    return curItem + item.quantity;
  }, 0);

  const btnClass = `${classes.button} ${isHighLighted ? classes.bump : ""}`;

  return (
    <button onClick={props.onshowModal} className={btnClass}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{parseInt(valueList)}</span>
    </button>
  );
};

export default HeaderCartButton;
