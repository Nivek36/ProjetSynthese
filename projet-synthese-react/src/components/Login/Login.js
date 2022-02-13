import React from 'react';
import SvgImage from '../SvgImage';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (player) => {
        playerLogin(player.username, player.password)
            .then((data) => data.username !== null ? navigate("/HomePage") : alert("Wrong username or password"));
    }

    const playerLogin = async (username, password) => {
        const res = await fetch(`http://localhost:8888/player/${username}/${password}`)
        return await res.json()
    }

    return (
        <div className='container-fluid'>
            <div className='row row-cols-2'>
                <div className=''>
                    <h2 className='text-center mt-5 text-color'>Welcome back !</h2>
                    <h2 className='text-center mb-5 text-color'>On <span className='badge rounded-pill bg-primary'> Quiz.io </span></h2>
                    <div className=''>
                        <form onSubmit={handleSubmit(onSubmit)} className='mx-3'>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" {...register("username", { required: true })} />
                                {errors.username && <span>This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
                                {errors.password && <span>This field is required</span>}
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='registration-login shadow-lg rounded-start'>
                    <div className='text-center'>
                        <SvgImage />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login