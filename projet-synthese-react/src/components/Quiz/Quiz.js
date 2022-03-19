import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Footer from '../Footer/Footer';

const Quiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const quiz = location.state
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [questions, setQuestions] = useState([])

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
        <div>
            <h2 className='my-5 text-center'>{quiz.name}</h2>
            <div>
                <button
                    className='btn btn-secondary mb-5 mx-5'
                    onClick={e => { e.preventDefault(); navigate(-1) }}>
                    <i className="fas fa-angles-left"></i> Go back
                </button>
            </div>
            <div className='mx-5'>
                <div class="card border-secondary bg-light shadow">
                    <div class="card-body">
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
                        <div key={question.idQuestion} className="card border-secondary mt-5 mx-5 shadow">
                            <div className="card-body">
                                <h5 className="card-title">{question.question}</h5>
                                <p className="card-text">{question.answer}</p>
                            </div>
                            <div className="card-footer border-secondary justify-content-end d-flex">
                                <button
                                    className='btn btn-secondary btn-sm mx-2'
                                    onClick={e => { e.preventDefault();  }}>
                                    <i className="fas fa-pen"></i> Modify
                                </button>
                                <button
                                    className='btn btn-danger btn-sm mx-2'
                                    onClick={e => { e.preventDefault(); deleteQuestion(question.idQuestion) }}>
                                    <i className="fas fa-xmark"></i> Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <Footer />
        </div>
    )
}

export default Quiz