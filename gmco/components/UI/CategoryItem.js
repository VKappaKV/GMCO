import UserContext from "../utility/UserContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

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
      userObj.preferenze.push(name);
      const jsonObj = JSON.stringify(userObj);
      localStorage.setItem(user, jsonObj);
    } else {
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
    <div
      style={{
        /*  backgroundColor: "rebeccapurple", */
        margin: 0 + 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={props.image} width={100} height={100} style={{ flex: 3 }} />
      <div style={{ flex: 1 }}>
        <h6>{props.name}</h6>
      </div>
      <div style={{ flex: 1 }}>
        {isCheckedPreference.preferenze?.includes(props.name) && flag ? (
          <button
            className="btn btn-secondary"
            onClick={() => removePreference(props.name)}
          >
            {" "}
            REMOVE{" "}
          </button>
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => addPreference(props.name)}
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
