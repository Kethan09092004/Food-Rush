import { useContext } from "react";
// import { StoreContext } from "../../StoreContext";
import { StoreContext } from "../../StoreContext/StoreContext";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({category}) => {
  const { food_list } = useContext(StoreContext);
  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top Dishes Near You</h2>
      </div>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          
          // eslint-disable-next-line no-constant-condition
          if (category === "All" || category === item.category) {
            return (
              
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default FoodDisplay;
