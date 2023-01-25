import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import PlayerList from '../components/PlayerList'
import PlayerForm from '../components/PlayerForm'
import Navbar from '../components/Navbar'
import PlayerStatusList from '../components/PlayerStatusList'
import Detail from '../components/Detail'
import Update from '../components/Update'

const Main = () => {

    return (
        <div className='p-3 col-8'>
            <BrowserRouter>
                <Navbar />
                <div className='border border-secondary p-4 mt-3'>
                    <Routes>
                            <Route path='/players/list' element={<PlayerList />} />
                            {/* Initial van en vacio porque se llama al form para agregar un nuevo player */}
                            <Route path='/players/addplayer' element={<PlayerForm type={"create"} initialName={""} initialPosition={""} />} />
                            <Route path='/players/:id' element={<Detail />} />                        
                            <Route path='/players/edit/:id' element={<Update />} />                        
                            <Route path='/status/game/:gameid' element={<PlayerStatusList />} />
                        
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Main