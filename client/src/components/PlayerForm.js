import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const PlayerForm = (props) => {

    //Type -> create or update
    const { type, initialName, initialPosition } = props;

    //Id obtenido de la url para el form de update
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [name, setName] = useState(initialName);
    const [preferredPosition, setPreferredPosition] = useState(initialPosition);

    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault(); //Previene la recarga de la pagina
        (type.toLowerCase() === 'create') ? create() : update();
    }

    const create = () => {
        axios.post('http://localhost:8000/api/player/new', { name, preferredPosition })
            .then(res => {
                //Para que entre aca, en el controlador debe de estar res.json
                console.log("Created succesfully", res);
                //Redireccionar al crear correctamente
                navigate('/players/list')
            })
            .catch(err => {
                console.log("Error creating", err);
                setErrors(err.response.data.errors);
            });
    }

    const update = () => {
        axios.put('http://localhost:8000/api/player/edit/' + id, { name, preferredPosition })
            .then(res => {
                console.log("Update succesfully", res);
                //Si fue valido la actualizacion redireccionar a la pagina de Detail 
                navigate(`/players/${id}`);
            })
            .catch(err => {
                console.log("Error update", err);
                setErrors(err.response.data.errors);
            });
    }

    //Para colocar los mensajes de error en tiempo real mientras sucede el onchange del input de name
    const validate = (value) => {
        if (value.length === 0) {
            setErrors({ name: { message: "Name is required" } });
        } else if (value.length < 2) {
            setErrors({ name: { message: "Name must be at least 2 characters in length" } });
        } else {
            setErrors({});
        }
    }


    return (
        <div>
            <div className='fs-2'>
                <NavLink to={'/players/list'} className='pe-2 border-end border-dark border-2'>List</NavLink>
                <NavLink to={'/players/addplayer'} className='ms-2'>Add Player</NavLink>
            </div>

            <form onSubmit={onSubmitHandler} className='border border-secondary p-3 mt-3'>
                {type === 'create' ? <h4>Add Player</h4> : <h4>Edit Player</h4>}

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Player name:</label>
                    <div className="col-sm-10">
                        <input name='name' type="text" className="form-control"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                validate(e.target.value);
                            }} />
                    </div>
                </div>

                <div className='row'>
                    {errors.name ? <p className='text-danger col-sm-12 offset-sm-2'>{errors.name.message}</p> : null}
                </div>


                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Preferred Position:</label>
                    <div className="col-sm-10">
                        <input name='preferredPosition' type="text" className="form-control" value={preferredPosition} onChange={(e) => setPreferredPosition(e.target.value)} />
                    </div>
                </div>

                <div className='text-end'>
                    <input id='btn-submit' type="submit" className='btn btn-success w-25 btn-sm'
                        value={type === 'create' ? 'Add' : 'Edit'}
                        disabled={(name.length < 2 || name.length === 0) ? true : false} />
                </div>

            </form>
        </div>
    )
}

export default PlayerForm