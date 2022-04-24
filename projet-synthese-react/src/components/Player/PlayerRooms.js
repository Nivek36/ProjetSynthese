import React, { useState, useEffect } from 'react'
import AddNewRoom from '../Room/AddNewRoom'
import PlayerNavbar from './PlayerNavbar'
import { useNavigate } from 'react-router-dom'

const PlayerRooms = () => {
    const player = JSON.parse(sessionStorage.getItem("user"))
    const [rooms, setRooms] = useState([])
    const [roomToVerify, setRoomToVerify] = useState('')
    const [roomPasswordTry, setRoomPasswordTry] = useState({ password: '' })
    const navigate = useNavigate();

    useEffect(() => {
        const getRooms = async () => {
            const roomsFromServer = await fetchRooms()
            setRooms(roomsFromServer)
        }
        getRooms()
        sessionStorage.setItem("room", JSON.stringify(""))
        sessionStorage.setItem("roomPlayerScores", JSON.stringify(""))
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

        setRooms(await fetchRooms())

        return data;
    }

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

    const displayFormToCheckPassword = (room) => {

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
                                        {roomToVerify === '' + room.idRoom ? displayFormToCheckPassword(room) : <button
                                            className='btn btn-primary'
                                            onClick={e => { e.preventDefault(); setRoomToVerify('' + room.idRoom) }}>
                                            Join !
                                        </button>}
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