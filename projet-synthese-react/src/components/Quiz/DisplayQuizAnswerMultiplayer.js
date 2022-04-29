import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DisplayQuizAnswerMultiplayer = ({ questions, answers }) => {
    const [playersScores, setPlayersScores] = useState([]);
    const [room, setRoom] = useState(JSON.parse(sessionStorage.getItem("room")))
    const [roomPlayerScores, setRoomPlayerScores] = useState(JSON.parse(sessionStorage.getItem("roomPlayerScores")))
    let totalGoodAnswers = 0

    const verifyAnswer = (questionAnswer, playerAnswer) => {
        if (questionAnswer !== undefined && playerAnswer !== undefined) {
            return questionAnswer.toLowerCase() === playerAnswer.toLowerCase()
        }
        return false
    }

    const fetchAllScoresByRoom = async () => {
        const res = await fetch(`http://localhost:8888/roomPlayerScores/get-all-scores-by-room/${room.idRoom}`)
        return await res.json()
    }

    const setScoreForPlayer = async (score) => {
        const res = await fetch(`http://localhost:8888/roomPlayerScores/set-score-for-player/${roomPlayerScores.idRoomPlayerScores}/${score}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify()
            })
        const data = await res.json()

        console.log(data)

        return data
    }

    const verifyAllQuestions = async () => {
        questions.map((question, index) => (
            verifyAnswer(question.answer, answers[index]) ? totalGoodAnswers++ : ""
        ))
        setScoreForPlayer(totalGoodAnswers)
    }

    verifyAllQuestions()

    const refreshScoreboard = async () => {
        setScoreForPlayer(totalGoodAnswers)
        setPlayersScores(await fetchAllScoresByRoom())
    }

    return (
        <div>
            <h4 className='text-center text-success'>Quiz completed !</h4>
            <div className='mx-5'>
                <button 
                className='btn btn-primary mb-2'
                onClick={e => { e.preventDefault(); refreshScoreboard() }}>
                    Refresh scoreboard
                </button>
                <table className="table table-hover shadow">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playersScores !== undefined ? playersScores
                            .map((playerScore, index) => (
                                <tr key={index}>
                                    <td>{playerScore.player.username}</td>
                                    <td>{playerScore.score}</td>
                                </tr>
                            )) : ""}
                    </tbody>
                </table>
            </div>
            <div>
                {questions
                    .map((question, index) => (
                        <div key={index} className="card border-secondary mt-5 mx-5 shadow">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {question.question}
                                    {verifyAnswer(question.answer, answers[index]) ? <span className='badge rounded-pill bg-success mx-2'>Correct</span>
                                        : <span className='badge rounded-pill bg-danger mx-2'>Wrong</span>}
                                </h5>
                                <p className="card-text text-success">Good answer: {question.answer}</p>
                                {verifyAnswer(question.answer, answers[index]) ? ""
                                    : <p className="card-text text-danger">Your answer: {answers[index]}</p>}
                            </div>
                        </div>
                    ))}
            </div>
            <div className='d-flex justify-content-between m-5'>
                <Link className='btn btn-secondary' to='/HomePage'><i className="fas fa-angles-left"></i> Leave</Link>
                <h4>Your score: {totalGoodAnswers + "/" + questions.length}</h4>
            </div>
        </div>
    )
}

export default DisplayQuizAnswerMultiplayer