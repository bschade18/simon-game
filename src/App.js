import React from 'react';
import './App.css';
import GameDisplay from './components/GameDisplay';
import GameBoard from './components/GameBoard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: [],
      playerBoard: [],
      strict: false,
    };
  }

  playSound = (color) => {
    let sound = new Audio(
      `https://s3.amazonaws.com/freecodecamp/simonSound${color}.mp3`
    );
    sound.play();
  };

  restartGame = () => {
    this.setState({
      playerBoard: [],
      gameBoard: [],
    });

    setTimeout(() => this.playRandom(), 2000);
  };

  playRandom = () => {
    let board = this.state.gameBoard;
    let colorBoard = ['g', 'r', 'b', 'y'];
    let randomColor = colorBoard[Math.floor(Math.random() * 4)];

    this.setState({
      gameBoard: [...board, randomColor],
    });
    this.playBoard();
  };

  playBoard = () => {
    (function run(i, x, gameBoard, playSound) {
      setTimeout(function () {
        let color = gameBoard[x];
        if (color === 'g') {
          document.getElementById('g').classList.add('g-light');
          playSound(1);
        } else if (color === 'r') {
          document.getElementById('r').classList.add('r-light');
          playSound(2);
        } else if (color === 'b') {
          document.getElementById('b').classList.add('b-light');
          playSound(3);
        } else if (color === 'y') {
          document.getElementById('y').classList.add('y-light');
          playSound(4);
        }
        ++x;
        setTimeout(() => {
          let color = gameBoard[x - 1];
          document.getElementById(color).classList.remove(`${color}-light`);
          if (x >= i) {
            return;
          } else {
            run(i, x, gameBoard, playSound);
          }
        }, 500);
      }, 800);
    })(this.state.gameBoard.length, 0, this.state.gameBoard, this.playSound);
  };

  playerTurn = (e) => {
    let color = e.target.id;
    document.getElementById(color).classList.add(`${color}-light`);

    setTimeout(() => {
      document.getElementById(color).classList.remove(`${color}-light`);
    }, 500);

    if (color === 'g') {
      this.playSound(1);
    } else if (color === 'r') {
      this.playSound(2);
    } else if (color === 'b') {
      this.playSound(3);
    } else if (color === 'y') {
      this.playSound(4);
    }

    this.setState({
      playerBoard: [...this.state.playerBoard, e.target.id],
    });

    setTimeout(() => this.checkBoard(), 150);
  };

  checkBoard = () => {
    const { gameBoard, playerBoard, strict } = this.state;
    playerBoard.forEach(
      function (color, index) {
        if (color !== gameBoard[index]) {
          if (strict) {
            alert('wrong color!');
            this.restartGame();
            return;
          }
          alert('wrong color!');
          this.setState({
            playerBoard: [],
          });
          this.playBoard();
          return;
        }
      }.bind(this)
    );

    if (playerBoard.length < gameBoard.length) {
      return;
    } else if (playerBoard.length === 20) {
      alert('you won the game!');
      this.restartGame();
    } else {
      this.setState({
        playerBoard: [],
      });
      setTimeout(() => this.playRandom(), 1500);
    }
  };

  toggleStrict = () => {
    this.setState({
      strict: !this.state.strict,
    });
  };

  render() {
    return (
      <div className="grid-container">
        <GameBoard playerTurn={this.playerTurn} />
        <GameDisplay
          strict={this.state.strict}
          playRandom={this.playRandom}
          turnCount={this.state.gameBoard.length}
          restartGame={this.restartGame}
          toggleStrict={this.toggleStrict}
        />
      </div>
    );
  }
}

export default App;
