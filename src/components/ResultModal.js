/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

export default function ResultModal({ isCorrect }) {
  return (
    <div className="result-modal">
      <div className="overlay" />
      <div className="result-modal-content">
        {isCorrect && <h3>
          👊👊👊
          <br />
          YOU WON!
        </h3>}

        {!isCorrect && <h3>
          😟😢😟
          <br />
          YOU LOST!
        </h3>}

        {!isCorrect && <div className="correct-answer">
          <small>The correct answer was:</small>
          <br />
          <strong>Answer here</strong>
        </div>}

        <button>Go to next question 👉</button>
      </div>
    </div>
  );
}
