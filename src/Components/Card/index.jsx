import React from "react";
import "./index.css";

const Card = ({
  acknowledge,
  title,
  notice,
  date,
  onEdit,
  onAcknowledge,
  index,
}) => {
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
      <span className="card-meta">
        <span>
          <i class="fa-solid fa-clock"></i> &nbsp; {date}
        </span>
        <span>
          {acknowledge ? (
            <span className="acknowledged">
              <i className="fa-solid fa-clipboard-check"></i>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onAcknowledge({ index })}
              className="acknowledge_button"
            >
              Acknowledge
            </button>
          )}
        </span>
      </span>
    </div>
  );
};

export default Card;
