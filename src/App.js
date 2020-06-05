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
    let colorBoard = ['g', 'r', 'b', 'y'];
    let randomColor = colorBoard[Math.floor(Math.random() * 4)];

    this.setState({
      gameBoard: [...this.state.gameBoard, randomColor],
    });
    this.playBoard();
  };

  playBoard = () => {
    (function run(i, x, gameBoard, playSound) {
      let colors = ['g', 'r', 'b', 'y'];
      setTimeout(function () {
        let color = gameBoard[x];
        document.getElementById(color).classList.add(`${color}-light`);
        playSound(colors.indexOf(color) + 1);
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
    let colors = ['g', 'r', 'b', 'y'];
    document.getElementById(color).classList.add(`${color}-light`);

    setTimeout(() => {
      document.getElementById(color).classList.remove(`${color}-light`);
    }, 500);

    this.playSound(colors.indexOf(color) + 1);

    this.setState({
      playerBoard: [...this.state.playerBoard, e.target.id],
    });

    setTimeout(() => this.checkBoard(), 150);
  };

  checkBoard = () => {
    let { gameBoard, playerBoard, strict } = this.state;

    playerBoard.forEach(
      function (color, index) {
        if (color !== gameBoard[index]) {
          if (strict) {
            alert('wrong color!');
            this.restartGame();
            return;
          }
          alert('wrong color!');
          console.log('correct');
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
    } else if (
      playerBoard[playerBoard.length - 1] !== gameBoard[gameBoard.length - 1]
    ) {
      return;
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
