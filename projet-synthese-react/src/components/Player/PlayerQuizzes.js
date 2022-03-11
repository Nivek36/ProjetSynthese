import React, { useState, useEffect } from 'react'
import AddNewQuiz from '../Quiz/AddNewQuiz'
import PlayerNavbar from './PlayerNavbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

const PlayerQuizzes = () => {
    const [quizzes, setQuizzes] = useState([])
    const player = JSON.parse(sessionStorage.getItem("user"))
    const navigate = useNavigate();

    useEffect(() => {
        const getQuizzes = async () => {
            const quizzesFromServer = await fetchQuizzes(player.id)
            setQuizzes(quizzesFromServer)
        }
        getQuizzes()
    }, [])

    const fetchQuizzes = async (playerId) => {
        const res = await fetch(`http://localhost:8888/quiz/get-all-quizzes-by-player/${playerId}`)
        return await res.json()
    }

    const fetchQuestions = async (quizId) => {
        const res = await fetch(`http://localhost:8888/question/get-all-questions-by-quiz/${quizId}`)
        return await res.json()
    }

    const addQuiz = async (quiz) => {
        quiz.player = player
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

        return data;
    }

    const publishQuiz = async (quiz) => {
        const questionsFromServer = await fetchQuestions(quiz.idQuiz)
        const isQuizNotEmpty = questionsFromServer.length > 0

        if (isQuizNotEmpty) {
            const res = await fetch(`http://localhost:8888/quiz/publish-quiz/${quiz.idQuiz}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(quiz)
                })
            const data = await res.json()

            setQuizzes(
                quizzes.map(
                    (quiz1) => quiz1.idQuiz === quiz.idQuiz ? { ...quiz1, published: data.published } : quiz1
                )
            )

            return data
        }
        alert("Quiz is empty!")
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
                                <p className="card-text">{quiz.description}</p>
                            </div>
                            <div className="card-footer border-primary justify-content-end d-flex">
                                <button
                                    className='btn btn-secondary btn-sm mx-2'
                                    onClick={e => { e.preventDefault(); navigate('/quiz', { state: quiz }) }}
                                    disabled={quiz.published ? true : false}>
                                    + Add questions
                                </button>
                                <button
                                    className={`btn ${quiz.published ? 'btn-success' : 'btn-warning'}  btn-sm mx-2`}
                                    onClick={e => { e.preventDefault(); publishQuiz(quiz) }}
                                    disabled={quiz.published ? true : false}>
                                    {quiz.published ? 'Published' : 'Publish'}
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <Footer />
        </div>
    )
}

export default PlayerQuizzes