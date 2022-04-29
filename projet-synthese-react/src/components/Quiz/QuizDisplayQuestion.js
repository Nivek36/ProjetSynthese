import React from 'react'

const QuizDisplayQuestion = ({ question, setModifiedQuestion, setQuestionToModify, setQuestions, fetchQuestions, quiz }) => {

    const deleteQuestion = async (questionId) => {
        const result = await fetch(`http://localhost:8888/question/delete-question/${questionId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(questionId)
            })

        setQuestions(await fetchQuestions(quiz.idQuiz))
    }

    return (
        <div className="card border-secondary mt-5 mx-5 shadow">
            <div className="card-body">
                <h5 className="card-title">{question.question}</h5>
                <p className="card-text">{question.answer}</p>
            </div>
            <div className="card-footer border-secondary justify-content-end d-flex">
                <button
                    className='btn btn-secondary btn-sm mx-2'
                    onClick={e => {
                        e.preventDefault();
                        setModifiedQuestion({ question: question.question, answer: question.answer });
                        setQuestionToModify('' + question.idQuestion)
                    }}>
                    <i className="fas fa-pen"></i> Modify
                </button>
                <button
                    className='btn btn-danger btn-sm mx-2'
                    onClick={e => { e.preventDefault(); deleteQuestion(question.idQuestion) }}>
                    <i className="fas fa-xmark"></i> Delete
                </button>
            </div>
        </div>
    )
}

export default QuizDisplayQuestion