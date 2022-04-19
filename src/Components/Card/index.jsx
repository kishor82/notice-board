import React from "react";
import "./index.css";

const Card = ({ image, title, notice, date }) => {
  return (
    <div className="card" href="#">
      <span
        className="card-header"
        style={{ backgroundImage: `url(${image})` }}
      >
        <span className="card-title">
          <h3>{title}</h3>
        </span>
      </span>
      <span className="card-summary">{notice}</span>
      <span className="card-meta">Published: {date}</span>
    </div>
  );
};

export default Card;
