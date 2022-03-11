import React from 'react'
import { useForm } from 'react-hook-form';

const DisplayQuizQuestions = ({onSubmit, questions, questionNumber}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

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

export default DisplayQuizQuestions