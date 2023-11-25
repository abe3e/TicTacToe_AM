import React, { useState } from 'react';
import './styles.css'; 
import DogImageComponent from './DogImageComponent';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const squares = history[currentMove];
  
  function handlePlay(i) {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(history.slice(0, currentMove + 1).concat([newSquares]));
    setCurrentMove(currentMove + 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-info">
        <div>
        <DogImageComponent />
        </div>
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
      <div className="game-board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handlePlay(0)} />
          <Square value={squares[1]} onSquareClick={() => handlePlay(1)} />
          <Square value={squares[2]} onSquareClick={() => handlePlay(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handlePlay(3)} />
          <Square value={squares[4]} onSquareClick={() => handlePlay(4)} />
          <Square value={squares[5]} onSquareClick={() => handlePlay(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handlePlay(6)} />
          <Square value={squares[7]} onSquareClick={() => handlePlay(7)} />
          <Square value={squares[8]} onSquareClick={() => handlePlay(8)} />
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
