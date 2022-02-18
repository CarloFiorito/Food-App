import classes from "./CartItem.module.css";
import React from "react";

const CartItem = (props) => {
  const add = (event) => {
    props.updateCounter(
      event.target.id,
      event.target.className,
      "aggiungi",
      props.price,
      props.totalamount
    );
  };
  const sub = (event) => {
    props.updateCounter(
      event.target.id,
      event.target.className,
      "rimuovi",
      props.price,
      props.totalamount
    );
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.price}</span>
          <span className={classes.amount}>{props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button
          totalamount={props.totalamount}
          className={props.name}
          id={props.id}
          price={props.price}
          onClick={sub}
          disabled={props.quantity === 0 ? true : false}
        >
          −
        </button>
        <button
          totalamount={props.totalamount}
          price={props.price}
          className={props.name}
          id={props.id}
          onClick={add}
        >
          +
        </button>
      </div>
      {console.log(props.id)}
    </li>
  );
};

export default CartItem;
