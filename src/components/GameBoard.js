import React from 'react';

const GameBoard = ({ playerTurn }) => {
  const renderButton = (letter, color) => (
    <div
      id={letter}
      className={'gameButton ' + color}
      onClick={playerTurn}
    ></div>
  );
  return (
    <div className="colors-circle">
      {renderButton('g', 'green')}
      {renderButton('r', 'red')}
      {renderButton('b', 'blue')}
      {renderButton('y', 'yellow')}
    </div>
  );
};

export default GameBoard;
