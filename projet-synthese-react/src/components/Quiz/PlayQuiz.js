import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

const PlayQuiz = () => {
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
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
        console.log(answers)
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

    const displayQuizInstructions = () => {
        return (
            <div>
                <h4 className='text-center text-color'>You will only have one try and 30 seconds to answer each question.</h4>
                <h4 className='text-center text-color'>Have fun !</h4>
            </div>
        )
    }

    const verifyAnswer = (questionAnswer, playerAnswer) => {
        if (questionAnswer !== undefined && playerAnswer !== undefined) {
            return questionAnswer.toLowerCase() === playerAnswer.toLowerCase()
        }
        return false
    }

    const displayQuizAnswers = () => {
        let totalGoodAnswers = 0
        questions.map((question, index) => (
            verifyAnswer(question.answer, answers[index]) ? totalGoodAnswers++ : ""
        ))

        return (
            <div>
                <h4 className='text-center text-success'>Quiz completed !</h4>
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
                    <Link className='btn btn-secondary' to='/HomePage'>Leave</Link>
                    <h4>Your score: {totalGoodAnswers + "/" + questions.length}</h4>
                </div>
            </div>
        )
    }

    const displayQuizQuestions = () => {
        // setQuizHasEnded(false)
        return (
            <div className='mx-5'>
                <div className="card border-secondary bg-light shadow">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className='mx-3'>
                            <div className="mb-3">
                                <label htmlFor="question" className="form-label">Question: {questions[questionNumber - 1].question}</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="answer" className="form-label">Answer: </label>
                                <input type="text" className="form-control" id="answer" {...register("answer")} />
                                {errors.answer && <span className='text-danger'>This field is required</span>}
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Next question</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>
            <h2 className='text-center text-color my-5'>{quiz.name}</h2>
            <div className="progress mx-5 mb-5">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: `${progressValue}%` }} aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div>
                {questionNumber === 0 ? displayQuizInstructions() : quizHasEnded ? displayQuizAnswers() : displayQuizQuestions()}
            </div>
        </div>
    )
}

export default PlayQuiz