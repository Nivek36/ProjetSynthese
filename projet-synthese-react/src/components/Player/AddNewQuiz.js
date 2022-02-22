import React from 'react'
import { useForm } from 'react-hook-form';

const AddNewQuiz = ({onAddQuiz}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (quiz) => {
        quiz.player = JSON.parse(sessionStorage.getItem("user"))
        onAddQuiz(quiz)
            .then((data) => data.name !== undefined ? onCreationSucceded() : alert("Quiz name already exists, please try again"))
            .catch(() => alert("Quiz name already exists, please try again"));
    }

    const onCreationSucceded = () => {
        alert("Quiz created succesfully!");
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                + New quiz
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create new quiz</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} className='mx-3'>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Quiz name: </label>
                                    <input type="text" className="form-control" id="username" {...register("name", { required: true })} />
                                    {errors.username && <span className='text-danger'>This field is required</span>}
                                </div>
                                <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-success me-2">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewQuiz