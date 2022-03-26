import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import AddNewQuiz from '../Quiz/AddNewQuiz'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

const AdminQuizzes = () => {
    const [quizzes, setQuizzes] = useState([])
    const admin = JSON.parse(sessionStorage.getItem("user"))
    const navigate = useNavigate();

    useEffect(() => {
        const getQuizzes = async () => {
            const quizzesFromServer = await fetchAdminQuizzes(admin.id)
            setQuizzes(quizzesFromServer)
        }
        getQuizzes()
    }, [])

    const fetchAdminQuizzes = async (adminId) => {
        const res = await fetch(`http://localhost:8888/quiz/get-all-quizzes-by-admin/${adminId}`)
        return await res.json()
    }

    const fetchAllQuizzes = async () => {
        const res = await fetch(`http://localhost:8888/quiz/get-all-quizzes`)
        return await res.json()
    }

    const fetchQuestions = async (quizId) => {
        const res = await fetch(`http://localhost:8888/question/get-all-questions-by-quiz/${quizId}`)
        return await res.json()
    }

    const addQuiz = async (quiz) => {
        quiz.admin = admin
        const result = await fetch('http://localhost:8888/quiz/create_new_quiz',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(quiz)
            })
        const data = await result.json()

        setQuizzes(await fetchAdminQuizzes(admin.id))

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

    const unpublishQuiz = async (quiz) => {
        const res = await fetch(`http://localhost:8888/quiz/unpublish-quiz/${quiz.idQuiz}`,
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

    const blockQuiz = async (quiz) => {
        const res = await fetch(`http://localhost:8888/quiz/block-quiz/${quiz.idQuiz}`,
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
                (quiz1) => quiz1.idQuiz === quiz.idQuiz ? { ...quiz1, blocked: data.blocked } : quiz1
            )
        )

        return data
    }

    const modifyQuiz = async (quiz) => {
        if (quiz.published) {
            unpublishQuiz(quiz)
            alert("This quiz is no longer published")
        }
        navigate('/quiz', { state: quiz })
    }

    const getAllQuizzes = async () => {
        let tempQuizzes = await fetchAllQuizzes()
        setQuizzes(tempQuizzes)
    }

    const getMyQuizzes = async () => {
        let tempQuizzes = await fetchAdminQuizzes(admin.id)
        setQuizzes(tempQuizzes)
    }

    const getNotBlockedQuizzes = async () => {
        let tempQuizzes = await fetchAllQuizzes()
        tempQuizzes = tempQuizzes.filter((quiz) => {return !quiz.blocked})
        setQuizzes(tempQuizzes)
    }

    const getBlockedQuizzes = async () => {
        let tempQuizzes = await fetchAllQuizzes()
        tempQuizzes = tempQuizzes.filter((quiz) => {return quiz.blocked})
        setQuizzes(tempQuizzes)
    }

    const getNotPublishedQuizzes = async () => {
        let tempQuizzes = await fetchAllQuizzes()
        tempQuizzes = tempQuizzes.filter((quiz) => {return !quiz.published})
        setQuizzes(tempQuizzes)
    }

    const getPublishedQuizzes = async () => {
        let tempQuizzes = await fetchAllQuizzes()
        tempQuizzes = tempQuizzes.filter((quiz) => {return quiz.published})
        setQuizzes(tempQuizzes)
    }

    return (
        <div>
            <AdminNavbar />
            <div className="mb-5">
                <h2 className='text-center mb-5'>Manage quizzes</h2>
                <div className='mx-5 mb-2 d-flex'>
                    <AddNewQuiz onAddQuiz={addQuiz} />
                    <div className="dropdown mx-2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Filter quizzes
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item" onClick={e => { e.preventDefault(); getAllQuizzes() }}>All quizzes</button></li>
                            <li><button className="dropdown-item" onClick={e => { e.preventDefault(); getMyQuizzes() }}>My quizzes</button></li>
                            <li><button className="dropdown-item" onClick={e => { e.preventDefault(); getNotBlockedQuizzes() }}>Not blocked</button></li>
                            <li><button className="dropdown-item" onClick={e => { e.preventDefault(); getBlockedQuizzes() }}>Blocked</button></li>
                            <li><button className="dropdown-item" onClick={e => { e.preventDefault(); getNotPublishedQuizzes() }}>Not published</button></li>
                            <li><button className="dropdown-item" onClick={e => { e.preventDefault(); getPublishedQuizzes() }}>Published</button></li>
                        </ul>
                    </div>
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
                                    onClick={e => { e.preventDefault(); modifyQuiz(quiz) }}>
                                    <i className="fas fa-pen"></i> Modify
                                </button>
                                <button
                                    className={`btn ${quiz.published ? 'btn-success' : 'btn-warning'}  btn-sm mx-2`}
                                    onClick={e => { e.preventDefault(); publishQuiz(quiz) }}
                                    disabled={quiz.published ? true : false}>
                                    {quiz.published ? 'Published' : 'Publish'}
                                </button>
                                <button
                                    className={'btn btn-danger btn-sm mx-2'}
                                    onClick={e => { e.preventDefault(); blockQuiz(quiz) }}
                                    disabled={quiz.blocked ? true : false}>
                                    {quiz.blocked ? 'Blocked' : 'Block'}
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <Footer />
        </div>
    )
}

export default AdminQuizzes