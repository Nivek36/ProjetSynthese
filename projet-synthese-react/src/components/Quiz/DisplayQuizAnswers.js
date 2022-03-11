import React from 'react'
import { Link } from 'react-router-dom'

const DisplayQuizAnswers = ({questions, answers}) => {
    const verifyAnswer = (questionAnswer, playerAnswer) => {
        if (questionAnswer !== undefined && playerAnswer !== undefined) {
            return questionAnswer.toLowerCase() === playerAnswer.toLowerCase()
        }
        return false
    }

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
                <Link className='btn btn-secondary' to='/HomePage'><i className="fas fa-angles-left"></i> Leave</Link>
                <h4>Your score: {totalGoodAnswers + "/" + questions.length}</h4>
            </div>
        </div>
    )
}

export default DisplayQuizAnswers