import React from 'react';

const GameDisplay = ({ turnCount, restartGame, toggleStrict, strict }) => {
  return (
    <div className="display-container">
      <div className="countDisplay">{turnCount < 1 ? '--' : turnCount}</div>
      <div className="start-button" onClick={() => restartGame()}>
        Start
      </div>
      <div
        id="strict"
        className={'strict-button ' + (strict && 'strictmode')}
        onClick={toggleStrict}
      >
        Strict
      </div>
    </div>
  );
};

export default GameDisplay;
