import UserContext from "../utility/UserContext";
import { useContext } from "react";

const CategoryItem = (props) => {
  const { user } = useContext(UserContext);
  const addPreference = (name) => {
    console.log("MI PIACE: ", name);
    const userObj = JSON.parse(localStorage.getItem(user));
    if ("preferenze" in userObj) {
      console.log("HO LA KEY PREFERENZE");
      userObj.preferenze.push(name);
      const jsonObj = JSON.stringify(userObj);
      localStorage.setItem(user, jsonObj);
    } else {
      console.log("NON HO LA KEY");
      userObj.preferenze = [];
      userObj.preferenze.push(name);
      const jsonObj = JSON.stringify(userObj);
      console.log(jsonObj);
      localStorage.setItem(user, jsonObj);
    }
  };
  return (
    <div>
      <h3>{props.name}</h3>
      <button onClick={() => addPreference(props.name)}>+</button>
    </div>
  );
};

export default CategoryItem;
