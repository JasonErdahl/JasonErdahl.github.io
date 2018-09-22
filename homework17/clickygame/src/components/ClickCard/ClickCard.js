import React from "react";
import "./ClickCard.css";

const ClickCard = props => (
  <div className={props.message.includes('Win') ? "card active" : "card"} onClick={() => props.selectCard(props.name)}>
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
  </div>
);

export default ClickCard;

// className={props.message.includes('Win') ? "card active" : "card"}