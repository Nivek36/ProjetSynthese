import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PlayerRoomsDisplayFormToCheckPwd = ({ room, player, setRoomToVerify }) => {
    const [roomPasswordTry, setRoomPasswordTry] = useState({ password: '' })
    const navigate = useNavigate();

    const joinedRoomByPlayer = async (room) => {
        const res = await fetch(`http://localhost:8888/room/joined-room-by-player/${room.idRoom}/${player.id}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(room)
            })
        const data = await res.json()

        return data
    }

    const createNewScoreForPlayer = async (room) => {
        const res = await fetch(`http://localhost:8888/roomPlayerScores/create-new-score-for-player`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({player: player, room: room})
            })
        const data = await res.json()

        sessionStorage.setItem("roomPlayerScores", JSON.stringify(data))

        return data
    }

    const verifyPassword = async (room) => {
        if (roomPasswordTry.password === room.password) {
            if (room.roomPlayers.length === 0) {
                const res = await joinedRoomByPlayer(room)
                createNewScoreForPlayer(room)
            } else if (room.roomPlayers.find((p) => {return player.id === p.id}) === undefined) {
                const res = await joinedRoomByPlayer(room)
                createNewScoreForPlayer(room)
            }
            setRoomToVerify('')
            setRoomPasswordTry({ ...roomPasswordTry, password: '' })
            sessionStorage.setItem("room", JSON.stringify(room))
            navigate('/room-to-play', { state: room })
        } else {
            alert("Wrong password")
        }
    }

    if (player.isJoinedARoom) {
        alert("You will be disconnected from your other room !")
    }

    return (
        <div className="">
            <form className='mx-3'>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter password: </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        defaultValue={''}
                        onChange={(e) => setRoomPasswordTry({ ...roomPasswordTry, password: e.target.value })} />
                </div>
                <div className='d-flex'>
                    <button
                        className='btn btn-success btn-sm me-2'
                        onClick={e => { e.preventDefault(); verifyPassword(room) }}>
                        Join
                    </button>
                    <button
                        className='btn btn-danger btn-sm me-2'
                        onClick={e => { e.preventDefault(); setRoomToVerify('') }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PlayerRoomsDisplayFormToCheckPwd