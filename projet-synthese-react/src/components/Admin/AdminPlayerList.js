import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'

const AdminPlayerList = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async () => {
            const playersFromServer = await fetchPlayers()
            setPlayers(playersFromServer)
        }
        getPlayers()
    }, [])

    const fetchPlayers = async () => {
        const res = await fetch(`http://localhost:8888/player/get-all-players`)
        return await res.json()
    }

    return (
        <div>
            <AdminNavbar />
            <h2 className='text-center my-5'>Manage players</h2>
            <div className='mx-5 shadow'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={index}>
                                <td>{player.username}</td>
                                <td>{player.blocked}</td>
                                <td>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminPlayerList