import React from "react";
import "./SingleCard.css";
export default function SingleCard({ card, handChoice, flipped, disabled }) {
  function handleClick() {
    if (!disabled) {
      handChoice(card);
    }
  }
  return (
    <>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="" />
          <img
            className="back"
            src="https://react-memory-game-app-ct.netlify.app/img/cover.png"
            alt=""
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}
