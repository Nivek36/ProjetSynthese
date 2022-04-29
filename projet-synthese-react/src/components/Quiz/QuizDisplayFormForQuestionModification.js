import React from 'react'

const QuizDisplayFormForQuestionModification = ({ question, setQuestions, modifiedQuestion, setModifiedQuestion, setQuestionToModify, fetchQuestions, quiz }) => {

    const modifyQuestion = async (question) => {
        if (modifiedQuestion.question !== '' && modifiedQuestion.answer !== ''
            && (modifiedQuestion.question !== question.question || modifiedQuestion.answer !== question.answer)) {

            question.question = modifiedQuestion.question
            question.answer = modifiedQuestion.answer
            const result = await fetch('http://localhost:8888/question/modify_question',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(question)
                })
            const data = await result.json()

            setQuestionToModify('')
            setQuestions(await fetchQuestions(quiz.idQuiz))

            return data;
        }
        alert('Fields are empty or not modified!')

    }

    return (
        <div key={question.idQuestion} className="card border-secondary mt-5 mx-5 shadow">
            <div className="card-body">
                <form className='mx-3'>
                    <div className="mb-3">
                        <label htmlFor="modifiedQuestion" className="form-label">Question: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="modifiedQuestion"
                            defaultValue={question.question}
                            onChange={(e) => setModifiedQuestion({ ...modifiedQuestion, question: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="modifiedAnswer" className="form-label">Answer: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="modifiedAnswer"
                            defaultValue={question.answer}
                            onChange={(e) => setModifiedQuestion({ ...modifiedQuestion, answer: e.target.value })} />
                    </div>
                    <button
                        className='btn btn-success btn-sm me-2'
                        onClick={e => { e.preventDefault(); modifyQuestion(question) }}>
                        Modify
                    </button>
                    <button
                        className='btn btn-danger btn-sm me-2'
                        onClick={e => { e.preventDefault(); setQuestionToModify('') }}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default QuizDisplayFormForQuestionModification