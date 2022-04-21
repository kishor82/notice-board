import React from "react";
import "./index.css";

const Card = ({ title, notice, date, onEdit, index }) => {
  return (
    <div className="card" href="#">
      <span className="card-header">
        <div className="action edit_notice">
          <button
            type="button"
            onClick={() => onEdit({ title, notice, date, index })}
            className="edit_button"
          >
            <i className="fa-solid fa-pen-circle"></i>
          </button>
        </div>
        <span className="card-title">
          <h3>{title} </h3>
        </span>
      </span>
      <span className="card-summary">{notice}</span>
      <span className="card-meta">Published: {date}</span>
    </div>
  );
};

export default Card;
