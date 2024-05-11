import { Children } from "react";

const Card = ({ children }) => {
  return (
    <>
      {Children.map(children, (child) => (
        <div
          style={{
            width: "20rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            cursor: "pointer",
            fontSize: "1rem",
            rowGap: "1rem",
            height: "23.5rem",
            margin: "2rem 2rem",
            backgroundColor: "white",
            borderRadius: ".5rem",
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
};

export default Card;
