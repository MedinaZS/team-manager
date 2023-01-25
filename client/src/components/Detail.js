import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DeleteButton from './DeleteButton';

const Detail = () => {

    //Obtener el id de la url
    const { id } = useParams();

    const [player, setPlayer] = useState({});
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        //Get player
        axios.get('http://localhost:8000/api/player/' + id)
            .then(res => {
                setPlayer(res.data);
                setLoaded(true);
            })
    }, [])

    return (
        <div>
            {loaded && (
                <>
                    <h1>Player Detail</h1>
                    <div className='border border-secondary p-3 mt-3'>
                        <h3>Name: {player.name}</h3>
                        <hr />
                        <p><strong>Preferred position:</strong> {player.preferredPosition ? player.preferredPosition : '-'}</p>

                        {player.statusGame.map((status, index) => {
                            return (<p key={index}><strong>Status game {index + 1}:</strong> {status}</p>)
                        })}

                        {/* successCallback se realiza una vez que se elimina con exito */}
                        <DeleteButton player={player} successCallBack={() => navigate('/players/list')}/>

                        <Link to={`/players/edit/${id}`} className='btn btn-success ms-3'>Edit</Link>
                    </div>
                </>)}
        </div>
    )
}

export default Detail