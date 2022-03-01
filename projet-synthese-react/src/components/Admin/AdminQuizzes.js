import React from 'react'
import AdminNavbar from './AdminNavbar'
import AddNewQuiz from '../AddNewQuiz'

const AdminQuizzes = () => {
    const admin = JSON.parse(sessionStorage.getItem("user"))

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

        return data;
    }

    return (
        <div>
            <AdminNavbar />
            <div>
                <h2 className='text-center mb-5'>Manage quizzes</h2>
                <div className='mx-5 mb-2'>
                    <AddNewQuiz onAddQuiz={addQuiz} />
                </div>
            </div>
        </div>
    )
}

export default AdminQuizzes