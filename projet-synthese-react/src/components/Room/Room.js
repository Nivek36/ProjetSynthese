import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Room = () => {
    const [players, setPlayers] = useState([])
    const location = useLocation();
    const room = location.state

    useEffect(() => {
        const getPlayers = async () => {
            const playersFromServer = await fetchPlayers()
            setPlayers(playersFromServer)
        }
        getPlayers()
    }, [])

    const fetchPlayers = async () => {
        const res = await fetch(`http://localhost:8888/room/get-all-players-by-room/${room.idRoom}`)
        return await res.json()
    }

    return (
        <div>
            <h2 className='text-center text-color mt-5'>{room.name}</h2>
            <h5 className='text-center text-color mb-5'>Waiting for players...</h5>
            <div className='row mx-5'>
                {players.map((player, index) => (
                    <div key={index} className="col-4">
                        <div className="card border-primary mt-3 mx-2 shadow">
                            <div className="card-body">
                                <h5 className="card-title text-center">{player.username}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Room