import React from 'react'

const QuizDisplayTitle = ({ quiz, setmodifiedQuizNameAndDescription, setIsQuizNameAndDecriptionModified }) => {
    return (
        <div>
            <h2 className='text-center mt-5'>
                {quiz.name}
                <button
                    className='btn btn-primary btn-sm mx-3'
                    onClick={e => {
                        e.preventDefault();
                        setmodifiedQuizNameAndDescription({ name: quiz.name, description: quiz.description });
                        setIsQuizNameAndDecriptionModified(true)
                    }}>
                    <i className="fas fa-pen-to-square"></i>
                </button>
            </h2>
            <h5 className='mb-5 text-center'>{quiz.description}</h5>
        </div>
    )
}

export default QuizDisplayTitle