import React, { useState, useEffect } from 'react'
import AddNewRoom from './AddNewRoom'
import PlayerNavbar from './PlayerNavbar'

const PlayerRooms = () => {
    const [rooms, setRooms] = useState([])
    const player = JSON.parse(sessionStorage.getItem("user"))

    useEffect(() => {
        const getRooms = async () => {
            const roomsFromServer = await fetchRooms()
            setRooms(roomsFromServer)
        }
        getRooms()
    }, [])

    const fetchRooms = async () => {
        const res = await fetch(`http://localhost:8888/room/get-all-rooms`)
        return await res.json()
    }

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
                    <AddNewRoom onAddRoom={addRoom} />
                </div>
                <div className='row'>
                    {rooms.map((room, index) => (
                        <div key={index} className="col-4">
                            <div className="card border-primary mt-3 mx-2 shadow">
                                <div className="card-body">
                                    <h5 className="card-title text-center">{room.name}</h5>
                                    <p className="card-text text-center">By: {room.owner.username}</p>
                                    <div className='d-flex justify-content-center'>
                                        {/* {<button
                                            className='btn btn-primary'
                                            onClick={e => { e.preventDefault(); navigate('/play-quiz', { state: quiz }) }}>
                                            Play !
                                        </button>} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlayerRooms