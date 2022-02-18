import React, { useState } from "react";
import classes from "./OrderForm.module.css";
const OrderForm = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [cap, setCap] = useState("");
  const [nameValid, setNameIsValid] = useState(false);
  const [surnameValid, setsurNameIsValid] = useState(false);
  const [addressValid, setAddressIsValid] = useState(false);
  const [capValid, setCapIsValid] = useState(false);
  const [error, setError] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value !== "") {
      setNameIsValid(true);
    }
  };
  const surnameHandler = (e) => {
    setSurname(e.target.value);
    if (e.target.value !== "") {
      setsurNameIsValid(true);
    }
  };
  const addressHandler = (e) => {
    setAddress(e.target.value);
    if (e.target.value !== "") {
      setAddressIsValid(true);
    }
  };
  const capHandler = (e) => {
    setCap(e.target.value);
    if (e.target.value.trim().length === 5) {
      setCapIsValid(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (nameValid && surnameValid && addressValid && capValid) {
      const dataInfo = {
        name: name,
        surname: surname,
        address: address,
        cap: cap,
      };

      props.onSubmit(dataInfo);
      console.log(dataInfo);
    } else {
      setError(true);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div
        className={`${classes.form} ${
          error === true && nameValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Nome</label>
        <input onChange={nameHandler} id="name" value={name} />
        {error === true && nameValid === false && (
          <p>Please insert a valid name!</p>
        )}
      </div>
      <div
        className={`${classes.form} ${
          error === true && surnameValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="surname">Cognome</label>
        <input onChange={surnameHandler} id="surname" value={surname} />
        {error === true && surnameValid === false && (
          <p>Please insert a valid Surname!</p>
        )}
      </div>

      <div
        className={`${classes.form} ${
          error === true && addressValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="address">Indirizzo</label>
        <input onChange={addressHandler} id="address" value={address} />
        {error === true && addressValid === false && (
          <p>Please insert a valid Address!</p>
        )}
      </div>

      <div
        className={` ${classes.form} ${
          error === true && capValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="cap">Cap</label>
        <input onChange={capHandler} id="cap" value={cap} />
        {error === true && capValid === false && (
          <p>Please insert 5 numbers!</p>
        )}
      </div>

      <div className={classes.btncontainer}>
        <button onClick={props.onshowModal} className={classes.btn}>
          Close
        </button>
        <button className={classes.btn}>Proceed to payment</button>
      </div>
    </form>
  );
};

export default OrderForm;
