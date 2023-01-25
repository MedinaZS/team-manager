import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const PlayerList = () => {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        //Get the list of the players
        axios.get('http://localhost:8000/api/player/list')
            .then(res => {
                setPlayers(res.data);
            })
    }, [])


    const removeFromDOM = (id) => {
        //Update la lista de players en la vista
        setPlayers(players.filter(player => player._id !== id));
    }

    return (
        <div>

            <div className='fs-2'>
                <NavLink to={'/players/list'} className='pe-2 border-end border-dark border-2'>List</NavLink>
                <NavLink to={'/players/addplayer'} className='ms-2'>Add Player</NavLink>
            </div>

            <table className="table table-striped border table-sm mt-3">
                <thead>
                    <tr className='table-secondary'>
                        <th scope="col">Team Name</th>
                        <th scope="col">Preferred Position</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {players.map((player, index) => {
                        return (
                            <tr key={index} >
                                <td><Link to={`/players/${player._id}`}> {player.name}</Link></td>
                                <td>{player.preferredPosition}</td>
                                {/* Pasar por props el player a eliminar, y al terminar exitosamente eliminar del DOM */}
                                <td><DeleteButton className={'btn-sm'} player={player} successCallBack={() => removeFromDOM(player._id)}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default PlayerList