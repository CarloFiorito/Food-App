import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import React, { useState, useEffect } from "react";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch(
        "https://food-app-2db4a-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    }
    fetchMeals();
  }, []);

  const mappedList = meals.map((el) => {
    const { id, name, description, price } = el; //destructuring array
    return (
      <MealItem
        onInputValue={props.onInputValue}
        mappedList={el}
        key={id}
        name={name}
        description={description}
        price={price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mappedList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
