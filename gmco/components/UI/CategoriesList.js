import CategoryItem from "./CategoryItem";
import { useEffect } from "react";

const CategoriesList = (props) => {
  const list = props.data;

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "space-around",
        /* backgroundColor: "tomato", */
        margin: 0 + 5,
        flexWrap: "wrap",
      }}
    >
      {list?.map((i) => (
        <CategoryItem name={i.name} key={i.id} image={i.icons[0].url} />
      ))}
    </ul>
  );
};

export default CategoriesList;
