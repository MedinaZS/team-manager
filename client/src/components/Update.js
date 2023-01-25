import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PlayerForm from './PlayerForm';

const Update = () => {

    //Obtain the id from the url
    const { id } = useParams();
    
    const [player, setPlayer] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //Obtain the specific product to update
        axios.get('http://localhost:8000/api/player/' + id)
            .then(res => {
                setPlayer(res.data);
                setLoaded(true);
            })
    }, [])



    return (
        <>
            {/* Los initial van con los datos del producto obtenido en useEffect porque es el form de update */}
            {loaded && (
                <PlayerForm type={"update"} initialName={player.name} initialPosition={player.preferredPosition} />
            )}
        </>

    )
}

export default Update