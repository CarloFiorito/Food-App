import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import React, { useState } from "react";

function App() {
  const [orderValue, setorderValue] = useState([]);
  const [showModal, setshowModal] = useState(true);
  const [totalAmount, setTotalAmount] = useState();

  const emptyArray = () => {
    setorderValue([]);
  };

  const updateCounter = (id, name, qty, price, total) => {
    setorderValue((prevState) => {
      return [
        ...prevState,
        {
          id: id,
          name: name,
          price: price,
          quantity: qty === "aggiungi" ? 1 : -1,
          total: total,
        },
      ];
    });
    setTotalAmount(
      orderValue.reduce(
        (prevItem, item) => prevItem + item.price * item.quantity,
        0
      )
    );
    console.log(totalAmount);
  };

  const onModalShow = () => {
    setshowModal(!showModal);
  };

  const orderHandler = (val) => {
    setorderValue((prevState) => {
      return [...prevState, val];
    });
    setTotalAmount(
      orderValue.reduce(
        (prevItem, item) => prevItem + item.price * item.quantity,
        0
      )
    );
  };

  const filteredArr = Object.values(
    [...orderValue].reduce(
      (acc, { id, name, description, price, quantity }) => {
        acc[id] = {
          id,
          name: name,
          description: description,
          price: price,
          quantity: (acc[id] ? acc[id].quantity : 0) + quantity,
        };
        return acc;
      },
      {}
    )
  );

  const finalAmount = filteredArr
    .map((el) => {
      return el.quantity * el.price;
    })
    .reduce((a, b) => a + b, 0);

  return (
    <>
      {!showModal && (
        <Cart
          onEmpty={emptyArray}
          orderlist={filteredArr}
          updateCounter={updateCounter}
          onshowModal={onModalShow}
          totalAmount={finalAmount}
        />
      )}

      <Header orderValue={orderValue} onshowModal={onModalShow} />
      <main>
        <Meals onInputValue={orderHandler} />
      </main>
    </>
  );
}

export default App;
