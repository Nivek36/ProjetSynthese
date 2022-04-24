import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Room = () => {
    const [players, setPlayers] = useState([])
    const player = JSON.parse(sessionStorage.getItem("user"))
    const [room, setRoom] = useState(JSON.parse(sessionStorage.getItem("room")))
    const [quizzes, setQuizzes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getPlayers = async () => {
            const playersFromServer = await fetchPlayers()
            setPlayers(playersFromServer)
        }
        const getQuizzes = async () => {
            const quizzesFromServer = await fetchQuizzes(player.id)
            setQuizzes(quizzesFromServer)
        }
        getPlayers()
        getQuizzes()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            verifyIfGameStarted()
        }, 5000)
        return () => clearInterval(timer);
    });

    const fetchPlayers = async () => {
        const res = await fetch(`http://localhost:8888/room/get-all-players-by-room/${room.idRoom}`)
        return await res.json()
    }

    const fetchQuizzes = async (playerId) => {
        const res = await fetch(`http://localhost:8888/quiz/get-all-quizzes-by-player/${playerId}`)
        return await res.json()
    }

    const fetchVerificationForGameStart = async () => {
        const res = await fetch(`http://localhost:8888/room/verify-if-game-started/${room.idRoom}`)
        return await res.json()
    }

    const choseQuizForRoom = async (quiz) => {
        const res = await fetch(`http://localhost:8888/room/chose-quiz-for-room/${quiz.idQuiz}/${room.idRoom}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(room)
            })
        const data = await res.json()

        sessionStorage.setItem("room", JSON.stringify(data))
        setRoom(JSON.parse(sessionStorage.getItem("room")))

        return data
    }

    const startGame = async () => {
        const res = await fetch(`http://localhost:8888/room/start-game/${room.idRoom}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(room)
            })
        const data = await res.json()

        sessionStorage.setItem("room", JSON.stringify(data))
        setRoom(JSON.parse(sessionStorage.getItem("room")))

        return data
    }

    const verifyIfGameStarted = async () => {
        let temp = await fetchVerificationForGameStart()
        if (room.chosenQuiz === null) {
            sessionStorage.setItem("room", JSON.stringify(temp))
            setRoom(JSON.parse(sessionStorage.getItem("room")))
        }
        if (temp.gameStarted) {
            navigate('/play-quiz-multiplayer')
        }
    }

    // let gameStartedVerificationInterval = setInterval(verifyIfGameStarted, 5000)

    return (
        <div>
            <h2 className='text-center text-color mt-5'>{room.name}</h2>
            <h5 className='text-center text-color mb-5'>It will start soon...</h5>
            {room.owner.id === player.id ? <div className="dropdown mx-5">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {room.chosenQuiz != null ? room.chosenQuiz.name : "Choose a quiz"}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {quizzes.map((quiz, index) => (
                        <li key={index}>
                            <button
                                className="dropdown-item"
                                onClick={e => { e.preventDefault(); choseQuizForRoom(quiz) }}>
                                {quiz.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
                : ""}
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
            <div className='mt-5 d-flex justify-content-center'>
                {room.owner.id === player.id ?
                    <button
                        className='btn btn-success'
                        disabled={room.chosenQuiz != null ? false : true}
                        onClick={e => { e.preventDefault(); startGame() }}>
                        Start !
                    </button>
                    : ""}
            </div>
        </div>
    )
}

export default Room