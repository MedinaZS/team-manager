import axios from 'axios';
import React from 'react'

const DeleteButton = ({ player, successCallBack, className }) => {

    //Si no se coloco nada en className al agregar este componente asignar cadena vacia
    if (className === undefined) className = "";

    const deletePlayer = () => {
        axios.delete('http://localhost:8000/api/player/delete/' + player._id)
            .then(res => {
                console.log('Deleted succesfully', res);
                //Esto llama a lo que sea que se quiera realizar luego de eliminar 
                successCallBack();
            })
    }

    return (

        <button className={"btn btn-danger " + className}
            onClick={() => { if (window.confirm(`Are you sure you want to remove ${player.name} ?`)) deletePlayer() }}>Delete</button>

    )
}

export default DeleteButton