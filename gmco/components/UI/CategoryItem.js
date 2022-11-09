import UserContext from "../utility/UserContext";
import { useContext, useEffect, useState } from "react";

const CategoryItem = (props) => {
  const [flag, SetFlag] = useState(false);
  const { user } = useContext(UserContext);
  const isCheckedPreference = JSON.parse(localStorage.getItem(user));

  // PER SETTARE LO STATO INIZIALE
  useEffect(() => {
    SetFlag(isCheckedPreference.preferenze?.includes(props.name));
  }, []);

  //HANDLE ADD
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
    SetFlag(true);
  };

  //HANDLE REMOVE
  const removePreference = (name) => {
    const userObj = JSON.parse(localStorage.getItem(user));
    const newPref = userObj.preferenze.filter((i) => i !== name);
    userObj.preferenze = newPref;
    const jsonObj = JSON.stringify(userObj);
    localStorage.setItem(user, jsonObj);
    SetFlag(false);
  };
  return (
    <div>
      <h3>{props.name}</h3>
      {isCheckedPreference.preferenze?.includes(props.name) && flag ? (
        <button onClick={() => removePreference(props.name)}> REMOVE </button>
      ) : (
        <button onClick={() => addPreference(props.name)}>ADD</button>
      )}
    </div>
  );
};

export default CategoryItem;
