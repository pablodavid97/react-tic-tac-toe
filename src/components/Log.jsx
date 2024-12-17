export default function Log({ turns }) {
    console.log('turns: ', turns);
    return (
        <ol id='log'>
            {turns.map((turn) => {
                const { player, square } = turn;
                const { row, col } = square;
                return (
                    <li key={`${row}-${col}`}>
                        [
                        <span>
                            Player {player} selected square ({row}, {col})
                        </span>
                        ]
                    </li>
                );
            })}
        </ol>
    );
}
