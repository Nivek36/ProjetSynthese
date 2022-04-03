import React from 'react'
import AddNewRoom from './AddNewRoom'
import PlayerNavbar from './PlayerNavbar'

const PlayerRooms = () => {
    const player = JSON.parse(sessionStorage.getItem("user"))

    const addRoom = async (room) => {
        room.owner = player
        const result = await fetch('http://localhost:8888/room/create_new_room',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(room)
            })
        const data = await result.json()

        return data;
    }

    return (
        <div>
            <PlayerNavbar />
            <div className='mb-5'>
                <h2 className='text-center mb-5 text-color'>
                    Find a <span className='badge rounded-pill bg-primary'>Room</span> to play with your <span className='badge rounded-pill bg-primary'>Friends</span> !
                </h2>
                <div className='mx-5 mb-2'>
                    <AddNewRoom onAddRoom={addRoom}/>
                </div>
                <div className='row'>

                </div>
            </div>
        </div>
    )
}

export default PlayerRooms