import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import React, { useState } from "react";
import OrderForm from "./OrderForm";
import Button from "../UI/Button";
import Spinner from "../../assets/Spin-1s-200px.svg";

const Cart = (props) => {
  const [showOrder, setshowOrder] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCompleted, setorderCompleted] = useState(false);
  const [error, setError] = useState(null);

  const showFormHandler = () => {
    setshowOrder(!showOrder);
    setshowButton(false);
  };

  async function fetchHandler(data) {
    setIsLoading(true);
    setorderCompleted(false);
    try {
      const all = { ...props.orderlist, ...data };
      const response = await fetch(
        "https://food-app-2db4a-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify(all),
          headers: { "Content-type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const order = await response.json();
      setIsLoading(false);
      setorderCompleted(true);
      props.onEmpty();
    } catch (error) {
      setError(error.message);
    }
  }
  let loadingMessage = (
    <img className={classes.img} src={Spinner} alt="prova" />
  );
  let orderComplete = <p className={classes.paragraph}> Order Completed</p>;

  return (
    <Modal>
      {error && <p>{error}</p>}
      {isLoading ? (
        loadingMessage
      ) : orderCompleted ? (
        <div className={classes.actions}>
          {" "}
          {orderComplete}{" "}
          <Button
            onClick={props.onshowModal}
            className={classes["button--alt"]}
          >
            Close
          </Button>
        </div>
      ) : (
        <>
          <div>
            {props.orderlist.map((el, index) => {
              return (
                <CartItem
                  updateCounter={props.updateCounter}
                  key={index}
                  id={el.id}
                  totalAmount={props.totalAmount}
                  name={el.name}
                  price={el.price}
                  quantity={el.quantity}
                />
              );
            })}
          </div>

          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{props.totalAmount.toFixed(2)}</span>
          </div>
          {showButton && (
            <div className={classes.actions}>
              <Button
                onClick={props.onshowModal}
                className={classes["button--alt"]}
              >
                Close
              </Button>

              <Button onClick={showFormHandler} className={classes.button}>
                Order
              </Button>
            </div>
          )}

          {showOrder && (
            <OrderForm
              onshowModal={props.onshowModal}
              onSubmit={fetchHandler}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default Cart;
