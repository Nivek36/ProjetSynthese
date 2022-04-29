import React from 'react'

const QuizDisplayTitleFormModification = ({ modifiedQuizNameAndDescription, quiz, setQuiz, setIsQuizNameAndDecriptionModified, setmodifiedQuizNameAndDescription }) => {

    const modifyQuizNameAndDescription = async () => {
        if (modifiedQuizNameAndDescription.name !== '' && modifiedQuizNameAndDescription.description !== ''
            && (modifiedQuizNameAndDescription.name !== quiz.name || modifiedQuizNameAndDescription.description !== quiz.description)) {

            let tempQuiz = quiz
            tempQuiz.name = modifiedQuizNameAndDescription.name
            tempQuiz.description = modifiedQuizNameAndDescription.description
            const result = await fetch('http://localhost:8888/quiz/modify_quiz_name_and_description',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(tempQuiz)
                })
            const data = await result.json()

            setIsQuizNameAndDecriptionModified(false)
            setQuiz(tempQuiz)

            return data;
        }
        alert('Fields are empty or not modified!')

    }

    return (
        <div className="card border-secondary my-5 mx-5 shadow">
            <h5 className="card-header">Modify quiz name and description</h5>
            <div className="card-body">
                <form className='mx-3'>
                    <div className="mb-3">
                        <label htmlFor="modifiedQuizName" className="form-label">Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="modifiedQuizName"
                            defaultValue={quiz.name}
                            onChange={(e) => setmodifiedQuizNameAndDescription({ ...modifiedQuizNameAndDescription, name: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="modifiedQuizDescription" className="form-label">Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="modifiedQuizDescription"
                            defaultValue={quiz.description}
                            onChange={(e) => setmodifiedQuizNameAndDescription({ ...modifiedQuizNameAndDescription, description: e.target.value })} />
                    </div>
                    <button
                        className='btn btn-success btn-sm me-2'
                        onClick={e => { e.preventDefault(); modifyQuizNameAndDescription() }}>
                        Modify
                    </button>
                    <button
                        className='btn btn-danger btn-sm me-2'
                        onClick={e => { e.preventDefault(); setIsQuizNameAndDecriptionModified(false) }}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default QuizDisplayTitleFormModification