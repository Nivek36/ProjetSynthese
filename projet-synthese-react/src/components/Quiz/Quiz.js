import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Footer from '../Footer/Footer';
import ModifyQuestion from './ModifyQuestion';

const Quiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [quiz, setQuiz] = useState(location.state)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [questions, setQuestions] = useState([])
    const [questionToModify, setQuestionToModify] = useState('')
    const [modifiedQuestion, setModifiedQuestion] = useState({ question: '', answer: '' })
    const [isQuizNameAndDecriptionModified, setIsQuizNameAndDecriptionModified] = useState(false)
    const [modifiedQuizNameAndDescription, setmodifiedQuizNameAndDescription] = useState({ name: '', description: '' })

    useEffect(() => {
        const getQuestions = async () => {
            const questionsFromServer = await fetchQuestions(quiz.idQuiz)
            setQuestions(questionsFromServer)
        }
        getQuestions()
        const getQuiz = async () => {
            const quizFromServer = await fetchQuiz(quiz.idQuiz)
            setQuiz(quizFromServer)
        }
        getQuiz()
    }, [])

    const fetchQuestions = async (quizId) => {
        const res = await fetch(`http://localhost:8888/question/get-all-questions-by-quiz/${quizId}`)
        return await res.json()
    }

    const fetchQuiz = async (quizId) => {
        const res = await fetch(`http://localhost:8888/quiz/get-quiz/${quizId}`)
        return await res.json()
    }

    const onSubmit = (question) => {
        question.quiz = quiz
        addQuestion(question)
            .then((data) => data.question !== '' ? alert("Question created!") : alert("An error occured, please try again"))
            .catch(() => alert("An error occured, please try again"));
    }

    const addQuestion = async (question) => {
        const result = await fetch('http://localhost:8888/question/create_new_question',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(question)
            })
        const data = await result.json()

        setQuestions(await fetchQuestions(quiz.idQuiz))

        return data;
    }

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

    const displayFormForQuestionModification = (question) => {
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

    const displayQuestion = (question) => {
        return (
            <div key={question.idQuestion} className="card border-secondary mt-5 mx-5 shadow">
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

    const displayTitle = () => {
        return (
            <div>
                <h2 className='text-center mt-5'>
                    {quiz.name}
                    <button
                        className='btn btn-primary btn-sm mx-3'
                        onClick={e => { 
                            e.preventDefault(); 
                            setmodifiedQuizNameAndDescription({ name: quiz.name, description: quiz.description });
                            setIsQuizNameAndDecriptionModified(true) }}>
                        <i className="fas fa-pen-to-square"></i>
                    </button>
                </h2>
                <h5 className='mb-5 text-center'>{quiz.description}</h5>
            </div>
        )
    }

    const displayTitleFormModification = () => {
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

    return (
        <div>
            {isQuizNameAndDecriptionModified ? displayTitleFormModification() : displayTitle()}
            <div>
                <button
                    className='btn btn-secondary mb-5 mx-5'
                    onClick={e => { e.preventDefault(); navigate(-1) }}>
                    <i className="fas fa-angles-left"></i> Go back
                </button>
            </div>
            <div className='mx-5'>
                <div className="card border-secondary bg-light shadow">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className='mx-3'>
                            <div className="mb-3">
                                <label htmlFor="question" className="form-label">Question: </label>
                                <input type="text" className="form-control" id="question" {...register("question", { required: true })} />
                                {errors.question && <span className='text-danger'>This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="answer" className="form-label">Answer: </label>
                                <input type="text" className="form-control" id="answer" {...register("answer", { required: true })} />
                                {errors.answer && <span className='text-danger'>This field is required</span>}
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary"><i className="fas fa-plus"></i> Add question</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                {questions
                    .map((question) => (
                        questionToModify === '' + question.idQuestion ?
                            displayFormForQuestionModification(question)
                            : displayQuestion(question)
                    ))}
            </div>
            <Footer />
        </div>
    )
}

export default Quiz