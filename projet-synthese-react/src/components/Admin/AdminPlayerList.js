import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import Footer from '../Footer/Footer'

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

    const blockPlayer = async (player) => {
        const res = await fetch(`http://localhost:8888/player/block-player/${player.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(player)
            })
        const data = await res.json()

        setPlayers(
            players.map(
                (player1) => player1.id === player.id ? { ...player1, blocked: data.blocked } : player1
            )
        )

        return data
    }

    const unblockPlayer = async (player) => {
        const res = await fetch(`http://localhost:8888/player/unblock-player/${player.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(player)
            })
        const data = await res.json()

        setPlayers(
            players.map(
                (player1) => player1.id === player.id ? { ...player1, blocked: data.blocked } : player1
            )
        )

        return data
    }


    return (
        <div>
            <AdminNavbar />
            <h2 className='text-center my-5'>Manage players</h2>
            <div className='mx-5 shadow'>
                <table className="table table-hover border">
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
                                <td>
                                    {player.blocked ?
                                        <span className="badge bg-danger">Blocked</span>
                                        : <span className="badge bg-success">Not blocked</span>}
                                </td>
                                <td>
                                    {player.blocked ?
                                        <button
                                            className='btn btn-secondary btn-sm'
                                            onClick={e => { e.preventDefault(); unblockPlayer(player) }}>
                                            Unblock
                                        </button>
                                        : <button
                                            className='btn btn-danger btn-sm'
                                            onClick={e => { e.preventDefault(); blockPlayer(player) }}>
                                            Block
                                        </button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    )
}

export default AdminPlayerList