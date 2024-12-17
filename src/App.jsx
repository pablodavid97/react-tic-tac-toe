import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function derivedActivePlayer(turns) {
    let currentPlayer = 'X';

    if (turns.length > 0 && turns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function derivedGameBoard(turns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function derivedWinner(gameBoard, players) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }

    if (winner) {
        winner = winner.toUpperCase();
    }

    return winner;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [turns, setTurns] = useState([]);
    const activePlayer = derivedActivePlayer(turns);
    const gameBoard = derivedGameBoard(turns);
    const winner = derivedWinner(gameBoard, players);
    const isADraw = turns.length === 9 && !winner;

    const handleSquareClick = (rowIndex, colIndex) => {
        setTurns((prev) => {
            const currentPlayer = derivedActivePlayer(prev);

            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prev,
            ];

            return updatedTurns;
        });
    };

    const handleRestartGame = () => {
        setTurns([]);
    };

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers((prev) => ({
            ...prev,
            [symbol]: newName,
        }));
    };
    return (
        <main>
            <div id='game-container'>
                <ol id='players' className='highlight-player'>
                    <Player
                        initialName={PLAYERS.X}
                        symbol='X'
                        isActive={activePlayer === 'X'}
                        onPlayerNameChange={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol='O'
                        isActive={activePlayer === 'O'}
                        onPlayerNameChange={handlePlayerNameChange}
                    />
                </ol>
                {(winner || isADraw) && (
                    <GameOver
                        winner={winner}
                        onRestartGame={handleRestartGame}
                    />
                )}
                <GameBoard
                    onSquareClick={handleSquareClick}
                    board={gameBoard}
                />
            </div>
            <Log turns={turns} />
        </main>
    );
}

export default App;
