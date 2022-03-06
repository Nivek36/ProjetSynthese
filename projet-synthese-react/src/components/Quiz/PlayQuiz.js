import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PlayQuiz = () => {
    const location = useLocation();
    const quiz = location.state
    const TIMER_DELAY = 300
    const [progressValue, setProgressValue] = useState(0);
    const [hasActionBeenExecuted, setHasActionBeenExecuted] = useState(false);
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (progressValue < 100) {
            const timer = setInterval(() => {
                setProgressValue(progressValue + 1)
                // console.log(progressValue)
            }, TIMER_DELAY)
            // clearing interval
            return () => clearInterval(timer);
        } else if (hasActionBeenExecuted === false) {
            setHasActionBeenExecuted(true)
            console.log("Terminé")
            
        }
    });

    const quizInstructions = () => {
        
    }

    useEffect(() => {
        const getQuestions = async () => {
            const questionsFromServer = await fetchQuestions(quiz.idQuiz)
            setQuestions(questionsFromServer)
        }
        getQuestions()
    }, [])

    const fetchQuestions = async (quizId) => {
        const res = await fetch(`http://localhost:8888/question/get-all-questions-by-quiz/${quizId}`)
        return await res.json()
    }

    return (
        <div>
            <h2 className='text-center text-color my-5'>{quiz.name} {"   " + progressValue}</h2>
            <div className="progress mx-5 mb-5">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progressValue}%` }} aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default PlayQuiz