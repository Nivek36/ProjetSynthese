import React, { useState } from 'react'
import AddNewQuiz from './AddNewQuiz'
import PlayerNavbar from './PlayerNavbar'

const PlayerQuizzes = () => {
    const [quizzes, setQuizzes] = useState([])

    return (
        <div>
            <PlayerNavbar />
            <div>
                <h2 className='text-center mb-5'>My quizzes</h2>
                <div className='mx-5 mb-2'>
                    <AddNewQuiz />
                </div>
            </div>
        </div>
    )
}

export default PlayerQuizzes