import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * A modern, responsive Tic Tac Toe Board with game logic.
   * - Shows the current player's turn
   * - Win and draw detection
   * - Board is clickable; can restart the game
   */

  // Board state: array of 9 (null | 'X' | 'O')
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('playing'); // 'playing' | 'won' | 'draw'
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    /**
     * Returns "X" or "O" if there's a winner, or null
     */
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6], // diags
    ];
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    /**
     * Handles player move on given index
     */
    if (board[idx] || status !== 'playing') return; // cell already filled or finished

    const squares = board.slice();
    squares[idx] = xIsNext ? 'X' : 'O';
    const currentWinner = calculateWinner(squares);

    if (currentWinner) {
      setBoard(squares);
      setStatus('won');
      setWinner(currentWinner);
      return;
    }
    if (!squares.includes(null)) {
      setBoard(squares);
      setStatus('draw');
      setWinner(null);
      return;
    }
    setBoard(squares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function restart() {
    /**
     * Resets game state and restarts the board
     */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus('playing');
    setWinner(null);
  }

  // Board rendering helpers
  function renderSquare(idx) {
    const value = board[idx];
    let highlight = false;
    if (status === 'won') {
      const lineCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
      ];
      for (const line of lineCombinations) {
        const [a, b, c] = line;
        if (
          board[a] &&
          board[a] === board[b] &&
          board[a] === board[c] &&
          (idx === a || idx === b || idx === c)
        ) {
          highlight = true;
        }
      }
    }
    return (
      <button
        key={idx}
        className={`ttt-square${highlight ? ' highlight' : ''}`}
        onClick={() => handleClick(idx)}
        aria-label={`Place ${xIsNext ? 'X' : 'O'} on square ${idx + 1}`}
        disabled={!!board[idx] || status !== 'playing'}
        tabIndex={0}
      >
        {value}
      </button>
    );
  }

  // Game status text
  let info;
  if (status === 'won') {
    info = (
      <span className="ttt-status-won">
        <b>{winner}</b> wins!
      </span>
    );
  } else if (status === 'draw') {
    info = (
      <span className="ttt-status-draw">
        It's a draw.
      </span>
    );
  } else {
    info = (
      <span className="ttt-status-playing">
        <span className="ttt-turn-label">Turn: </span>
        <span
          className={
            xIsNext ? 'ttt-player-x move-indicator' : 'ttt-player-o move-indicator'
          }
        >
          {xIsNext ? 'X' : 'O'}
        </span>{' '}
        {/* Accent colors on current player */}
      </span>
    );
  }

  // Responsive board grid
  return (
    <div className="ttt-wrapper">
      <div className="ttt-controls">
        <button className="btn btn-accent" onClick={restart} data-testid="restart-btn">
          Restart Game
        </button>
      </div>
      <div className="ttt-board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <div className="ttt-row" key={row}>
              {Array(3)
                .fill(null)
                .map((_, col) => renderSquare(row * 3 + col))}
            </div>
          ))}
      </div>
      <div className="ttt-info" aria-live="polite">{info}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main entry for the app; includes navbar and centered tic tac toe grid.
   */
  return (
    <div className="app">
      <nav className="navbar" role="navigation">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> Tic Tac Toe
            </div>
            <a
              className="btn"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--primary, #1976D2)', color: '#fff' }}
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
          <div style={{ width: '100%', maxWidth: 440, margin: '0 auto', paddingTop: 120 }}>
            <h1 className="title" style={{ textAlign: 'center', marginBottom: 12, fontSize: '2.6rem', fontWeight: 700 }}>
              Tic Tac Toe
            </h1>
            <div className="description" style={{ textAlign: 'center', marginBottom: 36, color: 'var(--text-secondary)' }}>
              Play a quick game of Tic Tac Toe! Take turns, see who wins, and try again. A modern &amp; responsive React app.
            </div>
            <TicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
