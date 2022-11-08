import CategoryItem from "./CategoryItem";

const CategoriesList = (props) => {
  const list = props.data;
  return (
    <ul>
      {list?.map((i) => (
        <CategoryItem name={i.name} key={i.id} />
      ))}
    </ul>
  );
};

export default CategoriesList;
