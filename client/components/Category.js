import React from "react";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <>
      <div className="container">
        <div className="category">
          <NavLink style={{ textDecoration: "none" }} to="/products">
            <button style={{ margin: 10 }}>All</button>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/products/Fruit">
            <button style={{ margin: 10 }}>Fruit</button>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/products/Sweet">
            <button style={{ margin: 10 }}>Sweet</button>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/products/Tea">
            <button style={{ margin: 10 }}>Tea</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Category;
