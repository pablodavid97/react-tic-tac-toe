import { useState } from 'react';

export default function Player({
    initialName,
    symbol,
    isActive,
    onPlayerNameChange,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);

        if (isEditing) {
            onPlayerNameChange(symbol, playerName);
        }
    };

    const handlePlayerNameChange = (event) => {
        const { value } = event.target;
        setPlayerName(value);
    };

    const playerContent = isEditing ? (
        <input value={playerName} onChange={handlePlayerNameChange} />
    ) : (
        <span className='player-name'>{playerName}</span>
    );

    return (
        <li className={isActive ? 'active' : ''}>
            <span className='player'>
                {playerContent}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    );
}
