import React from 'react'

const AdminFilterQuizzes = ({ admin, setQuizzes, fetchAdminQuizzes }) => {

    const fetchAllQuizzes = async () => {
        const res = await fetch(`http://localhost:8888/quiz/get-all-quizzes`)
        return await res.json()
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
    )
}

export default AdminFilterQuizzes