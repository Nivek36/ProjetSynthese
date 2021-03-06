import React, { useState, useEffect } from 'react'
import PlayerNavbar from '../Player/PlayerNavbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

const HomePage = () => {
    const [publishedQuizzes, setPublishedQuizzes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getPublishedQuizzes = async () => {
            const publishedQuizzesFromServer = await fetchPublishedQuizzes()
            setPublishedQuizzes(publishedQuizzesFromServer)
        }
        getPublishedQuizzes()
        sessionStorage.setItem("room", JSON.stringify(""))
        sessionStorage.setItem("roomPlayerScores", JSON.stringify(""))
    }, [])

    const fetchPublishedQuizzes = async () => {
        const res = await fetch('http://localhost:8888/quiz/get-all-published-and-not-blocked-quizzes')
        return await res.json()
    }

    return (
        <div>
            <PlayerNavbar />
            <div className='mb-5'>
                <h2 className='text-center mb-5 text-color'>
                    Find your favorite <span className='badge rounded-pill bg-primary'>Quiz</span> and <span className='badge rounded-pill bg-primary'>Play</span> !
                </h2>
                <div className='row'>
                    {publishedQuizzes
                        .map((quiz) => (
                            <div key={quiz.idQuiz} className="col-4">
                                <div className="card border-primary mt-3 mx-2 shadow">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{quiz.name}</h5>
                                        <p className="card-text text-center">{quiz.description}</p>
                                        <p className="card-text text-center">By: {quiz.player != null ? quiz.player.username : "Quiz.io"}</p>
                                        <div className='d-flex justify-content-center'>
                                            <button
                                                className='btn btn-primary'
                                                onClick={e => { e.preventDefault(); navigate('/play-quiz', { state: quiz }) }}>
                                                Play !
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage