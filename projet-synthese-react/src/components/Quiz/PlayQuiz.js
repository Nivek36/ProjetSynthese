import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import DisplayQuizInstructions from './DisplayQuizInstructions';
import DisplayQuizAnswers from './DisplayQuizAnswers';
import DisplayQuizQuestions from './DisplayQuizQuestions';

const PlayQuiz = () => {
    const location = useLocation();
    const quiz = location.state
    const TIMER_DELAY = 300
    const [progressValue, setProgressValue] = useState(0);
    const [quizHasEnded, setQuizHasEnded] = useState(false);
    const [questions, setQuestions] = useState([])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        if (progressValue < 100) {
            const timer = setInterval(() => {
                setProgressValue(progressValue + 1)
            }, TIMER_DELAY)
            return () => clearInterval(timer);
        } else if (quizHasEnded === false) {
            if (questionNumber > 0) {
                addAnswerToAnswersArray("")
            }
            quizEndedVerification()
        }
    });

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

    const onSubmit = (answer) => {
        addAnswerToAnswersArray(answer)
        quizEndedVerification()
    }

    const addAnswerToAnswersArray = (answer) => {
        let tempArray = answers
        tempArray.push(answer.answer)
        setAnswers(tempArray)
    }

    const quizEndedVerification = () => {
        if (questions.length <= questionNumber) {
            setQuizHasEnded(true)
            setProgressValue(100)
        } else {
            setQuestionNumber(questionNumber + 1)
            setProgressValue(0)
        }
    }

    return (
        <div>
            <h2 className='text-center text-color my-5'>{quiz.name}</h2>
            <div className="progress mx-5 mb-5">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: `${progressValue}%` }} aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div>
                {questionNumber === 0 ? <DisplayQuizInstructions quizEndedVerification={quizEndedVerification} /> 
                : quizHasEnded ? <DisplayQuizAnswers questions={questions} answers={answers} /> 
                : <DisplayQuizQuestions onSubmit={onSubmit} questions={questions} questionNumber={questionNumber} />}
            </div>
        </div>
    )
}

export default PlayQuiz