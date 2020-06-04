import React from 'react';

const GameBoard = ({ playerTurn }) => {
  return (
    <div className="colors-circle">
      <div id="g" className="gameButton green" onClick={playerTurn}></div>
      <div id="r" className="gameButton red" onClick={playerTurn}></div>
      <div id="b" className="gameButton blue" onClick={playerTurn}></div>
      <div id="y" className="gameButton yellow" onClick={playerTurn}></div>
    </div>
  );
};

export default GameBoard;
