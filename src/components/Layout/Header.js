import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import classes from "./Header.module.css";
import food from "../../assets/food2.jpg";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton
          orderValue={props.orderValue}
          onshowModal={props.onshowModal}
        />
      </header>
      <div className={classes["main-image"]}>
        <img src={food} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
