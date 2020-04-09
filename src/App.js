import React from "react";
import "./App.css";
import GameDisplay from "./components/GameDisplay";
import { Container } from "reactstrap";

let soundBank = [
  {
    id: "g",
    color: "green",
    url: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  },
  {
    id: "r",
    color: "red",
    url: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  },
  {
    id: "b",
    color: "blue",
    url: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  },
  {
    id: "y",
    color: "yellow",
    url: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: [],
      playerBoard: [],
      index: 0,
      cpuTurn: true,
      strict: false
    };
  }
  playGreenSound = () => {
    let sound = new Audio(
      "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
    );
    sound.play();
  };

  playRedSound = () => {
    let sound = new Audio(
      "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
    );
    sound.play();
  };

  playBlueSound = () => {
    let sound = new Audio(
      "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
    );
    sound.play();
  };

  playYellowSound = () => {
    let sound = new Audio(
      "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
    );
    sound.play();
  };

  restartGame = () => {
    this.setState({
      playerBoard: [],
      gameBoard: [],
      count: 0,
      cpuTurn: true
    });

    setTimeout(() => this.playRandom(), 2000);
  };

  playRandom = () => {
    let board = this.state.gameBoard;
    let randomIndex = Math.floor(Math.random() * 4);
    console.log(randomIndex);
    let randomButton = soundBank[randomIndex].id;

    this.setState({
      gameBoard: board.concat(randomButton),
      count: this.state.count + 1
    });
    this.playBoard();
  };

  playBoard = () => {
    (function run(
      i,
      x,
      gameBoard,
      greenSound,
      redSound,
      blueSound,
      yellowSound
    ) {
      setTimeout(function() {
        if (gameBoard[x] === "g") {
          document.getElementById("g").classList.add("g-light");
          greenSound();
        } else if (gameBoard[x] === "r") {
          document.getElementById("r").classList.add("r-light");
          redSound();
        } else if (gameBoard[x] === "b") {
          document.getElementById("b").classList.add("b-light");
          blueSound();
        } else {
          document.getElementById("y").classList.add("y-light");
          yellowSound();
        }
        ++x;
        setTimeout(() => {
          let color = gameBoard[x - 1];
          document.getElementById(color).classList.remove(`${color}-light`);
          if (x >= i) {
            return;
          } else {
            run(i, x, gameBoard, greenSound, redSound, blueSound, yellowSound);
          }
        }, 500);
      }, 800);
    })(
      this.state.gameBoard.length,
      0,
      this.state.gameBoard,
      this.playGreenSound,
      this.playRedSound,
      this.playBlueSound,
      this.playYellowSound
    );
  };

  playerTurn = e => {
    let color = e.target.id;

    if (color === "g") {
      document.getElementById("g").classList.add("g-light");
      this.playGreenSound();
    } else if (color === "r") {
      document.getElementById("r").classList.add("r-light");
      this.playRedSound();
    } else if (color === "b") {
      document.getElementById("b").classList.add("b-light");
      this.playBlueSound();
    } else {
      document.getElementById("y").classList.add("y-light");
      this.playYellowSound();
    }
    setTimeout(() => {
      document.getElementById(color).classList.remove(`${color}-light`);
    }, 500);

    this.setState({
      playerBoard: this.state.playerBoard.concat(e.target.id)
    });

    setTimeout(() => this.checkBoard(), 150);
  };

  checkBoard = () => {
    let index = this.state.index;
    let gameBoard = this.state.gameBoard;
    let state = this.state;
    let playerBoard = this.state.playerBoard;
    playerBoard.forEach(
      function(color, index, playerBoard) {
        if (color !== gameBoard[index]) {
          if (state.strict) {
            alert("wrong color!");
            this.restartGame();
            return;
          }
          alert("wrong color!");
          this.setState({
            playerBoard: []
          });
          this.playBoard();
          return;
        }
      }.bind(this)
    );

    if (playerBoard.length < gameBoard.length) {
      return;
    } else if (playerBoard.length === 20) {
      alert("you won the game!");
      this.restartGame();
    } else if (playerBoard[index + 1] === gameBoard[index + 1]) {
      this.setState({
        playerBoard: []
      });
      setTimeout(() => this.playRandom(), 1500);
    }
  };

  enableStrict = () => {
    var cool = document.getElementById("strict");
    cool.classList.toggle("strictmode");
    this.state.strict
      ? this.setState({
          strict: false
        })
      : this.setState({
          strict: true
        });
  };

  render() {
    return (
      <Container>
        <div className="grid-container">
          <div className="colors-circle">
            <div
              id="g"
              className="gameButton green"
              onClick={this.playerTurn}
            ></div>
            <div
              id="r"
              className="gameButton red"
              onClick={this.playerTurn}
            ></div>
            <div
              id="b"
              className="gameButton blue"
              onClick={this.playerTurn}
            ></div>
            <div
              id="y"
              className="gameButton yellow"
              onClick={this.playerTurn}
            ></div>
          </div>
          <GameDisplay
            playRandom={this.playRandom}
            turnCount={this.state.gameBoard.length}
            restartGame={this.restartGame}
            enableStrict={this.enableStrict}
          />
        </div>
      </Container>
    );
  }
}

export default App;
