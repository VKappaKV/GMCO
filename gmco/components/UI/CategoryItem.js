import Image from "next/image";

const CategoryItem = (props) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <Image
        url={props.icons.url}
        width={props.icons.width}
        height={props.icons.height}
      />
    </div>
  );
};

export default CategoryItem;
