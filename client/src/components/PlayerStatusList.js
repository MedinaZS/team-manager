import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const PlayerStatusList = () => {

    const [players, setPlayers] = useState([]);

    //Obtener el id del game consultado pasado por la url, opciones game 1, game 2 y game 3
    const { gameid } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        //Get the list of the players
        axios.get('http://localhost:8000/api/player/list')
            .then(res => {
                setPlayers(res.data);
            })
    }, [])

    const handleUpdatePlayer = (value, player) => {
        //Change the status of the player clicked
        player.statusGame[gameid - 1] = value.toLowerCase();

        axios.put('http://localhost:8000/api/player/edit/' + player._id, player)
            .then(res => {
                console.log("Update succesfully", res);
                //Para ver los cambios actualizados 'recargar' la pagina con el navigate
                navigate('/status/game/'+gameid)
            })
            .catch(err => {
                console.log("Error update", err);
            });

        
    }
    

    return (
        <div>
            <h1>Player Status - Game {gameid}</h1>

            <div className='fs-5 text-center' >
                <NavLink to={'/status/game/1'} className='pe-2 border-end border-dark border-2'>Game 1</NavLink>
                <NavLink to={'/status/game/2'} className='ms-2 pe-2 border-end border-dark border-2'>Game 2</NavLink>
                <NavLink to={'/status/game/3'} className='ms-2'>Game 3</NavLink>
            </div>

            <table className="table table-striped border table-sm mt-3">
                <thead>
                    <tr className='table-secondary'>
                        <th scope="col">Team Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {players.map((player, index) => {
                        return (
                            <tr key={index} >
                                <td>{player.name}</td>
                                <td>
                                    {/* statusGame es un array ['stat1', 'stat2', 'stat3'] */}
                                    {/* gameid-1 -> gameid es el numero de game que esta en la url, como es un array se le resta 1, ej gameid 1 -1 = posicion 0 */}
                                    <button className={'btn btn-sm me-2 w-25 ' + (player.statusGame[gameid - 1] === 'playing' ? 'btn-success' : 'btn-outline-dark')} onClick={(e) => handleUpdatePlayer(e.target.innerText, player)}>Playing</button>
                                    <button className={'btn btn-sm me-2 w-25 ' + (player.statusGame[gameid - 1] === "not playing" ? 'btn-danger' : 'btn-outline-dark')} onClick={(e) => handleUpdatePlayer(e.target.innerText, player)} >Not Playing</button>
                                    <button className={'btn btn-sm me-2 w-25 ' + (player.statusGame[gameid - 1] === 'undecided' ? 'btn-warning' : 'btn-outline-dark')} onClick={(e) => handleUpdatePlayer(e.target.innerText, player)} >Undecided</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default PlayerStatusList