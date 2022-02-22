import React, { useState, useEffect } from 'react'
import AddNewQuiz from './AddNewQuiz'
import PlayerNavbar from './PlayerNavbar'

const PlayerQuizzes = () => {
    const [quizzes, setQuizzes] = useState([])
    const player = JSON.parse(sessionStorage.getItem("user"))

    useEffect(() => {
        const getQuizzes = async () => {
            const quizzesFromServer = await fetchQuizzes(player.id)
            setQuizzes(quizzesFromServer)
        }
        getQuizzes()
    }, [])

    const fetchQuizzes = async (quizId) => {
        const res = await fetch(`http://localhost:8888/quiz/get-all-quizzes-by-player/${quizId}`)
        return await res.json()
    }

    const addQuiz = async (quiz) => {
        const result = await fetch('http://localhost:8888/quiz/create_new_quiz',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(quiz)
            })
        const data = await result.json()

        setQuizzes(await fetchQuizzes(player.id))
    }

    return (
        <div>
            <PlayerNavbar />
            <div>
                <h2 className='text-center mb-5'>My quizzes</h2>
                <div className='mx-5 mb-2'>
                    <AddNewQuiz onAddQuiz={addQuiz} />
                </div>
                {quizzes
                    .map((quiz) => (
                        <div key={quiz.idQuiz} className="card border-primary mt-3 mx-5 shadow">
                            <div className="card-body">
                                <h5 className="card-title">{quiz.name}</h5>
                                <p className="card-text">Some quick</p>
                            </div>
                            <div className="card-footer border-primary">Footer</div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default PlayerQuizzes